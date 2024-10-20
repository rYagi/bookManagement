import { Book } from './models/Book.js';
import { InventoryEvent } from './models/InventoryEvent.js';
import { InventoryManager } from './services/InventoryManager.js';

// Initialize the inventory manager
const inventoryManager = new InventoryManager();

// Add some books
inventoryManager.addBook(new Book('9780123456789', 'The Great Gatsby', 10));
inventoryManager.addBook(new Book('9780987654321', 'To Kill a Mockingbird', 15));

// Simulate some inventory events
const events = [
  new InventoryEvent('9780123456789', new Date('2023-05-01T10:00:00'), 1, 5),  // Inbound
  new InventoryEvent('9780987654321', new Date('2023-05-01T11:00:00'), -1, 2), // Outbound
  new InventoryEvent('9780123456789', new Date('2023-05-02T09:00:00'), -1, 3), // Outbound
  new InventoryEvent('9780987654321', new Date('2023-05-02T14:00:00'), 1, 10), // Inbound
];

// Process events
events.forEach(event => {
  try {
    inventoryManager.addEvent(event);
    console.log(`Event processed: ${event.type > 0 ? 'Inbound' : 'Outbound'} - ISBN: ${event.isbn}, Quantity: ${event.quantity}`);
  } catch (error) {
    console.error(`Error processing event: ${error.message}`);
  }
});

// Generate and print report
console.log('\nCurrent Inventory Report:');
const report = inventoryManager.generateReport();
report.forEach(item => {
  console.log(`ISBN: ${item.isbn}, Title: ${item.title}, Current Stock: ${item.currentStock}`);
});