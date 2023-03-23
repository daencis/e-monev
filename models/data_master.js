module.exports = (sequelize, DataTypes) => {
    const data_master = sequelize.define("data_master", {
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
    })

    data_master.associate = (models) => {
        data_master.belongsTo(models.triwulan, { foreignKey: 'triwulan_id' })
        data_master.belongsTo(models.purpose, { foreignKey: 'purpose_id' })
        data_master.belongsTo(models.organization, { foreignKey: 'organization_id' })
        data_master.hasMany(models.master_occassion, { foreignKey: 'data_master_id', as: 'occassions' })
    }
  
    return data_master;
};