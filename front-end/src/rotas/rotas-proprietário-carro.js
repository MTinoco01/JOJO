import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import ContextoUsuário from "../contextos/contexto-usuário";
export default function RotasProprietárioCarro() {
    const { usuárioLogado } = useContext(ContextoUsuário);
    if (usuárioLogado.perfil === "proprietário_carro") return <Outlet />
    else return <Navigate to="/" />;
}
