const {DataTypes} = require('sequelize')
const sequelize = require ('../db/conn')

const Evento = sequelize.define('Evento', {
    nomeEvento:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    dataEvento: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    horaEvento:{
        type: DataTypes.TIME,
        allowNull: false,
    },
    localEvento:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    valorIngresso:{
        type: DataTypes.FLOAT,
        allowNull: false,
    },
})
module.exports = Evento