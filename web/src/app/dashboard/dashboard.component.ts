import { Component, OnInit } from "@angular/core";
import { DashboardService } from "../dashboard.service";
import { ChartComparativo } from "../models/chart.comparativo.model";
import { Mensagem } from "../models/mensagem.model";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  constructor(private dashboardService: DashboardService) {}
  public mensagens: Mensagem[];
  public carregando: boolean = false;
  public lineChartData: Array<any> = [];
  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
    responsive: false
  };
  public lineChartReady: boolean = false;
  public lineChartColors: Array<any> = [
    {
      // grey
      backgroundColor: "rgba(148,159,177,0.2)",
      borderColor: "rgba(148,159,177,1)",
      pointBackgroundColor: "rgba(148,159,177,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(148,159,177,0.8)"
    },
    {
      // dark grey
      backgroundColor: "rgba(77,83,96,0.2)",
      borderColor: "rgba(77,83,96,1)",
      pointBackgroundColor: "rgba(77,83,96,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(77,83,96,1)"
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = "line";

  ngOnInit() {
    this.carregando = true;
    this.dashboardService.dadosComparativos().subscribe(
      (dados: ChartComparativo[]) => {
        let bottomLabels: string[] = [];
        let dataAdquiridos: number[] = [];
        let dataVendidos: number[] = [];
        dados.forEach(dado => {
          bottomLabels.push(dado.mesDescAno);
          dataAdquiridos.push(dado.adquiridos);
          dataVendidos.push(dado.vendidos);
        });
        this.lineChartData = [
          { data: dataAdquiridos, label: "Adquiridos" },
          { data: dataVendidos, label: "Vendidos" }
        ];
        this.lineChartLabels = bottomLabels;
        this.lineChartReady = true;
        this.carregando = false;
      },
      error => {
        console.log(error);
        this.carregando = false;
        this.mensagens = Array.of(
          new Mensagem(
            "Problemas ao recuperar os dados. Tente novamente mais tarde.",
            "erro"
          )
        );
      }
    );
  }
}
