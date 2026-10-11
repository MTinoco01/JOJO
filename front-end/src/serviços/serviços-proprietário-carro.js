import servidor from "./servidor";
export function serviçoCadastrarProprietárioCarro(proprietáriocarro) { return servidor.post("/proprietariocarros", proprietáriocarro); };
export function serviçoAtualizarProprietárioCarro(proprietáriocarro) { return servidor.patch("/proprietariocarros", proprietáriocarro); };
export function serviçoBuscarProprietárioCarro(cpf) { return servidor.get(`/proprietariocarros/${cpf}`); };
export function serviçoCadastrarAluguelVaga(aluguel_vaga) {
return servidor.post("/proprietariocarros/alugueisvagas", aluguel_vaga); };
export function serviçoRemoverAluguelVaga(id) { return servidor.delete(`/proprietariocarros/alugueisvagas/${id}`); };
export function serviçoBuscarAlugueisVagasProprietárioCarro(cpf) {
  return servidor.get(`/proprietariocarros/alugueisvagas/proprietariocarro/${cpf}`); };
export function serviçoBuscarVagasEstacionamento() { return servidor.get("/proprietariocarros/alugueisvagas/vagasestacionamento"); };