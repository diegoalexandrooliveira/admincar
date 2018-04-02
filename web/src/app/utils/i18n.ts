import { Injectable } from "@angular/core";

export const I18N_VALUES = {
  pt: {
    weekdays: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"],
    months: [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez"
    ],
    monthsFullName: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro"
    ]
  }
};

@Injectable()
export class I18n {
  language = "pt";
}
