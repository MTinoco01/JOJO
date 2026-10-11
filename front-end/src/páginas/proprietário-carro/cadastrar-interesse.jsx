import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Checkbox } from "primereact/checkbox";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import ContextoUsuário from "../../contextos/contexto-usuário";
import ContextoProprietárioCarro from "../../contextos/contexto-proprietário-carro";
import { serviçoCadastrarInteresse, serviçoRemoverInteresse } from "../../serviços/serviços-proprietário-carro";
import mostrarToast from "../../utilitários/mostrar-toast";
import { MostrarMensagemErro, checarListaVazia, validarCamposObrigatórios }
  from "../../utilitários/validações";
import { estilizarBotão, estilizarBotãoRetornar, estilizarBotãoRemover, estilizarCard, 
  estilizarCheckbox, estilizarDivCampo, estilizarDivider, estilizarFlex, estilizarInlineFlex, 
  estilizarInputText, estilizarInputTextarea, estilizarLabel } from "../../utilitários/estilos";
export default function CadastrarInteresse() {
  const referênciaToast = useRef(null);
  const { usuárioLogado } = useContext(ContextoUsuário);
  const { interesseConsultado, propostaSelecionada } = useContext(ContextoProprietárioCarro);
  const [dados, setDados] = useState({ id_proposta: propostaSelecionada?.id || "",
    necessidade_bolsa: interesseConsultado?.necessidade_bolsa || "",
    justificativa: interesseConsultado?.justificativa || "" });
  const [erros, setErros] = useState({});
  const navegar = useNavigate();
  
  function alterarEstado(event) {
    const chave = event.target.name || event.value;
    let valor = event.target.value || event.checked;
    setDados({ ...dados, [chave]: valor });
  };
  function validarCampos() {
    const { justificativa } = dados;
    let errosCamposObrigatórios = validarCamposObrigatórios({ justificativa });
    setErros(errosCamposObrigatórios);
    return checarListaVazia(errosCamposObrigatórios);
  };
 
  function propostaLabel() {
    if (interesseConsultado?.título_proposta || propostaSelecionada)
       return "Vaga de Estacionamento Selecionada*:";
    else return "Selecione uma Vaga de Estacionamento*:";
  };
  function pesquisarPropostas() { navegar("../pesquisar-vagasestacionamento"); };
  function retornarAdministrarInteresses() { navegar("../administrar-alugueisvagas"); };
  async function cadastrarInteresse() {
    if (validarCampos()) {
      try {
        await serviçoCadastrarInteresse({ ...dados, cpf: usuárioLogado.cpf });
        mostrarToast(referênciaToast, "Aluguel da Vaga cadastrado com sucesso!", "sucesso");
      } catch (error) { mostrarToast(referênciaToast, error.response.data.erro, "erro"); }
    }
  };
  
  async function removerInteresse() {
    try {
      await serviçoRemoverInteresse(interesseConsultado.id);
      mostrarToast(referênciaToast, "Aluguel da Vaga removido com sucesso!", "sucesso");
    } catch (error) { mostrarToast(referênciaToast, error.response.data.erro, "erro"); }
  };
  function BotõesAções() {
    if (interesseConsultado) {
      return (
        <div className={estilizarInlineFlex()}>
          <Button className={estilizarBotãoRetornar()} label="Retornar" 
             onClick={retornarAdministrarInteresses}/>
          <Button className={estilizarBotãoRemover()} label="Remover" onClick={removerInteresse}/>
        </div>
      );
    } else {
      return (
        <div className={estilizarInlineFlex()}>
          <Button className={estilizarBotãoRetornar()} label="Retornar" 
             onClick={retornarAdministrarInteresses}/>
          <Button className={estilizarBotão()} label="Cadastrar" onClick={cadastrarInteresse}/>
        </div>
      );
    }
  };
  function títuloFormulário() {
    if (interesseConsultado) return "Remover Aluguel da Vaga";
    else return "Cadastrar Aluguel da Vaga";
  };
  function PropostaInputText() {
    if (propostaSelecionada?.título) {
      return <InputText name="título_proposta"
        className={estilizarInputText(erros.título_proposta, 400, usuárioLogado.cor_tema)}
        value={propostaSelecionada?.título} disabled/>
    } else if (interesseConsultado?.vagaestacionamento?.título) {
      return <InputText name="título_proposta"
        className={estilizarInputText(erros.título_proposta, 400, usuárioLogado.cor_tema)}
        value={interesseConsultado?.vagaestacionamento?.título} disabled/>
    } else return null;
  };
  function BotãoSelecionar() {
    if (!propostaSelecionada && !interesseConsultado) {
      return <Button className={estilizarBotão()} label="Selecionar" onClick={pesquisarPropostas}/>
    } else if (propostaSelecionada) {
      return <Button className={estilizarBotão()} label="Substituir" onClick={pesquisarPropostas}/>;
    } else return null;
  };
  return (
    <div className={estilizarFlex()}>
      <Toast ref={referênciaToast} onHide={retornarAdministrarInteresses} position="bottom-center"/>
      <Card title={títuloFormulário()} className={estilizarCard(usuárioLogado.cor_tema)}>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>{propostaLabel()}</label>
          <BotãoSelecionar/>
          <PropostaInputText/>
          <MostrarMensagemErro mensagem={erros.id}/>
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>Necessidade de Bolsa*:</label>
          <Checkbox name="necessidade_bolsa" checked={dados.necessidade_bolsa}
            className={estilizarCheckbox()} onChange={alterarEstado} autoResize/>
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>Justificativa*:</label>
          <InputTextarea name="justificativa" value={dados.justificativa}
            className={estilizarInputTextarea(erros.descrição, usuárioLogado.cor_tema)} 
            onChange={alterarEstado} autoResize cols={40}/>
          <MostrarMensagemErro mensagem={erros.justificativa}/>
        </div>
        <Divider className={estilizarDivider()}/>
        <BotõesAções/>
      </Card>
    </div>
  );
}