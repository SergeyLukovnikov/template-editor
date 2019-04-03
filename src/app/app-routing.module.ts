import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { TemplateListComponent } from '@container/template-list/template-list.component';
import { TemplateEditComponent } from './containers/template-edit/template-edit.component';
import { PageNotFoundComponent } from './containers/page-not-found/page-not-found.component';

// Guards
import { TemplateLoadedGuard } from './guards/templates-loaded.guard';
import { TemplateExistsGuard } from './guards/template-exists.guard';

const routes: Routes = [
  {
    path: '',
    component: TemplateListComponent,
    canActivate: [TemplateLoadedGuard]
  },
  {
    path: 'template/edit/:id',
    component: TemplateEditComponent,
    canActivate: [TemplateLoadedGuard, TemplateExistsGuard]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
