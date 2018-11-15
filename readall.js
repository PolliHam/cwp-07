let articles = require('./articles');
const handle_errors = require('./handleERRORS');
let newArticles = [];
let thPayload;
const ERROR = 0;

function sort(value, ord) {

    if(ord ==="asc"){
        return compareValue(value, -1);
    }
    else if(ord === "desc"){
        return compareValue(value, 1);
    }
    else{
        return ERROR ;
    }
}

function compareValue(value, order){
    if(value==="date") {
        newArticles.sort((a, b) => { return (Date.parse(b[value]) - Date.parse(a[value])) * order;});
    }
    else if (value==="id"){
        newArticles.sort((a, b)=>{return (b[value] - a[value])*order;});
    }
    else if(value==="title" || value==="text" || value==="author") {
        newArticles.sort(function(a,b) {
            if ( a[value] < b[value] )
                return 1*order;
            if ( a[value] > b[value] )
                return -1*order;
            return 0;
        } );
    }
    else return ERROR;

    return 1;
}

function includeComments(value){
    if (value === "false") {
        newArticles = newArticles.map((element) => {
            delete element.comments;
            return Object.assign({}, element);
        });
        return 1;
    }
    else if(value === "true"){return 1;}
    else return ERROR;

}

function paginate(){
    if(getCorrectPage() && getCorrectLimit()){
        newArticles = newArticles.splice((getCorrectPage() - 1) * getCorrectLimit(), getCorrectLimit());
        return 1;
    }
    else
        return ERROR;
}


function modifyResult(){
    return { "items": newArticles, "meta":{"page": getCorrectPage(),"pages":  Math.ceil(newArticles.length/getCorrectLimit()),
            "count": newArticles.length,"limit": getCorrectLimit()}};
}

function getCorrectPage(){
    let p = thPayload.page || 1;
    p = parseInt(p);
    if (p && p < newArticles.length && p >= 1){
        return p;
    }
    return ERROR;
}

function getCorrectLimit(){
    let l = thPayload.limit || 10;
    l = parseInt(l);
    if ( l && l >= 1){
        return l;
    }
    return ERROR;

}

module.exports = function readAll(req, res, payload, cb) {
    newArticles = JSON.parse(JSON.stringify(articles));
    thPayload = payload;
    if( sort(payload.sortField || "date", payload.sortOrder || "desc" ) &&
      paginate() &&
      includeComments(payload.includeDeps || "false"))
   {
       cb(null, modifyResult());
   }
   else{
        return handle_errors.invalidRequest(req, res, payload, cb);
   }
};
