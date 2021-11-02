import express, { Application } from "express";
import db from "./config";
import cors from "cors";
import furnitureRoutes from "../routes/furnitures.route";

class Server {
  private app: Application;
  private port: string;
  private paths = {
    furniture: "/api/furniture",
  };

  constructor() {
    this.app = express();

    this.port = process.env.PORT || "8080";

    this.connectDB();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());

    this.app.use(express.json());

    this.app.use(express.static("public"));
  }

  async connectDB() {
    try {
      await db();
      console.log("Database online");
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  routes() {
    this.app.use(this.paths.furniture, furnitureRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("server running at port:  " + this.port);
    });
  }
}

export default Server;
