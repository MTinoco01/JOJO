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
RotasProprietárioEstacionamento.post("/vagas_estacionamento", verificarToken, verificarPerfilProprietárioEstacionamento,
  ServiçosProprietárioEstacionamento.cadastrarVagaEstacionamento);
RotasProprietárioEstacionamento.patch("/vagas_estacionamento", verificarToken, verificarPerfilProprietárioEstacionamento,
  ServiçosProprietárioEstacionamento.alterarVagaEstacionamento);
RotasProprietárioEstacionamento.delete("/vagas_estacionamento/:id", verificarToken, verificarPerfilProprietárioEstacionamento,
  ServiçosProprietárioEstacionamento.removerVagaEstacionamento);
RotasProprietárioEstacionamento.get("/vagas_estacionamento/proprietario_estacionamento/:cpf", verificarToken,
  verificarPerfilProprietárioEstacionamento, verificarErroConteúdoToken,
  ServiçosProprietárioEstacionamento.buscarVagasEstacionamentoProprietárioEstacionamento);
RotasProprietárioEstacionamento.get("/vagas_estacionamento/lugares", verificarToken, verificarPerfilProprietárioEstacionamento,
  ServiçosProprietárioEstacionamento.buscarLugaresVagasEstacionamento);