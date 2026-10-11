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
RotasProprietárioCarro.post("/alugueis/", verificarToken, verificarPerfilProprietárioCarro,
    ServiçosProprietárioCarro.cadastrarAluguelVaga);
RotasProprietárioCarro.delete("/alugueis/:id", verificarToken, verificarPerfilProprietárioCarro,
    ServiçosProprietárioCarro.removerAluguelVaga);
RotasProprietárioCarro.get("/alugueis/proprietario-carro/:cpf", verificarToken, verificarPerfilProprietárioCarro,
    verificarErroConteúdoToken, ServiçosProprietárioCarro.buscarAluguéisVagaProprietárioCarro);
RotasProprietárioCarro.get("/alugueis/vagas/", verificarToken, verificarPerfilProprietárioCarro,
    ServiçosProprietárioCarro.buscarVagasEstacionamento);