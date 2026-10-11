import { Router } from "express";
import verificarToken from "../middlewares/verificar-token";
import verificarPerfilProprietárioCarro from "../middlewares/verificar-perfil-proprietário-carro";
import verificarErroConteúdoToken from "../middlewares/verificar-erro-conteúdo-token";
import ServiçosProprietárioCarro from "../serviços/serviços-proprietário-carro";
const RotasProprietárioCarro = Router();
export default RotasProprietárioCarro;
RotasProprietárioCarro.post("/", ServiçosProprietárioCarro.cadastrarProprietárioCarro);
RotasProprietárioCarro.patch("/", verificarToken, verificarPerfilProprietárioCarro, ServiçosProprietárioCarro.atualizarProprietárioCarro);
RotasProprietárioCarro.get("/:cpf", verificarToken, verificarPerfilProprietárioCarro, ServiçosProprietárioCarro.buscarProprietárioCarro);
RotasProprietárioCarro.post("/alugueis_vagas/", verificarToken, verificarPerfilProprietárioCarro,
  ServiçosProprietárioCarro.cadastrarAluguelVaga);
RotasProprietárioCarro.delete("/alugueis_vagas/:id", verificarToken, verificarPerfilProprietárioCarro,
  ServiçosProprietárioCarro.removerAluguelVaga);
RotasProprietárioCarro.get("/alugueis_vagas/proprietario_carro/:cpf", verificarToken, verificarPerfilProprietárioCarro,
  verificarErroConteúdoToken, ServiçosProprietárioCarro.buscarAlugueisVagasProprietárioCarro);
RotasProprietárioCarro.get("/alugueis_vagas/vagas_estacionamento/", verificarToken, verificarPerfilProprietárioCarro,
  ServiçosProprietárioCarro.buscarVagasEstacionamento);