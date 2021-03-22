import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public displayedColumns: string[] = ['date', 'gas', 'electricity', 'hot water', 'cold water'];
  public testArray = [
    {id: 1, date: '01.10.2020', gas: 18.86, electricity: 70.63, hotWater: 43.70, coldWater: 66.70},
    {id: 2, date: '01.11.2020', gas: 19.34, electricity: 71.71, hotWater: 45.67, coldWater: 69.88},
    {id: 3, date: '01.12.2020', gas: 19.87, electricity: 73.35, hotWater: 47.23, coldWater: 72.74},
    {id: 4, date: '01.01.2021', gas: 20.70, electricity: 74.93, hotWater: 51.90, coldWater: 79.07},
    {id: 5, date: '02.12.2020', gas: 21.23, electricity: 76.60, hotWater: 57.40, coldWater: 85.85},
  ];
  public roundValues = false;

  private defaultTestArray;

  constructor() {

  }


  ngOnInit() {
    this.defaultTestArray = this.testArray;
    console.log(this.defaultTestArray);
  }

  public changeValues() {
    if (this.roundValues) {
      this.testArray = this.testArray.map(item => ({
        ...item,
        gas: Math.round(item.gas),
        electricity: Math.round(item.electricity),
        hotWater: Math.round(item.hotWater),
        coldWater: Math.round(item.coldWater),
      }))
    } else {
      this.testArray = this.defaultTestArray;
    }
    this.roundValues = !this.roundValues;
  }

}
