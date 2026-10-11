import { Router } from "express";
import verificarToken from "../middlewares/verificar-token";
import verificarPerfilProprietárioEstacionamento from "../middlewares/verificar-perfil-proprietário-estacionamento";
import verificarErroConteúdoToken from "../middlewares/verificar-erro-conteúdo-token";
import ServiçosProprietárioEstacionamento from "../serviços/serviços-proprietário-estacionamento";
const RotasProprietárioEstacionamento = Router();
export default RotasProprietárioEstacionamento;
RotasProprietárioEstacionamento.post("/", ServiçosProprietárioEstacionamento.cadastrarProprietárioEstacionamento);
RotasProprietárioEstacionamento.get("/:cpf", verificarToken, verificarPerfilProprietárioEstacionamento,
    ServiçosProprietárioEstacionamento.buscarProprietárioEstacionamento);
RotasProprietárioEstacionamento.patch("/", verificarToken, verificarPerfilProprietárioEstacionamento,
    ServiçosProprietárioEstacionamento.atualizarProprietárioEstacionamento);
RotasProprietárioEstacionamento.post("/vagasestacionamento", verificarToken, verificarPerfilProprietárioEstacionamento,
  ServiçosProprietárioEstacionamento.cadastrarVagaEstacionamento);
RotasProprietárioEstacionamento.patch("/vagasestacionamento", verificarToken, verificarPerfilProprietárioEstacionamento,
  ServiçosProprietárioEstacionamento.alterarVagaEstacionamento);
RotasProprietárioEstacionamento.delete("/vagasestacionamento/:id", verificarToken, verificarPerfilProprietárioEstacionamento,
  ServiçosProprietárioEstacionamento.removerVagaEstacionamento);
RotasProprietárioEstacionamento.get("/vagasestacionamento/proprietario_estacionamento/:cpf", verificarToken,
  verificarPerfilProprietárioEstacionamento, verificarErroConteúdoToken,
  ServiçosProprietárioEstacionamento.buscarVagasEstacionamentoProprietárioEstacionamento);
RotasProprietárioEstacionamento.get("/vagasestacionamento/lugares", verificarToken, verificarPerfilProprietárioEstacionamento,
  ServiçosProprietárioEstacionamento.buscarLugaresVagasEstacionamento);