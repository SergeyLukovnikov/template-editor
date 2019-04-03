import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { EditableModule } from './editable/editable.module';
import { SharedModule } from '../shared/shared.module';

// Components
import { TemplateEditorComponent } from './template-editor/template-editor.component';
import { EditorToolbarComponent } from './editor-toolbar/editor-toolbar.component';

// Services
import { TemplateService } from './template.service';

@NgModule({
  imports: [
    CommonModule,
    EditableModule,
    SharedModule
  ],
  declarations: [
    TemplateEditorComponent,
    EditorToolbarComponent,
  ],
  providers: [
    TemplateService
  ],
  exports: [
    TemplateEditorComponent
  ]
})
export class TemplateEditorModule { }
