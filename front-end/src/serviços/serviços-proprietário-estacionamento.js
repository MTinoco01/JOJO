import servidor from "./servidor";
export function serviçoCadastrarProprietárioEstacionamento(proprietário_estacionamento)
{ return servidor.post("/proprietarios_estacionamento", proprietário_estacionamento); };
export function serviçoBuscarProprietárioEstacionamento(cpf) { return servidor.get(`/proprietarios_estacionamento/${cpf}`); }
export function serviçoAtualizarProprietárioEstacionamento(proprietárioestacionamento)
{ return servidor.patch("/proprietarios_estacionamento", proprietárioestacionamento); };
export function serviçoCadastrarVagaEstacionamento(vaga_estacionamento) {
return servidor.post("/proprietarios_estacionamento/vagas_estacionamento", vaga_estacionamento); };
export function serviçoAlterarVagaEstacionamento(vaga_estacionamento) {
  return servidor.patch("/proprietarios_estacionamento/vagas_estacionamento", vaga_estacionamento); };
export function serviçoRemoverVagaEstacionamento(id) {
  return servidor.delete(`/proprietarios_estacionamento/vagas_estacionamento/${id}`); };
export function serviçoBuscarVagasEstacionamentoProprietárioEstacionamento(cpf) {
  return servidor.get(`/proprietarios_estacionamento/vagas_estacionamento/proprietario_estacionamento/${cpf}`); };
export function serviçoBuscarLugaresVagasEstacionamento() {
  return servidor.get("/proprietarios_estacionamento/vagas_estacionamento/lugares"); };