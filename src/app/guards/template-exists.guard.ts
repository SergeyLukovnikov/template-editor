import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

// Services
import { TemplateService } from '../template.service';

@Injectable({
  providedIn: 'root'
})
export class TemplateExistsGuard implements CanActivate {

  constructor(private templateService: TemplateService) { }

  private templateExist(templateId: number): Observable<boolean> {
    return this.templateService.getTemplateById(templateId)
      .pipe(
        switchMap(template => {
          if (!template) {
            return of(false);
          }

          return of(true);
        })
      );
  }

  public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const templateId = parseInt(route.params.id, 10);

    return this.templateExist(templateId);
  }
}
