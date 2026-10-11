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
import { serviçoBuscarVagasEstacionamentoProprietárioEstacionamento } from "../../serviços/serviços-proprietário-estacionamento";
import mostrarToast from "../../utilitários/mostrar-toast";
import { TAMANHOS, estilizarBotão, estilizarBotãoRetornar, estilizarBotãoTabela, estilizarCard,
  estilizarColunaConsultar, estilizarColumnHeader, estilizarDataTable, estilizarDataTablePaginator,
  estilizarDivider, estilizarFilterMenu, estilizarFlex }
  from "../../utilitários/estilos";
export default function AdministrarVagasEstacionamento() {
  const referênciaToast = useRef(null);
  const { usuárioLogado } = useContext(ContextoUsuário);
  const { vagaEstacionamentoConsultada, setVagaEstacionamentoConsultada }
    = useContext(ContextoProprietárioEstacionamento);
  const [listaVagasEstacionamento, setListaVagasEstacionamento] = useState([]);
  const navegar = useNavigate();
  const opçõesStatus = [{ label: "Disponível", value: "disponível" },
    { label: "Alugada", value: "alugada" }];
  const opçõesTipoEstacionamento = [{ label: "Coberto", value: "coberto" },
    { label: "Descoberto", value: "descoberto" }];
  const opçõesTipoVeículo = [{ label: "Carro", value: "carro" },
    { label: "Moto", value: "moto" },
    { label: "Caminhão", value: "caminhão" }];
  function retornarPáginaInicial() { navegar("/pagina-inicial"); };
  function adicionarVagaEstacionamento() {
    setVagaEstacionamentoConsultada(null);
    navegar("../cadastrar-vaga-estacionamento");
  };
  function ConsultarTemplate(vaga_estacionamento) {
    function consultar() {
      setVagaEstacionamentoConsultada(vaga_estacionamento);
      navegar("../cadastrar-vaga-estacionamento");
    };
    return (
      <Button icon="pi pi-search"
      className={estilizarBotãoTabela(usuárioLogado.cor_tema,
         vagaEstacionamentoConsultada?.id === vaga_estacionamento.id)}
      tooltip="Consultar Vaga de Estacionamento" tooltipOptions={{ position: 'top' }} onClick={consultar}/>
    );
  };
  function DropdownStatusTemplate(opções) {
    function alterarFiltroDropdown(event)
      { return opções.filterCallback(event.value, opções.index); };
    return <Dropdown value={opções.value} options={opçõesStatus} placeholder="Selecione"
      onChange={alterarFiltroDropdown} showClear />;
  };
  function DropdownTipoEstacionamentoTemplate(opções) {
    function alterarFiltroDropdown(event)
      { return opções.filterCallback(event.value, opções.index); };
    return <Dropdown value={opções.value} options={opçõesTipoEstacionamento} placeholder="Selecione"
      onChange={alterarFiltroDropdown} showClear />;
  };
  function DropdownTipoVeículoTemplate(opções) {
    function alterarFiltroDropdown(event)
      { return opções.filterCallback(event.value, opções.index); };
    return <Dropdown value={opções.value} options={opçõesTipoVeículo} placeholder="Selecione"
      onChange={alterarFiltroDropdown} showClear />;
  };
  useEffect(() => {
    let desmontado = false;
    async function buscarVagasEstacionamentoProprietárioEstacionamento() {
      try {
        const response = await serviçoBuscarVagasEstacionamentoProprietárioEstacionamento(usuárioLogado.cpf);
        if (!desmontado && response.data) {
          // data_carro: ano do carro de cada proprietário de carro que cadastrou aluguel na vaga
          setListaVagasEstacionamento(response.data.map(vaga_estacionamento => ({ ...vaga_estacionamento,
            data_carro: vaga_estacionamento.alugueis_vagas
              .map(aluguel_vaga => aluguel_vaga.proprietário_carro?.data_carro).join(", ") })));
        }
      } catch (error) {
        const erro = error.response?.data?.erro;
        if (erro) mostrarToast(referênciaToast, erro, "error");
      }
    };
    buscarVagasEstacionamentoProprietárioEstacionamento();
    return () => desmontado = true;
  }, [usuárioLogado.cpf]);

  return (
    <div className={estilizarFlex()}>
      <Toast ref={referênciaToast} position="bottom-center"/>
      <Card title="Administrar Vagas de Estacionamento" className={estilizarCard(usuárioLogado.cor_tema)}>
        <DataTable dataKey="id" size="small" paginator rows={TAMANHOS.MAX_LINHAS_TABELA}
          emptyMessage="Nenhuma vaga de estacionamento encontrada." value={listaVagasEstacionamento}
          responsiveLayout="scroll" breakpoint="490px" removableSort
          className={estilizarDataTable()}
          paginatorClassName={estilizarDataTablePaginator(usuárioLogado.cor_tema)}>
          <Column bodyClassName={estilizarColunaConsultar()} body={ConsultarTemplate}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}/>
          <Column field="lugar" header="Lugar" filter showFilterOperator={false}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)} sortable/>
          <Column headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
            field="status" header="Status" filter filterMatchMode="equals"
            filterElement={DropdownStatusTemplate} showClearButton={false}
            showFilterOperator={false} showFilterMatchModes={false}
            filterMenuClassName={estilizarFilterMenu()} showFilterMenuOptions={false} sortable />
          <Column headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
            field="proprietário_estacionamento.tipo_estacionamento" header="Tipo de Estacionamento"
            filter filterMatchMode="equals" filterElement={DropdownTipoEstacionamentoTemplate}
            showClearButton={false} showFilterOperator={false} showFilterMatchModes={false}
            filterMenuClassName={estilizarFilterMenu()} showFilterMenuOptions={false} sortable />
          <Column field="data_carro" header="Data do Carro" filter showFilterOperator={false}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)} sortable/>
          <Column headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
            field="tipo_veículo" header="Tipo de Veículo" filter filterMatchMode="equals"
            filterElement={DropdownTipoVeículoTemplate} showClearButton={false}
            showFilterOperator={false} showFilterMatchModes={false}
            filterMenuClassName={estilizarFilterMenu()} showFilterMenuOptions={false} sortable />
        </DataTable>
        <Divider className={estilizarDivider()}/>
        <Button className={estilizarBotãoRetornar()} label="Retornar"
           onClick={retornarPáginaInicial}/>
        <Button className={estilizarBotão()} label="Adicionar" onClick={adicionarVagaEstacionamento}/>
      </Card>
    </div>
  );
}