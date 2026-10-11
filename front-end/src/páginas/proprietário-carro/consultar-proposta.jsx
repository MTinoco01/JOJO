import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Checkbox } from "primereact/checkbox";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import ContextoUsuário from "../../contextos/contexto-usuário";
import ContextoProprietárioCarro from "../../contextos/contexto-proprietário-carro";
import { estilizarBotãoRetornar, estilizarCard, estilizarCheckbox, estilizarDivCampo, 
  estilizarDivider, estilizarFlex, estilizarInlineFlex, estilizarInputText, estilizarLabel }
  from "../../utilitários/estilos";
export default function ConsultarProposta() {
  const { usuárioLogado } = useContext(ContextoUsuário);
  const { propostaConsultada, propostaInteresse } = useContext(ContextoProprietárioCarro);
  const dados = { 
    nome_proprietárioestacionamento: propostaConsultada?.proprietárioestacionamento?.usuário?.nome
      || propostaInteresse?.proprietárioestacionamento?.usuário?.nome,
    título: propostaConsultada?.título || propostaInteresse?.título,
    categoria: propostaConsultada?.categoria || propostaInteresse?.categoria,
    área_atuação: propostaConsultada?.área_atuação || propostaInteresse?.área_atuação,
    data_início: propostaConsultada?.data_início || propostaInteresse?.data_início,
    descrição: propostaConsultada?.descrição || propostaInteresse?.descrição,
    concorrendo_bolsa: propostaConsultada?.concorrendo_bolsa
      || propostaInteresse?.concorrendo_bolsa,
    resultado: propostaConsultada?.resultado || propostaInteresse?.resultado };
  const navegar = useNavigate();
  function retornar() { 
    if (propostaConsultada) navegar("../pesquisar-propostas");
    else if (propostaInteresse) navegar("../cadastrar-interesse");
  };
  return (
    <div className={estilizarFlex()}>
      <Card title="Consultar Proposta" className={estilizarCard(usuárioLogado.cor_tema)}>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>proprietárioestacionamento*:</label>
          <InputText name="nome_proprietárioestacionamento"
            className={estilizarInputText(null, 400, usuárioLogado.cor_tema)}
            value={dados.nome_proprietárioestacionamento} disabled/>
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>Título*:</label>
          <InputText name="título" className={estilizarInputText(null, 400, usuárioLogado.cor_tema)}
            value={dados.título} disabled/>
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>Categoria*:</label>
          <InputText name="categoria"
          className={estilizarInputText(null, 200, usuárioLogado.cor_tema)}
          value={dados.categoria} disabled/>
        </div>    
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>Área de Atuação*:</label>
          <InputText name="área_atuação"
             className={estilizarInputText(null, 350, usuárioLogado.cor_tema)}
          value={dados.área_atuação} disabled/>
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>Data de Início*:</label>
          <InputText name="data_início" type="date" value={dados.data_início} 
            className={estilizarInputText(null, usuárioLogado.cor_tema)} disabled/>
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>Descrição*:</label>
          <InputTextarea name="descrição" value={dados.descrição}
            className={estilizarInputText(null, 400, usuárioLogado.cor_tema)} autoResize disabled/>
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>Concorrendo à Bolsa*:</label>
          <Checkbox name="concorrendo_bolsa" checked={dados.concorrendo_bolsa}
            className={estilizarCheckbox(null)} autoResize disabled/>
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>Resultado*:</label>
          <InputText name="resultado"
             className={estilizarInputText(null, 100, usuárioLogado.cor_tema)}
             value={dados.resultado} autoResize disabled/>
        </div>   
        <Divider className={estilizarDivider()}/>
        <div className={estilizarInlineFlex()}>
          <Button className={estilizarBotãoRetornar()} label="Retornar" onClick={retornar}/>
        </div>
      </Card>
    </div>
  );
}