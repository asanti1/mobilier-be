import cors from 'cors';
import express, { Application } from 'express';

import furnitureRoutes from '../furniture/controller/furnitures.controller';
import { errorHandlerMiddleware } from '../middlewares/errorHandler.middlewares';
import saleRoutes from '../sale/controller/sales.controller';
import userRoutes from '../user/controller/users.controller';
import db from './config';

class Server {
  private app: Application;
  private port: string;
  private paths = {
    furniture: "/api/furniture",
    user: "/api/user",
    sale: "/api/sale",
  };

  constructor() {
    this.app = express();

    this.port = process.env.PORT || "8080";

    this.connectDB();
    this.middlewares();
    this.routes();
    this.errorHandler();
  }

  middlewares() {
    this.app.use(cors());

    this.app.use(express.json());

    this.app.use(express.static("public"));
  }

  errorHandler() {
    errorHandlerMiddleware(this.app);
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
    this.app.use(this.paths.user, userRoutes);
    this.app.use(this.paths.sale, saleRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("server running at port:  " + this.port);
    });
  }
}

export default Server;
