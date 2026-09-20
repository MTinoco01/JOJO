import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn }
    from "typeorm";
import Usuário from "./usuário";
import Aluguel_Vaga from "./aluguel-vaga";
export enum Marca { FIAT = "Fiat", PEGOUT = "Pegout", CHEVROLET = "Chevrolet" };
@Entity()
export default class Proprietário_Carro extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: "enum", enum: Marca })
    marca: Marca;
    @Column({ type: "date" })
    data_carro: Date;
    @Column()
    telefone: string;
    @OneToMany(() => Aluguel_Vaga, aluguel_vaga => aluguel_vaga.proprietário_carro, { onDelete: "CASCADE" })
    aluguéis_vaga: Aluguel_Vaga[];
    @OneToOne(() => Usuário, usuário => usuário.proprietário_carro, { onDelete: "CASCADE" })
    @JoinColumn()
    usuário: Usuário;
}