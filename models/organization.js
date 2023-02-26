const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

class Organization extends Model {
  constructor () {
    super("emonev_development");
  }
}

Organization.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  code: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
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
},
{
  sequelize,
  modelName: 'organization'
});
await Organization.sync();

module.exports = Organization