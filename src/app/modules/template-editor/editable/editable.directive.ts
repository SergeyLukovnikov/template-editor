import { Directive, ElementRef, HostListener } from '@angular/core';
import { EditorService } from './editor.service';

@Directive({
  selector: '.editable'
})
export class EditableDirective {

  constructor(
    private el: ElementRef,
    private editorService: EditorService
  ) { }

  @HostListener('click') onClick() {
    this.el.nativeElement.setAttribute('contenteditable', 'true');
    this.el.nativeElement.focus();
    this.editorService.setActivatedElement(this.el.nativeElement);
  }

}
