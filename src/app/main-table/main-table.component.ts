import { Component, Input, OnInit } from '@angular/core';
import * as moment from "moment";
import {IValues} from "../main/main.component";

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
  prices?: {
    gasPrice?: number;
    elPrice?: number;
    hotPrice?: number;
    coldPrice?: number;
  }
}

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.scss']
})
export class MainTableComponent implements OnInit {
  @Input() valuesForOne: IValues[];

  public displayedColumns: string[] = ['date', 'gas', 'gasDiff', 'electricity', 'elDiff', 'hot water', 'hotDiff', 'cold water', 'coldDiff', 'totalCost'];
  public testArray: IDataSource[] = [
    {id: 1, date: '10.01.2020', gas: 18.86, gasDiff: 0, electricity: 70.63, elDiff: 0, hotWater: 43.70, hotDiff: 0, coldWater: 66.70, coldDiff: 0, totalCost: 0},
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
      prices: {},
      date: this.getMonth(item.date),
    }));

    this.calculateDiffsAndTotalCost(this.testArray, true);
    this.defaultTestArray = this.testArray;
  }

  public changeValues(): void {
    this.roundValues = !this.roundValues;
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

    this.calculateDiffsAndTotalCost(this.testArray);

    for (const item of this.testArray) {
      this.getAverage(item);
    }
  }

  public getAverage(field): number | string {
    const values = this.testArray.map(item => item[field]);
    const total = values.reduce((acc, value) => acc + value, 0);

    const result = (total / values.length);

    return this.roundValues ? Math.round(result) : result.toFixed(2);
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

  private calculateTotalCost(item: IDataSource): void {
    const prices = item.prices;
    console.log(item)
    prices.gasPrice = +(+item.gasDiff * this.valuesForOne.find(value => value.type === 'gas').value).toFixed(2);
    prices.elPrice = +(+item.elDiff * 100 * this.valuesForOne.find(value => value.type === 'el').value).toFixed(2);
    prices.hotPrice = +(+item.hotDiff * this.valuesForOne.find(value => value.type === 'hot').value).toFixed(2);
    prices.coldPrice = +(+item.coldDiff * this.valuesForOne.find(value => value.type === 'cold').value).toFixed(2);
    item.totalCost = parseFloat((prices.gasPrice + prices.elPrice + prices.hotPrice + prices.coldPrice).toFixed(2));
  }

  private calculateDiffsAndTotalCost(items: IDataSource[], round: boolean = true) {
    for (let i = 1; i < items.length; i++) {
      items[i].gasDiff =  this.getDiff(items[i].gas, items[i-1].gas, round).toFixed(2);
      items[i].elDiff = this.getDiff(items[i].electricity, items[i-1].electricity, round).toFixed(2);
      items[i].hotDiff = this.getDiff(items[i].hotWater, items[i-1].hotWater, round).toFixed(2);
      items[i].coldDiff = this.getDiff(items[i].coldWater, items[i-1].coldWater, round).toFixed(2);
    }

    for (let i = 1; i < items.length; i++) {
      this.calculateTotalCost(items[i]);
    }
  }

  private getDiff(value1, value2, round: boolean = false) {
    const result = +(value1 - value2);
    return result;
  }

}
