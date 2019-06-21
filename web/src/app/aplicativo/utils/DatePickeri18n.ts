import { Injectable } from "@angular/core";
import { NgbDatepickerI18n } from "@ng-bootstrap/ng-bootstrap";
import { I18N_VALUES, I18n } from "./i18n";

@Injectable()
export class DatePickeri18n extends NgbDatepickerI18n {
  getDayAriaLabel(date: import("@ng-bootstrap/ng-bootstrap").NgbDateStruct): string {
    return "";
  }
  constructor(private _i18n: I18n) {
    super();
  }

  getWeekdayShortName(weekday: number): string {
    return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
  }
  getMonthShortName(month: number): string {
    return I18N_VALUES[this._i18n.language].months[month - 1];
  }
  getMonthFullName(month: number): string {
    return I18N_VALUES[this._i18n.language].monthsFullName[month - 1];
  }
}
