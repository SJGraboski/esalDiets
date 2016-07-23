// User model
// ==========
'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username:{
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }, 
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }, 
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gender: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
      }
    }
  });
  return User;
};