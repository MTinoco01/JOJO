import { BaseEntity, Column, CreateDateColumn, Entity, OneToOne, PrimaryColumn } from "typeorm";
import Proprietário_Estacionamento from "./proprietário-estacionamento";
import Proprietário_Carro from "./proprietário-carro";
export enum Perfil { PROPRIETÁRIO_CARRO = "proprietário_carro", PROPRIETÁRIO_ESTACIONAMENTO = "proprietário_estacionamento" };
export enum Status { PENDENTE = "pendente", ATIVO = "ativo", INATIVO = "inativo"};
export enum Cores {
    AMARELO = "yellow", ANIL = "indigo", AZUL = "blue", AZUL_PISCINA = "cyan",
    CINZA_ESCURO = "bluegray", LARANJA = "orange", ROSA = "pink", ROXO = "purple", VERDE = "green",
    VERDE_AZULADO = "teal"
};
@Entity()
export default class Usuário extends BaseEntity {
    @PrimaryColumn()
    cpf: string;
    @Column({ type: "enum", enum: Perfil })
    perfil: Perfil;
    @Column({ type: "enum", enum: Status, default: Status.PENDENTE })
    status: Status;
    @Column()
    nome: string;
    @Column()
    email: string;
    @Column()
    senha: string;
    @Column()
    questão: string;
    @Column()
    resposta: string;
    @Column({ type: "enum", enum: Cores })
    cor_tema: string;
    @OneToOne(() => Proprietário_Estacionamento, (proprietário_estacionamento) => proprietário_estacionamento.usuário)
    proprietário_estacionamento: Proprietário_Estacionamento;
    @OneToOne(() => Proprietário_Carro, (proprietário_carro) => proprietário_carro.usuário)
    proprietário_carro: Proprietário_Carro;
    @CreateDateColumn()
    data_criação: Date;
}