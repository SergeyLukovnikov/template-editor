import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, filter, take } from 'rxjs/operators';

// Services
import { TemplateService } from '../template.service';

@Injectable({
  providedIn: 'root'
})
export class TemplateLoadedGuard implements CanActivate {

  sessionToken: string;
  userId: number;

  constructor(
    private templateService: TemplateService,
    private router: Router
  ) { }

  waitForTemplatesToLoad(): Observable<boolean> {
    return this.templateService.isLoaded()
      .pipe(
        filter(loaded => loaded),
        take(1)
      );
  }

  templatesLoaded(): Observable<boolean> {
    return this.templateService.isLoaded()
      .pipe(
        switchMap(loaded => {
          if (!loaded) {
            this.templateService.loadTemplates();
            return this.waitForTemplatesToLoad();
          }

          return of(true);
        })
      );
  }

  canActivate(): Observable<boolean> {
    return this.templatesLoaded();
  }

}
