const { Sequelize } = require('sequelize');
const OpenAI = require('openai');
const { category } = require('../models');

require('dotenv').config()

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function generate(category_title) {
    
    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: `I have created a website for books which uses open Library book api to get the categories but the categories doesnt have any description. so provide 30 words description for ${category_title}` }],
        model: 'gpt-3.5-turbo',
    });

    return chatCompletion?.choices[0]?.message?.content;
}

async function updateEmptyDescriptions() {
    try {
        const categoriesWithEmptyDescriptions = await category.findAll({
            where: {
                description: {
                    [Sequelize.Op.or]: [null, ''],
                },
            },
        });

        let iteration = 0;

        for (const category of categoriesWithEmptyDescriptions) {
            const generatedDescription = await generate(category.category_title);
            await category.update({ description: generatedDescription });
            console.log(`Updated description for category: ${category.category_title}`);

            iteration++;

            if (iteration % 2 === 0) {
                console.log('Waiting for 50 seconds...');
                await new Promise(resolve => setTimeout(resolve, 50000)); // 50 seconds in milliseconds
            }
        }

        console.log('All empty descriptions updated.');
    } catch (error) {
        console.error('Error updating descriptions:', error);
    }
}

updateEmptyDescriptions();
