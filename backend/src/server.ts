import http from "http";
import app from "./app";
import { Server as SocketServer } from "socket.io";
import { ICreateProduct, IProduct } from "@workspace/shared";
import { products } from "./products";

const server = http.createServer(app);

const io = new SocketServer(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
  allowEIO3: true,
});

io.on("connect", (socket) => {
  socket.on("newProduct", (product: ICreateProduct) => {
    const id = Math.floor(Math.random() * 1000);
    const newProduct: IProduct = { ...product, id };
    products.push(newProduct);
    io.emit("onNewProduct", newProduct);
  });
});

server.listen(3333, () => {
  console.log("Server is running on http://localhost:3333");
});
