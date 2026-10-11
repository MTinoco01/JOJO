import md5 from "md5";
import { getManager } from "typeorm";
import Usuário, { Status } from "../entidades/usuário";
import ProprietárioEstacionamento from "../entidades/proprietário-estacionamento";
import ServiçosUsuário from "./serviços-usuário";
import Proposta from "../entidades/proposta";
export default class ServiçosProprietárioEstacionamento {
    constructor() { }
    static async cadastrarProprietário_Estacionamento(request, response) {
        try {
            const { usuário_info, tipo_estacionamento, capacidade_total } = request.body;
            const { usuário, token } = await ServiçosUsuário.cadastrarUsuário(usuário_info);
            const entityManager = getManager();
            await entityManager.transaction(async (transactionManager) => {
                await transactionManager.save(usuário);
                const proprietário_estacionamento = ProprietárioEstacionamento.create({ usuário, tipo_estacionamento, capacidade_total });
                await transactionManager.save(proprietário_estacionamento);
                await transactionManager.update(Usuário, usuário.cpf, { status: Status.ATIVO });
                return response.json({ status: Status.ATIVO, token });
            });
        } catch (error) {
            return response.status(500).json({ erro: error });
        }
    };
        static async buscarProprietárioEstacionamento(request, response) {
        try {
            const cpf_encriptado = md5(request.params.cpf);
            const proprietário_estacionamento = await ProprietárioEstacionamento.findOne({
                where: { usuário: cpf_encriptado },
                relations: ["usuário"]
            });
            if (!proprietário_estacionamento) return response.status(404).json({ erro: "ProprietárioEstacionamento não encontrado." });
            return response.json({
                nome: proprietário_estacionamento.usuário.nome, email: proprietário_estacionamento.usuário.email,
                tipo_estacionamento: proprietário_estacionamento.tipo_estacionamento,
                capacidade_total: proprietário_estacionamento.capacidade_total
            });
        } catch (error) { return response.status(500).json({ erro: "Erro BD : buscarProprietárioEstacionamento" }); }
    };
    static async cadastrarProposta (request, response) {
    try {
      const {título, categoria, área_atuação, data_início, descrição, concorrendo_bolsa, resultado, 
        cpf} = request.body;
      const cpf_encriptado = md5(cpf);
      const proprietárioestacionamento = await ProprietárioEstacionamento.findOne({ where: { usuário: cpf_encriptado },
        relations: ["usuário" ] });
      await Proposta.create({título, categoria, área_atuação, data_início, descrição, 
        concorrendo_bolsa, resultado, proprietárioestacionamento}).save();
      return response.json();
    } catch (error) { return response.status(500).json({ erro: "Erro BD : cadastrarProposta" }); }
    };
    static async alterarProposta(request, response) {
        try {
        const {id, título, categoria, área_atuação, data_início, descrição, concorrendo_bolsa, 
            resultado} = request.body;
        await Proposta.update(id, {título, categoria, área_atuação, data_início, descrição, 
            concorrendo_bolsa, resultado});
        return response.json();
        } catch (error) { return response.status(500).json({ erro: "Erro BD : alterarProposta" }); }
    };
    static async removerProposta(request, response) {
        try {
        const id_proposta = request.params.id;
        const proposta = await Proposta.findOne(id_proposta);
        await Proposta.remove(proposta);
        return response.json();
        } catch (error) { return response.status(500).json({ erro: "Erro BD : removerProposta" }); }
    };
    static async buscarPropostasProprietárioEstacionamento(request, response) {
        try {
        const cpf_encriptado = md5(request.params.cpf);
        const propostas = await Proposta.find({ where: { proprietárioestacionamento: { usuário: cpf_encriptado } },
            relations: ["proprietário estacionamento", "proprietárioestacionamento.usuário"] });
        return response.json(propostas);
        } catch (error) { return response.status(500).json
        ({ erro: "Erro BD : buscarPropostasProprietárioEstacionamento" }); }
    };
    static filtrarÁreasAtuaçãoEliminandoRepetição(propostas: Proposta[]) {
        let áreas_atuação: { label: string, value: string }[];
        áreas_atuação = propostas.filter((proposta, índice, propostas_antes_filtrar) =>
        propostas_antes_filtrar.findIndex
            (proposta_anterior => proposta_anterior.área_atuação === proposta.área_atuação) === índice)
            .map(proposta => ({ label: proposta.área_atuação, value: proposta.área_atuação }));
        return áreas_atuação;
    };
    static async buscarÁreasAtuaçãoPropostas(request, response) {
        try {
        const propostas = await Proposta.find();
        const áreas_atuação = ServiçosProprietárioEstacionamento.filtrarÁreasAtuaçãoEliminandoRepetição(propostas);
        return response.json(áreas_atuação.sort());
        } catch (error) { return response.status(500).json
        ({ erro: "Erro BD : buscarÁreasAtuaçãoPropostas" }); }
    };
    static async atualizarProprietárioEstacionamento(request, response) {
        try {
            const { cpf, tipo_estacionamento, capacidade_total } = request.body;
            const cpf_encriptado = md5(cpf);
            await ProprietárioEstacionamento.update({ usuário: { cpf: cpf_encriptado } },
                { tipo_estacionamento, capacidade_total });
            return response.json();
        } catch (error) { return response.status(500).json({ erro: "Erro BD : atualizarProprietárioEstacionamento" }); }
    };
};