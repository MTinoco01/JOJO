import servidor from "./servidor";
export function serviçoCadastrarProprietárioEstacionamento(proprietário_estacionamento)
{ return servidor.post("/proprietarios_estacionamento", proprietário_estacionamento); };
export function serviçoBuscarProprietárioEstacionamento(cpf) { return servidor.get(`/proprietarios_estacionamento/${cpf}`); }
export function serviçoAtualizarProprietárioEstacionamento(proprietárioestacionamento)
{ return servidor.patch("/proprietarios_estacionamento", proprietárioestacionamento); };
export function serviçoCadastrarProposta(proposta) { 
return servidor.post("/proprietarios_estacionamento/propostas", proposta); };
export function serviçoAlterarProposta(proposta) {
  return servidor.patch("/proprietarios_estacionamento/propostas", proposta); };
export function serviçoRemoverProposta(id) {
  return servidor.delete(`/proprietarios_estacionamento/propostas/${id}`); };
export function serviçoBuscarPropostasProprietárioEstacionamento(cpf) {
  return servidor.get(`/proprietarios_estacionamento/propostas/proprietario_estacionamento/${cpf}`); };
export function serviçoBuscarÁreasAtuaçãoPropostas() {
  return servidor.get("/proprietarios_estacionamento/propostas/areas"); };