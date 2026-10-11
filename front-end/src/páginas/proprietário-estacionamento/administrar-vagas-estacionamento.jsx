import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import ContextoProprietárioEstacionamento from "../../contextos/contexto-proprietário-estacionamento";
import ContextoUsuário from "../../contextos/contexto-usuário";
import { serviçoBuscarVagasProprietárioEstacionamento } from "../../serviços/serviços-proprietário-estacionamento";
import mostrarToast from "../../utilitários/mostrar-toast";
import { TAMANHOS, estilizarBotão, estilizarBotãoRetornar, estilizarBotãoTabela, estilizarCard,
    estilizarColunaConsultar, estilizarColumnHeader, estilizarDataTable, estilizarDataTablePaginator,
    estilizarDivider, estilizarFilterMenu, estilizarFlex }
    from "../../utilitários/estilos";
export default function AdministrarVagasEstacionamento() {
    const referênciaToast = useRef(null);
    const { usuárioLogado } = useContext(ContextoUsuário);
    const { vagaConsultada, setVagaConsultada } = useContext(ContextoProprietárioEstacionamento);
    const [listaVagas, setListaVagas] = useState([]);
    const navegar = useNavigate();
    const opçõesTipoVeículo = [{ label: "Carro", value: "carro" },
        { label: "Moto", value: "moto" },
        { label: "Caminhão", value: "caminhão" }];
    const opçõesStatus = [{ label: "Disponível", value: "disponível" },
        { label: "Alugada", value: "alugada" }];
    function retornarPáginaInicial() { navegar("/pagina-inicial"); };
    function adicionarVaga() {
        setVagaConsultada(null);
        navegar("../cadastrar-vaga-estacionamento");
    };
    function ConsultarTemplate(vaga_estacionamento) {
        function consultar() {
            setVagaConsultada(vaga_estacionamento);
            navegar("../cadastrar-vaga-estacionamento");
        };
        return (
            <Button icon="pi pi-search"
                className={estilizarBotãoTabela(usuárioLogado.cor_tema,
                    vagaConsultada?.id === vaga_estacionamento.id)}
                tooltip="Consultar Vaga" tooltipOptions={{ position: 'top' }} onClick={consultar}/>
        );
    };
    function DropdownTipoVeículoTemplate(opções) {
        function alterarFiltroDropdown(event)
            { return opções.filterCallback(event.value, opções.index); };
        return <Dropdown value={opções.value} options={opçõesTipoVeículo} placeholder="Selecione"
            onChange={alterarFiltroDropdown} showClear />;
    };
    function DropdownStatusTemplate(opções) {
        function alterarFiltroDropdown(event)
            { return opções.filterCallback(event.value, opções.index); };
        return <Dropdown value={opções.value} options={opçõesStatus} placeholder="Selecione"
            onChange={alterarFiltroDropdown} showClear />;
    };
    useEffect(() => {
        let desmontado = false;
        async function buscarVagasProprietárioEstacionamento() {
            try {
                const response = await serviçoBuscarVagasProprietárioEstacionamento(usuárioLogado.cpf);
                if (!desmontado && response.data) { setListaVagas(response.data); }
            } catch (error) {
                const erro = error.response.data.erro;
                if (erro) mostrarToast(referênciaToast, erro, "error");
            }
        };
        buscarVagasProprietárioEstacionamento();
        return () => desmontado = true;
    }, [usuárioLogado.cpf]);
    return (
        <div className={estilizarFlex()}>
            <Toast ref={referênciaToast} position="bottom-center"/>
            <Card title="Administrar Vagas" className={estilizarCard(usuárioLogado.cor_tema)}>
                <DataTable dataKey="id" size="small" paginator rows={TAMANHOS.MAX_LINHAS_TABELA}
                    emptyMessage="Nenhuma vaga encontrada." value={listaVagas}
                    responsiveLayout="scroll" breakpoint="490px" removableSort
                    className={estilizarDataTable()}
                    paginatorClassName={estilizarDataTablePaginator(usuárioLogado.cor_tema)}>
                    <Column bodyClassName={estilizarColunaConsultar()} body={ConsultarTemplate}
                        headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}/>
                    <Column field="endereço" header="Endereço" filter showFilterOperator={false}
                        headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)} sortable/>
                    <Column headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
                        field="tipo_veículo" header="Tipo de Veículo" filter filterMatchMode="equals"
                        filterElement={DropdownTipoVeículoTemplate} showClearButton={false}
                        showFilterOperator={false} showFilterMatchModes={false}
                        filterMenuClassName={estilizarFilterMenu()} showFilterMenuOptions={false} sortable />
                    <Column field="descrição" header="Descrição" filter showFilterOperator={false}
                        headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)} sortable/>
                    <Column headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
                        field="status" header="Status" filter filterMatchMode="equals"
                        filterElement={DropdownStatusTemplate} showClearButton={false}
                        showFilterOperator={false} showFilterMatchModes={false}
                        filterMenuClassName={estilizarFilterMenu()} showFilterMenuOptions={false} sortable />
                </DataTable>
                <Divider className={estilizarDivider()}/>
                <Button className={estilizarBotãoRetornar()} label="Retornar"
                    onClick={retornarPáginaInicial}/>
                <Button className={estilizarBotão()} label="Adicionar" onClick={adicionarVaga}/>
            </Card>
        </div>
    );
}
