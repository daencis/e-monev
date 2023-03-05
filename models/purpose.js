module.exports = (app ,sequelize, DataTypes) => {
    const purpose = sequelize.define("purpose", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
    })
  
    return purpose;
};