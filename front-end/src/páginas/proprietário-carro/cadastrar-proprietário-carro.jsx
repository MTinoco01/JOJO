import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { InputMask } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import ContextoUsuário from "../../contextos/contexto-usuário";
import { ANO_MÁSCARA, TELEFONE_MÁSCARA } from "../../utilitários/máscaras";
import { serviçoCadastrarProprietárioCarro, serviçoAtualizarProprietárioCarro, serviçoBuscarProprietárioCarro }
from "../../serviços/serviços-proprietário-carro";
import mostrarToast from "../../utilitários/mostrar-toast";

import { MostrarMensagemErro, checarListaVazia, validarCamposObrigatórios }
from "../../utilitários/validações";
import { TAMANHOS, estilizarBotão, estilizarBotãoRetornar, estilizarCard, estilizarDivCampo,
estilizarDivider, estilizarDropdown, estilizarFlex, estilizarInlineFlex, estilizarInputMask,
estilizarInputText, estilizarLabel } from "../../utilitários/estilos";
export default function CadastrarProprietárioCarro() {
    const referênciaToast = useRef(null);
    const { usuárioLogado, setUsuárioLogado } = useContext(ContextoUsuário);
    const [dados, setDados] = useState({ marca: "", data_carro: "", data_dono: "",
    telefone: "" });
    const [erros, setErros] = useState({});
    const [cpfExistente, setCpfExistente] = useState(false);
    const navegar = useNavigate();
    const opçõesMarca = [{ label: "Fiat", value: "Fiat"},{label: "Pegout",value: "Pegout" },
    {label: "Chevrolet", value: "Chevrolet" }];
    function alterarEstado(event) {
        const chave = event.target.name || event.value;
        const valor = event.target.value;
        setDados({ ...dados, [chave]: valor });
    };
    function validarCampos() {
        let errosCamposObrigatórios;
        errosCamposObrigatórios = validarCamposObrigatórios(dados);
        setErros(errosCamposObrigatórios);
        return checarListaVazia(errosCamposObrigatórios);
    };
    function títuloFormulário() {
        if (usuárioLogado?.cadastrado) return "Alterar Proprietário Carro";
        else return "Cadastrar Proprietário Carro";
    };
        async function cadastrarProprietárioCarro() {
        if (validarCampos()) {
            try {
                const response = await serviçoCadastrarProprietárioCarro({ ...dados, usuário_info: usuárioLogado,
                marca: dados.marca, data_carro: dados.data_carro,
                data_dono: dados.data_dono, telefone: dados.telefone });
                if (response.data)
                setUsuárioLogado(usuário => ({ ...usuário, status: response.data.status,
                token: response.data.token }));
                mostrarToast(referênciaToast, "Proprietário Carro cadastrado com sucesso!", "sucesso");
            } catch (error) {
                setCpfExistente(true);
                mostrarToast(referênciaToast, error.response?.data?.erro || "Servidor indisponível.", "erro");
            }
        }
    };
    async function atualizarProprietárioCarro() {
        if (validarCampos()) {
            try {
                const response = await serviçoAtualizarProprietárioCarro({ ...dados, cpf: usuárioLogado.cpf });
                if (response) mostrarToast(referênciaToast, "Proprietário Carro atualizado com sucesso!", "sucesso");
            } catch (error) { mostrarToast(referênciaToast, error.response?.data?.erro || "Servidor indisponível.", "erro"); }
        }
    };
    function labelBotãoSalvar() {
        if (usuárioLogado?.cadastrado) return "Alterar";
        else return "Cadastrar";
    };
    function açãoBotãoSalvar() {
        if (usuárioLogado?.cadastrado) atualizarProprietárioCarro();
        else cadastrarProprietárioCarro();
    };

    function redirecionar() {
            if (cpfExistente) {
            setUsuárioLogado(null);
            navegar("/criar-usuario");
        } else {
            setUsuárioLogado(usuárioLogado => ({ ...usuárioLogado, cadastrado: true }));
            navegar("/pagina-inicial");
        }
    };
    useEffect(() => {
        let desmontado = false;
        async function buscarDadosProprietárioCarro() {
            try {
                const response = await serviçoBuscarProprietárioCarro(usuárioLogado.cpf);
                if (!desmontado && response.data) {
                    setDados(dados => ({ ...dados, marca: response.data.marca,
                    data_carro: String(response.data.data_carro),

                    data_dono: response.data.data_dono, telefone: response.data.telefone }));
                }
            } catch (error) {
                const erro = error.response?.data?.erro;
                if (erro) mostrarToast(referênciaToast, erro, "erro");
            }
        }
        if (usuárioLogado?.cadastrado) buscarDadosProprietárioCarro();
        return () => desmontado = true;
    }, [usuárioLogado?.cadastrado, usuárioLogado.cpf]);
    return (
    <div className={estilizarFlex()}>
        <Toast ref={referênciaToast} onHide={redirecionar} position="bottom-center"/>
        <Card title={títuloFormulário()} className={estilizarCard(usuárioLogado.cor_tema)}>
            <div className={estilizarDivCampo()}>
                <label className={estilizarLabel(usuárioLogado.cor_tema)}>Marca*:</label>
                <Dropdown name="marca" className={estilizarDropdown(erros.marca, usuárioLogado.cor_tema)}
                value={dados.marca} options={opçõesMarca} onChange={alterarEstado}

                placeholder="-- Selecione --"/>
                <MostrarMensagemErro mensagem={erros.marca}/>
            </div>
            <div className={estilizarDivCampo()}>
                <label className={estilizarLabel(usuárioLogado.cor_tema)}>Ano da Compra do Carro*:</label>
                <InputMask name="data_carro" autoClear size={TAMANHOS.ANO} onChange={alterarEstado}
                className={estilizarInputMask(erros.data_carro, usuárioLogado.cor_tema)}
                mask={ANO_MÁSCARA} value={dados.data_carro}/>
                <MostrarMensagemErro mensagem={erros.data_carro}/>
            </div>
            <div className={estilizarDivCampo()}>
                <label className={estilizarLabel(usuárioLogado.cor_tema)}>Data de Nascimento*:</label>
                <InputText name="data_dono" type="date" value={dados.data_dono}
                className={estilizarInputText(erros.data_dono, usuárioLogado.cor_tema)}
                onChange={alterarEstado}/>
                <MostrarMensagemErro mensagem={erros.data_dono}/>
            </div>
            <div className={estilizarDivCampo()}>
                <label className={estilizarLabel(usuárioLogado.cor_tema)}>Telefone*:</label>
                <InputMask name="telefone" autoClear size={TAMANHOS.TELEFONE} onChange={alterarEstado}
                className={estilizarInputMask(erros.telefone, usuárioLogado.cor_tema)}
                mask={TELEFONE_MÁSCARA} value={dados.telefone}/>
                <MostrarMensagemErro mensagem={erros.telefone}/>
            </div>
            <Divider className={estilizarDivider(dados.cor_tema)}/>
            <div className={estilizarInlineFlex()}>
                <Button className={estilizarBotãoRetornar()} label="Retornar" onClick={redirecionar} />
                <Button className={estilizarBotão()} label={labelBotãoSalvar()} onClick={açãoBotãoSalvar}/>
            </div>
        </Card>
    </div>
    );
};