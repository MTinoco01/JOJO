import { BaseEntity, Column, CreateDateColumn, Entity, OneToOne, PrimaryColumn } from "typeorm";
import ProprietárioEstacionamento from "./proprietário-estacionamento";
import ProprietárioCarro from "./proprietário-carro";
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
    @OneToOne(() => ProprietárioEstacionamento, (proprietário_estacionamento) => proprietário_estacionamento.usuário)
    proprietário_estacionamento: ProprietárioEstacionamento;
    @OneToOne(() => ProprietárioCarro, (proprietário_carro) => proprietário_carro.usuário)
    proprietário_carro: ProprietárioCarro;
    @CreateDateColumn()
    data_criação: Date;
}