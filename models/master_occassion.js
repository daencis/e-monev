'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class master_occassion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      master_occassion.belongsTo(models.data_master, { foreignKey: 'data_master_id' })
      master_occassion.belongsTo(models.occassion, { foreignKey: 'occassion_id' })
    }
  }
  master_occassion.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    data_master_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
          model: 'data_master',
          key: 'id'
      }
    },
    occassion_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
          model: 'occassion',
          key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'master_occassion',
  });
  return master_occassion;
};