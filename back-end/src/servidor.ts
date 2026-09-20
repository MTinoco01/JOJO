import RotasProprietárioCarro from "./rotas/rotas-proprietario-carro";
import cors from "cors";
import express from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import RotasUsuário from "./rotas/rotas-usuario";
import RotasProprietárioEstacionamento from "./rotas/rotas-proprietario-estacionamento";
const app = express();
const PORT = process.env.PORT
const CORS_ORIGIN = process.env.CORS_ORIGIN;
app.use(express.json());
app.use(cors({ origin: CORS_ORIGIN }));
app.use("/proprietariocarros", RotasProprietárioCarro);
app.use("/usuarios", RotasUsuário);
app.use("/proprietarios_estacionamento", RotasProprietárioEstacionamento);
app.listen(PORT || 3333);
const conexão = createConnection();
export default conexão;