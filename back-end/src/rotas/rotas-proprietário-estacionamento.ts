import { Router } from "express";
import verificarToken from "../middlewares/verificar-token";
import verificarPerfilProprietárioEstacionamento from "../middlewares/verificar-perfil-proprietário-estacionamento";
import verificarErroConteúdoToken from "../middlewares/verificar-erro-conteúdo-token";
import ServiçosProprietárioEstacionamento from "../serviços/serviços-proprietário-estacionamento";
const RotasProprietárioEstacionamento = Router();
export default RotasProprietárioEstacionamento;
RotasProprietárioEstacionamento.post("/", ServiçosProprietárioEstacionamento.cadastrarProprietário_Estacionamento);
RotasProprietárioEstacionamento.get("/:cpf", verificarToken, verificarPerfilProprietárioEstacionamento,
    ServiçosProprietárioEstacionamento.buscarProprietárioEstacionamento);
RotasProprietárioEstacionamento.patch("/", verificarToken, verificarPerfilProprietárioEstacionamento,
    ServiçosProprietárioEstacionamento.atualizarProprietárioEstacionamento);
RotasProprietárioEstacionamento.post("/vagas", verificarToken, verificarPerfilProprietárioEstacionamento,
    ServiçosProprietárioEstacionamento.cadastrarVagaEstacionamento);
RotasProprietárioEstacionamento.patch("/vagas", verificarToken, verificarPerfilProprietárioEstacionamento,
    ServiçosProprietárioEstacionamento.alterarVagaEstacionamento);
RotasProprietárioEstacionamento.delete("/vagas/:id", verificarToken, verificarPerfilProprietárioEstacionamento,
    ServiçosProprietárioEstacionamento.removerVagaEstacionamento);
RotasProprietárioEstacionamento.get("/vagas/proprietario-estacionamento/:cpf", verificarToken,
    verificarPerfilProprietárioEstacionamento, verificarErroConteúdoToken,
    ServiçosProprietárioEstacionamento.buscarVagasProprietárioEstacionamento);
RotasProprietárioEstacionamento.get("/vagas/enderecos", verificarToken, verificarPerfilProprietárioEstacionamento,
    ServiçosProprietárioEstacionamento.buscarEndereçosVagasEstacionamento);