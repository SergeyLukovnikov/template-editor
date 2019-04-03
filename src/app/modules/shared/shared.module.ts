import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Directives
import { ClickOutsideDirective } from '@app/modules/shared/directives';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ClickOutsideDirective
  ],
  exports: [
    ClickOutsideDirective
  ]
})
export class SharedModule { }
