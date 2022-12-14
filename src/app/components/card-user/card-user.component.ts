import { Component, Input, OnInit } from '@angular/core';
import { UserTO } from 'src/app/entities/UserTO';

@Component({
  selector: 'app-card-user',
  templateUrl: './card-user.component.html',
})
export class CardUserComponent implements OnInit {
  @Input() user: UserTO;
  @Input() editMode: boolean;

  constructor() {}

  ngOnInit(): void {}
}
