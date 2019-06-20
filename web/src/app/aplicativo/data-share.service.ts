import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";

@Injectable()
export class DataShareService {
  private dataShared: DataShared = { origin: DataOrigin.NONE, data: "" };
  private dataBeahvior: BehaviorSubject<DataShared> = new BehaviorSubject<
    DataShared
  >(this.dataShared);

  public dataObservable: Observable<
    DataShared
  > = this.dataBeahvior.asObservable();

  constructor() { }

  shareData(data: DataShared) {
    this.dataBeahvior.next(data);
  }

  limparMensagens() {
    this.dataShared.origin = DataOrigin.NONE;
    this.dataShared.data = null;
    this.dataBeahvior.next(this.dataShared);
  }
}

export interface DataShared {
  origin: DataOrigin;
  data: any;
}

export enum DataOrigin {
  NONE = 0,
  USUARIOS_EDITAR = 1,
  VEICULOS_EDITAR = 2
}
