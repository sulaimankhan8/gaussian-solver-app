const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS Middleware (if necessary)
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// Route to handle POST request for Gaussian elimination
app.post('/api/solve', (req, res) => {
  const { a1, b1, c1, i, a2, b2, c2, j, a3, b3, c3, k, error } = req.body;

  let x = 0;
  let y = 0;
  let z = 0;
  let x5 = 0;
  let y5 = 0;
  let z5 = 0;

  while (true) {
    x = (i - b1 * y - c1 * z) / a1;
    y = (j - c2 * z - a2 * x) / b2;
    z = (k - a3 * x - b3 * y) / c3;

    if (Math.abs(x / x5 - error) < error + 1 && 
        Math.abs(y / y5 - error) < error + 1 && 
        Math.abs(z / z5 - error) < error + 1) {
      res.json({
        x: x,
        y: y,
        z: z
      });
      return;
    }

    x5 = x;
    y5 = y;
    z5 = z;
  }
});

// Error handler for invalid routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
