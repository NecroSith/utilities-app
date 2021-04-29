import { Component, OnInit, Input, ViewChild } from '@angular/core';
import * as moment from "moment";
import {IValues} from "../main/main.component";
import { MatPaginator } from "@angular/material/paginator";
import {MatTableDataSource} from '@angular/material/table';
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {MatDialog} from "@angular/material/dialog";
import {AddParamModalComponent} from "../add-param-modal/add-param-modal.component";


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
  @Input() valuesForOne: IValues[];
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  private initialData = [
    {id: 1, date: '10.01.2020', gas: 18.86, gasDiff: 0, electricity: 70.63, elDiff: 0, hotWater: 43.70, hotDiff: 0, coldWater: 66.70, coldDiff: 0, totalCost: 0},
    {id: 2, date: '11.01.2020', gas: 19.34, electricity: 71.71, hotWater: 45.67, coldWater: 69.88},
    {id: 3, date: '12.01.2020', gas: 19.87, electricity: 73.35, hotWater: 47.23, coldWater: 72.74},
    {id: 4, date: '01.01.2021', gas: 20.70, electricity: 74.93, hotWater: 51.90, coldWater: 79.07},
    {id: 5, date: '02.01.2021', gas: 21.23, electricity: 76.60, hotWater: 57.40, coldWater: 85.85},
    {id: 6, date: '03.01.2021', gas: 21.64, electricity: 78.06, hotWater: 62.60, coldWater: 91.08},
    {id: 6, date: '04.01.2021', gas: 22.28, electricity: 79.63, hotWater: 68.54, coldWater: 96.52},
    {id: 3, date: '12.01.2020', gas: 19.87, electricity: 73.35, hotWater: 47.23, coldWater: 72.74},
    {id: 4, date: '01.01.2021', gas: 20.70, electricity: 74.93, hotWater: 51.90, coldWater: 79.07},
    {id: 5, date: '02.01.2021', gas: 21.23, electricity: 76.60, hotWater: 57.40, coldWater: 85.85},
    {id: 6, date: '03.01.2021', gas: 21.64, electricity: 78.06, hotWater: 62.60, coldWater: 91.08},
    {id: 3, date: '12.01.2020', gas: 19.87, electricity: 73.35, hotWater: 47.23, coldWater: 72.74},
    {id: 4, date: '01.01.2021', gas: 20.70, electricity: 74.93, hotWater: 51.90, coldWater: 79.07},
    {id: 5, date: '02.01.2021', gas: 21.23, electricity: 76.60, hotWater: 57.40, coldWater: 85.85},
    {id: 6, date: '03.01.2021', gas: 21.64, electricity: 78.06, hotWater: 62.60, coldWater: 91.08},
    {id: 3, date: '12.01.2020', gas: 19.87, electricity: 73.35, hotWater: 47.23, coldWater: 72.74},
    {id: 4, date: '01.01.2021', gas: 20.70, electricity: 74.93, hotWater: 51.90, coldWater: 79.07},
    {id: 5, date: '02.01.2021', gas: 21.23, electricity: 76.60, hotWater: 57.40, coldWater: 85.85},
    {id: 6, date: '03.01.2021', gas: 21.64, electricity: 78.06, hotWater: 62.60, coldWater: 91.08},
    {id: 3, date: '12.01.2020', gas: 19.87, electricity: 73.35, hotWater: 47.23, coldWater: 72.74},
    {id: 4, date: '01.01.2021', gas: 20.70, electricity: 74.93, hotWater: 51.90, coldWater: 79.07},
    {id: 5, date: '02.01.2021', gas: 21.23, electricity: 76.60, hotWater: 57.40, coldWater: 85.85},
    {id: 6, date: '03.01.2021', gas: 21.64, electricity: 78.06, hotWater: 62.60, coldWater: 91.08},
  ];

  public displayedColumns: string[] = ['date', 'gas', 'gasDiff', 'electricity', 'elDiff', 'hot water', 'hotDiff', 'cold water', 'coldDiff', 'totalCost'];
  public testArray = new MatTableDataSource<IDataSource>(this.initialData);
  public roundValues = false;
  public faPlus = faPlus;

  private defaultTestArray;

  constructor(public dialog: MatDialog) {

  }

  ngAfterViewInit() {
    this.testArray.paginator = this.paginator;
  }


  ngOnInit() {
    this.initialData = this.initialData.map(item => ({
      ...item,
      date: this.getMonth(item.date),
      prices: {}
    }));

    this.getDiffData(this.initialData);
    this.reinitDataSource(this.initialData);

    console.log(this.testArray)

    this.defaultTestArray = this.initialData;
  }

  public openAddParamModal() {
    const dialogRef = this.dialog.open(AddParamModalComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  public changeValues() {
    this.roundValues = !this.roundValues;
    if (this.roundValues) {
      const newData = this.initialData.map(item => ({
        ...item,
        gas: Math.round(item.gas as number),
        electricity: Math.round(item.electricity as number),
        hotWater: Math.round(item.hotWater as number),
        coldWater: Math.round(item.coldWater as number),
      }));

      this.getDiffData(newData);

      // @ts-ignore
      this.reinitDataSource(newData);

    } else {
      this.initialData = this.defaultTestArray;

      this.reinitDataSource(this.initialData);
    }
  }

  public getAverage(field) {
    const values = this.initialData.map(item => item[field]);
    const total = values.reduce((acc, value) => acc + value, 0);

    const result = (total / values.length);

    return this.roundValues ? Math.round(result) : result.toFixed(2);
  }

  private reinitDataSource(newDataSource: IDataSource[]) {
    this.testArray = new MatTableDataSource<IDataSource>(newDataSource);
    this.testArray.paginator = this.paginator;
  }

  private getPrices(data) {
    const gasPrice = this.valuesForOne.find(item => item.type === 'gas').value;
    const elPrice = this.valuesForOne.find(item => item.type === 'el').value;
    const hotPrice = this.valuesForOne.find(item => item.type === 'hot').value;
    const coldPrice = this.valuesForOne.find(item => item.type === 'cold').value;

    for (let i = 1; i < data.length; i++) {
      data[i].prices.gasDiff = +(data[i].gasDiff * gasPrice).toFixed(2);
      data[i].prices.elDiff = +(data[i].elDiff * 100 * elPrice).toFixed(2);
      data[i].prices.hotDiff = +(data[i].hotDiff * hotPrice).toFixed(2);
      data[i].prices.coldDiff = +(data[i].coldDiff * coldPrice).toFixed(2);
    }
  }

  private getDiffData(data) {
    for (let i = 1; i < data.length; i++) {
      data[i].gasDiff = +(data[i].gas - data[i - 1].gas).toFixed(2);
      data[i].elDiff = +(data[i].electricity - data[i - 1].electricity).toFixed(2);
      data[i].hotDiff = +(data[i].hotWater - data[i - 1].hotWater).toFixed(2);
      data[i].coldDiff = +(data[i].coldWater - data[i - 1].coldWater).toFixed(2);
    }

    this.getPrices(data);

    for (let i = 1; i < data.length; i++) {
      data[i].totalCost = parseFloat((+data[i].gasDiff * 115.08 + +data[i].elDiff * 100 * 5.10 + +data[i].hotDiff * 182.20 + +data[i].coldDiff * 74).toFixed(2));
    }
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
