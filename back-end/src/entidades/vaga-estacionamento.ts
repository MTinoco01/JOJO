import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import ProprietárioEstacionamento from "./proprietário-estacionamento";
import AluguelVaga from "./aluguel-vaga";
export enum Tipo_Veículo { CARRO = "carro", MOTO = "moto", CAMINHÃO = "caminhão" };
export enum Status {
    DISPONÍVEL = "disponível", ALUGADA = "alugada"
};
@Entity()
export default class VagaEstacionamento extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: "enum", enum: Tipo_Veículo })
    tipo_veículo: Tipo_Veículo;
    @Column()
    lugar: string;
    @Column({ type: "date" })
    data_interesse_vaga: Date;
    @Column()
    descrição: string;
    @Column({ type: "enum", enum: Status })
    status: Status;
    @ManyToOne(() => ProprietárioEstacionamento, (proprietário_estacionamento) => proprietário_estacionamento.vagas_estacionamento, { onDelete: "CASCADE" })
    proprietário_estacionamento: ProprietárioEstacionamento;
    @OneToMany(() => AluguelVaga, (aluguel_vaga) => aluguel_vaga.vaga_estacionamento)
    alugueis_vagas: AluguelVaga[];
}