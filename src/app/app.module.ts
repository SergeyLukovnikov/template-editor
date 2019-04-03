import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { TemplateEditorModule } from '@app/modules/template-editor/template-editor.module';

// Components
import { AppComponent } from './containers/app-root/app-root.component';
import { TemplateListComponent } from './containers/template-list/template-list.component';
import { TemplateEditComponent } from './containers/template-edit/template-edit.component';
import { PageNotFoundComponent } from './containers/page-not-found/page-not-found.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    TemplateEditorModule,
  ],
  declarations: [
    AppComponent,
    TemplateListComponent,
    TemplateEditComponent,
    PageNotFoundComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
