import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { TriStateCheckbox } from "primereact/tristatecheckbox";
import ContextoUsuário from "../../contextos/contexto-usuário";
import ContextoProprietárioCarro from "../../contextos/contexto-proprietário-carro";
import mostrarToast from "../../utilitários/mostrar-toast";
import { serviçoBuscarInteressesProprietárioCarro } from "../../serviços/serviços-proprietário-carro";
import { TAMANHOS, estilizarBotão, estilizarBotãoRetornar, estilizarBotãoTabela, estilizarCard,   
  estilizarColumnHeader, estilizarColunaConsultar, estilizarDataTable, estilizarDataTablePaginator, 
  estilizarDivider, estilizarFilterMenu, estilizarFlex, estilizarTriStateCheckbox }
  from "../../utilitários/estilos";
export default function AdministrarInteresses() {
  const referênciaToast = useRef(null);
  const { usuárioLogado } = useContext(ContextoUsuário);
  const { interesseConsultado, setInteresseConsultado, setPropostaSelecionada }
    = useContext(ContextoProprietárioCarro);
  const [listaInteresses, setListaInteresses] = useState([]);
  const navegar = useNavigate();
  const opçõesCategoria = [{ label: "Extensão", value: "Extensão" },
    { label: "Iniciação Científica", value: "Iniciação Científica" },
    { label: "TCC", value: "TCC" }];
  function retornarPáginaInicial() { navegar("/pagina-inicial"); };
  function adicionarInteresse() {
    setInteresseConsultado(null);
    setPropostaSelecionada(null);
    navegar("../cadastrar-interesse");
  };
  function ConsultarTemplate(interesse) {
    function consultar() {
      setInteresseConsultado(interesse);
      setPropostaSelecionada(null);
      navegar("../cadastrar-interesse");
    };
    return (
      <Button icon="pi pi-search"
        className={estilizarBotãoTabela(usuárioLogado.cor_tema,
           interesseConsultado?.id === interesse.id)}
        tooltip="Consultar interesse" tooltipOptions={{ position: 'top' }} onClick={consultar}/>
    );
  };
  function DropdownÁreaTemplate(opções) {
    function alterarFiltroDropdown(event) { 
      return opções.filterCallback(event.value, opções.index);
    };
    return <Dropdown value={opções.value} options={opçõesCategoria} placeholder="Selecione"
      onChange={alterarFiltroDropdown} showClear />;
  };
  function BooleanBodyTemplate(interesse) {
    if (interesse.necessidade_bolsa) return "Sim";
    else return "Não";
  };
  
  function BooleanFilterTemplate(opções) {
    function alterarFiltroTriState(event) { return opções.filterCallback(event.value); };
    return (
      <div>
        <label>Necessidade de bolsa:</label>
        <TriStateCheckbox
          className={estilizarTriStateCheckbox(usuárioLogado?.cor_tema)} value={opções.value}
          onChange={alterarFiltroTriState}/>
      </div>
    );
  };
  
  useEffect(() => {
    let desmontado = false;
    async function buscarInteressesProprietárioCarro() {
      try {
        const response = await serviçoBuscarInteressesProprietárioCarro(usuárioLogado.cpf);
        if (!desmontado && response.data) setListaInteresses(response.data);
      } catch (error) { mostrarToast(referênciaToast, error.response.data.erro, "error"); }
    };
    buscarInteressesProprietárioCarro();
    return () => desmontado = true;
  }, [usuárioLogado.cpf]);
  return ( 
    <div className={estilizarFlex()}>
      <Toast ref={referênciaToast} position="bottom-center"/>
      <Card title="Administrar Interesses" className={estilizarCard(usuárioLogado.cor_tema)}>
        <DataTable dataKey="id" size="small" paginator rows={TAMANHOS.MAX_LINHAS_TABELA}
          emptyMessage="Nenhum interesse encontrado." value={listaInteresses} 
          responsiveLayout="scroll" breakpoint="490px" removableSort 
          className={estilizarDataTable()}
          paginatorClassName={estilizarDataTablePaginator(usuárioLogado.cor_tema)}>
          <Column bodyClassName={estilizarColunaConsultar()} body={ConsultarTemplate}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}/>
          <Column field="proposta.proprietárioestacionamento.usuário.nome" header="Proprietário Estacionamento" filter 
            showFilterOperator={false}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)} sortable/>
          <Column headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
            field="proposta.categoria" header="Categoria" filter filterMatchMode="equals"
            filterElement={DropdownÁreaTemplate} showClearButton={false}
            showFilterOperator={false} showFilterMatchModes={false}
            filterMenuClassName={estilizarFilterMenu()} showFilterMenuOptions={false} sortable/>
          <Column field="proposta.título" header="Proposta" filter showFilterOperator={false}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)} sortable/>
          <Column field="necessidade_bolsa" header="Necessidade de bolsa" dataType="boolean" filter 
            showFilterOperator={false} body={BooleanBodyTemplate} 
            filterElement={BooleanFilterTemplate} filterMatchMode="equals" showClearButton={false}
            showAddButton={false} filterMenuClassName={estilizarFilterMenu()}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)} sortable/>          
        </DataTable>
        <Divider className={estilizarDivider()}/>
        <Button className={estilizarBotãoRetornar()} label="Retornar" 
            onClick={retornarPáginaInicial}/>
        <Button className={estilizarBotão()} label="Adicionar" onClick={adicionarInteresse}/>
      </Card>
    </div>
  );
}