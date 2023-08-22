'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class data_master extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      data_master.belongsTo(models.triwulan, { foreignKey: 'triwulan_id' })
      data_master.belongsTo(models.purpose, { foreignKey: 'purpose_id' })
      data_master.belongsTo(models.organization, { foreignKey: 'organization_id' })
      data_master.hasMany(models.master_occassion, { foreignKey: 'data_master_id', as: 'occassions' })
    }
  }
  data_master.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    triwulan_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
          model: 'triwulan',
          key: 'id'
      }
    },
    organization_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
          model: 'organization',
          key: 'id'
      }
    },
    purpose_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
          model: 'purpose',
          key: 'id'
      }
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      timestamps: true,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      timestamps: true,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'data_master',
  });
  return data_master;
};