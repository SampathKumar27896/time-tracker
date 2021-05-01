'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('TaskStatuses',
      [
        {
          status: 'Open',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          status: 'Running',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          status: 'InProgress',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          status: 'Closed',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          status: 'Deleted',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('TaskStatuses', null, {});
  }
};
