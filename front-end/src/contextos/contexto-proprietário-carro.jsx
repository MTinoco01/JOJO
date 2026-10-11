import { createContext, useState } from "react";
const ContextoProprietárioCarro = createContext();
export default ContextoProprietárioCarro;
export function ProvedorProprietárioCarro({ children }) {
const [aluguelVagaConsultado, setAluguelVagaConsultado] = useState({});
const [vagaEstacionamentoConsultada, setVagaEstacionamentoConsultada] = useState({});
const [vagaEstacionamentoSelecionada, setVagaEstacionamentoSelecionada] = useState({});
const [vagaEstacionamentoAluguelVaga, setVagaEstacionamentoAluguelVaga] = useState({});
return (
<ContextoProprietárioCarro.Provider value={{
 aluguelVagaConsultado, setAluguelVagaConsultado, vagaEstacionamentoConsultada, setVagaEstacionamentoConsultada,
 vagaEstacionamentoSelecionada, setVagaEstacionamentoSelecionada,
 vagaEstacionamentoAluguelVaga, setVagaEstacionamentoAluguelVaga
 }}>{children}</ContextoProprietárioCarro.Provider>
 );
}