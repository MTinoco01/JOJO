import { ProvedorProfessor } from "../contextos/contexto-proprietário-estacionamento";
import { ProvedorAluno } from "../contextos/contexto-proprietário-carro";
import RotasProfessor from "./rotas-proprietário-estacionamento"
import RotasAluno from "./rotas-proprietário-carro"
import AdministrarPropostas from "../páginas/proprietário-estacionamento/administrar-propostas";
import CadastrarProposta from "../páginas/proprietário-estacionamento/cadastrar-proposta";
import AdministrarInteresses from "../páginas/proprietário-carro/administrar-interesses";
import CadastrarInteresse from "../páginas/proprietário-carro/cadastrar-interesse";
import PesquisarPropostas from "../páginas/proprietário-carro/pesquisar-propostas";
import ConsultarProposta from "../páginas/proprietário-carro/consultar-proposta";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import RotasUsuárioLogado from "./rotas-usuário-logado";
import LogarUsuário from "../páginas/usuário/logar-usuário";
import CadastrarUsuário from "../páginas/usuário/cadastrar-usuário";
import RecuperarAcesso from "../páginas/usuário/recuperar-acesso";
<Route element={<ProvedorProprietárioEstacionamento><RotasProprietárioEstacionamento/></ProvedorProprietárioEstacionamento>}>
            <Route element={<CadastrarProprietárioEstacionamento/>} path="cadastrar-proprietário-estacionamento"/>
            <Route element={<AdministrarPropostas/>} path="administrar-propostas"/>
            <Route element={<CadastrarProposta/>} path="cadastrar-proposta"/>
          </Route>
import PáginaInicial from "../páginas/usuário/página-inicial";
<Route element={<ProvedorProprietarioCarro><RotasProprietarioCarro/></ProvedorProprietarioCarro>}>
            <Route element={<CadastrarProprietarioCarro/>} path="cadastrar-proprietário-carro"/>
            <Route element={<AdministrarInteresses/>} path="administrar-interesses"/>
            <Route element={<CadastrarInteresse/>} path="cadastrar-interesse"/>
            <Route element={<PesquisarPropostas/>} path="pesquisar-propostas"/>
            <Route element={<ConsultarProposta/>} path="consultar-proposta"/>
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