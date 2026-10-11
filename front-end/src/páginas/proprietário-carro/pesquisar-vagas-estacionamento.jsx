import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import ContextoUsuário from "../../contextos/contexto-usuário";
import ContextoProprietárioCarro from "../../contextos/contexto-proprietário-carro";
import { serviçoBuscarVagasEstacionamento } from "../../serviços/serviços-proprietário-carro";
import mostrarToast from "../../utilitários/mostrar-toast";
import { TAMANHOS, estilizarBotãoRetornar, estilizarBotãoTabela, estilizarCard,
  estilizarColumnHeader, estilizarColunaConsultar, estilizarDataTable, estilizarDataTablePaginator,
  estilizarDivider, estilizarFilterMenu, estilizarFlex }
  from "../../utilitários/estilos";
export default function PesquisarVagasEstacionamento() {
  const referênciaToast = useRef(null);
  const { usuárioLogado } = useContext(ContextoUsuário);
  const { vagaEstacionamentoConsultada, setVagaEstacionamentoConsultada, setVagaEstacionamentoSelecionada }
     = useContext(ContextoProprietárioCarro);
  const [listaVagasEstacionamento, setListaVagasEstacionamento] = useState([]);
  const navegar = useNavigate();
  const opçõesStatus = [{ label: "Disponível", value: "disponível" },
    { label: "Alugada", value: "alugada" }];
  const opçõesTipoVeículo = [{ label: "Carro", value: "carro" },
    { label: "Moto", value: "moto" },
    { label: "Caminhão", value: "caminhão" }];
  function retornarCadastrarAluguelVaga() {
    setVagaEstacionamentoSelecionada(vagaEstacionamentoConsultada);
    setVagaEstacionamentoConsultada(null);
    navegar("../cadastrar-aluguel-vaga");
  };
  function ConsultarTemplate(vaga_estacionamento) {
    return (
      <Button icon="pi pi-search"
         className={estilizarBotãoTabela(usuárioLogado.cor_tema,
            vagaEstacionamentoConsultada?.id === vaga_estacionamento.id)}
         tooltip="Consultar Vaga de Estacionamento" tooltipOptions={{ position: 'top' }}
         onClick={() => {
            setVagaEstacionamentoConsultada(vaga_estacionamento);
            navegar("../consultar-vaga-estacionamento");
         }}/>
    );
  };
  function DropdownStatusTemplate(opções) {
    function alterarFiltroDropdown(event) {
       return opções.filterCallback(event.value, opções.index);
    };
    return <Dropdown value={opções.value} options={opçõesStatus} placeholder="Selecione"
      onChange={alterarFiltroDropdown} showClear />;
  };
  function DropdownTipoVeículoTemplate(opções) {
    function alterarFiltroDropdown(event) {
       return opções.filterCallback(event.value, opções.index);
    };
    return <Dropdown value={opções.value} options={opçõesTipoVeículo} placeholder="Selecione"
      onChange={alterarFiltroDropdown} showClear />;
  };
  useEffect(() => {
    let desmontado = false;
    async function buscarVagasEstacionamento() {
      try {
        const response = await serviçoBuscarVagasEstacionamento();
        if (!desmontado && response.data) setListaVagasEstacionamento(response.data);
      } catch (error) { mostrarToast(referênciaToast, error.response?.data?.erro, "error"); }
    };
    buscarVagasEstacionamento();
    return () => desmontado = true;
  }, [usuárioLogado.cpf]);
  return (
    <div className={estilizarFlex()}>
      <Toast ref={referênciaToast} position="bottom-center"/>
      <Card title="Pesquisar Vagas de Estacionamento" className={estilizarCard(usuárioLogado.cor_tema)}>
        <DataTable dataKey="id" size="small" paginator rows={TAMANHOS.MAX_LINHAS_TABELA}
          emptyMessage="Nenhuma vaga de estacionamento encontrada." value={listaVagasEstacionamento}
          responsiveLayout="scroll" breakpoint="490px" removableSort
          className={estilizarDataTable()}
          paginatorClassName={estilizarDataTablePaginator(usuárioLogado.cor_tema)}>
          <Column bodyClassName={estilizarColunaConsultar()} body={ConsultarTemplate}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}/>
          <Column field="proprietário_estacionamento.usuário.nome" header="Proprietário Estacionamento"
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)} sortable/>
          <Column field="lugar" header="Lugar" filter showFilterOperator={false}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)} sortable/>
          <Column headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
            field="status" header="Status" filter filterMatchMode="equals"
            filterElement={DropdownStatusTemplate} showClearButton={false}
            showFilterOperator={false} showFilterMatchModes={false}
            filterMenuClassName={estilizarFilterMenu()} showFilterMenuOptions={false} sortable />
          <Column headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
            field="tipo_veículo" header="Tipo de Veículo" filter filterMatchMode="equals"
            filterElement={DropdownTipoVeículoTemplate} showClearButton={false}
            showFilterOperator={false} showFilterMatchModes={false}
            filterMenuClassName={estilizarFilterMenu()} showFilterMenuOptions={false} sortable />
        </DataTable>
        <Divider className={estilizarDivider()}/>
        <Button className={estilizarBotãoRetornar()} label="Retornar"
           onClick={retornarCadastrarAluguelVaga}/>
      </Card>
    </div>
  );
}