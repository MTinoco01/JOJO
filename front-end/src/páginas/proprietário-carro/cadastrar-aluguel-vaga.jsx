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
  const { aluguelVagaConsultado, vagaEstacionamentoSelecionada } = useContext(ContextoProprietárioCarro);
  const [dados, setDados] = useState({ id_vaga_estacionamento: vagaEstacionamentoSelecionada?.id || "",
    justificativa: aluguelVagaConsultado?.justificativa || "" });
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

  function vagaEstacionamentoLabel() {
    if (aluguelVagaConsultado?.vaga_estacionamento || vagaEstacionamentoSelecionada)
       return "Vaga de Estacionamento Selecionada*:";
    else return "Selecione uma Vaga de Estacionamento*:";
  };
  function pesquisarVagasEstacionamento() { navegar("../pesquisar-vagas-estacionamento"); };
  function retornarAdministrarAlugueisVagas() { navegar("../administrar-alugueis-vagas"); };
  async function cadastrarAluguelVaga() {
    if (validarCampos()) {
      try {
        await serviçoCadastrarAluguelVaga({ ...dados, cpf: usuárioLogado.cpf });
        mostrarToast(referênciaToast, "Aluguel de vaga cadastrado com sucesso!", "sucesso");
      } catch (error) { mostrarToast(referênciaToast, error.response?.data?.erro, "erro"); }
    }
  };

  async function removerAluguelVaga() {
    try {
      await serviçoRemoverAluguelVaga(aluguelVagaConsultado.id);
      mostrarToast(referênciaToast, "Aluguel de vaga removido com sucesso!", "sucesso");
    } catch (error) { mostrarToast(referênciaToast, error.response?.data?.erro, "erro"); }
  };
  function BotõesAções() {
    if (aluguelVagaConsultado) {
      return (
        <div className={estilizarInlineFlex()}>
          <Button className={estilizarBotãoRetornar()} label="Retornar"
             onClick={retornarAdministrarAlugueisVagas}/>
          <Button className={estilizarBotãoRemover()} label="Remover" onClick={removerAluguelVaga}/>
        </div>
      );
    } else {
      return (
        <div className={estilizarInlineFlex()}>
          <Button className={estilizarBotãoRetornar()} label="Retornar"
             onClick={retornarAdministrarAlugueisVagas}/>
          <Button className={estilizarBotão()} label="Cadastrar" onClick={cadastrarAluguelVaga}/>
        </div>
      );
    }
  };
  function títuloFormulário() {
    if (aluguelVagaConsultado) return "Remover Aluguel de Vaga";
    else return "Cadastrar Aluguel de Vaga";
  };
  function VagaEstacionamentoInputText() {
    if (vagaEstacionamentoSelecionada?.lugar) {
      return <InputText name="lugar_vaga_estacionamento"
        className={estilizarInputText(erros.lugar_vaga_estacionamento, 400, usuárioLogado.cor_tema)}
        value={vagaEstacionamentoSelecionada?.lugar} disabled/>
    } else if (aluguelVagaConsultado?.vaga_estacionamento?.lugar) {
      return <InputText name="lugar_vaga_estacionamento"
        className={estilizarInputText(erros.lugar_vaga_estacionamento, 400, usuárioLogado.cor_tema)}
        value={aluguelVagaConsultado?.vaga_estacionamento?.lugar} disabled/>
    } else return null;
  };
  function BotãoSelecionar() {
    if (!vagaEstacionamentoSelecionada && !aluguelVagaConsultado) {
      return <Button className={estilizarBotão()} label="Selecionar" onClick={pesquisarVagasEstacionamento}/>
    } else if (vagaEstacionamentoSelecionada) {
      return <Button className={estilizarBotão()} label="Substituir" onClick={pesquisarVagasEstacionamento}/>;
    } else return null;
  };
  return (
    <div className={estilizarFlex()}>
      <Toast ref={referênciaToast} onHide={retornarAdministrarAlugueisVagas} position="bottom-center"/>
      <Card title={títuloFormulário()} className={estilizarCard(usuárioLogado.cor_tema)}>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>{vagaEstacionamentoLabel()}</label>
          <BotãoSelecionar/>
          <VagaEstacionamentoInputText/>
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