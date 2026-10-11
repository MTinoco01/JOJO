import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from
    "typeorm";
import ProprietárioCarro from "./proprietário-carro";
import VagasEstacionamento from "./vaga-estacionamento";
@Entity()
export default class AluguelVaga extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    justificativa: string;
    @CreateDateColumn()
    data_manifestação: Date;
    @ManyToOne(() => VagasEstacionamento, (vagas_estacionamento) => vagas_estacionamento.aluguéis_vaga)
    vagas_estacionamento: VagasEstacionamento;
    @ManyToOne(() => ProprietárioCarro, (proprietário_carro) => proprietário_carro.aluguéis_vaga, { onDelete: "CASCADE" })
    proprietário_carro: ProprietárioCarro;
}