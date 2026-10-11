import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn }
    from "typeorm";
import Usuário from "./usuário";
import AluguelVaga from "./aluguel-vaga";
export enum Marca { FIAT = "Fiat", PEUGEOT = "Peugeot", CHEVROLET = "Chevrolet" };
@Entity()
export default class ProprietárioCarro extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: "enum", enum: Marca })
    marca: Marca;
    @Column()
    data_carro: number;
    @Column({ type: "date" })
    data_dono: Date;
    @Column()
    telefone: string;
    @OneToMany(() => AluguelVaga, aluguel_vaga => aluguel_vaga.proprietário_carro, { onDelete: "CASCADE" })
    alugueis_vagas: AluguelVaga[];
    @OneToOne(() => Usuário, usuário => usuário.proprietário_carro, { onDelete: "CASCADE" })
    @JoinColumn()
    usuário: Usuário;
}