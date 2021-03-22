import { Component, OnInit } from '@angular/core';
import * as moment from "moment";

interface IDataSource {
  id: number;
  date: Date | string;
  gas: number | string;
  gasDiff?: number | string;
  electricity: number | string;
  elDiff?: number | string;
  hotWater: number | string;
  hotDiff?: number | string;
  coldWater: number | string;
  coldDiff?: number | string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public displayedColumns: string[] = ['date', 'gas', 'electricity', 'hot water', 'cold water'];
  public testArray: IDataSource[] = [
    {id: 1, date: '10.01.2020', gas: 18.86, gasDiff: 0, electricity: 70.63, elDiff: 0, hotWater: 43.70, hotDiff: 0, coldWater: 66.70, coldDiff: 0},
    {id: 2, date: '11.01.2020', gas: 19.34, electricity: 71.71, hotWater: 45.67, coldWater: 69.88},
    {id: 3, date: '12.01.2020', gas: 19.87, electricity: 73.35, hotWater: 47.23, coldWater: 72.74},
    {id: 4, date: '01.01.2021', gas: 20.70, electricity: 74.93, hotWater: 51.90, coldWater: 79.07},
    {id: 5, date: '02.01.2020', gas: 21.23, electricity: 76.60, hotWater: 57.40, coldWater: 85.85},
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
    } else {
      this.testArray = this.defaultTestArray;
    }
    this.roundValues = !this.roundValues;
  }

  public getAverage(field) {
    // const key = Object.keys(this.testArray)[field];
    // console.log('key', key, row);
    const values = this.testArray.map(item => item[field]);
    // console.log('val', values);
    const total = values.reduce((acc, value) => acc + value, 0);
    return (total / values.length).toFixed(2);
  }

  private getMonthlyDifference(curValue, prevValue): string {
    return prevValue ? `+${curValue - prevValue}` : '-';
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
    return result;
  }

}
