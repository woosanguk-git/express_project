var sanitizeHtml = require("sanitize-html");

function sanitizeHtmlData(data){
    let sanitizedData = sanitizeHtml(data);
    return sanitizedData;
}

module.exports = sanitizeHtmlData;