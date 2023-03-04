const bcrypt = require("bcryptjs");

module.exports = (app, sequelize, DataTypes) => {
  const user = sequelize.define("user", {
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
  })
  user.addHook('beforeCreate', async user => {
    if (user.password){
        const salt = await bcrypt.genSalt(8);
        return user.password = await bcrypt.hash(user.password, salt);
    }
  })

  user.addHook('beforeUpdate', async user => {
    if (user.password){
        const salt = await bcrypt.genSalt(8);
        return user.password = await bcrypt.hash(user.password, salt);
    }
  })

  user.associate = (models) => {
    user.belongsTo(models.admin_role, { foreignKey: 'admin_role_id' })
    user.belongsTo(models.organization, { foreignKey: 'organization_id' })
  }

  return user;
};