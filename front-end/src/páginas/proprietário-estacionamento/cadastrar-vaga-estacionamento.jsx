import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import ContextoUsuário from "../../contextos/contexto-usuário";
import ContextoProprietárioEstacionamento from "../../contextos/contexto-proprietário-estacionamento";
import { serviçoAlterarVagaEstacionamento, serviçoCadastrarVagaEstacionamento, serviçoRemoverVagaEstacionamento,
    serviçoBuscarEndereçosVagasEstacionamento } from "../../serviços/serviços-proprietário-estacionamento";
import mostrarToast from "../../utilitários/mostrar-toast";
import { MostrarMensagemErro, checarListaVazia, validarCamposObrigatórios }
    from "../../utilitários/validações";
import { estilizarBotão, estilizarBotãoRemover, estilizarBotãoRetornar, estilizarCard,
    estilizarDivCampo, estilizarDivider, estilizarDropdown, estilizarFlex,
    estilizarInlineFlex, estilizarInputText, estilizarInputTextarea, estilizarLabel }
    from "../../utilitários/estilos";
export default function CadastrarVagaEstacionamento() {
    const referênciaToast = useRef(null);
    const { usuárioLogado } = useContext(ContextoUsuário);
    const { vagaConsultada } = useContext(ContextoProprietárioEstacionamento);
    const [dados, setDados] = useState({ tipo_veículo: vagaConsultada?.tipo_veículo || "",
        endereço: vagaConsultada?.endereço || "",
        data_interesse_vaga: vagaConsultada?.data_interesse_vaga || "",
        descrição: vagaConsultada?.descrição || "",
        status: vagaConsultada?.status || "" });
    const [listaEndereços, setListaEndereços] = useState([]);
    const [erros, setErros] = useState({});
    const navegar = useNavigate();
    const opçõesTipoVeículo = [{ label: "Carro", value: "carro" },
        { label: "Moto", value: "moto" },
        { label: "Caminhão", value: "caminhão" }];
    const opçõesStatus = [{ label: "Disponível", value: "disponível" },
        { label: "Alugada", value: "alugada" }];
    function alterarEstado(event) {
        const chave = event.target.name || event.value;
        let valor = event.target.value || event.checked;
        setDados({ ...dados, [chave]: valor });
    };
    function validarCampos() {
        const { tipo_veículo, endereço, data_interesse_vaga, descrição, status } = dados;
        let errosCamposObrigatórios = validarCamposObrigatórios({ tipo_veículo, endereço,
            data_interesse_vaga, descrição, status });
        setErros(errosCamposObrigatórios);
        return checarListaVazia(errosCamposObrigatórios);
    };
    function retornarAdministrarVagas() { navegar("../administrar-vagas-estacionamento"); };
    async function cadastrarVaga() {
        if (validarCampos()) {
            try {
                await serviçoCadastrarVagaEstacionamento({ ...dados, cpf: usuárioLogado.cpf });
                mostrarToast(referênciaToast, "Vaga cadastrada com sucesso!", "sucesso");
            } catch (error) { mostrarToast(referênciaToast, error.response.data.erro, "error"); }
        }
    };
    async function alterarVaga() {
        if (validarCampos()) {
            try {
                await serviçoAlterarVagaEstacionamento({ ...dados, id: vagaConsultada.id });
                mostrarToast(referênciaToast, "Vaga alterada com sucesso!", "sucesso");
            } catch (error) { mostrarToast(referênciaToast, error.response.data.erro, "error"); }
        }
    };
    async function removerVaga() {
        try {
            await serviçoRemoverVagaEstacionamento(vagaConsultada.id);
            mostrarToast(referênciaToast, "Vaga excluída com sucesso!", "sucesso");
        } catch (error) { mostrarToast(referênciaToast, error.response.data.erro, "error"); }
    };
    function BotõesAções() {
        if (vagaConsultada) {
            return (
                <div className={estilizarInlineFlex()}>
                    <Button className={estilizarBotãoRetornar()} label="Retornar"
                        onClick={retornarAdministrarVagas}/>
                    <Button className={estilizarBotãoRemover()} label="Remover" onClick={removerVaga}/>
                    <Button className={estilizarBotão()} label="Alterar" onClick={alterarVaga}/>
                </div>
            );
        } else {
            return (
                <div className={estilizarInlineFlex()}>
                    <Button className={estilizarBotãoRetornar()} label="Retornar"
                        onClick={retornarAdministrarVagas}/>
                    <Button className={estilizarBotão()} label="Cadastrar" onClick={cadastrarVaga}/>
                </div>
            );
        }
    };
    function títuloFormulário() {
        if (vagaConsultada) return "Alterar Vaga";
        else return "Cadastrar Vaga";
    };
    useEffect(() => {
        async function buscarEndereçosVagasEstacionamento() {
            try {
                const response = await serviçoBuscarEndereçosVagasEstacionamento();
                if (response.data) setListaEndereços(response.data);
            } catch (error) {
                const erro = error.response.data.erro;
                if (erro) mostrarToast(referênciaToast, erro, "error"); }
        }
        buscarEndereçosVagasEstacionamento();
    }, [])
    return (
        <div className={estilizarFlex()}>
            <Toast ref={referênciaToast} onHide={retornarAdministrarVagas} position="bottom-center"/>
            <Card title={títuloFormulário()} className={estilizarCard(usuárioLogado.cor_tema)}>
                <div className={estilizarDivCampo()}>
                    <label className={estilizarLabel(usuárioLogado.cor_tema)}>Tipo de Veículo*:</label>
                    <Dropdown name="tipo_veículo"
                        className={estilizarDropdown(erros.tipo_veículo, usuárioLogado.cor_tema)}
                        value={dados.tipo_veículo} options={opçõesTipoVeículo} onChange={alterarEstado}
                        placeholder="-- Selecione --"/>
                    <MostrarMensagemErro mensagem={erros.tipo_veículo}/>
                </div>
                <div className={estilizarDivCampo()}>
                    <label className={estilizarLabel(usuárioLogado.cor_tema)}>
                        Endereços Cadastrados:</label>
                    <Dropdown name="endereço" placeholder="-- Selecione --" showClear
                        className={estilizarDropdown(erros.endereço, usuárioLogado.cor_tema)} filter
                        options={listaEndereços} onChange={alterarEstado}
                        emptyMessage={"Nenhum endereço cadastrado."}/>
                </div>
                <div className={estilizarDivCampo()}>
                    <label className={estilizarLabel(usuárioLogado.cor_tema)}>Endereço*:</label>
                    <InputText name="endereço"
                        className={estilizarInputText(erros.endereço, 400, usuárioLogado.cor_tema)}
                        value={dados.endereço} onChange={alterarEstado}/>
                    <MostrarMensagemErro mensagem={erros.endereço}/>
                </div>
                <div className={estilizarDivCampo()}>
                    <label className={estilizarLabel(usuárioLogado.cor_tema)}>Data de Interesse da Vaga*:</label>
                    <InputText name="data_interesse_vaga" type="date" value={dados.data_interesse_vaga}
                        className={estilizarInputText(erros.data_interesse_vaga, usuárioLogado.cor_tema)}
                        onChange={alterarEstado}/>
                    <MostrarMensagemErro mensagem={erros.data_interesse_vaga}/>
                </div>
                <div className={estilizarDivCampo()}>
                    <label className={estilizarLabel(usuárioLogado.cor_tema)}>Descrição*:</label>
                    <InputTextarea name="descrição" value={dados.descrição}
                        className={estilizarInputTextarea(erros.descrição, usuárioLogado.cor_tema)}
                        onChange={alterarEstado} autoResize cols={40}/>
                    <MostrarMensagemErro mensagem={erros.descrição}/>
                </div>
                <div className={estilizarDivCampo()}>
                    <label className={estilizarLabel(usuárioLogado.cor_tema)}>Status*:</label>
                    <Dropdown name="status"
                        className={estilizarDropdown(erros.status, usuárioLogado.cor_tema)}
                        value={dados.status} options={opçõesStatus} onChange={alterarEstado}
                        placeholder="-- Selecione --"/>
                    <MostrarMensagemErro mensagem={erros.status}/>
                </div>
                <Divider className={estilizarDivider()}/>
                <BotõesAções/>
            </Card>
        </div>
    );
}
