import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from
    "typeorm";
import Proprietário_Carro from "./proprietário-carro";
import Vagas_Estacionamento from "./vagas-estacionamento";
@Entity()
export default class Aluguel_Vaga extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    justificativa: string;
    @CreateDateColumn()
    data_manifestação: Date;
    @ManyToOne(() => Vagas_Estacionamento, (vagas_estacionamento) => vagas_estacionamento.aluguéis_vaga)
    vagas_estacionamento: Vagas_Estacionamento;
    @ManyToOne(() => Proprietário_Carro, (proprietário_carro) => proprietário_carro.aluguéis_vaga, { onDelete: "CASCADE" })
    proprietário_carro: Proprietário_Carro;
}