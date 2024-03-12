const {Sequelize} = require('sequelize');
const {nudge, user, bookInteraction} = require('../models');

const nudgeController = {
    addNudge: async (req, res) => {
        try {
            const {interactionId, userId, commentText} = req.body;
            const {email} = req.user;

            const author = await user.findOne({where:{email}});

            if(userId === author.id){
                res.status(401).json({success: false, error: 'Same User'});
            } else{
                const newNudge = await nudge.create({
                    interaction_id: interactionId,
                    user_id: userId,
                    content: commentText,
                });

                const nudgeWithUser = await nudge.findOne({
                    where: {id: newNudge.id},
                    include: [
                        {
                            model: user,
                            attributes: [
                                'id',
                                'email',
                                'unique_id',
                                [
                                    Sequelize.fn(
                                        'COALESCE',
                                        Sequelize.fn('CONCAT', Sequelize.col('user.first_name'), ' ', Sequelize.col('user.last_name')),
                                        Sequelize.col('user.name'),
                                        Sequelize.col('user.email')
                                    ),
                                    'user_name'
                                ]
                            ]
                        }
                    ]
                });
                res.status(200).json({success: true, data: nudgeWithUser});
            }


        } catch (error) {
            res.status(500).json({success: false, error: 'Internal Server Error'});
        }
    },

    getNudge: async (req, res) => {
        try {
            const {interactionId, limit, offset} = req.query;
            const {email} = req.user;



                const nudges = await nudge.findAll({
                    where: {
                        interaction_id: interactionId,
                    },
                    order: [['createdAt', 'DESC']],
                    limit: parseInt(limit),
                    offset: parseInt(offset),
                    include: [
                        {
                            model: user,
                            attributes: [
                                'id',
                                'email',
                                'unique_id',
                                [
                                    Sequelize.fn(
                                        'COALESCE',
                                        Sequelize.fn('CONCAT', Sequelize.col('user.first_name'), ' ', Sequelize.col('user.last_name')),
                                        Sequelize.col('user.name'),
                                        Sequelize.col('user.email')
                                    ),
                                    'user_name'
                                ]
                            ]
                        },
                    ],
                });

                const total = await nudge.count({
                    where: {interaction_id: interactionId}
                });

                res.status(200).json({success: true, data: {nudges: nudges, total: total}});


        } catch (error) {
            res.status(500).json({success: false, error: 'Internal Server Error'});
        }
    }
};

module.exports = nudgeController;