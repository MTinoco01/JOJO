import md5 from "md5";
import { getManager } from "typeorm";
import Usuário, { Status } from "../entidades/usuário";
import ProprietárioCarro from '../entidades/proprietário-carro';
import ServiçosUsuário from "./serviços-usuário";
import Proposta from "../entidades/proposta";
import Interesse from "../entidades/interesse";

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
     static async cadastrarInteresse(request, response) {
    try {
      const { id_proposta, necessidade_bolsa, justificativa, cpf } = request.body;
      const cpf_encriptado = md5(cpf);
      const proprietáriocarro = await Proprietáriorro.findOne({ where: { usuário: cpf_encriptado } });
      const proposta = await Proposta.findOne(id_proposta);
      const interesses = await Interesse.find({ where: { proprietáriocarro, proposta }});
      if (interesses.length > 0) return response.status(404).json
        ({ erro: "O proprietário do carro já cadastrou interesse para a proposta." });
      await Interesse.create({ necessidade_bolsa, justificativa, proprietáriocarro, proposta }).save();
      return response.json();
    } catch (error) { return response.status(500).json({ erro: "Erro BD : cadastrarInteresse" }); }
  };
  static async removerInteresse(request, response) {
    try {
      const id = request.params.id;
      await Interesse.delete(id);
      return response.json();
    } catch (error) { return response.status(500).json({ erro: "Erro BD : removerInteresse" }); }
  };
  static async buscarInteressesProprietáriorro(request, response) {
    try {
      const cpf_encriptado = md5(request.params.cpf);
      const interesses = await Interesse.find({ where: { proprietáriocarro: { usuário: cpf_encriptado } },
        relations: ["proprietário do carro", "proprietáriocarro.usuário", "proposta", "proposta.professor", 
          "proposta.professor.usuário" ] });
      return response.json(interesses);
    } catch (error) { return response.status(500).json
       ({ erro: "Erro BD : buscarInteressesProprietáriorro" }); }
  };
    static async buscarPropostas(request, response) {
    try {
            const propostas = await Proposta.find({ relations: ["professor", "professor.usuário"] });
            return response.json(propostas);
        } catch (error) { return response.status(500).json({ erro: "Erro BD : buscarPropostas" }); }
    };
}