import servidor from "./servidor";
export function serviçoCadastrarProprietárioCarro(proprietáriocarro) { return servidor.post("/proprietariocarros", proprietáriocarro); };
export function serviçoAtualizarProprietárioCarro(proprietáriocarro) { return servidor.patch("/proprietariocarros", proprietáriocarro); };
export function serviçoBuscarProprietárioCarro(cpf) { return servidor.get(`/proprietariocarros/${cpf}`); };
export function serviçoCadastrarInteresse(aluguelvaga) {
return servidor.post("/proprietariocarros/alugueisvagas", aluguelvaga); };
export function serviçoRemoverInteresse(id) { return servidor.delete(`/proprietariocarros/alugueisvagas/${id}`); };
export function serviçoBuscarInteressesProprietárioCarro(cpf) {
  return servidor.get(`/proprietariocarros/alugueisvagas/proprietariocarro/${cpf}`); };
export function serviçoBuscarPropostas() { return servidor.get("/proprietariocarros/alugueisvagas/vagasestacionamento"); };