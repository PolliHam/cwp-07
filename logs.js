let log = require('./log');
//[{"id":0,"title":"a","text":"First article","date":"2018-10-05","author":"I and I","comments":[{"id":0,"articleId":0,"text":"the best","date":"2018-10-07","author":"Not"},{"id":1,"articleId":0,"text":"not the best","date":"2018-10-10","author":"Not not"}]},{"id":1,"title":"b","text":"sample sample","date":"2017-08-25","author":"banifest","comments":[{"id":0,"articleId":0,"text":"the best","date":"2017-08-25","author":"Not"}]},{"id":3,"title":"c","text":"sample sample","date":"2017-02-25","author":"banifest","comments":[{"id":null,"articleId":3,"text":"sample comment","date":"2017-02-25","author":"banifest"}]}]
module.exports = function readArticle(req, res, payload, cb) {
    cb(null, log, 'application/json');
};