import {Directive, ElementRef, HostBinding, HostListener, Input} from '@angular/core';
import {Event} from '@angular/router';

@Directive({
  selector: '[appDropdown]'
})

export class DropdownDirective {
  @HostBinding('class.open')
  isOpen = false;
  constructor(private elRef: ElementRef) {
  }

  @HostListener('document:click',['$event']) toggleOpen(event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false

  }
}

