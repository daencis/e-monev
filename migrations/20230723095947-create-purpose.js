'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('purpose', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Judul harus diisi.'
          }
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('purpose');
  }
};