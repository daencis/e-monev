'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('master_occassion', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      data_master_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: 'data_master',
            key: 'id'
        }
      },
      occassion_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: 'occassion',
            key: 'id'
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('master_occassion');
  }
};