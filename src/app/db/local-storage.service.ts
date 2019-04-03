import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// Types
import { IStorage, ITemplate } from '../interfaces';

// Data
import { TEMPLATES } from '@app/data';

const TEMPLATES_STORAGE_KEY = 'templates';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService implements IStorage {

  public getTemplates(): Observable<ITemplate[]> {
    if (localStorage.getItem(TEMPLATES_STORAGE_KEY) === null) {
      localStorage.setItem(TEMPLATES_STORAGE_KEY, JSON.stringify(TEMPLATES));
    }

    const templates = this.loadTemplates();

    return of(templates);
  }

  public updateTemplate(template: ITemplate): Observable<ITemplate> {
    let templates = this.loadTemplates();

    templates = templates.map(item => {
      return (item.id === template.id) ? template : item;
    });

    localStorage.setItem(TEMPLATES_STORAGE_KEY, JSON.stringify(templates));

    console.log(`template id: ${template.id} updated`, new Date().getTime());

    return of(template);
  }

  private loadTemplates(): ITemplate[] {
    return JSON.parse(localStorage.getItem(TEMPLATES_STORAGE_KEY));
  }

}
