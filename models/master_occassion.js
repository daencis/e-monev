module.exports = (sequelize, DataTypes) => {
    const master_occassion = sequelize.define("master_occassion", {
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
      },
    })

    master_occassion.associate = (models) => {
        master_occassion.belongsTo(models.data_master, { foreignKey: 'data_master_id' })
        master_occassion.belongsTo(models.occassion, { foreignKey: 'occassion_id' })
    }
  
    return master_occassion;
};