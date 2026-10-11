import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { TriStateCheckbox } from "primereact/tristatecheckbox";
import ContextoProprietárioEstacionamento from "../../contextos/contexto-proprietário-estacionamento";
import ContextoUsuário from "../../contextos/contexto-usuário";
import { serviçoBuscarPropostasProprietárioEstacionamento } from "../../serviços/serviços-proprietário-estacionamento";
import mostrarToast from "../../utilitários/mostrar-toast";
import { TAMANHOS, estilizarBotão, estilizarBotãoRetornar, estilizarBotãoTabela, estilizarCard, 
  estilizarColunaConsultar, estilizarColumnHeader, estilizarDataTable, estilizarDataTablePaginator, 
  estilizarDivider, estilizarFilterMenu, estilizarFlex, estilizarTriStateCheckbox }
  from "../../utilitários/estilos";
export default function AdministrarPropostas() {
  const referênciaToast = useRef(null);
  const { usuárioLogado } = useContext(ContextoUsuário);
  const { propostaConsultada, setPropostaConsultada } = useContext(ContextoProprietárioEstacionamento);
  const [listaPropostas, setListaPropostas] = useState([]);
  const navegar = useNavigate();
  const opçõesCategoria = [{ label: "Extensão", value: "Extensão" },
    { label: "Iniciação Científica", value: "Iniciação Científica" },
    { label: "TCC", value: "TCC" }];
  function retornarPáginaInicial() { navegar("/pagina-inicial"); };
  function adicionarProposta() {
    setPropostaConsultada(null);
    navegar("../cadastrar-proposta");
  };
  function ConsultarTemplate(proposta) {
    function consultar() {
      setPropostaConsultada(proposta);
      navegar("../cadastrar-proposta");
    };
    return (
      <Button icon="pi pi-search"
      className={estilizarBotãoTabela(usuárioLogado.cor_tema,
         propostaConsultada?.id === proposta.id)}
      tooltip="Consultar Proposta" tooltipOptions={{ position: 'top' }} onClick={consultar}/>
    );
  };
  function DropdownÁreaTemplate(opções) {
    function alterarFiltroDropdown(event)
      { return opções.filterCallback(event.value, opções.index); };
    return <Dropdown value={opções.value} options={opçõesCategoria} placeholder="Selecione"
      onChange={alterarFiltroDropdown} showClear />;
  };
  function BooleanBodyTemplate(proposta) {
    if (proposta.concorrendo_bolsa) return "Sim";
    else return "Não";
  };
  function BooleanFilterTemplate(opções) {
    function alterarFiltroTriState(event) { return opções.filterCallback(event.value); };
    return (
      <div>
        <label>Concorrendo à bolsa:</label>
        <TriStateCheckbox
          className={estilizarTriStateCheckbox(usuárioLogado?.cor_tema)} value={opções.value}
          onChange={alterarFiltroTriState}/>
      </div>
    );
  };
  useEffect(() => {
    let desmontado = false;
    async function buscarPropostasProprietárioEstacionamento() {
      try {
        const response = await serviçoBuscarPropostasProprietárioEstacionamento(usuárioLogado.cpf);
        if (!desmontado && response.data) { setListaPropostas(response.data); }
      } catch (error) {
        const erro = error.response.data.erro;
        if (erro) mostrarToast(referênciaToast, erro, "error");
      }
    };
    buscarPropostasProprietárioEstacionamento();
    return () => desmontado = true;
  }, [usuárioLogado.cpf]);
  
  return ( 
    <div className={estilizarFlex()}>
      <Card title="Administrar Propostas" className={estilizarCard(usuárioLogado.cor_tema)}>
        <DataTable dataKey="id" size="small" paginator rows={TAMANHOS.MAX_LINHAS_TABELA}
          emptyMessage="Nenhuma proposta encontrada." value={listaPropostas} 
          responsiveLayout="scroll" breakpoint="490px" removableSort 
          className={estilizarDataTable()}
          paginatorClassName={estilizarDataTablePaginator(usuárioLogado.cor_tema)}>
          <Column bodyClassName={estilizarColunaConsultar()} body={ConsultarTemplate}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}/>
          <Column field="título" header="Título" filter showFilterOperator={false}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)} sortable/>
          <Column headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
            field="categoria" header="Categoria" filter filterMatchMode="equals"
            filterElement={DropdownÁreaTemplate} showClearButton={false}
            showFilterOperator={false} showFilterMatchModes={false}
            filterMenuClassName={estilizarFilterMenu()} showFilterMenuOptions={false} sortable />
          <Column field="área_atuação" header="Área de Atuação" filter showFilterOperator={false}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)} sortable/>
          <Column field="concorrendo_bolsa" header="Concorrendo à bolsa" filter 
            showFilterOperator={false}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)} sortable
            filterMatchMode="equals" filterElement={BooleanFilterTemplate}
            body={BooleanBodyTemplate} showClearButton={false} showAddButton={false}
            filterMenuClassName={estilizarFilterMenu()} dataType="boolean"/>
        </DataTable>
        <Divider className={estilizarDivider()}/>
        <Button className={estilizarBotãoRetornar()} label="Retornar"    
           onClick={retornarPáginaInicial}/>
        <Button className={estilizarBotão()} label="Adicionar" onClick={adicionarProposta}/>
      </Card>
    </div>
  );
}