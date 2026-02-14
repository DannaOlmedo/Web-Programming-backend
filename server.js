const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

// Middleware para que los controladores puedan usar io
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(cors());
app.use(express.json());

// Conexión MongoDB
const DEV_DB = "mongodb://localhost:27017";
const DB_URL = (process.env.DB_URL || DEV_DB);
mongoose.connect(DB_URL)
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.log("Error MongoDB -----------------:", err));

// Importar rutas
const reporteRoutes = require("./routes/reporte.routes");

app.use("/api/reportes", reporteRoutes);

// WebSocket
io.on("connection", (socket) => {
  console.log("Usuario conectado");
});

const PORT = 8080;

server.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});
