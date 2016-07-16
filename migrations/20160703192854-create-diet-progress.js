'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('DietProgresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      q1: {
        type: Sequelize.STRING
      },
      a1: {
        type: Sequelize.INTEGER
      },
      q2: {
        type: Sequelize.STRING
      },
      a2: {
        type: Sequelize.INTEGER
      },
      q3: {
        type: Sequelize.STRING
      },
      a3: {
        type: Sequelize.INTEGER
      },
      reportNum:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      reportDay: {
        type: Sequelize.DATE,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('DietProgresses');
  }
};