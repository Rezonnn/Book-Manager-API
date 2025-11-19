import express, { Request, Response } from "express";
import cors from "cors";
import { booksRouter } from "./routes/books";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    message: "Books API (TypeScript) is running",
    endpoints: ["/api/books"],
  });
});

app.use("/api/books", booksRouter);

app.listen(PORT, () => {
  console.log(`📚 Books API server listening on http://localhost:${PORT}`);
});
