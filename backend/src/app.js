const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');
const { connectDB, getDB } = require('./config/db');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

async function startServer() {
  await connectDB();
  const db = getDB();
  const COLLECTION_NAME = 'products';

  // Pobieranie wszystkich produktów
  app.get('/products', async (req, res) => {
    console.log('Żądanie GET /products');
    try {
      const products = await db.collection(COLLECTION_NAME).find().toArray();
      console.log('Pobrane produkty:', products);
      res.json(products);
    } catch (err) {
      console.error('Błąd pobierania produktów:', err);
      res.status(500).json({ error: 'Wystąpił błąd serwera.' });
    }
  });

  // Dodawanie nowego produktu
  app.post('/products', async (req, res) => {
    console.log('Żądanie POST /products, dane:', req.body);
    const { name, quantity, price, shop } = req.body;
    if (!name || !quantity || !price || !shop) {
      return res.status(400).json({ error: 'Brakujące dane produktu.' });
    }
    try {
      const result = await db.collection(COLLECTION_NAME).insertOne({
        name,
        quantity,
        price,
        shop,
      });
      console.log('Produkt dodany, ID:', result.insertedId);
      res.json({ id: result.insertedId, name, quantity, price, shop });
    } catch (err) {
      console.error('Błąd dodawania produktu:', err);
      res.status(500).json({ error: 'Wystąpił błąd serwera.' });
    }
  });

  // Usuwanie produktu
  app.delete('/products/:id', async (req, res) => {
    console.log('Żądanie DELETE /products/:id, ID:', req.params.id);
    const { id } = req.params;
    try {
      await db.collection(COLLECTION_NAME).deleteOne({
        _id: new ObjectId(id),
      });
      console.log('Produkt usunięty, ID:', id);
      res.json({ message: 'Produkt usunięty.' });
    } catch (err) {
      console.error('Błąd usuwania produktu:', err);
      res.status(500).json({ error: 'Wystąpił błąd serwera.' });
    }
  });

  // Aktualizacja produktu
  app.put('/products/:id', async (req, res) => {
    console.log('Żądanie PUT /products/:id, ID:', req.params.id, 'dane:', req.body);
    const { id } = req.params;
    const { name, quantity, price, shop } = req.body;
    try {
      await db.collection(COLLECTION_NAME).updateOne(
        { _id: new ObjectId(id) },
        { $set: { name, quantity, price, shop } }
      );
      console.log('Produkt zaktualizowany, ID:', id);
      res.json({ message: 'Produkt zaktualizowany.' });
    } catch (err) {
      console.error('Błąd aktualizacji produktu:', err);
      res.status(500).json({ error: 'Wystąpił błąd serwera.' });
    }
  });

  app.listen(port, () => {
    console.log(`Serwer działa na porcie ${port}`);
  });
}

startServer();