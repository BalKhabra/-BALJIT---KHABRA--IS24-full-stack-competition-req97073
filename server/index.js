const express = require('express');
const jsonServer = require('json-server');
const app = express();
const cors = require('cors');
const swaggerJsDoc = require ('swagger-jsdoc');
const swaggerUi = require ("swagger-ui-express");

app.use(cors())
//json-server middleware
app.use('/api', jsonServer.router('db.json'));

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "CRUD Application",
      description: "Product list application",
      contact: {
        name: "Baljit Khabra"
      },
      servers: ["http://localhost:5000"]
    }
  },
  // ['.routes/*.js']
  apis: ["index.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
/**
 * @swagger
 * /api/users:
 *  get:
 *    description: Use to request all user products
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get('/api/users', (req, res) => {
    // Get all users from the database
    const db = jsonServer.router('db.json');
    const users = db.db.get('users').value();
      res.json(users);
  });

/**
 * @swagger
 * /api/users:
 *  post:
 *    description: Create a user product
 *    responses:
 *      '201':
 *        description: A successful response
 */
// Create a new user endpoint
app.post('/api/users', (req, res) => {
    const { name, owner, developers, scrumMaster, date, methodology } = req.body;
      const id = Date.now();
      const db = jsonServer.router('db.json');
    db.db.get('users').push({ id, name, owner, developers, scrumMaster, date, methodology }).write();
      res.json({ id, name, owner, developers, scrumMaster, date, methodology});
  });

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the project to update
 *     responses:
 *       "202":
 *         description: Project updated successfully
 *       "404":
 *         description: Project not found
 *       "500":
 *         description: Internal server error
 */


    // Update user endpoint
app.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
      const { name, owner, developers, scrumMaster, date, methodology } = req.body;
    const db = jsonServer.router('db.json');
    db.db.get('users').find({ id: parseInt(id) }).assign({ id, name, owner, developers, scrumMaster, date, methodology}).write();
  
    res.json({ id, name, owner, developers, scrumMaster, date, methodology});
  });

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the project to delete
 *     responses:
 *       "203":
 *         description: Project deleted successfully
 *       "404":
 *         description: Project not found
 *       "500":
 *         description: Internal server error
 */

  // Delete user endpoint
app.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
  
    const db = jsonServer.router('db.json');
    db.db.get('users').remove({ id: parseInt(id) }).write();
  
    res.send('User Deleted Successfully');

  });

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(3000, () => {
  console.log("server is listening on port 3k");
});