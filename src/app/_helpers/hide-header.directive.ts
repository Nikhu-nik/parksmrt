import { Directive, Input, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[hide-header]', // Attribute selector
  host: {
    '(ionScroll)': 'onContentScroll($event)'
  }
})

export class HideHeaderDirective {

  headerHeight;
  scrollContent;
  
  @Input('header') header: HTMLElement;
  @Input('footer') footer: HTMLElement;
  constructor(public element: ElementRef, public renderer: Renderer) {
    console.log('Hello HideHeaderDirective Directive');
  }
  ngOnInit() {
    this.headerHeight = this.header.clientHeight;
    this.scrollContent = this.element.nativeElement.getElementsByClassName('scroll-content')[0];
    this.renderer.setElementStyle(this.header, 'webkitTransition', 'top 700ms');
    this.renderer.setElementStyle(this.footer, 'webkitTransition', 'bottom 700ms');
  }
  onContentScroll(event) {
    if (event.directionY === 'down') {
      this.renderer.setElementStyle(this.header, 'top', '-56px');
      this.renderer.setElementStyle(this.footer, 'bottom', '-56px');
    } else {
      this.renderer.setElementStyle(this.header, 'top', '0px');
      this.renderer.setElementStyle(this.footer, 'bottom', '0px');
    }
  }
}
