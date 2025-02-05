const posts = $json.posts; // Mảng các bài viết
const result = posts.map(post => ({
  json: {
    Title: post.title, // Lấy tiêu đề của mỗi bài viết
    URL: post.link,   // Lấy liên kết của mỗi bài viết (nếu cần)
    Date: post.createdDate // Thêm ngày tạo nếu cần
  }
}));

return result[0];
