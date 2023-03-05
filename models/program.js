module.exports = (app ,sequelize, DataTypes) => {
    const program = sequelize.define("program", {
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
      code: {
        type: DataTypes.STRING,
        allowNull: false
      },
      reated_at: {
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
  
    return program;
};