import { createContext, useState } from "react";
const ContextoProprietárioEstacionamento = createContext();
export default ContextoProprietárioEstacionamento;
export function ProvedorProprietárioEstacionamento({ children }) {
    const [vagaConsultada, setVagaConsultada] = useState({});
    return (
        <ContextoProprietárioEstacionamento.Provider value={{ vagaConsultada, setVagaConsultada
        }}>{children}</ContextoProprietárioEstacionamento.Provider>
    );
}
