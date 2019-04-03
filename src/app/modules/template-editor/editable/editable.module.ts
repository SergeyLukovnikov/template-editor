import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditableDirective } from './editable.directive';
import { EditorService } from './editor.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    EditableDirective
  ],
  exports: [
    EditableDirective,
  ],
  providers: [
    EditorService,
  ]
})
export class EditableModule {}
