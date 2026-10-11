import { Router } from "express";
import verificarToken from "../middlewares/verificar-token";
import verificarPerfilProprietárioEstacionamento from "../middlewares/verificar-perfil-proprietário-estacionamento";
import ServiçosProprietárioEstacionamento from "../serviços/serviços-proprietário-estacionamento";
const RotasProprietárioEstacionamento = Router();
export default RotasProprietárioEstacionamento;
RotasProprietárioEstacionamento.post("/", ServiçosProprietárioEstacionamento.cadastrarProprietário_Estacionamento);
RotasProprietárioEstacionamento.get("/:cpf", verificarToken, verificarPerfilProprietárioEstacionamento,
    ServiçosProprietárioEstacionamento.buscarProprietárioEstacionamento);
RotasProprietárioEstacionamento.patch("/", verificarToken, verificarPerfilProprietárioEstacionamento,
    ServiçosProprietárioEstacionamento.atualizarProprietárioEstacionamento);
RotasProprietárioEstacionamento.post("/propostas", verificarToken, verificarPerfilProprietárioEstacionamento, 
  ServiçosProprietárioEstacionamento.cadastrarProposta);
RotasProprietárioEstacionamento.patch("/propostas", verificarToken, verificarPerfilProprietárioEstacionamento, 
  ServiçosProprietárioEstacionamento.alterarProposta);
RotasProprietárioEstacionamento.delete("/propostas/:id", verificarToken, verificarPerfilProprietárioEstacionamento, 
  ServiçosProprietárioEstacionamento.removerProposta);
RotasProprietárioEstacionamento.get("/propostas/proprietárioestacionamento/:cpf", verificarToken, verificarPerfilProprietárioEstacionamento, 
  verificarErroConteúdoToken, ServiçosProprietárioEstacionamento.buscarPropostasProprietárioEstacionamento);
RotasProprietárioEstacionamento.get("/propostas/areas", verificarToken, verificarPerfilProprietárioEstacionamento, 
  ServiçosProprietárioEstacionamento.buscarÁreasAtuaçãoPropostas);