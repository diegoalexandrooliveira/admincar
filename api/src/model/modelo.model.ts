import { Marca } from "./marca.model";

export class Modelo {
    constructor(private id?: Number, private descricao?: string, private marca?: Marca) {
        marca = new Marca();
    }

    public getId(): Number {
        return this.id;
    }
    public setId(id: Number): void {
        this.id = id;
    }

    public getDescricao(): string {
        return this.descricao;
    }
    public setDescricao(descricao: string): void {
        this.descricao = descricao;
    }

    public getMarca(): Marca {
        return this.marca;
    }
    public setMarca(marca: Marca): void {
        this.marca = marca;
    }

}