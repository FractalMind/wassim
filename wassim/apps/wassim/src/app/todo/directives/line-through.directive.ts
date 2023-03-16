import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[line-through]',
})
export class LineThroughDirective {
  @HostBinding('class.line-through') @Input('line-through') lineThrough = false;
}
