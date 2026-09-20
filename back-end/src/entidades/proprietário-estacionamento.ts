import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from
    "typeorm";
import Usuário from "./usuário";

import Vagas_Estacionamento from "./vagas-estacionamento";
export enum Tipo_Estacionamento { COBERTO = "coberto", DESCOBERTO = "descoberto" };
@Entity()
export default class Proprietário_Estacionamento extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: "enum", enum: Tipo_Estacionamento })
    tipo_estacionamento: Tipo_Estacionamento;
    @Column()
    capacidade_total: number;
    @OneToMany(() => Vagas_Estacionamento, (vagas_estacionamento) => vagas_estacionamento.proprietário_estacionamento)
    vagas_estacionamento: Vagas_Estacionamento[];
    @OneToOne(() => Usuário, (usuário) => usuário.proprietário_estacionamento, { onDelete: "CASCADE" })
    @JoinColumn()
    usuário: Usuário;
}