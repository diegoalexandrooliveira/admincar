import { Component, OnInit, Input } from "@angular/core";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-login-layout",
  templateUrl: "./login.layout.component.html",
  styleUrls: ["./login.layout.component.css"]
})
export class LoginLayoutComponent implements OnInit {
  constructor(private titleService: Title) {}

  ngOnInit() {
    this.titleService.setTitle("AdminCar - Gerenciador de veículos");
  }
}
