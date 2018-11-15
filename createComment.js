let articles = require('./articles');
const helper = require('./helper');
const handle_errors = require('./handleERRORS');

module.exports = function createComment(req, res, payload, cb) {
    let index = articles.findIndex(i => i.id == payload.articleId);
    if (index!=-1){
        if(articles[index].comments === undefined) articles[index].comments = [];
        articles[index].comments.push({"commentId":helper.random_id(),
                "articleId": payload.articleId,
                "text": payload.text,
                "date": payload.date,
                "author": payload.author}
            );
    }else{
        return handle_errors.invalidRequest(req, res, payload, cb);
    }
    cb(null, articles[index]);
};