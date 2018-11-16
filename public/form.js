function writeArticles(sortField, sortOrder, page, limit, includeDeps)
{
    $.post("../api/articles/readall", JSON.stringify({
        "sortField": sortField,
        "sortOrder": sortOrder,
        "page": page,
        "limit": limit,
        "includeDeps": includeDeps
    }), (err, msg, data) =>
    {
        data = data.responseJSON;
        msgItems = data.items;
        $("#articleList").html("");
        msgItems.forEach((article) =>{
            let commentHTML = '<div id="comments">\n';
            if(article.comments != undefined){
                let commentArr = Array.from(article.comments);
                commentArr.forEach((comment) =>	{
                    commentHTML += `<div class="comment-text">${comment.text}</div>\n
        						<div class="comment-date">Дата: ${comment.date}</div>\n
        						<div class="comment-author">Автор: ${comment.author}</div>\n
        						<br>\n`;
                });
            }
            commentHTML += "</div>"
            let articleHTML = '<div class="article-with-comments">' +
                '<div class="article">' +
                `<h2 class=\"title\"><center>${article.title}<center></h2><br>\n` +
                `        <h3 class=\"text\">${article.text}</h3><br></div>`+
                "        <div class=\"date-author\">\n" +
                `            <h4 align="left">Дата изменения: ${article.date}</h4>\n` +
                `            <h4 align="right">Автор: ${article.author}</h4>\n` +
                "        </div><h5>Комментарии:</h5>\n" + commentHTML + "</div>";
            $("#articleList").append(articleHTML);
        });
    });
}
function createList()
{
    let change = $('#sortBy option:selected').text();
    let sort = $('#sortType option:selected').text();
    let count = document.getElementsByName('pages')[0].value;
    writeArticles( change, sort, count.toString(), '5', 'true');
}

function createArticle() {
    const date = new Date();
    console.log('hhh');
    $.post('../api/articles/create', JSON.stringify({
            'title':$('#articleTitle').val(),
            'text': $('#articleText').val(),
            'author': $('#articleAuthor').val(),
            'date': `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`
        }), (err, msg, data) => {
            window.location.replace('../');
        }
    );
}