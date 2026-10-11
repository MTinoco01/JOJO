import { createContext, useState } from "react";
const ContextoProprietárioCarro = createContext();
export default ContextoProprietárioCarro;
export function ProvedorProprietárioCarro({ children }) {
    const [aluguelConsultado, setAluguelConsultado] = useState({});
    const [vagaConsultada, setVagaConsultada] = useState({});
    const [vagaSelecionada, setVagaSelecionada] = useState({});
    const [vagaAluguel, setVagaAluguel] = useState({});
    return (
        <ContextoProprietárioCarro.Provider value={{
            aluguelConsultado, setAluguelConsultado, vagaConsultada, setVagaConsultada,
            vagaSelecionada, setVagaSelecionada, vagaAluguel, setVagaAluguel
        }}>{children}</ContextoProprietárioCarro.Provider>
    );
}
