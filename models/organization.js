module.exports = (sequelize, DataTypes) => {
  const organization = sequelize.define("organization", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'Kode harus diisi.'
        }
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Judul harus diisi.'
        }
      }
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
          model: 'status',
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

  organization.associate = (models) => {
    organization.belongsTo(models.status, { foreignKey: 'status_id' })
  }

  return organization;
};