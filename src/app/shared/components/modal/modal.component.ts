import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MealDTO } from 'src/app/core/model/dto/meal-dto';
import { Order } from 'src/app/core/model/order';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Output() confirmed = new EventEmitter<boolean>()
  @Input() meals: MealDTO[] = []
  @Input() order: Order = {} as Order

  constructor() { }

  confirm(isConfirmed: boolean) {
    this.confirmed.emit(isConfirmed)
  }
}
