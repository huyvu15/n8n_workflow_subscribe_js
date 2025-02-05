const htmlContent = $input.first().json.data
function extractArticleContent(html) {
    const startTag = '<article';
    const endTag = '</article>';

    const startIndex = html.indexOf(startTag);
    const endIndex = html.indexOf(endTag, startIndex);

    if (startIndex !== -1 && endIndex !== -1) {
        const articleContent = html.substring(startIndex, endIndex + endTag.length);

        // Trích xuất hình ảnh
        const imageRegex = /<img[^>]+src="([^">]+)"/g;
        const images = [];
        let match;
        while ((match = imageRegex.exec(articleContent)) !== null) {
            let imageUrl = match[1];
            if (!imageUrl.startsWith('http')) {
                // Thêm tiền tố nếu link ảnh không đầy đủ
                imageUrl = `https://huyvu15.github.io/${imageUrl.replace(/^\/+/, '')}`;
            }
            images.push(imageUrl);
        }

        // Xóa thẻ HTML để lấy nội dung thuần
        const textContent = articleContent.replace(/<[^>]+>/g, '').trim();

        return { text: textContent, images };
    } else {
        throw new Error("Không tìm thấy thẻ <article>");
    }
}

try {
    const result = extractArticleContent(htmlContent);

    return [
        {
            json: {
                html: htmlContent,
                text: result.text,
                images: result.images,
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
