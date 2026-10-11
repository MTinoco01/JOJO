import servidor from "./servidor";
export function serviçoCadastrarProprietárioCarro(proprietáriocarro) { return servidor.post("/proprietariocarros", proprietáriocarro); };
export function serviçoAtualizarProprietárioCarro(proprietáriocarro) { return servidor.patch("/proprietariocarros", proprietáriocarro); };
export function serviçoBuscarProprietárioCarro(cpf) { return servidor.get(`/proprietariocarros/${cpf}`); };
export function serviçoCadastrarAluguelVaga(aluguel_vaga) {
    return servidor.post("/proprietariocarros/alugueis", aluguel_vaga); };
export function serviçoRemoverAluguelVaga(id) { return servidor.delete(`/proprietariocarros/alugueis/${id}`); };
export function serviçoBuscarAluguéisVagaProprietárioCarro(cpf) {
    return servidor.get(`/proprietariocarros/alugueis/proprietario-carro/${cpf}`); };
export function serviçoBuscarVagasEstacionamento() { return servidor.get("/proprietariocarros/alugueis/vagas"); };