import md5 from "md5";
import { getManager } from "typeorm";
import Usuário, { Status } from "../entidades/usuário";
import Proprietário_Estacionamento from "../entidades/proprietário-estacionamento";
import ServiçosUsuário from "./serviços-usuário";
export default class ServiçosProprietárioEstacionamento {
    constructor() { }
    static async cadastrarProprietário_Estacionamento(request, response) {
        try {
            const { usuário_info, tipo_estacionamento, capacidade_total } = request.body;
            const { usuário, token } = await ServiçosUsuário.cadastrarUsuário(usuário_info);
            const entityManager = getManager();
            await entityManager.transaction(async (transactionManager) => {
                await transactionManager.save(usuário);
                const proprietário_estacionamento = Proprietário_Estacionamento.create({ usuário, tipo_estacionamento, capacidade_total });
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
            const proprietário_estacionamento = await Proprietário_Estacionamento.findOne({
                where: { usuário: cpf_encriptado },
                relations: ["usuário"]
            });
            if (!proprietário_estacionamento) return response.status(404).json({ erro: "Proprietário_Estacionamento não encontrado." });
            return response.json({
                nome: proprietário_estacionamento.usuário.nome, email: proprietário_estacionamento.usuário.email,
                tipo_estacionamento: proprietário_estacionamento.tipo_estacionamento,
                capacidade_total: proprietário_estacionamento.capacidade_total
            });
        } catch (error) { return response.status(500).json({ erro: "Erro BD : buscarProprietárioEstacionamento" }); }
    };
    static async atualizarProprietárioEstacionamento(request, response) {
        try {
            const { cpf, tipo_estacionamento, capacidade_total } = request.body;
            const cpf_encriptado = md5(cpf);
            await Proprietário_Estacionamento.update({ usuário: { cpf: cpf_encriptado } },
                { tipo_estacionamento, capacidade_total });
            return response.json();
        } catch (error) { return response.status(500).json({ erro: "Erro BD : atualizarProprietárioEstacionamento" }); }
    };
};