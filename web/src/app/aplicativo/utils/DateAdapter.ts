import { Injectable } from "@angular/core";
import {
  NgbDateAdapter,
  NgbDateStruct,
  NgbDateParserFormatter
} from "@ng-bootstrap/ng-bootstrap";
import { toInteger } from "@ng-bootstrap/ng-bootstrap/util/util";

@Injectable()
export class DateAdapter extends NgbDateAdapter<Date> {
  fromModel(date: Date): NgbDateStruct {
    return date && date.getFullYear
      ? {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate()
        }
      : null;
  }

  toModel(date: NgbDateStruct): Date {
    return date ? new Date(date.year, date.month - 1, date.day) : null;
  }
}

@Injectable()
export class DateFormatter extends NgbDateParserFormatter {
  parse(value: string): NgbDateStruct {
    if (value) {
      const partesData = value.split("/");
      return {
        year: toInteger(partesData[2]),
        month: toInteger(partesData[1]),
        day: toInteger(partesData[0])
      };
    }
    return null;
  }

  format(date: NgbDateStruct): string {
    if (date) {
      return `${this.padNumbers(date.day)}/${this.padNumbers(date.month)}/${
        date.year
      }`;
    }
    return null;
  }

  padNumbers(value: number) {
    return `0${value}`.slice(-2);
  }
}
