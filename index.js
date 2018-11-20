const http = require('http');
let articles = require('./articles');
const helper = require('./helper');
const sum = require('./sum');
const readall = require('./readall');
const read= require('./read');
const createArticle = require('./createArticle');
const updateArticle = require('./updateArticle');
const deleteArticle = require('./deleteArticle');
const createComment = require('./createComment');
const deleteComment = require('./deleteComment');
const logs = require('./logs');
const cssFiles = require('./readerCSS');
const jsFiles = require('./readerJS');
const htmlFiles = require('./readerHTML');
const hostname = '127.0.0.1';
const port = 3000;

const handlers = {
    '/sum': sum,
    '/api/articles/readall': readall,
    '/api/articles/read': read,
    '/api/articles/create': createArticle,
    '/api/articles/update': updateArticle,
    '/api/articles/delete': deleteArticle,
    '/api/comments/create': createComment,
    '/api/comments/delete': deleteComment,
    '/api/logs': logs,
    '/': htmlFiles.indexHtml,
    '/index.html': htmlFiles.indexHtml,
    '/form.html': htmlFiles.formHtml,
    '/app.js': jsFiles.appJs,
    '/form.js': jsFiles.formJs,
    '/site.css': cssFiles
};

const server = http.createServer((req, res) => {
    parseBodyJson(req, (err, payload) => {
        const handler = getHandler(req.url);
        handler(req, res, payload, (err, result, format) => {
            if (err) {
                res.statusCode = err.code;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(err));
                return;
            }else{
                helper.updateArticles('articles.json', articles);
                helper.logger(req.url, payload);
                res.setHeader('Content-Type', format);
                res.statusCode = 200;
                if(format === 'application/json'){
                    res.end(JSON.stringify(result));
                }else{
                    res.end(result);
                }
            }
        });
    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

function getHandler(url) {
    return handlers[url] || notFound;
}

function notFound(req, res, payload, cb) {
    cb({ code: 404, message: 'Not found'});
}

function parseBodyJson(req, cb) {
    let body = [];
    req.on('data', function(chunk) {
        body.push(chunk);
    }).on('end', function() {
        let params = '';
        body = Buffer.concat(body).toString();
        if (body !== ""){
            params = JSON.parse(body);
        }
        console.log(params);
        cb(null, params);
    });
}