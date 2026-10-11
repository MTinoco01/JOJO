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
    const { vagaConsultada, vagaAluguel } = useContext(ContextoProprietárioCarro);
    const dados = {
        nome_proprietário: vagaConsultada?.proprietário_estacionamento?.usuário?.nome
            || vagaAluguel?.proprietário_estacionamento?.usuário?.nome,
        endereço: vagaConsultada?.endereço || vagaAluguel?.endereço,
        tipo_veículo: vagaConsultada?.tipo_veículo || vagaAluguel?.tipo_veículo,
        data_interesse_vaga: vagaConsultada?.data_interesse_vaga || vagaAluguel?.data_interesse_vaga,
        descrição: vagaConsultada?.descrição || vagaAluguel?.descrição,
        status: vagaConsultada?.status || vagaAluguel?.status };
    const navegar = useNavigate();
    function retornar() {
        if (vagaConsultada) navegar("../pesquisar-vagas-estacionamento");
        else if (vagaAluguel) navegar("../cadastrar-aluguel-vaga");
    };
    return (
        <div className={estilizarFlex()}>
            <Card title="Consultar Vaga" className={estilizarCard(usuárioLogado.cor_tema)}>
                <div className={estilizarDivCampo()}>
                    <label className={estilizarLabel(usuárioLogado.cor_tema)}>Proprietário*:</label>
                    <InputText name="nome_proprietário"
                        className={estilizarInputText(null, 400, usuárioLogado.cor_tema)}
                        value={dados.nome_proprietário} disabled/>
                </div>
                <div className={estilizarDivCampo()}>
                    <label className={estilizarLabel(usuárioLogado.cor_tema)}>Endereço*:</label>
                    <InputText name="endereço" className={estilizarInputText(null, 400, usuárioLogado.cor_tema)}
                        value={dados.endereço} disabled/>
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
                        className={estilizarInputText(null, 100, usuárioLogado.cor_tema)}
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
