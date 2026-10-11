import md5 from "md5";
import { getManager } from "typeorm";
import Usuário, { Status } from "../entidades/usuário";
import ProprietárioEstacionamento from "../entidades/proprietário-estacionamento";
import ServiçosUsuário from "./serviços-usuário";
import VagaEstacionamento from "../entidades/vaga-estacionamento";
export default class ServiçosProprietárioEstacionamento {
    constructor() { }
    static async cadastrarProprietárioEstacionamento(request, response) {
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
    static async cadastrarVagaEstacionamento(request, response) {
        try {
            const { tipo_veículo, lugar, data_interesse_vaga, descrição, status, cpf } = request.body;
            const cpf_encriptado = md5(cpf);
            const proprietário_estacionamento = await ProprietárioEstacionamento.findOne({
                where: { usuário: cpf_encriptado }, relations: ["usuário"] });
            await VagaEstacionamento.create({ tipo_veículo, lugar, data_interesse_vaga, descrição, status,
                proprietário_estacionamento }).save();
            return response.json();
        } catch (error) { return response.status(500).json({ erro: "Erro BD : cadastrarVagaEstacionamento" }); }
    };
    static async alterarVagaEstacionamento(request, response) {
        try {
            const { id, tipo_veículo, lugar, data_interesse_vaga, descrição, status } = request.body;
            await VagaEstacionamento.update(id, { tipo_veículo, lugar, data_interesse_vaga, descrição, status });
            return response.json();
        } catch (error) { return response.status(500).json({ erro: "Erro BD : alterarVagaEstacionamento" }); }
    };
    static async removerVagaEstacionamento(request, response) {
        try {
            const id_vaga_estacionamento = request.params.id;
            const vaga_estacionamento = await VagaEstacionamento.findOne(id_vaga_estacionamento);
            await VagaEstacionamento.remove(vaga_estacionamento);
            return response.json();
        } catch (error) { return response.status(500).json({ erro: "Erro BD : removerVagaEstacionamento" }); }
    };
    static async buscarVagasEstacionamentoProprietárioEstacionamento(request, response) {
        try {
            const cpf_encriptado = md5(request.params.cpf);
            const vagas_estacionamento = await VagaEstacionamento.find({
                where: { proprietário_estacionamento: { usuário: cpf_encriptado } },
                relations: ["proprietário_estacionamento", "proprietário_estacionamento.usuário",
                    "alugueis_vagas", "alugueis_vagas.proprietário_carro"] });
            return response.json(vagas_estacionamento);
        } catch (error) { return response.status(500).json
            ({ erro: "Erro BD : buscarVagasEstacionamentoProprietárioEstacionamento" }); }
    };
    static filtrarLugaresEliminandoRepetição(vagas_estacionamento: VagaEstacionamento[]) {
        let lugares: { label: string, value: string }[];
        lugares = vagas_estacionamento.filter((vaga_estacionamento, índice, vagas_estacionamento_antes_filtrar) =>
            vagas_estacionamento_antes_filtrar.findIndex
                (vaga_estacionamento_anterior => vaga_estacionamento_anterior.lugar === vaga_estacionamento.lugar) === índice)
            .map(vaga_estacionamento => ({ label: vaga_estacionamento.lugar, value: vaga_estacionamento.lugar }));
        return lugares;
    };
    static async buscarLugaresVagasEstacionamento(request, response) {
        try {
            const vagas_estacionamento = await VagaEstacionamento.find();
            const lugares = ServiçosProprietárioEstacionamento.filtrarLugaresEliminandoRepetição(vagas_estacionamento);
            return response.json(lugares.sort());
        } catch (error) { return response.status(500).json
            ({ erro: "Erro BD : buscarLugaresVagasEstacionamento" }); }
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