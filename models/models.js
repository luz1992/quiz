var path = require ( 'path');
var pg = require ('pg');
//Postgres DATABASE_URL =postgres://user:passwd@host:port/database
//SQLite DATABASE_URL =sqlite://:@:/

var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6]||null);
var user = (url[2]||null);
var pwd = (url[3]||null);
var protocol = (url[1]||null);
var dialect = (url[1]||null);
var port = (url[5]||null);
var host = (url[4]||null);
var storage = process.env.DATABASE_STORAGE;
// cargar modelo ORM
var Sequelize = require('sequelize');
// usar BBDD SQlite o Portgres
var sequelize = new Sequelize (DB_name, user, pwd,
	{ dialect: protocol,
	 protocol: protocol,
	 port:     port,
	 host:     host,
	 storage:  storage,	//solo DSLite (.env)
	 omitNull: true 		//solo Postgres
	}
); 
//Importa la definicion de la tabla quiz en quiz.js
var quiz_path = path.join(__dirname,'quiz');
var Quiz = sequelize.import(quiz_path);
// Importar definicion de la tabla Comment
var comment_path = path.join(__dirname,'comment');
var Comment = sequelize.import(comment_path);

// Importar definicion de la tabla Comment
var user_path = path.join(__dirname,'user');
var User = sequelize.import(user_path);

// Los comentarios pertenecen a una pregunta
Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

// Los quizes pertenecen a un usuario registrado
Quiz.belongsTo(User);
User.hasMany(Quiz);

// Exportar tablas de Quiz, comentarios y usuarios
exports.Quiz = Quiz;
exports.Comment = Comment;
exports.User = User;
//sequelize.sync (crea e inicializa la tabla de preguntas en DB)
sequelize.sync().then(function(){
	//then(..) ejecuta el manejador una vez creada la tabla
	User.count().then(function (count){
		if(count === 0){
		User.bulkCreate(
[ {username: 'admin', password: '1234', isAdmin: true},
 {username: 'mams', password: '5678'} // isAdmin por defecto: 'false'
 ]
 ).then(function(){
 console.log('Base de datos (Tabla User) inicializada');
 Quiz.count().then(function (count){
if(count === 0){ // La tabla de inicializa sólo si está vacía
 Quiz.bulkCreate( // estos quizes pertenecen al usuario mams (2)
[ {pregunta: '4+2', respuesta: '6', UserId: 2},
 {pregunta: 'Capital de Italia', respuesta: 'Roma', UserId: 2},
 {pregunta: 'Capital de Portugal', respuesta: 'Italia', UserId: 2},
{pregunta: 'Raíz cuadrada de 49', respuesta: '7', UserId: 2},
 ]
).then(function(){console.log('Base de datos (Tabla Quiz) inicializada')});
 };
});
});
		};
	});
});