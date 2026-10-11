import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from
    "typeorm";
import ProprietárioCarro from "./proprietário-carro";
import VagaEstacionamento from "./vaga-estacionamento";
@Entity()
export default class AluguelVaga extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    justificativa: string;
    @CreateDateColumn()
    data_manifestação: Date;
    @ManyToOne(() => VagaEstacionamento, (vaga_estacionamento) => vaga_estacionamento.alugueis_vagas, { onDelete: "CASCADE" })
    vaga_estacionamento: VagaEstacionamento;
    @ManyToOne(() => ProprietárioCarro, (proprietário_carro) => proprietário_carro.alugueis_vagas, { onDelete: "CASCADE" })
    proprietário_carro: ProprietárioCarro;
}