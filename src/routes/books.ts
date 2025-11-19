import { Router, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

type Book = {
  id: string;
  title: string;
  author: string;
  year: number;
  pages: number;
  finished: boolean;
};

const router = Router();

// In-memory "database"
let books: Book[] = [
  {
    id: uuidv4(),
    title: "Clean Code",
    author: "Robert C. Martin",
    year: 2008,
    pages: 464,
    finished: true,
  },
  {
    id: uuidv4(),
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt, David Thomas",
    year: 1999,
    pages: 352,
    finished: false,
  },
];

// GET /api/books
router.get("/", (_req: Request, res: Response) => {
  res.json(books);
});

// GET /api/books/:id
router.get("/:id", (req: Request, res: Response) => {
  const book = books.find((b) => b.id === req.params.id);
  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }
  res.json(book);
});

// POST /api/books
router.post("/", (req: Request, res: Response) => {
  const { title, author, year, pages } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: "title and author are required" });
  }

  const newBook: Book = {
    id: uuidv4(),
    title: String(title),
    author: String(author),
    year: Number(year) || new Date().getFullYear(),
    pages: Number(pages) || 0,
    finished: false,
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

// PATCH /api/books/:id
router.patch("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const bookIndex = books.findIndex((b) => b.id === id);
  if (bookIndex === -1) {
    return res.status(404).json({ error: "Book not found" });
  }

  const existing = books[bookIndex];
  const updated: Book = {
    ...existing,
    ...req.body,
    year: req.body.year !== undefined ? Number(req.body.year) : existing.year,
    pages: req.body.pages !== undefined ? Number(req.body.pages) : existing.pages,
  };

  books[bookIndex] = updated;
  res.json(updated);
});

// DELETE /api/books/:id
router.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const before = books.length;
  books = books.filter((b) => b.id !== id);
  if (books.length === before) {
    return res.status(404).json({ error: "Book not found" });
  }
  res.status(204).send();
});

export const booksRouter = router;
