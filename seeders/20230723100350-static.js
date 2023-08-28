'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('status', [
      {id: 1, name: 'Active'},
      {id: 2, name: 'Inactive'},
      {id: 3, name: 'Delete'},
    ])

    await queryInterface.bulkInsert('admin_role', [
      {id: 1, name: 'Super Admin'},
      {id: 2, name: 'OPD'},
      {id: 3, name: 'Admin Bidang'},
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
