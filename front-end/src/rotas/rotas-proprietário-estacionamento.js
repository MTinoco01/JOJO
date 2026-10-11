import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import ContextoUsuário from "../contextos/contexto-usuário";
export default function RotasProprietárioEstacionamento() {
    const { usuárioLogado } = useContext(ContextoUsuário);
    if (usuárioLogado.perfil === "proprietário_estacionamento") return <Outlet />
    else return <Navigate to="/" />;
}
