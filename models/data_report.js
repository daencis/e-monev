module.exports = (sequelize, DataTypes) => {
    const data_report = sequelize.define("data_report", {
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
      program_description: {
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
      occassion_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'occassion',
            key: 'id'
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

    data_report.associate = (models) => {
        data_report.belongsTo(models.triwulan, { foreignKey: 'triwulan_id' })
        data_report.belongsTo(models.program, { foreignKey: 'program_id' })
        data_report.belongsTo(models.occassion, { foreignKey: 'occassion_id' })
        data_report.belongsTo(models.organization, { foreignKey: 'organization_id' })
    }
  
    return data_report;
};