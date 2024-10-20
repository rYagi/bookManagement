import { v4 as uuidv4 } from 'uuid';

export class InventoryManager {
  constructor() {
    this.books = new Map();
    this.events = [];
  }

  addBook(book) {
    this.books.set(book.isbn, book);
  }

  addEvent(event) {
    this.events.push(event);
    this.updateInventory(event);
  }

  updateInventory(event) {
    const book = this.books.get(event.isbn);
    if (!book) {
      throw new Error(`Book with ISBN ${event.isbn} not found.`);
    }

    const deltaStock = event.type * event.quantity;
    const newStock = book.stock + deltaStock;

    if (newStock < 0) {
      throw new Error(`Inventory for book ${book.title} (ISBN: ${book.isbn}) would become negative.`);
    }

    book.stock = newStock;
  }

  getBookStock(isbn) {
    const book = this.books.get(isbn);
    return book ? book.stock : null;
  }

  generateReport() {
    const report = [];
    for (const [isbn, book] of this.books) {
      report.push({
        isbn: isbn,
        title: book.title,
        currentStock: book.stock
      });
    }
    return report;
  }
}