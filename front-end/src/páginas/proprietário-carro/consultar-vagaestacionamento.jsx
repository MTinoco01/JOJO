import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import ContextoUsuário from "../../contextos/contexto-usuário";
import ContextoProprietárioCarro from "../../contextos/contexto-proprietário-carro";
import { estilizarBotãoRetornar, estilizarCard, estilizarDivCampo,
  estilizarDivider, estilizarFlex, estilizarInlineFlex, estilizarInputText, estilizarLabel }
  from "../../utilitários/estilos";
export default function ConsultarVagaEstacionamento() {
  const { usuárioLogado } = useContext(ContextoUsuário);
  const { vagaEstacionamentoConsultada, vagaEstacionamentoAluguelVaga } = useContext(ContextoProprietárioCarro);
  const dados = {
    nome_proprietário_estacionamento: vagaEstacionamentoConsultada?.proprietário_estacionamento?.usuário?.nome
      || vagaEstacionamentoAluguelVaga?.proprietário_estacionamento?.usuário?.nome,
    lugar: vagaEstacionamentoConsultada?.lugar || vagaEstacionamentoAluguelVaga?.lugar,
    tipo_veículo: vagaEstacionamentoConsultada?.tipo_veículo || vagaEstacionamentoAluguelVaga?.tipo_veículo,
    data_interesse_vaga: vagaEstacionamentoConsultada?.data_interesse_vaga
      || vagaEstacionamentoAluguelVaga?.data_interesse_vaga,
    descrição: vagaEstacionamentoConsultada?.descrição || vagaEstacionamentoAluguelVaga?.descrição,
    status: vagaEstacionamentoConsultada?.status || vagaEstacionamentoAluguelVaga?.status };
  const navegar = useNavigate();
  function retornar() {
    if (vagaEstacionamentoConsultada) navegar("../pesquisar-vagasestacionamento");
    else if (vagaEstacionamentoAluguelVaga) navegar("../cadastrar-aluguelvaga");
  };
  return (
    <div className={estilizarFlex()}>
      <Card title="Consultar Vaga de Estacionamento" className={estilizarCard(usuárioLogado.cor_tema)}>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>Proprietário Estacionamento*:</label>
          <InputText name="nome_proprietário_estacionamento"
            className={estilizarInputText(null, 400, usuárioLogado.cor_tema)}
            value={dados.nome_proprietário_estacionamento} disabled/>
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>Lugar*:</label>
          <InputText name="lugar" className={estilizarInputText(null, 400, usuárioLogado.cor_tema)}
            value={dados.lugar} disabled/>
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>Tipo de Veículo*:</label>
          <InputText name="tipo_veículo"
          className={estilizarInputText(null, 200, usuárioLogado.cor_tema)}
          value={dados.tipo_veículo} disabled/>
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>Data de Interesse da Vaga*:</label>
          <InputText name="data_interesse_vaga" type="date" value={dados.data_interesse_vaga}
            className={estilizarInputText(null, usuárioLogado.cor_tema)} disabled/>
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>Descrição*:</label>
          <InputTextarea name="descrição" value={dados.descrição}
            className={estilizarInputText(null, 400, usuárioLogado.cor_tema)} autoResize disabled/>
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>Status*:</label>
          <InputText name="status"
             className={estilizarInputText(null, 200, usuárioLogado.cor_tema)}
             value={dados.status} disabled/>
        </div>
        <Divider className={estilizarDivider()}/>
        <div className={estilizarInlineFlex()}>
          <Button className={estilizarBotãoRetornar()} label="Retornar" onClick={retornar}/>
        </div>
      </Card>
    </div>
  );
}