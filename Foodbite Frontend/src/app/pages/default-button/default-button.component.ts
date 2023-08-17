import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-default-button',
  templateUrl: './default-button.component.html',
  styleUrls: ['./default-button.component.css']
})
export class DefaultButtonComponent {
  @Input()
  type:'submit'|'button'='submit';

  @Input()
  text:string='Submit'

  @Input()
  bgColor = '#e72929'

  @Input()
  fontSize = 1.3;

  @Input()
  width = 12;

  @Input()
  color='white'

  @Output()
  onClick = new EventEmitter()
  
}
