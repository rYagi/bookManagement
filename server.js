import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { Book } from './models/Book.js';
import { InventoryEvent } from './models/InventoryEvent.js';
import { InventoryManager } from './services/InventoryManager.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));

const inventoryManager = new InventoryManager();

// Add some initial books
inventoryManager.addBook(new Book('9780123456789', 'The Great Gatsby', 10));
inventoryManager.addBook(new Book('9780987654321', 'To Kill a Mockingbird', 15));

app.get('/', (req, res) => {
  const report = inventoryManager.generateReport();
  res.render('index', { books: report });
});

app.post('/add-book', (req, res) => {
  const { isbn, title, stock } = req.body;
  inventoryManager.addBook(new Book(isbn, title, parseInt(stock)));
  res.redirect('/');
});

app.post('/add-event', (req, res) => {
  const { isbn, type, quantity } = req.body;
  const event = new InventoryEvent(isbn, new Date(), parseInt(type), parseInt(quantity));
  try {
    inventoryManager.addEvent(event);
    res.redirect('/');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});