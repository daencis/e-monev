'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('data_master', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      triwulan_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: 'triwulan',
            key: 'id'
        }
      },
      organization_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: 'organization',
            key: 'id'
        }
      },
      purpose_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: 'purpose',
            key: 'id'
        }
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: true,
        timestamps: true,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
        timestamps: true,
        defaultValue: Sequelize.NOW
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('data_master');
  }
};