function writeArticles(sortField, sortOrder, page, limit, includeDeps)
{
    $.post(" http://127.0.0.1:3000/api/article/readall", JSON.stringify({
        "sortField": sortField,
        "sortOrder": sortOrder,
        "page": page,
        "limit": limit,
        "includeDeps": includeDeps
    }), (err, msg, data) =>
    {
        console.log(sortField, sortOrder, page, limit, includeDeps);
        data = data.responseJSON;
        let msgMeta = data.meta;
        let msgItems = data.items;
        const clearBoby = document.body.innerHTML;
        for (let i = 0; i < msgItems.length; i++)
        {
            document.body.innerHTML += "<div class=\"article\">"
                + `<h1>${msgItems[i].title}</h1><br>`
                + `${msgItems[i].text}<br>`
                + `<h4 align="left">Дата изменения: ${(new Date(msgItems[i].date)).toDateString()}</h4><br>`
                + `<h4 align="right">Автор: ${msgItems[i].author}</h4>`
                + "</div>";
        }
        //document.body.innerHTML = clearBoby;
    });
}