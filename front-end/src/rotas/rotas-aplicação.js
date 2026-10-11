import { Route, BrowserRouter, Routes } from "react-router-dom";
import RotasUsuárioLogado from "./rotas-usuário-logado";
import LogarUsuário from "../páginas/usuário/logar-usuário";
import CadastrarUsuário from "../páginas/usuário/cadastrar-usuário";
import RecuperarAcesso from "../páginas/usuário/recuperar-acesso";
import CadastrarProprietarioCarro from "../páginas/proprietário-carro/cadastrar-proprietário-carro";
import PáginaInicial from "../páginas/usuário/página-inicial";
import CadastrarProprietárioEstacionamento from "../páginas/proprietário-estacionamento/cadastrar-proprietário-estacionamento";
import { ProvedorProprietárioEstacionamento } from "../contextos/contexto-proprietário-estacionamento";
import { ProvedorProprietárioCarro } from "../contextos/contexto-proprietário-carro";
import RotasProprietárioEstacionamento from "./rotas-proprietário-estacionamento";
import RotasProprietárioCarro from "./rotas-proprietário-carro";
import AdministrarVagasEstacionamento from "../páginas/proprietário-estacionamento/administrar-vagas-estacionamento";
import CadastrarVagaEstacionamento from "../páginas/proprietário-estacionamento/cadastrar-vaga-estacionamento";
import AdministrarAlugueisVagas from "../páginas/proprietário-carro/administrar-alugueis-vagas";
import CadastrarAluguelVaga from "../páginas/proprietário-carro/cadastrar-aluguel-vaga";
import PesquisarVagasEstacionamento from "../páginas/proprietário-carro/pesquisar-vagas-estacionamento";
import ConsultarVagaEstacionamento from "../páginas/proprietário-carro/consultar-vaga-estacionamento";
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
                    <Route element={<ProvedorProprietárioEstacionamento><RotasProprietárioEstacionamento/></ProvedorProprietárioEstacionamento>}>
                        <Route element={<CadastrarProprietárioEstacionamento/>} path="cadastrar-proprietário-estacionamento"/>
                        <Route element={<AdministrarVagasEstacionamento/>} path="administrar-vagas-estacionamento"/>
                        <Route element={<CadastrarVagaEstacionamento/>} path="cadastrar-vaga-estacionamento"/>
                    </Route>
                    <Route element={<ProvedorProprietárioCarro><RotasProprietárioCarro/></ProvedorProprietárioCarro>}>
                        <Route element={<CadastrarProprietarioCarro/>} path="cadastrar-proprietário-carro"/>
                        <Route element={<AdministrarAlugueisVagas/>} path="administrar-alugueis-vagas"/>
                        <Route element={<CadastrarAluguelVaga/>} path="cadastrar-aluguel-vaga"/>
                        <Route element={<PesquisarVagasEstacionamento/>} path="pesquisar-vagas-estacionamento"/>
                        <Route element={<ConsultarVagaEstacionamento/>} path="consultar-vaga-estacionamento"/>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};