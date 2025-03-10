import e from "express";
import { Router } from "express";
import Book from "../models/book.model.js";

const router = Router();

//Middleware
const getBook = async (req, res, next) => {
  let book;
  const { id } = req.params;

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(404).json({ msg: "Id no válido" });
  }

  try {
    book = Book.findById(id);
    if (!book) return res.status(404).json({ msg: "El libro no se encontró" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }

  res.book = book;
  next();
};

//Obtener todos los libros
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    if (books.length <= 0) return res.status(204).json([]);
    return res(books);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
});

//Crear un nuevo libro
router.post("/", async (req, res) => {
  const { title, author, genre, pub_date } = req?.body;
  if ((!title, !author, !genre, !pub_date)) {
    return res.status(400).json({ msg: "Todos los campos son obligatorios" });
  }

  const book = new Book({
    title,
    author,
    genre,
    pub_date,
  });

  try {
    const newBook = await book.save();
    console.log(newBook);
    return res.status(201).json({ newBook });
  } catch (error) {
    return res.status(400).json({
      msg: error.message,
    });
  }
});

export default router;
