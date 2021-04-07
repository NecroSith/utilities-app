import { Component, OnInit } from '@angular/core';

export interface IValues {
  name: string;
  type: string;
  value: number;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit {
  public valuesForOne: IValues[] = [
    {
      name: 'Газ',
      type: 'gas',
      value: 115.08
    },
    {
      name: 'Эл-во, 1 кВт',
      type: 'el',
      value: 5.1
    },
    {
      name: 'Гор.вода',
      type: 'hot',
      value: 182.2
    },
    {
      name: 'Хол.вода',
      type: 'cold',
      value: 74
    },
  ];

  constructor() {

  }

  ngOnInit() {

  }
}
