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
RotasProprietárioCarro.post("/alugueisvagas/", verificarToken, verificarPerfilProprietárioCarro,
  ServiçosProprietárioCarro.cadastrarAluguelVaga);
RotasProprietárioCarro.delete("/alugueisvagas/:id", verificarToken, verificarPerfilProprietárioCarro,
  ServiçosProprietárioCarro.removerAluguelVaga);
RotasProprietárioCarro.get("/alugueisvagas/proprietariocarro/:cpf", verificarToken, verificarPerfilProprietárioCarro,
  verificarErroConteúdoToken, ServiçosProprietárioCarro.buscarAlugueisVagasProprietárioCarro);
RotasProprietárioCarro.get("/alugueisvagas/vagasestacionamento/", verificarToken, verificarPerfilProprietárioCarro,
  ServiçosProprietárioCarro.buscarVagasEstacionamento);