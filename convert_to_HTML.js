const htmlContent = $input.first().json.data;

function processArticle(html) {
   const startTag = '<article';
   const endTag = '</article>';
   const startIndex = html.indexOf(startTag);
   const endIndex = html.indexOf(endTag, startIndex);
   if (startIndex !== -1 && endIndex !== -1) {
       let articleContent = html.substring(startIndex, endIndex + endTag.length);
       
       // Xóa các ký tự xuống dòng
       articleContent = articleContent.replace(/\n/g, '');
       
       // Xử lý thẻ <img>
       articleContent = articleContent.replace(/<img([^>]+)>/g, (match, attributes) => {
           let srcMatch = attributes.match(/src="([^"]*)"/);
           let lazySrcMatch = attributes.match(/data-lazy-src="([^"]*)"/);
           let src = lazySrcMatch ? lazySrcMatch[1] : (srcMatch ? srcMatch[1] : null);
           
           if (src) {
               if (!src.startsWith('http')) {
                   src = src.startsWith('//') 
                       ? `https:${src}` 
                       : `https://huyvu15.github.io/${src.replace(/^\/+/, '')}`;
               }
               
               return `<img src="${src}" loading="lazy" ${attributes.replace(/src="[^"]*"/, '').replace(/data-lazy-src="[^"]*"/, '').trim()}>`;
           }
           
           return match;
       });
       return articleContent;
   } else {
       throw new Error("Không tìm thấy thẻ <article>");
   }
}
try {
   const articleHtml = processArticle(htmlContent);
   return [
       {
           json: {
               html: articleHtml,
           },
       },
   ];
} catch (error) {
   return [
       {
           json: {
               error: error.message,
           },
       },
   ];
}