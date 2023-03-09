module.exports = (sequelize, DataTypes) => {
  const admin_role = sequelize.define("admin_role", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  })

  return admin_role;
};