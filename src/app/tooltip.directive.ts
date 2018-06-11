import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {

  constructor(el: ElementRef) {
    const container: Element = el.nativeElement;
    const tooltipContents: string = container.innerHTML;
    const newContents: string = `
        <div class="tooltip__icon">
          <img src="static/images/info.svg">
        </div>
        <div class="tooltip__contents">
          ${tooltipContents}
        </div>`;

    container.classList.add('tooltip');
    container.innerHTML = newContents;
  }

}
