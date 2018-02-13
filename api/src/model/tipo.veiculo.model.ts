export class TipoVeiculo {


    constructor(private id?: number, private descricao?: string) {

    }

    public get $id(): number {
        return this.id;
    }

    public set $id(id: number) {
        this.id = id;
    }

    public get $descricao(): string {
        return this.descricao;
    }

    public set $descricao(descricao: string) {
        this.descricao = descricao;
    }
}