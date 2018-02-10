export class Marca {

    constructor(private id?: Number, private descricao?: string, private tipo_veiculo_id?: Number) {
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

    public getTipoVeiculoId(): Number {
        return this.tipo_veiculo_id;
    }
    public setTipoVeiculoId(tipo_veiculo_id: Number): void {
        this.tipo_veiculo_id = tipo_veiculo_id;
    }
}