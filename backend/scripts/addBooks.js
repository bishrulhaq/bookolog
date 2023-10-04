const { category, book } = require('../models');
const axios = require('axios');
require('dotenv').config();
const { sanitizedUri } = require('../helpers/utils');

const StandardQueryParameters = {
    q: 'subject:science',
    key: process.env.GOOGLE_BOOKS_API,
    langRestrict: 'en',
};

const maxResults = 1000;

async function insertCategoryIfNotExists(categoryTitle) {
    try {
        const created = await category.findOrCreate({
            where: { category_title: categoryTitle },
            defaults: { background_color: Math.floor(Math.random() * 24) }
        });

        if (created) {
            console.log(`Category "${categoryTitle}" inserted.`);
        } else {
            console.log(`Category "${categoryTitle}" already exists.`);
        }
    } catch (error) {
        console.error('Error inserting category:', error);
    }
}

async function addBooks(item) {
    const data = {
        title: item?.volumeInfo?.title || null,
        subtitle: item?.volumeInfo?.subtitle || null,
        book_uid: item?.id || null,
        publisher: item?.volumeInfo?.publisher || null,
        published_date: item?.volumeInfo?.publishedDate || null,
        description: item?.volumeInfo?.description || null,
        maturityRating: item?.volumeInfo?.maturityRating || null,
        contentVersion: item?.volumeInfo?.contentVersion || null,
        language: item.volumeInfo?.language || null,
        search_info: item?.searchInfo || null,
        categories: item?.volumeInfo?.categories || null,
        e_tag: item?.etag || null,
        google_uri: item?.selfLink || null,
        page_count: item?.volumeInfo?.pageCount || null,
        print_type: item?.volumeInfo?.printType || null,
        isbn_10: item?.volumeInfo?.industryIdentifiers?.find((identifier) => identifier?.type === 'ISBN_10')?.identifier || null,
        isbn_13: item?.volumeInfo?.industryIdentifiers?.find((identifier) => identifier?.type === 'ISBN_13')?.identifier || null,
        publish_country: item?.volumeInfo?.country || null,
        book_authors: item?.volumeInfo?.authors || null,
        slug: sanitizedUri(item?.volumeInfo?.title || null),
        author_ids: null,
    };


    if (data.book_uid) {
        try {
            const existingBook = await book.findOne({ where: { book_uid: data.book_uid } });

            if (!existingBook) {
                const createdBook = await book.create(data);
                console.log('Created book:', createdBook.title);

                if (data.categories) {
                    const uniqueCategories = [...new Set(data.categories)];
                    for (const categoryName of uniqueCategories) {
                        await insertCategoryIfNotExists(categoryName);
                    }
                }
            } else {
                console.log(`Book with book_uid "${data.book_uid}" already exists.`);
            }
        } catch (error) {
            console.error('Error creating/checking book:', error);
        }
    }
}

async function fetchAndProcessBooks(resultsCount, startIndex) {
    try {
        const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
            params: { ...StandardQueryParameters, startIndex: startIndex, maxResults: resultsCount },
        });


        const books = response.data.items || [];

        for (const item of books) {
            const isbn = item?.volumeInfo?.industryIdentifiers?.find((identifier) => identifier?.type === 'ISBN_13' || identifier?.type === 'ISBN_10')?.identifier;
            if (isbn) {
                await addBooks(item);
            }
        }

        return books.length; 
    } catch (error) {
        console.error('Error fetching and processing books:', error);
        return 0;
    }
}

async function fetchAndProcessBooksIncrementally() {
    let totalProcessed = 0;
    let startIndex = 0;
    const batchSize = 10;

    while (totalProcessed < maxResults) {
        const batchProcessed = await fetchAndProcessBooks(batchSize, startIndex);
        totalProcessed += batchProcessed;
        startIndex += batchSize;

        if (batchProcessed < batchSize) {
            console.log('No more results to fetch');
            break;
        }
    }

    console.log(`Total books processed: ${totalProcessed}`);
}

fetchAndProcessBooksIncrementally();