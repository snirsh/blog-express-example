const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const app = express();
app.use(express.json());

// Our simple data store
let posts = [];

// Swagger options
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Simple Blog API',
            version: '1.0.0',
        },
    },
    apis: ['./index.js'], // Path to the API docs
};

const specs = swaggerJsdoc(options);

app.use('/api', swaggerUi.serve, swaggerUi.setup(specs));

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Returns the list of all the posts
 *     responses:
 *       200:
 *         description: The list of the posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   content:
 *                     type: string
 */
app.get('/posts', (req, res) => {
    res.json(posts);
});

/**
 * @swagger
 * /posts/title:
 *   get:
 *     summary: Returns a post by its title
 *     parameters:
 *       - in: query
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 *       404:
 *         description: The post was not found
 */
app.get('/posts/title', (req, res) => {
    const title = req.query.title;
    const post = posts.find(post => post.title === title);

    if (!post) return res.status(404).json({ message: 'Post not found' });

    res.json(post);
});

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: The post was created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 */
app.post('/posts', (req, res) => {
    const newPost = {
        id: posts.length + 1, // Id depends on the number of posts created
        title: req.body.title,
        content: req.body.content
    };
    posts.push(newPost);
    res.status(201).json(newPost);
});

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Update an existing post
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: The post was updated
 *       404:
 *         description: The post was not found
 */
app.put('/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(post => post.id === id);

    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.title = req.body.title;
    post.content = req.body.content;

    res.json(post);
});

/**
 * @swagger
 * /posts/{id}:
 *   patch:
 *     summary: Partially update an existing post
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: The post was updated
 *       404:
 *         description: The post was not found
 */
app.patch('/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(post => post.id === id);

    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;

    res.json(post);
});

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Delete a post
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The post was deleted
 *       404:
 *         description: The post was not found
 */
app.delete('/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = posts.findIndex(post => post.id === id);

    if (index === -1) return res.status(404).json({ message: 'Post not found' });

    posts.splice(index, 1);

    res.json({ message: 'Post deleted' });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));

