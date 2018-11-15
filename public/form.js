let helper = require("../helper");

function create_article(){
    const date = new Date();
    $.ajax({
        type: "POST",
        url: "../api/articles/createArticle",
        data: JSON.stringify({
            "text": $("#articleText").val(),
            "author": $("#articleAuthor").val(), "date": `${date.getFullYear()}.${date.getMonth()}.${date.getDay()}  ` +
                `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        }),
        success: function (response) {
            window.location.replace("../");
        },
        error: function (error) {
            alert("Error = " + error.toString());
        }
    });
}