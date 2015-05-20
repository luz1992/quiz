
var models = require('../models/models.js');

exports.calculate = function(req,res){
 var con_Com=[];
 var sin_Com;
 models.Quiz.count().then(function(quizes){
 models.Comment.findAll({where:{publicado: true}}).then(function(comments){
 sin_Com=quizes;
 for(var i=0; i<comments.length;i++){
 if(con_Com[comments[i].QuizId]===undefined){
 sin_Com--;
 }
 con_Com[comments[i].QuizId]=1;
 }
 res.render('quizes/statistics',
 {quizes: quizes,
 comments: comments.length,
 avg: comments.length/quizes,
 no_comments:sin_Com,
 with_comments:quizes-sin_Com,
 errors: []
 });
 });
 });
}; 