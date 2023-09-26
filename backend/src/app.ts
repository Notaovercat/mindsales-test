import express, { Express, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import { products } from "./products";

const app: Express = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send(products);
});

app.get("/:id", (req: Request, res: Response) => {
  const id = Number(req.params["id"]);

  if (id <= 0) res.status(404).send("Product not found");

  res.send(products.find((prod) => prod.id === id));
});

export default app;
