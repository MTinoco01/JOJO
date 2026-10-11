import { createContext, useState } from "react";
const ContextoProprietárioEstacionamento = createContext();
export default ContextoProprietárioEstacionamento;
export function ProvedorProprietárioEstacionamento({ children }) {
const [vagaEstacionamentoConsultada, setVagaEstacionamentoConsultada] = useState({});
return (
<ContextoProprietárioEstacionamento.Provider value={{ vagaEstacionamentoConsultada, setVagaEstacionamentoConsultada
 }}>{children}</ContextoProprietárioEstacionamento.Provider>
 );
}