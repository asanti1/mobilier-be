import { connect } from "mongoose";
import "dotenv/config";

const db = async () => {
  try {
    await connect(`${process.env.MONGO}`, {
      autoIndex: true,
    });

    console.log("Base de datos online");
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de iniciar la base de datos");
  }
};

export default db;
