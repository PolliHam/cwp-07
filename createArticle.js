let articles = require('./articles');
const helper = require('./helper');

module.exports = function createArticle(req, res, payload, cb){
    let new_article = {"id": helper.random_id(),
        "title":payload.title,
        "text":payload.text,
        "date":payload.data,
        "author":payload.author,
        "comments":[]
    };
    articles.push(new_article);
    const result = { new_article: new_article};

    cb(null, result);
};