const { Sequelize } = require('sequelize');
const { book, author } = require('../models/index.js');
const axios = require('axios');
const { logger, sanitizedUri } = require('../helpers/utils.js');


// Function to extract book_uid and authors and save them in authorBookJoin
async function createBookAuthorJoin() {
    try {
        // Fetch all books from the Book model
        const books = await book.findAll({
            where: {
                status: {
                    [Sequelize.Op.not]: 1, // Filter out books with status !== 1
                },
            },
        });

        // Loop through each book
        for (const currentBook of books) {
            const { book_uid, author_ids } = currentBook;

            if (book_uid && author_ids) {

                const alteredAuthors = []
                const authors = JSON.parse(author_ids);

                for (const author of authors) {

                    if (author.key !== null) {

                        const authorDetails = await axios.get(`https://openlibrary.org/author/${author.key}.json`);

                        if (authorDetails?.data && authorDetails?.data?.name) {
                            // Insert the author into the author table if it doesn't exist
                            const addedAuthor = await insertAuthorIfNotExists(authorDetails?.data, author.key, currentBook);
                            alteredAuthors.push({
                                name: addedAuthor?.name,
                                key: addedAuthor?.author_uid,
                                k_id: addedAuthor?.id
                            });
                        } else {
                            alteredAuthors.push({
                                name: author.name,
                                key: null,
                                k_id: null
                            });
                        }
                    } else {
                        alteredAuthors.push({
                            name: author.name,
                            key: null,
                            k_id: null
                        });
                    }
                }

                // Update the book's author_ids with the new values
                await currentBook.update({ author_ids: alteredAuthors });

                // Set the book's status to 1 (successfully processed)
                await currentBook.update({ status: 1 });
            }
        }

        if (books.length !== 0) {
            logger.info('Authors saved in authorBookJoin successfully.');
        } else {
            logger.info('No books found.');
        }

    } catch (error) {
        logger.error('Error:', error);
    }
}

// Function to insert an author into the database if it doesn't exist
async function insertAuthorIfNotExists(authorInfo, authorKey, currentBook) {
    try {
        const [authorRecord, created] = await author.findOrCreate({
            where: { author_uid: authorKey },
            defaults: {
                name: authorInfo?.name,
                alternate_names: authorInfo?.alternate_names ? JSON.stringify(authorInfo?.alternate_names) : null, // You can fetch alternate names from the API if available
                birth_year: authorInfo?.birth_date ?? null,
                death_year: authorInfo?.death_date ?? null,
                biography: authorInfo?.bio?.value ?? null,
                slug: sanitizedUri(authorInfo?.name)
            },
        });

        if (created) {
            logger.info(`Author "${authorInfo?.name}" inserted.`);
            await currentBook.addAuthor(authorRecord);

        } else {
            logger.info(`Author "${authorInfo.name}" already exists.`);
            await currentBook.addAuthor(authorRecord);
        }

        return authorRecord;
    } catch (error) {
        logger.error('Error inserting author:', error);
    }
}

// Call the function to save book authors in the join table
createBookAuthorJoin().catch(error => logger.error('Error:', error));
