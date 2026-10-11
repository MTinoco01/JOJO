import { createContext, useState } from "react";
const ContextoProprietárioEstacionamento = createContext();
export default ContextoProprietárioEstacionamento;
export function ProvedorProfessor({ children }) {
const [propostaConsultada, setPropostaConsultada] = useState({});
return (
<ContextoProprietárioEstacionamento.Provider value={{ propostaConsultada, setPropostaConsultada
 }}>{children}</ContextoProprietárioEstacionamento.Provider>
 );
}