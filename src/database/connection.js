import mongoose from 'mongoose';
import env from 'dotenv';
env.config();

const conection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("👍 Conectado correctamente a la BD");
  } catch (error) {
    console.log(error);
    throw new Error("❌ No se pudo conectar a la BD");
  }
};

export default conection;