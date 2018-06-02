import { Component, OnInit, Input, ViewEncapsulation } from "@angular/core";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-layout",
  templateUrl: "./app.layout.component.html",
  styleUrls: ["./app.layout.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class AppLayoutComponent implements OnInit {
  constructor(private titleService: Title) {}

  ngOnInit() {
    this.titleService.setTitle("AdminCar - Gerenciador de veículos");
  }
}
