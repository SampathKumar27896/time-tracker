'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TaskLogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      task_id: {
        type:Sequelize.INTEGER,
        references: {
          model: 'Tasks',
          key: 'id',
        }
      },
      task_comment: {
        type: Sequelize.STRING
      },
      start_time: {
        allowNull: false,
        type: Sequelize.DATE
      },
      end_time: {
        allowNull: false,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('TaskLogs');
  }
};