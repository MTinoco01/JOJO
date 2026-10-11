import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import ContextoUsuário from "../../contextos/contexto-usuário";
import ContextoProprietárioCarro from "../../contextos/contexto-proprietário-carro";
import { serviçoCadastrarAluguelVaga, serviçoRemoverAluguelVaga } from "../../serviços/serviços-proprietário-carro";
import mostrarToast from "../../utilitários/mostrar-toast";
import { MostrarMensagemErro, checarListaVazia, validarCamposObrigatórios }
    from "../../utilitários/validações";
import { estilizarBotão, estilizarBotãoRetornar, estilizarBotãoRemover, estilizarCard,
    estilizarDivCampo, estilizarDivider, estilizarFlex, estilizarInlineFlex,
    estilizarInputText, estilizarInputTextarea, estilizarLabel } from "../../utilitários/estilos";
export default function CadastrarAluguelVaga() {
    const referênciaToast = useRef(null);
    const { usuárioLogado } = useContext(ContextoUsuário);
    const { aluguelConsultado, vagaSelecionada } = useContext(ContextoProprietárioCarro);
    const [dados, setDados] = useState({ id_vaga_estacionamento: vagaSelecionada?.id || "",
        justificativa: aluguelConsultado?.justificativa || "" });
    const [erros, setErros] = useState({});
    const navegar = useNavigate();
    function alterarEstado(event) {
        const chave = event.target.name || event.value;
        let valor = event.target.value || event.checked;
        setDados({ ...dados, [chave]: valor });
    };
    function validarCampos() {
        const { id_vaga_estacionamento, justificativa } = dados;
        let errosCamposObrigatórios = validarCamposObrigatórios({ id_vaga_estacionamento, justificativa });
        setErros(errosCamposObrigatórios);
        return checarListaVazia(errosCamposObrigatórios);
    };
    function vagaLabel() {
        if (aluguelConsultado?.vaga_estacionamento || vagaSelecionada)
            return "Vaga Selecionada*:";
        else return "Selecione uma Vaga*:";
    };
    function pesquisarVagas() { navegar("../pesquisar-vagas-estacionamento"); };
    function retornarAdministrarAluguéis() { navegar("../administrar-alugueis-vaga"); };
    async function cadastrarAluguel() {
        if (validarCampos()) {
            try {
                await serviçoCadastrarAluguelVaga({ ...dados, cpf: usuárioLogado.cpf });
                mostrarToast(referênciaToast, "Aluguel cadastrado com sucesso!", "sucesso");
            } catch (error) { mostrarToast(referênciaToast, error.response.data.erro, "erro"); }
        }
    };
    async function removerAluguel() {
        try {
            await serviçoRemoverAluguelVaga(aluguelConsultado.id);
            mostrarToast(referênciaToast, "Aluguel removido com sucesso!", "sucesso");
        } catch (error) { mostrarToast(referênciaToast, error.response.data.erro, "erro"); }
    };
    function BotõesAções() {
        if (aluguelConsultado) {
            return (
                <div className={estilizarInlineFlex()}>
                    <Button className={estilizarBotãoRetornar()} label="Retornar"
                        onClick={retornarAdministrarAluguéis}/>
                    <Button className={estilizarBotãoRemover()} label="Remover" onClick={removerAluguel}/>
                </div>
            );
        } else {
            return (
                <div className={estilizarInlineFlex()}>
                    <Button className={estilizarBotãoRetornar()} label="Retornar"
                        onClick={retornarAdministrarAluguéis}/>
                    <Button className={estilizarBotão()} label="Cadastrar" onClick={cadastrarAluguel}/>
                </div>
            );
        }
    };
    function títuloFormulário() {
        if (aluguelConsultado) return "Remover Aluguel";
        else return "Cadastrar Aluguel";
    };
    function VagaInputText() {
        if (vagaSelecionada?.endereço) {
            return <InputText name="endereço_vaga"
                className={estilizarInputText(erros.endereço_vaga, 400, usuárioLogado.cor_tema)}
                value={vagaSelecionada?.endereço} disabled/>
        } else if (aluguelConsultado?.vaga_estacionamento?.endereço) {
            return <InputText name="endereço_vaga"
                className={estilizarInputText(erros.endereço_vaga, 400, usuárioLogado.cor_tema)}
                value={aluguelConsultado?.vaga_estacionamento?.endereço} disabled/>
        } else return null;
    };
    function BotãoSelecionar() {
        if (!vagaSelecionada && !aluguelConsultado) {
            return <Button className={estilizarBotão()} label="Selecionar" onClick={pesquisarVagas}/>
        } else if (vagaSelecionada) {
            return <Button className={estilizarBotão()} label="Substituir" onClick={pesquisarVagas}/>;
        } else return null;
    };
    return (
        <div className={estilizarFlex()}>
            <Toast ref={referênciaToast} onHide={retornarAdministrarAluguéis} position="bottom-center"/>
            <Card title={títuloFormulário()} className={estilizarCard(usuárioLogado.cor_tema)}>
                <div className={estilizarDivCampo()}>
                    <label className={estilizarLabel(usuárioLogado.cor_tema)}>{vagaLabel()}</label>
                    <BotãoSelecionar/>
                    <VagaInputText/>
                    <MostrarMensagemErro mensagem={erros.id_vaga_estacionamento}/>
                </div>
                <div className={estilizarDivCampo()}>
                    <label className={estilizarLabel(usuárioLogado.cor_tema)}>Justificativa*:</label>
                    <InputTextarea name="justificativa" value={dados.justificativa}
                        className={estilizarInputTextarea(erros.justificativa, usuárioLogado.cor_tema)}
                        onChange={alterarEstado} autoResize cols={40}/>
                    <MostrarMensagemErro mensagem={erros.justificativa}/>
                </div>
                <Divider className={estilizarDivider()}/>
                <BotõesAções/>
            </Card>
        </div>
    );
}
