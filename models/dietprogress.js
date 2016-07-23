// diet progress model
'use strict';
module.exports = function(sequelize, DataTypes) {
  var DietProgress = sequelize.define('DietProgress', {
    q1: DataTypes.STRING,
    a1: DataTypes.INTEGER,
    q2: DataTypes.STRING,
    a2: DataTypes.INTEGER,
    q3: DataTypes.STRING,
    a3: DataTypes.INTEGER,
    reportDay: {
      type: DataTypes.DATE,
      allowNull: false
    },
    reportNum:{
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        DietProgress.belongsTo(models.User);
        DietProgress.belongsTo(models.Diet);
      }
    }
  });
  return DietProgress;
};