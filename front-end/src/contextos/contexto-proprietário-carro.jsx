import { createContext, useState } from "react";
const ContextoProprietárioCarro = createContext();
export default ContextoProprietárioCarro;
export function ProvedorProprietárioCarro({ children }) {
const [interesseConsultado, setInteresseConsultado] = useState({});
const [propostaConsultada, setPropostaConsultada] = useState({});
const [propostaSelecionada, setPropostaSelecionada] = useState({});
const [propostaInteresse, setPropostaInteresse] = useState({});
return (
<ContextoProprietárioCarro.Provider value={{
 interesseConsultado, setInteresseConsultado, propostaConsultada, setPropostaConsultada, 
 propostaSelecionada, setPropostaSelecionada, propostaInteresse, setPropostaInteresse
 }}>{children}</ContextoProprietárioCarro.Provider>
 );
}