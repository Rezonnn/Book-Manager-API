# 📚 Books API – TypeScript REST Backend

A small but solid **Node.js + TypeScript REST API** for managing a list of books.

This project is great for your GitHub to showcase **backend skills**:

- TypeScript
- Express REST API
- Basic CRUD operations
- In-memory data store
- Simple HTTP tests

---

## ✨ Features

- `GET /` – health check + basic info  
- `GET /api/books` – list all books  
- `GET /api/books/:id` – get one book by id  
- `POST /api/books` – create a new book  
- `PATCH /api/books/:id` – update a book (partial update)  
- `DELETE /api/books/:id` – delete a book  

Books have:

```ts
{
  id: string;
  title: string;
  author: string;
  year: number;
  pages: number;
  finished: boolean;
}
```

Data is stored in memory for simplicity (no database), which is perfect for a portfolio demo.

---

## 🧱 Tech Stack

- **Node.js**
- **TypeScript**
- **Express**
- **UUID** for id generation

---

## ▶️ Setup & Run

1. Install dependencies:

```bash
npm install
```

2. Build the TypeScript code:

```bash
npm run build
```

3. Start the server:

```bash
npm start
```

The API will be running at:

```text
http://localhost:4000
```

Try:

```bash
curl http://localhost:4000/
curl http://localhost:4000/api/books
```

---

## 🧪 Run in dev mode

To run with auto-reload while developing:

```bash
npm run dev
```

(This uses `ts-node-dev`.)

---

## 🧪 Basic HTTP Tests

There is a simple test script in `tests/test.ts` that:

- Calls the root endpoint
- Lists books
- Creates a book
- Updates it
- Deletes it

To run the tests:

1. Make sure the server is running (in another terminal):

```bash
npm run dev
# or
npm start
```

2. Build the project (so the tests are compiled):

```bash
npm run build
```

3. Run the tests:

```bash
node dist/tests/test.js
```

---

## 📂 Project Structure

```text
typescript_books_api/
├─ package.json
├─ tsconfig.json
├─ README.md
├─ src/
│  ├─ index.ts        # App entry point, server setup
│  └─ routes/
│     └─ books.ts     # Books router & in-memory data store
└─ tests/
   └─ test.ts         # Basic HTTP tests using Node's http module
```

---

## 🌟 Why this is a good portfolio project

This repo shows that you can:

- Use **TypeScript** on the backend
- Design and implement a small **REST API**
- Handle JSON requests & responses
- Organize code into routers and modules
- Write and run simple integration tests

You can extend it later with:

- A real database (PostgreSQL, MongoDB, etc.)
- Authentication
- Pagination & filtering
- Swagger / OpenAPI docs
