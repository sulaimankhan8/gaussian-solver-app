const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const { a1, b1, c1, i, a2, b2, c2, j, a3, b3, c3, k, error } = req.body;

    let x = 0, y = 0, z = 0;
    let x5 = 0, y5 = 0, z5 = 0;

    function gauss(x, y, z, a1, b1, c1, a2, b2, c2, a3, b3, c3, x5, y5, z5, error, i, j, k) {
        while (true) {
            x = (i - b1 * y - c1 * z) / a1;
            y = (j - c2 * z - a2 * x) / b2;
            z = (k - a3 * x - b3 * y) / c3;

            if (Math.abs(x / x5 - error) < error + 1 && Math.abs(y / y5 - error) < error + 1 && Math.abs(z / z5 - error) < error + 1) {
                return { x, y, z };
            }
            x5 = x;
            y5 = y;
            z5 = z;
        }
    }

    const results = gauss(x, y, z, a1, b1, c1, a2, b2, c2, a3, b3, c3, x5, y5, z5, error, i, j, k);
    res.json(results);
});

module.exports = router;
