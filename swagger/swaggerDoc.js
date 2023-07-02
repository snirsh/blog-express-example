/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Returns the list of all posts
 *     responses:
 *       200:
 *         description: The list of the posts
 */

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
 *       404:
 *         description: The post was not found
 */

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
 */

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
