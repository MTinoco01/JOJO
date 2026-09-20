import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Proprietário_Estacionamento from "./proprietário-estacionamento";
import Aluguel_Vaga from "./aluguel-vaga";
export enum Tipo_Veículo { CARRO = "carro", MOTO = "moto", CAMINHÂO = "caminhão" };
export enum Status {
    DISPONÍVEL = "disponível", ALUGADA = "alugada"
};
@Entity()
export default class Vagas_Estacionamento extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: "enum", enum: Tipo_Veículo })
    tipo_veículo: Tipo_Veículo;
    @Column()
    endereço: string;
    @Column({ type: "date" })
    data_interesse_vaga: Date;
    @Column()
    descrição: string;
    @Column({ type: "enum", enum: Status })
    status: Status;
    @ManyToOne(() => Proprietário_Estacionamento, (proprietário_estacionamento) => proprietário_estacionamento.vagas_estacionamento, { onDelete: "CASCADE" })
    proprietário_estacionamento: Proprietário_Estacionamento;
    @OneToMany(() => Aluguel_Vaga, (aluguel_vaga) => aluguel_vaga.vagas_estacionamento)
    aluguéis_vaga: Aluguel_Vaga[];
}