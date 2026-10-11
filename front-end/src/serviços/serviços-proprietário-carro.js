import servidor from "./servidor";
export function serviçoCadastrarProprietárioCarro(proprietáriocarro) { return servidor.post("/proprietariocarros", proprietáriocarro); };
export function serviçoAtualizarProprietárioCarro(proprietáriocarro) { return servidor.patch("/proprietariocarros", proprietáriocarro); };
export function serviçoBuscarProprietárioCarro(cpf) { return servidor.get(`/proprietariocarros/${cpf}`); };
export function serviçoCadastrarInteresse(interesse) {
return servidor.post("/proprietariocarros/interesses", interesse); };
export function serviçoRemoverInteresse(id) { return servidor.delete(`/proprietariocarros/interesses/${id}`); };
export function serviçoBuscarInteressesProprietárioCarro(cpf) {
  return servidor.get(`/proprietariocarros/interesses/proprietariocarro/${cpf}`); };
export function serviçoBuscarPropostas() { return servidor.get("/proprietariocarros/interesses/propostas"); };