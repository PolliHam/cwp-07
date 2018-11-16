let articles = require('./articles');
const handle_errors = require('./handleERRORS');

module.exports =  function deleteComment(req, res, payload, cb) {
    let articleId, index;
    if ((articleId = articles.findIndex(i => i.id == payload.articleId)) != -1 &&
        (index=(articles[articleId].comments.findIndex(i=>i.commentId == payload.commentId))!=-1)){
        articles[articleId].comments.splice(index-1, 1);
    }else{
        console.log(articleId + index);
        return handle_errors.invalidRequest(req, res, payload, cb);
    }
    cb(null, articles[articleId], 'application/json');
};