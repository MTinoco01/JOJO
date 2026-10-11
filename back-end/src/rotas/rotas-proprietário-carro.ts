import { Router } from "express";
import verificarToken from "../middlewares/verificar-token";
import verificarPerfilProprietárioCarro from "../middlewares/verificar-perfil-proprietário-carro";
import ServiçosProprietárioCarro from "../serviços/serviços-proprietário-carro";
const RotasProprietárioCarro = Router();
export default RotasProprietárioCarro;
RotasProprietárioCarro.post("/", ServiçosProprietárioCarro.cadastrarProprietárioCarro);
RotasProprietárioCarro.patch("/", verificarToken, verificarPerfilProprietárioCarro, ServiçosProprietárioCarro.atualizarProprietárioCarro);
RotasProprietárioCarro.get("/:cpf", verificarToken, verificarPerfilProprietárioCarro, ServiçosProprietárioCarro.buscarProprietárioCarro);
RotasProprietárioCarro.post("/alugueisvagas/", verificarToken, verificarPerfilProprietárioCarro, 
  ServiçosProprietárioCarro.cadastrarInteresse);
RotasProprietárioCarro.delete("/alugueisvagas/:id", verificarToken, verificarPerfilProprietárioCarro, 
  ServiçosProprietárioCarro.removerInteresse);
RotasProprietárioCarro.get("/alugueisvagas/proprietáriocarro/:cpf", verificarToken, verificarPerfilProprietárioCarro, 
  verificarErroConteúdoToken, ServiçosProprietárioCarro.buscarInteressesProprietárioCarro);
RotasProprietárioCarro.get("/alugueisvagas/vagas-estacionamentos/", verificarToken, verificarPerfilProprietárioCarro,     
  ServiçosProprietárioCarro.buscarPropostas);