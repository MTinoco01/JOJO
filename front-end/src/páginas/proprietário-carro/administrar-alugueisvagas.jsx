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
import mostrarToast from "../../utilitários/mostrar-toast";
import { serviçoBuscarAlugueisVagasProprietárioCarro } from "../../serviços/serviços-proprietário-carro";
import { TAMANHOS, estilizarBotão, estilizarBotãoRetornar, estilizarBotãoTabela, estilizarCard,
  estilizarColumnHeader, estilizarColunaConsultar, estilizarDataTable, estilizarDataTablePaginator,
  estilizarDivider, estilizarFilterMenu, estilizarFlex }
  from "../../utilitários/estilos";
export default function AdministrarAlugueisVagas() {
  const referênciaToast = useRef(null);
  const { usuárioLogado } = useContext(ContextoUsuário);
  const { aluguelVagaConsultado, setAluguelVagaConsultado, setVagaEstacionamentoSelecionada }
    = useContext(ContextoProprietárioCarro);
  const [listaAlugueisVagas, setListaAlugueisVagas] = useState([]);
  const navegar = useNavigate();
  const opçõesStatus = [{ label: "Disponível", value: "disponível" },
    { label: "Alugada", value: "alugada" }];
  const opçõesTipoVeículo = [{ label: "Carro", value: "carro" },
    { label: "Moto", value: "moto" },
    { label: "Caminhão", value: "caminhão" }];
  function retornarPáginaInicial() { navegar("/pagina-inicial"); };
  function adicionarAluguelVaga() {
    setAluguelVagaConsultado(null);
    setVagaEstacionamentoSelecionada(null);
    navegar("../cadastrar-aluguelvaga");
  };
  function ConsultarTemplate(aluguel_vaga) {
    function consultar() {
      setAluguelVagaConsultado(aluguel_vaga);
      setVagaEstacionamentoSelecionada(null);
      navegar("../cadastrar-aluguelvaga");
    };
    return (
      <Button icon="pi pi-search"
        className={estilizarBotãoTabela(usuárioLogado.cor_tema,
           aluguelVagaConsultado?.id === aluguel_vaga.id)}
        tooltip="Consultar Aluguel da Vaga" tooltipOptions={{ position: 'top' }} onClick={consultar}/>
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
    async function buscarAlugueisVagasProprietárioCarro() {
      try {
        const response = await serviçoBuscarAlugueisVagasProprietárioCarro(usuárioLogado.cpf);
        if (!desmontado && response.data) setListaAlugueisVagas(response.data);
      } catch (error) { mostrarToast(referênciaToast, error.response?.data?.erro, "error"); }
    };
    buscarAlugueisVagasProprietárioCarro();
    return () => desmontado = true;
  }, [usuárioLogado.cpf]);
  return (
    <div className={estilizarFlex()}>
      <Toast ref={referênciaToast} position="bottom-center"/>
      <Card title="Administrar Aluguéis das Vagas" className={estilizarCard(usuárioLogado.cor_tema)}>
        <DataTable dataKey="id" size="small" paginator rows={TAMANHOS.MAX_LINHAS_TABELA}
          emptyMessage="Nenhum aluguel de vaga encontrado." value={listaAlugueisVagas}
          responsiveLayout="scroll" breakpoint="490px" removableSort
          className={estilizarDataTable()}
          paginatorClassName={estilizarDataTablePaginator(usuárioLogado.cor_tema)}>
          <Column bodyClassName={estilizarColunaConsultar()} body={ConsultarTemplate}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}/>
          <Column field="vaga_estacionamento.proprietário_estacionamento.usuário.nome"
            header="Proprietário Estacionamento"
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)} sortable/>
          <Column field="vaga_estacionamento.lugar" header="Lugar" filter showFilterOperator={false}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)} sortable/>
          <Column headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
            field="vaga_estacionamento.status" header="Status" filter filterMatchMode="equals"
            filterElement={DropdownStatusTemplate} showClearButton={false}
            showFilterOperator={false} showFilterMatchModes={false}
            filterMenuClassName={estilizarFilterMenu()} showFilterMenuOptions={false} sortable/>
          <Column field="proprietário_carro.data_carro" header="Data do Carro" filter
            showFilterOperator={false}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)} sortable/>
          <Column headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
            field="vaga_estacionamento.tipo_veículo" header="Tipo de Veículo" filter filterMatchMode="equals"
            filterElement={DropdownTipoVeículoTemplate} showClearButton={false}
            showFilterOperator={false} showFilterMatchModes={false}
            filterMenuClassName={estilizarFilterMenu()} showFilterMenuOptions={false} sortable/>
        </DataTable>
        <Divider className={estilizarDivider()}/>
        <Button className={estilizarBotãoRetornar()} label="Retornar"
            onClick={retornarPáginaInicial}/>
        <Button className={estilizarBotão()} label="Adicionar" onClick={adicionarAluguelVaga}/>
      </Card>
    </div>
  );
}