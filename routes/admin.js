const express = require('express');
const router = express.Router();
const db = require('../db');

// List produk
router.get('/', (req, res) => {
  db.query(`
    SELECT p.*, s.stock FROM products p
    JOIN product_stock s ON p.id = s.product_id
  `, (err, products) => {
    res.render('products', { products });
  });
});

// Form pembelian
router.get('/purchase/:id', (req, res) => {
  db.query('SELECT * FROM products WHERE id=?', [req.params.id], (err, product) => {
    res.render('purchase', { product: product[0] });
  });
});

// Simpan pembelian
router.post('/purchase', (req, res) => {
  const { product_id, quantity } = req.body;

  db.query('SELECT price FROM products WHERE id=?', [product_id], (err, result) => {
    const total = result[0].price * quantity;

    db.query(`
      INSERT INTO purchases (product_id, quantity, total_price)
      VALUES (?, ?, ?)
    `, [product_id, quantity, total]);

    db.query(`
      UPDATE product_stock SET stock = stock - ?
      WHERE product_id = ?
    `, [quantity, product_id]);

    res.redirect('/purchases');
  });
});

// List pembelian
router.get('/purchases', (req, res) => {
  db.query(`
    SELECT pu.*, pr.name FROM purchases pu
    JOIN products pr ON pu.product_id = pr.id
  `, (err, purchases) => {
    res.render('purchases', { purchases });
  });
});

// Cancel pembelian
router.get('/cancel/:id', (req, res) => {
  db.query('SELECT * FROM purchases WHERE id=?', [req.params.id], (err, p) => {
    if (p[0].status === 'ACTIVE') {
      db.query('UPDATE purchases SET status="CANCELED" WHERE id=?', [req.params.id]);
      db.query('UPDATE product_stock SET stock = stock + ? WHERE product_id=?',
        [p[0].quantity, p[0].product_id]
      );
    }
    res.redirect('/purchases');
  });
});

module.exports = router;
