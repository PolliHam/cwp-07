function writeArticles(sortField, sortOrder, page, limit, includeDeps)
{
    $.post("http://127.0.0.1:3000/api/articles/readall", JSON.stringify({
        "sortField": sortField,
        "sortOrder": sortOrder,
        "page": page,
        "limit": limit,
        "includeDeps": includeDeps
    }), (err, msg, data) =>
    {
        data = data.responseJSON;
        msgItems = data.items;
        msgItems.forEach((article) =>{
            let commentHTML = '<div id="comments">\n';
            if(article.comments != undefined){
                let commentArr = Array.from(article.comments);
                commentArr.forEach((comment) =>	{
                    commentHTML += `<div class="comment-text">${comment.text}</div>\n
        						<div class="comment-date">${comment.date}</div>\n
        						<div class="comment-author">${comment.author}</div>\n
        						<div class="comment-articleid" style="display: none">${comment.articleId}</div>\n`;
                });
            }
            commentHTML += "</div>"
            let articleHTML = '<div class="article-with-comments">' +
                '<div class="article">' +
                `<h2 class=\"title\">${article.title}</h2>\n` +
                "        <div class=\"date-author\">\n" +
                `            <div class=\"date\">${article.date}</div>\n` +
                `            <div class=\"author\">${article.author}</div>\n` +
                "        </div>\n" +
                `        <textarea class=\"articleId\" style="display: none">${article.id}</textarea>` +
                `        <div class=\"text\">${article.text}</div></div>` + commentHTML + "</div>";
            $("#articleList").append(articleHTML);
        });
    });
}
function createList()
{

}