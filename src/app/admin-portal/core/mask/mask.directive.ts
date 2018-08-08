import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { text } from '../../../../../node_modules/@angular/core/src/render3/instructions';


@Directive({
  selector: '[bMask]'
})
export class MaskDirective implements OnInit {
  @Input() bMask: Observable<boolean>;
  @Input() bMessage = 'Operation in progress';
  busy: boolean;
  maskEl: any;
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    if (this.bMask) {
      this.bMask.subscribe((busy) => this.mask(busy));
    }
  }

  mask (busy) {
    if (busy) {
      this.addMask();
    } else {
      this.removeMask();
    }
  }

  removeMask () {
    if (this.maskEl) {
      this.renderer.removeChild(this.el.nativeElement, this.maskEl);
      this.maskEl = null;
    }
  }
  addMask () {
    const maskEl = this.maskEl = this.renderer.createElement('div');
    const messageEl = this.renderer.createElement('div');
    this.renderer.addClass(messageEl, 'mask-msg');
    const textEl = this.renderer.createText(this.bMessage);
    const spinner = this.renderer.createElement('i');
    this.renderer.addClass(spinner, 'fa');
    this.renderer.addClass(spinner, 'fa-spin');
    this.renderer.addClass(spinner, 'fa-cog');

    this.renderer.appendChild(messageEl, spinner);
    this.renderer.appendChild(messageEl, textEl);
    this.renderer.appendChild(maskEl, messageEl);
    this.renderer.addClass(this.el.nativeElement, 'mask-parent');
    this.renderer.addClass(maskEl, 'mask');
    this.renderer.appendChild(this.el.nativeElement, maskEl);
  }
}
