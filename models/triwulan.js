module.exports = (sequelize, DataTypes) => {
    const triwulan = sequelize.define("triwulan", {
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
  
    return triwulan;
};