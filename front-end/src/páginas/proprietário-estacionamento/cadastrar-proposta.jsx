import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Checkbox } from "primereact/checkbox";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import ContextoUsuário from "../../contextos/contexto-usuário";
import ContextoProprietárioEstacionamento from "../../contextos/contexto-proprietário-estacionamento";
import { serviçoAlterarProposta, serviçoCadastrarProposta, serviçoRemoverProposta, 
  serviçoBuscarÁreasAtuaçãoPropostas } from "../../serviços/serviços-proprietário-estacionamento";
import mostrarToast from "../../utilitários/mostrar-toast";
import { MostrarMensagemErro, checarListaVazia, validarCamposObrigatórios }
  from "../../utilitários/validações";
import { estilizarBotão, estilizarBotãoRemover, estilizarBotãoRetornar, estilizarCard, 
  estilizarCheckbox, estilizarDivCampo, estilizarDivider, estilizarDropdown, estilizarFlex, 
  estilizarInlineFlex, estilizarInputText, estilizarInputTextarea, estilizarLabel }
  from "../../utilitários/estilos";
export default function CadastrarProposta() {
  const referênciaToast = useRef(null);
  const { usuárioLogado } = useContext(ContextoUsuário);
  const { propostaConsultada } = useContext(ContextoProprietárioEstacionamento);
  const [dados, setDados] = useState({ título: propostaConsultada?.título || "",
    categoria: propostaConsultada?.categoria || "",
    área_atuação: propostaConsultada?.área_atuação || "",
    data_início: propostaConsultada?.data_início || "",
    descrição: propostaConsultada?.descrição || "",
    concorrendo_bolsa: propostaConsultada?.concorrendo_bolsa || "",
    resultado: propostaConsultada?.resultado || "" });
  const [listaÁreasAtuação, setListaÁreasAtuação] = useState([]);
  const [erros, setErros] = useState({});
  const navegar = useNavigate();
  const opçõesCategoria = [{ label: "Extensão", value: "Extensão" },
    { label: "Iniciação Científica", value: "Iniciação Científica" },
    { label: "TCC", value: "TCC" }];
  const opçõesResultado = [{ label: "Artigo", value: "artigo" },
    { label: "Desenvolvimento", value: "desenvolvimento" },
    { label: "Monografia", value: "monografia" }];
  function alterarEstado(event) {
    const chave = event.target.name || event.value;
    let valor = event.target.value || event.checked;
    setDados({ ...dados, [chave]: valor });
  };
  function validarCampos() {
    const { título, categoria, área_atuação, data_início, descrição } = dados;
    let errosCamposObrigatórios = validarCamposObrigatórios({ título, categoria, área_atuação, 
      data_início, descrição });
    setErros(errosCamposObrigatórios);
    return checarListaVazia(errosCamposObrigatórios);
  };
  function retornarAdministrarPropostas() { navegar("../administrar-vagasestacionamento"); };
  async function cadastrarProposta() {
    if (validarCampos()) {
      try {
        await serviçoCadastrarProposta({ ...dados, cpf: usuárioLogado.cpf });
        mostrarToast(referênciaToast, "Vaga de Estacionamento cadastrada com sucesso!", "sucesso");
      } catch (error) { mostrarToast(referênciaToast, error.response.data.erro, "error"); }
    }
  };
  async function alterarProposta() {
    if (validarCampos()) {
      try {
        await serviçoAlterarProposta({ ...dados, id: propostaConsultada.id });
        mostrarToast(referênciaToast, "Vaga de Estacionamento alterada com sucesso!", "sucesso");
      } catch (error) { mostrarToast(referênciaToast, error.response.data.erro, "error"); }
    }
  };
  
  async function removerProposta() {
    try {
      await serviçoRemoverProposta(propostaConsultada.id);
      mostrarToast(referênciaToast, "Vaga de Estacionamento excluída com sucesso!", "sucesso");
    } catch (error) { mostrarToast(referênciaToast, error.response.data.erro, "error"); }
  };
  function BotõesAções() {
    if (propostaConsultada) {
      return (
        <div className={estilizarInlineFlex()}>
          <Button className={estilizarBotãoRetornar()} label="Retornar" 
             onClick={retornarAdministrarPropostas}/>
          <Button className={estilizarBotãoRemover()} label="Remover" onClick={removerProposta}/>
          <Button className={estilizarBotão()} label="Alterar" onClick={alterarProposta}/>
        </div>
      );
    } else {
      return (
        <div className={estilizarInlineFlex()}>
          <Button className={estilizarBotãoRetornar()} label="Retornar" 
             onClick={retornarAdministrarPropostas}/>
          <Button className={estilizarBotão()} label="Cadastrar" onClick={cadastrarProposta}/>
        </div>
      );
    }
  };
  function títuloFormulário() {
    if (propostaConsultada) return "Alterar Vaga de Estacionamento";
    else return "Cadastrar Vaga de Estacionamento";
  };
  useEffect(() => {
    async function buscarÁreasAtuaçãoPropostas() {
      try {
        const response = await serviçoBuscarÁreasAtuaçãoPropostas();
        if (response.data) setListaÁreasAtuação(response.data);
      } catch (error) {
        const erro = error.response.data.erro;
        if (erro) mostrarToast(referênciaToast, erro, "error"); }
    }
    buscarÁreasAtuaçãoPropostas();
  }, [])
  return (
    <div className={estilizarFlex()}>
      <Toast ref={referênciaToast} onHide={retornarAdministrarPropostas} position="bottom-center"/>
      <Card title={títuloFormulário()} className={estilizarCard(usuárioLogado.cor_tema)}>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>Título*:</label>
          <InputText name="título"
            className={estilizarInputText(erros.título, 400, usuárioLogado.cor_tema)}
            value={dados.título} onChange={alterarEstado}/>
          <MostrarMensagemErro mensagem={erros.título}/>
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>Categoria*:</label>
          <Dropdown name="categoria"
            className={estilizarDropdown(erros.categoria, usuárioLogado.cor_tema)}
            value={dados.categoria} options={opçõesCategoria} onChange={alterarEstado} 
            placeholder="-- Selecione --"/>
          <MostrarMensagemErro mensagem={erros.categoria}/>
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
             Áreas de Atuação Cadastradas:</label>
          <Dropdown name="área_atuação" placeholder="-- Selecione --" showClear
            className={estilizarDropdown(erros.área_atuação, usuárioLogado.cor_tema)} filter
            options={listaÁreasAtuação} onChange={alterarEstado}
            emptyMessage={"Nenhuma área atuação cadastrada."}/>
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>Área de Atuação*:</label>
          <InputText name="área_atuação"
            className={estilizarInputText(erros.área_atuação, 200, usuárioLogado.cor_tema)}
            value={dados.área_atuação} onChange={alterarEstado}/>
          <MostrarMensagemErro mensagem={erros.área_atuação}/>
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>Data de Início*:</label>
          <InputText name="data_início" type="date" value={dados.data_início} 
            className={estilizarInputText(erros.data_início, usuárioLogado.cor_tema)}
            onChange={alterarEstado}/>
          <MostrarMensagemErro mensagem={erros.data_início}/>
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>Descrição*:</label>
          <InputTextarea name="descrição" value={dados.descrição}
            className={estilizarInputTextarea(erros.descrição, usuárioLogado.cor_tema)} 
            onChange={alterarEstado} autoResize cols={40}/>
          <MostrarMensagemErro mensagem={erros.descrição}/>
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>Concorrendo à Bolsa*:</label>
          <Checkbox name="concorrendo_bolsa" checked={dados.concorrendo_bolsa}
            className={estilizarCheckbox()} onChange={alterarEstado} autoResize/>
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>Resultado*:</label>
          <Dropdown name="resultado"
            className={estilizarDropdown(erros.resultado, usuárioLogado.cor_tema)}
            value={dados.resultado} options={opçõesResultado} onChange={alterarEstado} 
            placeholder="-- Selecione --"/>
          <MostrarMensagemErro mensagem={erros.resultado}/>
        </div>
        <Divider className={estilizarDivider()}/>
        <BotõesAções/>
      </Card>
    </div>
  );
}