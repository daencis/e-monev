module.exports = (sequelize, DataTypes) => {
    const activity = sequelize.define("activity", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
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
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Kode harus diisi.'
          }
        }
      },
      program_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'program',
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

    activity.associate = (models) => {
        activity.belongsTo(models.program, { foreignKey: 'program_id' })
    }
  
    return activity;
};