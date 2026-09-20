import { Route, BrowserRouter, Routes } from "react-router-dom";
import RotasUsuárioLogado from "./rotas-usuário-logado";
import LogarUsuário from "../páginas/usuário/logar-usuário";
import CadastrarUsuário from "../páginas/usuário/cadastrar-usuário";
import RecuperarAcesso from "../páginas/usuário/recuperar-acesso";
import CadastrarProprietarioCarro from "../páginas/proprietário-carro/cadastrar-proprietário-carro";
import PáginaInicial from "../páginas/usuário/página-inicial";
import CadastrarProprietário_Estacionamento from "../páginas/proprietário-estacionamento/cadastrar-proprietário-estacionamento";
export default function RotasAplicação() {
    return (
        <BrowserRouter>
           <Routes>
                <Route element={<LogarUsuário />} path="/" />
                <Route element={<CadastrarUsuário />} path="criar-usuario" />
                <Route element={<RecuperarAcesso />} path="recuperar-acesso" />
                <Route element={<RotasUsuárioLogado />}>
                    <Route element={<PáginaInicial />} path="pagina-inicial" />
                    <Route element={<CadastrarUsuário />} path="atualizar-usuario" />
                    <Route element={<CadastrarProprietário_Estacionamento />} path="cadastrar-proprietário-estacionamento" />
                    <Route element={<CadastrarProprietarioCarro />} path="cadastrar-proprietário-carro" />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};