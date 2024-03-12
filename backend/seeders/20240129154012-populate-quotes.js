'use strict';

const quoteData = [
  {
    quote: "The only limit to our realization of tomorrow will be our doubts of today.",
    author: "Franklin D. Roosevelt",
    displayed_in: false,
  },
  {
    quote: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    author: "Winston Churchill",
    displayed_in: false,
  },
  {
    quote: "Your time is limited, don't waste it living someone else's life.",
    author: "Steve Jobs",
    displayed_in: false,
  },
  {
    quote: "In the end, we will remember not the words of our enemies, but the silence of our friends.",
    author: "Martin Luther King Jr.",
    displayed_in: false,
  },
  {
    quote: "Do not wait to strike till the iron is hot, but make it hot by striking.",
    author: "William Butler Yeats",
    displayed_in: false,
  },
  {
    quote: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela",
    displayed_in: false,
  },
  {
    quote: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    displayed_in: false,
  },
  {
    quote: "If you want to lift yourself up, lift up someone else.",
    author: "Booker T. Washington",
    displayed_in: false,
  },
  {
    quote: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    displayed_in: false,
  },
  {
    quote: "Success is not how high you have climbed, but how you make a positive difference to the world.",
    author: "Roy T. Bennett",
    displayed_in: false,
  },
  {
    quote: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
    displayed_in: false,
  },
  {
    quote: "It always seems impossible until it's done.",
    author: "Nelson Mandela",
    displayed_in: false,
  },
  {
    quote: "The purpose of our lives is to be happy.",
    author: "Dalai Lama",
    displayed_in: false,
  },
  {
    quote: "You miss 100% of the shots you don't take.",
    author: "Wayne Gretzky",
    displayed_in: false,
  },
  {
    quote: "Strive not to be a success, but rather to be of value.",
    author: "Albert Einstein",
    displayed_in: false,
  },
  {
    quote: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    displayed_in: false,
  },
  {
    quote: "Success is stumbling from failure to failure with no loss of enthusiasm.",
    author: "Winston Churchill",
    displayed_in: false,
  },
  {
    quote: "Life is what happens when you're busy making other plans.",
    author: "John Lennon",
    displayed_in: false,
  },
  {
    quote: "Get busy living or get busy dying.",
    author: "Stephen King",
    displayed_in: false,
  },
  {
    quote: "You have within you right now, everything you need to deal with whatever the world can throw at you.",
    author: "Brian Tracy",
    displayed_in: false,
  },
  {
    quote: "Don't count the days, make the days count.",
    author: "Muhammad Ali",
    displayed_in: false,
  },
  {
    quote: "If you can dream it, you can do it.",
    author: "Walt Disney",
    displayed_in: false,
  },
  {
    quote: "The only limit to our realization of tomorrow will be our doubts of today.",
    author: "Franklin D. Roosevelt",
    displayed_in: false,
  },
  {
    quote: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    author: "Winston Churchill",
    displayed_in: false,
  },
  {
    quote: "Your time is limited, don't waste it living someone else's life.",
    author: "Steve Jobs",
    displayed_in: false,
  },
  {
    quote: "In the end, we will remember not the words of our enemies, but the silence of our friends.",
    author: "Martin Luther King Jr.",
    displayed_in: false,
  },
  {
    quote: "Do not wait to strike till the iron is hot, but make it hot by striking.",
    author: "William Butler Yeats",
    displayed_in: false,
  },
  {
    quote: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela",
    displayed_in: false,
  },
  {
    quote: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    displayed_in: false,
  },
  {
    quote: "If you want to lift yourself up, lift up someone else.",
    author: "Booker T. Washington",
    displayed_in: false,
  },
  {
    quote: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    displayed_in: false,
  },
  {
    quote: "Success is not how high you have climbed, but how you make a positive difference to the world.",
    author: "Roy T. Bennett",
    displayed_in: false,
  },
  {
    quote: "The only limit to our realization of tomorrow will be our doubts of today.",
    author: "Franklin D. Roosevelt",
    displayed_in: false,
  },
  {
    quote: "The only way to achieve the impossible is to believe it is possible.",
    author: "Charles Kingsleigh (Alice in Wonderland 2010)",
    displayed_in: false,
  },
  {
    quote: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    displayed_in: false,
  },
  {
    quote: "Life is really simple, but we insist on making it complicated.",
    author: "Confucius",
    displayed_in: false,
  },
  {
    quote: "Success usually comes to those who are too busy to be looking for it.",
    author: "Henry David Thoreau",
    displayed_in: false,
  },
  {
    quote: "You don't have to be rich to travel well.",
    author: "Eugene Fodor",
    displayed_in: false,
  },
  {
    quote: "The best revenge is massive success.",
    author: "Frank Sinatra",
    displayed_in: false,
  },
  {
    quote: "You miss 100% of the shots you don't take.",
    author: "Wayne Gretzky",
    displayed_in: false,
  },
  {
    quote: "It is never too late to be what you might have been.",
    author: "George Eliot",
    displayed_in: false,
  },
  {
    quote: "If you are working on something that you really care about, you don't have to be pushed.",
    author: "Warren Buffett",
    displayed_in: false,
  },
  {
    quote: "Success is not the key to happiness. Happiness is the key to success.",
    author: "Albert Schweitzer",
    displayed_in: false,
  },
  {
    quote: "I find that the harder I work, the more luck I seem to have.",
    author: "Thomas Jefferson",
    displayed_in: false,
  },
  {
    quote: "The only place where success comes before work is in the dictionary.",
    author: "Vidal Sassoon",
    displayed_in: false,
  },
  {
    quote: "The only way to achieve the impossible is to believe it is possible.",
    author: "Charles Kingsleigh (Alice in Wonderland 2010)",
    displayed_in: false,
  },
  {
    quote: "The only limit to our realization of tomorrow will be our doubts of today.",
    author: "Franklin D. Roosevelt",
    displayed_in: false,
  },
  {
    quote: "Don't count the days, make the days count.",
    author: "Muhammad Ali",
    displayed_in: false,
  },
  {
    quote: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    displayed_in: false,
  },
  {
    quote: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    author: "Winston Churchill",
    displayed_in: false,
  },
  {
    quote: "Your time is limited, don't waste it living someone else's life.",
    author: "Steve Jobs",
    displayed_in: false,
  },
  {
    quote: "In the end, we will remember not the words of our enemies, but the silence of our friends.",
    author: "Martin Luther King Jr.",
    displayed_in: false,
  },
  {
    quote: "Do not wait to strike till the iron is hot, but make it hot by striking.",
    author: "William Butler Yeats",
    displayed_in: false,
  },
  {
    quote: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela",
    displayed_in: false,
  },
  {
    quote: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    displayed_in: false,
  },
  {
    quote: "If you want to lift yourself up, lift up someone else.",
    author: "Booker T. Washington",
    displayed_in: false,
  },
  {
    quote: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    displayed_in: false,
  },
  {
    quote: "Success is not how high you have climbed, but how you make a positive difference to the world.",
    author: "Roy T. Bennett",
    displayed_in: false,
  },
  {
    quote: "The only limit to our realization of tomorrow will be our doubts of today.",
    author: "Franklin D. Roosevelt",
    displayed_in: false,
  },
  {
    quote: "The only way to achieve the impossible is to believe it is possible.",
    author: "Charles Kingsleigh (Alice in Wonderland 2010)",
    displayed_in: false,
  },
  {
    quote: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    displayed_in: false,
  },
  {
    quote: "Life is really simple, but we insist on making it complicated.",
    author: "Confucius",
    displayed_in: false,
  },
  {
    quote: "Success usually comes to those who are too busy to be looking for it.",
    author: "Henry David Thoreau",
    displayed_in: false,
  },
  {
    quote: "You don't have to be rich to travel well.",
    author: "Eugene Fodor",
    displayed_in: false,
  },
  {
    quote: "The best revenge is massive success.",
    author: "Frank Sinatra",
    displayed_in: false,
  },
  {
    quote: "You miss 100% of the shots you don't take.",
    author: "Wayne Gretzky",
    displayed_in: false,
  },
  {
    quote: "It is never too late to be what you might have been.",
    author: "George Eliot",
    displayed_in: false,
  },
  {
    quote: "If you are working on something that you really care about, you don't have to be pushed.",
    author: "Warren Buffett",
    displayed_in: false,
  },
  {
    quote: "I find that the harder I work, the more luck I seem to have.",
    author: "Thomas Jefferson",
    displayed_in: false,
  },
  {
    quote: "The only place where success comes before work is in the dictionary.",
    author: "Vidal Sassoon",
    displayed_in: false,
  },
  {
    quote: "The only way to achieve the impossible is to believe it is possible.",
    author: "Charles Kingsleigh (Alice in Wonderland 2010)",
    displayed_in: false,
  },
  {
    quote: "The only true wisdom is in knowing you know nothing.",
    author: "Socrates",
    displayed_in: false,
  },
  {
    quote: "Knowledge speaks, but wisdom listens.",
    author: "Jimi Hendrix",
    displayed_in: false,
  },
  {
    quote: "The more I read, the more I acquire, the more certain I am that I know nothing.",
    author: "Voltaire",
    displayed_in: false,
  },
  {
    quote: "The beginning of wisdom is the definition of terms.",
    author: "Socrates",
    displayed_in: false,
  },
  {
    quote: "It is not that I'm so smart. But I stay with the questions much longer.",
    author: "Albert Einstein",
    displayed_in: false,
  },
  {
    quote: "A room without books is like a body without a soul.",
    author: "Marcus Tullius Cicero",
    displayed_in: false,
  },
  {
    quote: "So many books, so little time.",
    author: "Frank Zappa",
    displayed_in: false,
  },
  {
    quote: "A book is a dream that you hold in your hand.",
    author: "Neil Gaiman",
    displayed_in: false,
  },
  {
    quote: "Books are the plane, and the train, and the road. They are the destination, and the journey.",
    author: "Anna Quindlen",
    displayed_in: false,
  },
  {
    quote: "Reading is a discount ticket to everywhere.",
    author: "Mary Schmich",
    displayed_in: false,
  },
  {
    quote: "The man who does not read has no advantage over the man who cannot read.",
    author: "Mark Twain",
    displayed_in: false,
  },
  {
    quote: "Once you learn to read, you will be forever free.",
    author: "Frederick Douglass",
    displayed_in: false,
  },
  {
    quote: "I have always imagined that Paradise will be a kind of library.",
    author: "Jorge Luis Borges",
    displayed_in: false,
  },
  {
    quote: "Reading is to the mind what exercise is to the body.",
    author: "Joseph Addison",
    displayed_in: false,
  },
  {
    quote: "You can never get a cup of tea large enough or a book long enough to suit me.",
    author: "C.S. Lewis",
    displayed_in: false,
  },
];

const batchSize = 20;
const totalRecords = quoteData.length;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Function to insert records in batches
    async function insertInBatches(startIndex) {
      const endIndex = Math.min(startIndex + batchSize, totalRecords);
      const recordsToInsert = quoteData.slice(startIndex, endIndex);

      if (recordsToInsert.length > 0) {
        await queryInterface.bulkInsert('quote', recordsToInsert, {});
        await new Promise(resolve => setTimeout(resolve, 2000)); // Delay to avoid overwhelming the database
        await insertInBatches(endIndex);
      }
    }

    await insertInBatches(0);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('quotes', null, {});
  }
};