import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-validator',
  templateUrl: './input-validator.component.html',
  styleUrls: ['./input-validator.component.scss']
})
export class InputValidatorComponent implements OnInit {
  @Input() data : any;
  @Input() index : any;
  @Output() eventEmited = new EventEmitter<any[]>();
  constructor(){
  }

  ngOnInit(): void {
    console.log(this.data)
  }
  addImages(event:any): void{
    this.data.value = event;
  }
  emitValue(event: any, type: string): void {
    console.log(event)
    if (type == 'image') {
      this.eventEmited.emit(event[0]);
    }  else{
      this.eventEmited.emit(event);
    }
    
  }
}
