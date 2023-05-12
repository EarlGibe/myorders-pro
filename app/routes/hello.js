/**
 * @swagger
 * /hello:
 *   get:
 *     description: Returns a hello message
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: hello message
 */
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Hello, world!' });
});

module.exports = router;
