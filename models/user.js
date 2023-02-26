const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');
const bcrypt = require("bcryptjs");
const salt = await bcrypt.genSalt(8);

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
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
    references: {
        model: 'organization',
        key: 'id'
    }
  },
  created_at: {
    type: DataTypes.DATETIME,
    allowNull: true,
    timestamps: true,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATETIME,
    allowNull: true,
    timestamps: true,
    defaultValue: DataTypes.NOW
  }
},
{
  hooks: {
    beforeCreate : async (user, options) => {
      user.password = await bcrypt.hash(user.password, salt);
    },
    beforeUpdate  : async (user, options) => {
      user.password = await bcrypt.hash(user.password, salt);
    },
  },
  sequelize,
  modelName: 'user'
});

User.belongsTo('organization', { foreignKey: 'organization_id' })

