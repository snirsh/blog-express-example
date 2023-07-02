let posts = [];

const getPosts = () => {
    return posts;
};

const getPostById = (id) => {
    return posts.find(post => post.id === id);
};

const getPostByTitle = (title) => {
    return posts.find(post => post.title === title);
};

const addPost = (newPost) => {
    newPost.id = posts.length + 1;
    posts.push(newPost);
    return newPost;
};

const updatePost = (id, updatedPost) => {
    const index = posts.findIndex(post => post.id === id);
    if (index === -1) return null;
    posts[index] = { id, ...updatedPost };
    return posts[index];
};

const deletePost = (id) => {
    const index = posts.findIndex(post => post.id === id);
    if (index === -1) return null;
    posts.splice(index, 1);
    return id;
};

module.exports = {
    getPosts,
    getPostById,
    getPostByTitle,
    addPost,
    updatePost,
    deletePost,
};
