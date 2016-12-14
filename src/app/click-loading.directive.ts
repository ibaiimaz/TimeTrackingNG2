import { Directive, ElementRef, HostListener, Renderer, Input } from '@angular/core';

@Directive({
  selector: '[appClickLoading]'
})
export class ClickLoadingDirective {

  constructor(private el: ElementRef, private renderer: Renderer) { }

  @Input() buttonText: string;

  @HostListener('click') onclick() {
    console.log(this.buttonText);
    this.highlight(this.buttonText);
  }

  private highlight(buttonText: string) {
    this.renderer.setText(this.el.nativeElement, buttonText);
    this.renderer.setElementAttribute(this.el.nativeElement, 'disabled', 'true');
  }

}
