import { ProvedorProfessor } from "../contextos/contexto-proprietário-estacionamento";
import { ProvedorAluno } from "../contextos/contexto-proprietário-carro";
import RotasProfessor from "./rotas-proprietário-estacionamento"
import RotasAluno from "./rotas-proprietário-carro"
import AdministrarPropostas from "../páginas/proprietário-estacionamento/administrar-vagasestacionamento";
import CadastrarProposta from "../páginas/proprietário-estacionamento/cadastrar-vagaestacionamento";
import AdministrarInteresses from "../páginas/proprietário-carro/administrar-alugueisvagas";
import CadastrarInteresse from "../páginas/proprietário-carro/cadastrar-aluguelvaga";
import PesquisarPropostas from "../páginas/proprietário-carro/pesquisar-vagaestacionamento";
import ConsultarProposta from "../páginas/proprietário-carro/consultar-vagaestacionamento";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import RotasUsuárioLogado from "./rotas-usuário-logado";
import LogarUsuário from "../páginas/usuário/logar-usuário";
import CadastrarUsuário from "../páginas/usuário/cadastrar-usuário";
import RecuperarAcesso from "../páginas/usuário/recuperar-acesso";
<Route element={<ProvedorProprietárioEstacionamento><RotasProprietárioEstacionamento/></ProvedorProprietárioEstacionamento>}>
            <Route element={<CadastrarProprietárioEstacionamento/>} path="cadastrar-proprietário-estacionamento"/>
            <Route element={<AdministrarPropostas/>} path="administrar-vagaestacionamento"/>
            <Route element={<CadastrarProposta/>} path="cadastrar-vagaestacionamento"/>
          </Route>
import PáginaInicial from "../páginas/usuário/página-inicial";
<Route element={<ProvedorProprietarioCarro><RotasProprietarioCarro/></ProvedorProprietarioCarro>}>
            <Route element={<CadastrarProprietarioCarro/>} path="cadastrar-proprietário-carro"/>
            <Route element={<AdministrarInteresses/>} path="administrar-alugueisvagas"/>
            <Route element={<CadastrarInteresse/>} path="cadastrar-aluguelvaga"/>
            <Route element={<PesquisarPropostas/>} path="pesquisar-vagasestacionamento"/>
            <Route element={<ConsultarProposta/>} path="consultar-vagaestacionamento"/>
          </Route>
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
                    <Route element={<CadastrarProprietárioEstacionamento />} path="cadastrar-proprietário-estacionamento" />
                    <Route element={<CadastrarProprietarioCarro />} path="cadastrar-proprietário-carro" />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};