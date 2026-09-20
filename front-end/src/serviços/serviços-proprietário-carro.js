import servidor from "./servidor";
export function serviçoCadastrarProprietárioCarro(proprietáriocarro) { return servidor.post("/proprietariocarros", proprietáriocarro); };
export function serviçoAtualizarProprietárioCarro(proprietáriocarro) { return servidor.patch("/proprietariocarros", proprietáriocarro); };
export function serviçoBuscarProprietárioCarro(cpf) { return servidor.get(`/proprietariocarros/${cpf}`); };