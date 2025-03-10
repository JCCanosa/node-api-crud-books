import express from 'express';
import bodyParser from 'body-parser';
import env from 'dotenv';
env.config();

import conection from "./database/connection.js";
import bookRoutes from './routes/book.routes.js';

const app = express();
app.use(bodyParser.json());

//Conexion base de datos
conection();

app.use('/books', bookRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
})