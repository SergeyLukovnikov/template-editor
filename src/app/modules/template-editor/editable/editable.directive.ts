import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { EditorService } from './editor.service';

@Directive({
  selector: '.editable'
})
export class EditableDirective {

  constructor(
    private el: ElementRef,
    private editorService: EditorService,
    private renderer: Renderer2
  ) { }

  @HostListener('click') onClick() {
    this.renderer.setAttribute(this.el.nativeElement, 'contenteditable', 'true');
    this.el.nativeElement.focus();
    this.editorService.setActivatedElement(this.el.nativeElement);
  }

}
