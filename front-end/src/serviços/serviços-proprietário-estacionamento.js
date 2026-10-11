import servidor from "./servidor";
export function serviçoCadastrarProprietárioEstacionamento(proprietário_estacionamento)
{ return servidor.post("/proprietarios_estacionamento", proprietário_estacionamento); };
export function serviçoBuscarProprietárioEstacionamento(cpf) { return servidor.get(`/proprietarios_estacionamento/${cpf}`); }
export function serviçoAtualizarProprietárioEstacionamento(proprietárioestacionamento)
{ return servidor.patch("/proprietarios_estacionamento", proprietárioestacionamento); };
export function serviçoCadastrarProposta(vagaestacionamento) { 
return servidor.post("/proprietarios_estacionamento/vagasestacionamento", vagaestacionamento); };
export function serviçoAlterarProposta(vagaestacionamento) {
  return servidor.patch("/proprietarios_estacionamento/vagasestacionamento", vagaestacionamento); };
export function serviçoRemoverProposta(id) {
  return servidor.delete(`/proprietarios_estacionamento/vagasestacionamento/${id}`); };
export function serviçoBuscarPropostasProprietárioEstacionamento(cpf) {
  return servidor.get(`/proprietarios_estacionamento/vagasestacionamento/proprietario_estacionamento/${cpf}`); };
export function serviçoBuscarÁreasAtuaçãoPropostas() {
  return servidor.get("/proprietarios_estacionamento/vagasestacionamento/areas"); };