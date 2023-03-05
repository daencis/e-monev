module.exports = (app ,sequelize, DataTypes) => {
    const occasion = sequelize.define("occasion", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
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

    occasion.associate = (models) => {
      occasion.belongsTo(models.status, { foreignKey: 'status_id' })
    }
  
    return occasion;
};