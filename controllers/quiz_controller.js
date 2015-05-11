//GET /quizes/:id
var models = require ('../models/models.js')

exports.show = function(req, res){
	models.Quiz.find(req.params.quizId).then(function(quiz){
		res.render('quizes/show.ejs', {quiz: quiz})
	});
};
	
//GET /quizes
exports.index = function(req, res){
	models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index.ejs',{quizes: quizes});
	})
};
//GET /quizes/:id/answer
exports.answer = function(req, res){
	models.Quiz.find(req.params.quizId).then(function(quiz){
		if (req.query.respuesta === quiz.respuesta){
			res.render('quizes/answer.ejs',
				{quiz: quiz, respuesta: 'Correcto'});
		} else{
			res.render('quizes/answer.ejs',
				{quiz: quiz, respuesta: 'Incorrecto'});
		}
	})
};
