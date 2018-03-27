import { Component, OnInit, OnDestroy } from "@angular/core";
import { Veiculo } from "../models/veiculo.model";
import { Mensagem } from "../models/mensagem.model";
import { Subscription } from "rxjs/Subscription";
import { zip } from "rxjs/observable/zip";
import { VeiculosService } from "../veiculos.service";
import { ActivatedRoute, Params } from "@angular/router";
import {
  DataShareService,
  DataShared,
  DataOrigin
} from "../data-share.service";
import { TipoVeiculo } from "../models/tipo-veiculo.model";
import { Modelo } from "../models/modelo.model";
import { Marca } from "../models/marca.model";

@Component({
  selector: "app-veiculo-editar",
  templateUrl: "./veiculo-editar.component.html",
  styleUrls: ["./veiculo-editar.component.css"]
})
export class VeiculoEditarComponent implements OnInit, OnDestroy {
  public veiculo: Veiculo;
  public mensagens: Mensagem[];
  public carregando: boolean = false;
  public edicao: boolean;
  public titulo: string;
  public tiposVeiculo: TipoVeiculo[];
  public marcas: Marca[] = [];
  public modelos: Modelo[] = [];
  private ngUnsub: Subscription = new Subscription();
  constructor(
    private service: VeiculosService,
    private route: ActivatedRoute,
    private dataShareService: DataShareService
  ) {}

  ngOnInit() {
    this.carregando = true;
    this.ngUnsub.add(
      this.route.params.subscribe((params: Params) => {
        let idVeiculo = params["id"];
        if (idVeiculo) {
          this.edicao = true;
          // this.titulo = `Editar ${nomeUsuario}`;
        } else {
          this.titulo = "Adicionar um veículo";
          this.edicao = false;
          this.veiculo = new Veiculo();
          this.veiculo.$modelo = new Modelo();
          this.veiculo.$modelo.$marca = new Marca();
          this.veiculo.$modelo.$marca.$tipoVeiculo = new TipoVeiculo();
        }
      })
    );
    zip(this.service.buscarTiposVeiculo()).subscribe(([tiposVeiculo]) => {
      this.tiposVeiculo = tiposVeiculo;
      this.carregando = false;
    });
  }

  ngOnDestroy() {
    this.ngUnsub.unsubscribe();
  }

  public selecionouTipoVeiculo() {
    this.carregando = true;
    this.veiculo.$modelo.$marca.$id = null;
    this.veiculo.$modelo.$id = null;
    this.service
      .buscarMarcasPorTipoVeiculo(this.veiculo.$modelo.$marca.$tipoVeiculo.$id)
      .subscribe((marcas: Marca[]) => {
        this.marcas = marcas;
        this.carregando = false;
      });
  }

  public selecionouMarca() {
    this.carregando = true;
    this.veiculo.$modelo.$id = null;
    this.service
      .buscarModelosPorMarca(this.veiculo.$modelo.$marca.$id)
      .subscribe((modelos: Modelo[]) => {
        this.modelos = modelos;
        this.carregando = false;
      });
  }
}
