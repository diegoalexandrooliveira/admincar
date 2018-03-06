import { meses } from "../utils";

export class ChartComparativo {
  private mesAno: string;
  private mesDescAno: string;
  private adquiridos: number;
  private vendidos: number;

  constructor(mesAno?: string, adquiridos?: number, vendidos?: number) {
    this.mesAno = mesAno;
    this.adquiridos = adquiridos;
    this.vendidos = vendidos;
    this.converterMesAno();
  }
  public get $mesAno(): string {
    return this.mesAno;
  }

  public set $mesAno(value: string) {
    this.mesAno = value;
    this.converterMesAno();
  }

  public get $adquiridos(): number {
    return this.adquiridos;
  }

  public set $adquiridos(value: number) {
    this.adquiridos = value;
  }

  public get $vendidos(): number {
    return this.vendidos;
  }

  public set $vendidos(value: number) {
    this.vendidos = value;
  }

  public get $mesDescAno(): string {
    return this.mesDescAno;
  }

  public set $mesDescAno(value: string) {
    this.mesDescAno = value;
  }

  private converterMesAno() {
    if (this.$mesAno) {
      let mes: number = parseInt(this.$mesAno.slice(0, 2));
      let ano: number = parseInt(this.$mesAno.slice(3));
      let mesDesc: string = meses()[mes - 1];
      this.$mesDescAno = mesDesc + "/" + ano.toString();
    }
  }
}
