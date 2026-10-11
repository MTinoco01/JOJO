import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Toast } from "primereact/toast";
import ContextoUsuário from "../../contextos/contexto-usuário";
import { serviçoCadastrarProprietárioEstacionamento, serviçoBuscarProprietárioEstacionamento, serviçoAtualizarProprietárioEstacionamento}
    from "../../serviços/serviços-proprietário-estacionamento";
import mostrarToast from "../../utilitários/mostrar-toast";
import { MostrarMensagemErro, checarListaVazia, validarCamposObrigatórios }
    from "../../utilitários/validações";
import {
    estilizarBotão, estilizarBotãoRetornar, estilizarCard, estilizarDivCampo, estilizarDivider,
    estilizarDropdown, estilizarFlex, estilizarInlineFlex, estilizarInputNumber, estilizarLabel
}
    from "../../utilitários/estilos";
export default function CadastrarProprietárioEstacionamento() {
    const referênciaToast = useRef(null);
    const { usuárioLogado, setUsuárioLogado } = useContext(ContextoUsuário);
    const [dados, setDados] = useState({ tipo_estacionamento: "", capacidade_total: "" });
    const [erros, setErros] = useState({});
    const [cpfExistente, setCpfExistente] = useState(false);
    const navegar = useNavigate();
    const opçõesTipo_estacionamento = [{ label: "Coberto", value: "coberto" },
    { label: "Descoberto", value: "descoberto" }];
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
        if (usuárioLogado?.cadastrado) return "Alterar ProprietárioEstacionamento";
        else return "Cadastrar ProprietárioEstacionamento";
    };
    async function cadastrarProprietárioEstacionamento() {
        if (validarCampos()) {
            try {
                const response = await serviçoCadastrarProprietárioEstacionamento({
                    ...dados, usuário_info: usuárioLogado,
                    tipo_estacionamento: dados.tipo_estacionamento,
                    capacidade_total: dados.capacidade_total
                });
                if (response.data)
                    setUsuárioLogado(usuário => ({
                        ...usuário, status: response.data.status,
                        token: response.data.token
                    }));
                mostrarToast(referênciaToast, "ProprietárioEstacionamento cadastrado com sucesso!", "sucesso");
            } catch (error) {
                setCpfExistente(true);
                mostrarToast(referênciaToast, error.response.data.erro, "erro");
            }
        }
    };
    function labelBotãoSalvar() {
        if (usuárioLogado?.cadastrado) return "Alterar";
        else return "Cadastrar";
    };
    function açãoBotãoSalvar() {
        if (usuárioLogado?.cadastrado) atualizarProprietárioEstacionamento();
        else cadastrarProprietárioEstacionamento();
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
    async function atualizarProprietárioEstacionamento() {
if (validarCampos()) {
try {
const response = await serviçoAtualizarProprietárioEstacionamento({ ...dados, cpf: usuárioLogado.cpf });
if (response) mostrarToast(referênciaToast, "ProprietárioEstacionamento atualizado com sucesso!", "sucesso");
} catch (error) { mostrarToast(referênciaToast, error.response.data.erro, "erro"); }
}
};
    useEffect(() => {
        let desmontado = false;
        async function buscarDadosProprietárioEstacionamento() {
            try {
                const response = await serviçoBuscarProprietárioEstacionamento(usuárioLogado.cpf);
                if (!desmontado && response.data) {
                    setDados(dados => ({
                        ...dados, tipo_estacionamento: response.data.tipo_estacionamento,
                        capacidade_total: response.data.capacidade_total
                    }));
                }
            } catch (error) {
                const erro = error.response.data.erro;
                if (erro) mostrarToast(referênciaToast, erro, "erro");
            }
        }
        if (usuárioLogado?.cadastrado) buscarDadosProprietárioEstacionamento();
        return () => desmontado = true;
    }, [usuárioLogado?.cadastrado, usuárioLogado.cpf]);
    return (
        <div className={estilizarFlex()}>
            <Toast ref={referênciaToast} onHide={redirecionar} position="bottom-center" />
            <Card title={títuloFormulário()} className={estilizarCard(usuárioLogado.cor_tema)}>
                <div className={estilizarDivCampo()}>
                    <label className={estilizarLabel(usuárioLogado.cor_tema)}>Tipo_Estacionamento*:</label>
                    <Dropdown name="tipo_estacionamento"
                        className={estilizarDropdown(erros.tipo_estacionamento, usuárioLogado.cor_tema)}
                        value={dados.tipo_estacionamento} options={opçõesTipo_estacionamento} onChange={alterarEstado}
                        placeholder="-- Selecione --" />
                    <MostrarMensagemErro mensagem={erros.tipo_estacionamento} />
                </div>
                <div className={estilizarDivCampo()}>
                    <label className={estilizarLabel(usuárioLogado.cor_tema)}>
                        Quantidade de Vagas Disponivel*:</label>
                    <InputNumber name="capacidade_total" size={5}
                        value={dados.capacidade_total}
                        onValueChange={alterarEstado} mode="decimal"
                        inputClassName={estilizarInputNumber(erros.capacidade_total,
                            usuárioLogado.cor_tema)} />
                    <MostrarMensagemErro mensagem={erros.capacidade_total} />
                </div>
                <Divider className={estilizarDivider(dados.cor_tema)} />
                <div className={estilizarInlineFlex()}>
                    <Button className={estilizarBotãoRetornar()} label="Retornar" onClick={redirecionar} />
                    <Button className={estilizarBotão()} label={labelBotãoSalvar()} onClick={açãoBotãoSalvar} />
                </div>
            </Card>
        </div>
    );
};