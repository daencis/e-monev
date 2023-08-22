'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: 'Username harus diisi.'
          }
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Kata sandi harus diisi.'
          }
        }
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      organization_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: 'organization',
            key: 'id'
        }
      },
      admin_role_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: 'admin_role',
            key: 'id'
        }
      },
      status_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: 'status',
            key: 'id'
        },
        defaultValue: 1
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
    await queryInterface.dropTable('user');
  }
};