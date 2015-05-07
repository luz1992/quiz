// definicion del modelo de quiz
module.expoprts = function(sequelize,DataTypes){
	return sequelize.define( 'Quiz', 
	{ pregunta : DataTypes.STRING,
		respuesta: DataTypes.STRING,

	});
}