import { Directive, ElementRef, Renderer2, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appTitulo]'
})
export class TituloDirective implements OnInit {
  @Input() appTitulo: string = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.renderer.setStyle(this.el.nativeElement, 'font-weight', 'bold');
    this.renderer.setStyle(this.el.nativeElement, 'font-size', '1.2em');
    this.el.nativeElement.innerText = this.appTitulo;
  }
}
