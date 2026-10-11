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
  serviçoBuscarLugaresVagasEstacionamento } from "../../serviços/serviços-proprietário-estacionamento";
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
  const { vagaEstacionamentoConsultada } = useContext(ContextoProprietárioEstacionamento);
  const [dados, setDados] = useState({ tipo_veículo: vagaEstacionamentoConsultada?.tipo_veículo || "",
    lugar: vagaEstacionamentoConsultada?.lugar || "",
    data_interesse_vaga: vagaEstacionamentoConsultada?.data_interesse_vaga || "",
    descrição: vagaEstacionamentoConsultada?.descrição || "",
    status: vagaEstacionamentoConsultada?.status || "" });
  const [listaLugares, setListaLugares] = useState([]);
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
    const { tipo_veículo, lugar, data_interesse_vaga, descrição, status } = dados;
    let errosCamposObrigatórios = validarCamposObrigatórios({ tipo_veículo, lugar,
      data_interesse_vaga, descrição, status });
    setErros(errosCamposObrigatórios);
    return checarListaVazia(errosCamposObrigatórios);
  };
  function retornarAdministrarVagasEstacionamento() { navegar("../administrar-vagas-estacionamento"); };
  async function cadastrarVagaEstacionamento() {
    if (validarCampos()) {
      try {
        await serviçoCadastrarVagaEstacionamento({ ...dados, cpf: usuárioLogado.cpf });
        mostrarToast(referênciaToast, "Vaga de estacionamento cadastrada com sucesso!", "sucesso");
      } catch (error) { mostrarToast(referênciaToast, error.response?.data?.erro, "error"); }
    }
  };
  async function alterarVagaEstacionamento() {
    if (validarCampos()) {
      try {
        await serviçoAlterarVagaEstacionamento({ ...dados, id: vagaEstacionamentoConsultada.id });
        mostrarToast(referênciaToast, "Vaga de estacionamento alterada com sucesso!", "sucesso");
      } catch (error) { mostrarToast(referênciaToast, error.response?.data?.erro, "error"); }
    }
  };

  async function removerVagaEstacionamento() {
    try {
      await serviçoRemoverVagaEstacionamento(vagaEstacionamentoConsultada.id);
      mostrarToast(referênciaToast, "Vaga de estacionamento excluída com sucesso!", "sucesso");
    } catch (error) { mostrarToast(referênciaToast, error.response?.data?.erro, "error"); }
  };
  function BotõesAções() {
    if (vagaEstacionamentoConsultada) {
      return (
        <div className={estilizarInlineFlex()}>
          <Button className={estilizarBotãoRetornar()} label="Retornar"
             onClick={retornarAdministrarVagasEstacionamento}/>
          <Button className={estilizarBotãoRemover()} label="Remover" onClick={removerVagaEstacionamento}/>
          <Button className={estilizarBotão()} label="Alterar" onClick={alterarVagaEstacionamento}/>
        </div>
      );
    } else {
      return (
        <div className={estilizarInlineFlex()}>
          <Button className={estilizarBotãoRetornar()} label="Retornar"
             onClick={retornarAdministrarVagasEstacionamento}/>
          <Button className={estilizarBotão()} label="Cadastrar" onClick={cadastrarVagaEstacionamento}/>
        </div>
      );
    }
  };
  function títuloFormulário() {
    if (vagaEstacionamentoConsultada) return "Alterar Vaga de Estacionamento";
    else return "Cadastrar Vaga de Estacionamento";
  };
  useEffect(() => {
    async function buscarLugaresVagasEstacionamento() {
      try {
        const response = await serviçoBuscarLugaresVagasEstacionamento();
        if (response.data) setListaLugares(response.data);
      } catch (error) {
        const erro = error.response?.data?.erro;
        if (erro) mostrarToast(referênciaToast, erro, "error"); }
    }
    buscarLugaresVagasEstacionamento();
  }, [])
  return (
    <div className={estilizarFlex()}>
      <Toast ref={referênciaToast} onHide={retornarAdministrarVagasEstacionamento} position="bottom-center"/>
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
             Lugares Cadastrados:</label>
          <Dropdown name="lugar" placeholder="-- Selecione --" showClear
            className={estilizarDropdown(erros.lugar, usuárioLogado.cor_tema)} filter
            options={listaLugares} onChange={alterarEstado}
            emptyMessage={"Nenhum lugar cadastrado."}/>
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>Lugar*:</label>
          <InputText name="lugar"
            className={estilizarInputText(erros.lugar, 400, usuárioLogado.cor_tema)}
            value={dados.lugar} onChange={alterarEstado}/>
          <MostrarMensagemErro mensagem={erros.lugar}/>
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