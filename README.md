
# Admin Store – Tes Technical

Aplikasi admin sederhana untuk mengelola produk, stok, dan pembelian.
Dibuat menggunakan Node.js, Express, EJS, dan MySQL.

## 🚀 Fitur
- Daftar produk & stok
- Input pembelian produk
- Cancel pembelian (stok otomatis kembali)
- Riwayat pembelian
- UI admin dashboard sederhana

## 🛠️ Teknologi
- Node.js
- Express.js
- EJS
- MySQL
- CSS (Custom)

## 📦 Cara Install & Menjalankan

### 1. Clone Repository
### 2. Setup Database (MySQL)
sql

CREATE DATABASE admin_store;
USE admin_store;

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  price INT
);

CREATE TABLE product_stock (
  product_id INT,
  stock INT
);

CREATE TABLE purchases (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT,
  quantity INT,
  total_price INT,
  status ENUM('ACTIVE','CANCELED') DEFAULT 'ACTIVE',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

### 3. Konfigurasi Database
Edit file db.js sesuai dengan konfigurasi MySQL lokal.

### 4. Jalankan aplikasi
node app.js
## Buka browser
http://localhost:3000

```bash
git clone https://github.com/Malikdew/admin-store.git
cd admin-store


