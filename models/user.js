'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    
    static associate(models) {
      // define association here
      user.belongsTo(models.admin_role, { foreignKey: 'admin_role_id' })
      user.belongsTo(models.organization, { foreignKey: 'organization_id' })
      user.belongsTo(models.status, { foreignKey: 'status_id' })
    }
  }
  user.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'Username harus diisi.'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Kata sandi harus diisi.'
        }
      }
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
    admin_role_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
          model: 'admin_role',
          key: 'id'
      }
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
          model: 'status',
          key: 'id'
      },
      defaultValue: 1
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
    modelName: 'user',
  });
  user.addHook('beforeCreate', async user => {
    if (user.password){
        const salt = await bcrypt.genSalt(8);
        return user.password = await bcrypt.hash(user.password, salt);
    }
  })

  user.addHook('beforeUpdate', async user => {
    if (user.dataValues.password !== user._previousDataValues.password){
      const salt = await bcrypt.genSalt(8);
      return user.password = await bcrypt.hash(user.password, salt);
    }
  })
  return user;
};