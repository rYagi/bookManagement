export class InventoryEvent {
  constructor(isbn, time, type, quantity) {
    this.isbn = isbn;
    this.time = time;
    this.type = type; // 1 for inbound, -1 for outbound
    this.quantity = quantity;
  }
}