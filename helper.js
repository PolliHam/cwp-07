let articles = require('./articles');
let log = require('./log');
const fs = require('fs');
const helper = {};
helper.random_id = function(){
    return Math.ceil(Math.random()*100);
};

helper.updateArticles=function(){
    fs.writeFile('articles.json', JSON.stringify(articles),()=>{});
};

helper.logger =(url, post_body)=>{
    let info = {
        date: helper.dateFormater(),
        url: url,
        data: post_body
    };
    log.push(info);
    fs.writeFile('log.json', JSON.stringify(log),()=>{});
};
helper.dateFormater = function(){
    const date = new Date();
    return `Date: ${date.getFullYear()}.${date.getMonth()}.${date.getDay()}  ` +
        `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}\r\n`;
};
module.exports = helper;