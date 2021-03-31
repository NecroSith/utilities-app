import { Component, OnInit } from '@angular/core';
import * as moment from "moment";

interface IDataSource {
  id: number;
  date: Date | string;
  gas: number;
  gasDiff?: number | string;
  electricity: number;
  elDiff?: number | string;
  hotWater: number;
  hotDiff?: number | string;
  coldWater: number;
  coldDiff?: number | string;
  totalCost?: number | string;
}

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.scss']
})
export class MainTableComponent implements OnInit {
  public displayedColumns: string[] = ['date', 'gas', 'gasDiff', 'electricity', 'elDiff', 'hot water', 'hotDiff', 'cold water', 'coldDiff', 'totalCost'];
  public testArray: IDataSource[] = [
    {id: 1, date: '10.01.2020', gas: 18.86, gasDiff: 0, electricity: 70.63, elDiff: 0, hotWater: 43.70, hotDiff: 0, coldWater: 66.70, coldDiff: 0},
    {id: 2, date: '11.01.2020', gas: 19.34, electricity: 71.71, hotWater: 45.67, coldWater: 69.88},
    {id: 3, date: '12.01.2020', gas: 19.87, electricity: 73.35, hotWater: 47.23, coldWater: 72.74},
    {id: 4, date: '01.01.2021', gas: 20.70, electricity: 74.93, hotWater: 51.90, coldWater: 79.07},
    {id: 5, date: '02.01.2021', gas: 21.23, electricity: 76.60, hotWater: 57.40, coldWater: 85.85},
    {id: 6, date: '03.01.2021', gas: 21.64, electricity: 78.06, hotWater: 62.60, coldWater: 91.08},
  ];
  public roundValues = false;

  private defaultTestArray;

  constructor() {

  }


  ngOnInit() {
    this.testArray = this.testArray.map(item => ({
      ...item,
      date: this.getMonth(item.date),
    }));

    for (let i = 1; i < this.testArray.length; i++) {
      this.testArray[i].gasDiff = +(this.testArray[i].gas - this.testArray[i - 1].gas).toFixed(2);
      this.testArray[i].elDiff = +(this.testArray[i].electricity - this.testArray[i - 1].electricity).toFixed(2);
      this.testArray[i].hotDiff = +(this.testArray[i].hotWater - this.testArray[i - 1].hotWater).toFixed(2);
      this.testArray[i].coldDiff = +(this.testArray[i].coldWater - this.testArray[i - 1].coldWater).toFixed(2);
    }

    for (let i = 1; i < this.testArray.length; i++) {
      this.testArray[i].totalCost = +this.testArray[i].gasDiff * 115.08 + +this.testArray[i].elDiff * 100 * 5.10 + +this.testArray[i].hotDiff * 182.20 + +this.testArray[i].coldDiff * 74;
    }

    this.defaultTestArray = this.testArray;
  }

  public changeValues() {
    if (this.roundValues) {
      this.testArray = this.testArray.map(item => ({
        ...item,
        gas: Math.round(item.gas as number),
        electricity: Math.round(item.electricity as number),
        hotWater: Math.round(item.hotWater as number),
        coldWater: Math.round(item.coldWater as number),
      }));

      for (let i = 1; i < this.testArray.length; i++) {
        this.testArray[i].gasDiff = +(this.testArray[i].gas - this.testArray[i - 1].gas);
        this.testArray[i].elDiff = +(this.testArray[i].electricity - this.testArray[i - 1].electricity);
        this.testArray[i].hotDiff = +(this.testArray[i].hotWater - this.testArray[i - 1].hotWater);
        this.testArray[i].coldDiff = +(this.testArray[i].coldWater - this.testArray[i - 1].coldWater);
      }

      for (let i = 1; i < this.testArray.length; i++) {
        this.testArray[i].totalCost = +this.testArray[i].gasDiff * 115.08 + +this.testArray[i].elDiff * 100 * 5.10 + +this.testArray[i].hotDiff * 182.20 + +this.testArray[i].coldDiff * 74;
      }
    } else {
      this.testArray = this.defaultTestArray;
    }
    this.roundValues = !this.roundValues;
  }

  public getAverage(field) {

    const values = this.testArray.map(item => item[field]);

    const total = values.reduce((acc, value) => acc + value, 0);
    return (total / values.length).toFixed(2);
  }

  private getMonth(date: Date | string): string {
    const currentMonth = moment(date).month() + 1;
    let result = '';
    switch (currentMonth) {
      case 1: result = 'Январь'; break;
      case 2: result = 'Февраль'; break;
      case 3: result = 'Март'; break;
      case 4: result = 'Апрель'; break;
      case 5: result = 'Май'; break;
      case 6: result = 'Июнь'; break;
      case 7: result = 'Июль'; break;
      case 8: result = 'Август'; break;
      case 9: result = 'Сентябрь'; break;
      case 10: result = 'Октябрь'; break;
      case 11: result = 'Ноябрь'; break;
      case 12: result = 'Декабрь'; break;
      default: break;
    }
    return `${result} ${moment(date).year()}`;
  }

}
