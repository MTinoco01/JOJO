import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from
    "typeorm";
import Usuário from "./usuário";

import VagaEstacionamento from "./vaga-estacionamento";
export enum Tipo_Estacionamento { COBERTO = "coberto", DESCOBERTO = "descoberto" };
@Entity()
export default class ProprietárioEstacionamento extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: "enum", enum: Tipo_Estacionamento })
    tipo_estacionamento: Tipo_Estacionamento;
    @Column()
    capacidade_total: number;
    @OneToMany(() => VagaEstacionamento, (vagas_estacionamento) => vagas_estacionamento.proprietário_estacionamento)
    vagas_estacionamento: VagaEstacionamento[];
    @OneToOne(() => Usuário, (usuário) => usuário.proprietário_estacionamento, { onDelete: "CASCADE" })
    @JoinColumn()
    usuário: Usuário;
}