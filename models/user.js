const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');
const organization = require('./organization')
const bcrypt = require("bcryptjs");

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  organization_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    // references: {
    //     model: 'organizations',
    //     key: 'id'
    // }
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
  hooks: {
    beforeCreate : async (user, options) => {
      const salt = await bcrypt.genSalt(8);
      return user.password = await bcrypt.hash(user.password, salt);
      
    },
    beforeUpdate  : async (user, options) => {
      const salt = await bcrypt.genSalt(8);
      return user.password = await bcrypt.hash(user.password, salt);
    },
  },
  sequelize,
  modelName: 'user'
});

// User.belongsTo(organization, { foreignKey: 'organization_id' })
User.sync({ force: true })
module.exports = User