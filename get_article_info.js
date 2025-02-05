const html = $input.first().json.data;

// Regex để tìm từng bài viết
const postRegex = /<div class="recent-post-item">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/g;

// Kết quả đầu ra
const posts = [];
let match;

// Lặp qua từng bài viết
while ((match = postRegex.exec(html)) !== null) {
    const postHtml = match[1];

    // Lấy tiêu đề bài viết
    const titleMatch = /<a class="article-title".*?>(.*?)<\/a>/.exec(postHtml);
    const title = titleMatch ? titleMatch[1].trim() : null;

    // Lấy liên kết bài viết
    const linkMatch = /<a class="article-title" href="(.*?)"/.exec(postHtml);
    const link = linkMatch
    ? (linkMatch[1].startsWith("/") ? `https://huyvu15.github.io${linkMatch[1]}` : linkMatch[1].trim())
    : null;

    // Lấy ngày tạo
    const createdDateMatch = /<time class="post-meta-date-created".*?datetime="(.*?)"/.exec(postHtml);
    const createdDate = createdDateMatch ? createdDateMatch[1] : null;

    // Lấy ngày cập nhật
    const updatedDateMatch = /<time class="post-meta-date-updated".*?datetime="(.*?)"/.exec(postHtml);
    const updatedDate = updatedDateMatch ? updatedDateMatch[1] : null;

    // Lấy ảnh đại diện
    const thumbnailMatch = /<img class="post-bg".*?data-lazy-src="(.*?)"/.exec(postHtml);
    const thumbnail = thumbnailMatch ? thumbnailMatch[1].trim() : null;

    // Lấy nội dung
    const contentMatch = /<div class="content">([\s\S]*?)<\/div>/.exec(postHtml);
    const content = contentMatch ? contentMatch[1].trim().replace(/<[^>]*>/g, "") : null;

    // Lấy tags
    const tagsMatch = postHtml.match(/<a class="article-meta__tags".*?>(.*?)<\/a>/g);
    const tags = tagsMatch ? tagsMatch.map(tag => tag.replace(/<[^>]*>/g, "").trim()) : [];

    // Lấy categories
    const categoriesMatch = postHtml.match(/<a class="article-meta__categories".*?>(.*?)<\/a>/g);
    const categories = categoriesMatch ? categoriesMatch.map(category => category.replace(/<[^>]*>/g, "").trim()) : [];

    // Thêm thông tin vào danh sách kết quả
    posts.push({
        title,
        link,
        createdDate,
        updatedDate,
        thumbnail,
        content,
        tags,
        categories,
    });
}

// Trả về kết quả
return {
    json: {
        posts,
    },
};

