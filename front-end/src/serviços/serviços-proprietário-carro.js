import servidor from "./servidor";
export function serviçoCadastrarProprietárioCarro(proprietáriocarro) { return servidor.post("/proprietariocarros", proprietáriocarro); };
export function serviçoAtualizarProprietárioCarro(proprietáriocarro) { return servidor.patch("/proprietariocarros", proprietáriocarro); };
export function serviçoBuscarProprietárioCarro(cpf) { return servidor.get(`/proprietariocarros/${cpf}`); };
export function serviçoCadastrarAluguelVaga(aluguel_vaga) {
return servidor.post("/proprietariocarros/alugueis_vagas", aluguel_vaga); };
export function serviçoRemoverAluguelVaga(id) { return servidor.delete(`/proprietariocarros/alugueis_vagas/${id}`); };
export function serviçoBuscarAlugueisVagasProprietárioCarro(cpf) {
  return servidor.get(`/proprietariocarros/alugueis_vagas/proprietario_carro/${cpf}`); };
export function serviçoBuscarVagasEstacionamento() { return servidor.get("/proprietariocarros/alugueis_vagas/vagas_estacionamento"); };