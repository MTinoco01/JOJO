import md5 from "md5";
import { getManager } from "typeorm";
import Usuário, { Status } from "../entidades/usuário";
import ProprietárioCarro from '../entidades/proprietário-carro';
import ServiçosUsuário from "./serviços-usuário";
import VagaEstacionamento from "../entidades/vaga-estacionamento";
import AluguelVaga from "../entidades/aluguel-vaga";

export default class ServiçosProprietárioCarro {
    constructor() {}
    static async cadastrarProprietárioCarro(request, response) {
        try {
            const { usuário_info, marca, data_carro, data_dono, telefone } = request.body;
            const { usuário, token } = await ServiçosUsuário.cadastrarUsuário(usuário_info);
            const entityManager = getManager();
            await entityManager.transaction(async (transactionManager) => {
                await transactionManager.save(usuário);
                const proprietário_carro = ProprietárioCarro.create({ usuário, marca, data_carro, data_dono, telefone });
                await transactionManager.save(proprietário_carro);
                await transactionManager.update(Usuário, usuário.cpf, { status: Status.ATIVO });
                return response.json({ status: Status.ATIVO, token });
            });
        } catch (error) { return response.status(500).json({ erro: error }); }
    };
    static async atualizarProprietárioCarro(request, response) {
        try {
            const { cpf, marca, data_carro, data_dono, telefone } = request.body;
            const cpf_encriptado = md5(cpf);
            await ProprietárioCarro.update({ usuário: { cpf: cpf_encriptado } }, { marca, data_carro, data_dono, telefone });
            return response.json();
        } catch (error) { return response.status(500).json({ erro: "Erro BD : atualizarProprietárioCarro" }); }
    };
    static async buscarProprietárioCarro(request, response) {
        try {
            const cpf_encriptado = md5(request.params.cpf);
            const proprietário_carro = await ProprietárioCarro.findOne({ where: { usuário: cpf_encriptado }, relations: ["usuário"] });
            if (!proprietário_carro) return response.status(404).json({ erro: "Proprietário de carro não encontrado." });
            return response.json({ nome: proprietário_carro.usuário.nome, email: proprietário_carro.usuário.email,
                marca: proprietário_carro.marca, data_carro: proprietário_carro.data_carro,
                data_dono: proprietário_carro.data_dono, telefone: proprietário_carro.telefone });
        } catch (error) { return response.status(500).json({ erro: "Erro BD : buscarProprietárioCarro" }); }
    };
    static async cadastrarAluguelVaga(request, response) {
        try {
            const { id_vaga_estacionamento, justificativa, cpf } = request.body;
            const cpf_encriptado = md5(cpf);
            const proprietário_carro = await ProprietárioCarro.findOne({ where: { usuário: cpf_encriptado } });
            const vaga_estacionamento = await VagaEstacionamento.findOne(id_vaga_estacionamento);
            const alugueis_vagas = await AluguelVaga.find({ where: { proprietário_carro, vaga_estacionamento } });
            if (alugueis_vagas.length > 0) return response.status(404).json
                ({ erro: "O proprietário do carro já cadastrou aluguel para a vaga." });
            await AluguelVaga.create({ justificativa, proprietário_carro, vaga_estacionamento }).save();
            return response.json();
        } catch (error) { return response.status(500).json({ erro: "Erro BD : cadastrarAluguelVaga" }); }
    };
    static async removerAluguelVaga(request, response) {
        try {
            const id = request.params.id;
            await AluguelVaga.delete(id);
            return response.json();
        } catch (error) { return response.status(500).json({ erro: "Erro BD : removerAluguelVaga" }); }
    };
    static async buscarAlugueisVagasProprietárioCarro(request, response) {
        try {
            const cpf_encriptado = md5(request.params.cpf);
            const alugueis_vagas = await AluguelVaga.find({ where: { proprietário_carro: { usuário: cpf_encriptado } },
                relations: ["proprietário_carro", "proprietário_carro.usuário", "vaga_estacionamento",
                    "vaga_estacionamento.proprietário_estacionamento",
                    "vaga_estacionamento.proprietário_estacionamento.usuário"] });
            return response.json(alugueis_vagas);
        } catch (error) { return response.status(500).json
            ({ erro: "Erro BD : buscarAlugueisVagasProprietárioCarro" }); }
    };
    static async buscarVagasEstacionamento(request, response) {
        try {
            const vagas_estacionamento = await VagaEstacionamento.find({
                relations: ["proprietário_estacionamento", "proprietário_estacionamento.usuário"] });
            return response.json(vagas_estacionamento);
        } catch (error) { return response.status(500).json({ erro: "Erro BD : buscarVagasEstacionamento" }); }
    };
}