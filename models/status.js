module.exports = (sequelize, DataTypes) => {
    const status = sequelize.define("status", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
    })
  
    return status;
};