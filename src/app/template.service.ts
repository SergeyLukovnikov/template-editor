import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';

// Services
import { LocalStorageService } from './db/local-storage.service';

// Types
import { ITemplate } from '@app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  private $loaded: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private $updateStream: Subject<ITemplate> = new Subject();

  private templateIds: number[] = [];
  private templates: { [index: number]: ITemplate} = {};
  private $listTemplates: BehaviorSubject<ITemplate[]> = new BehaviorSubject([]);

  constructor(private storage: LocalStorageService) {
    this.$updateStream.asObservable()
      .pipe(
        debounceTime(500),
        switchMap(data => this.storage.updateTemplate(data))
      ).subscribe();
  }

  public getTemplates(): Observable<ITemplate[]> {
    if (!this.$loaded.getValue()) {
      this.loadTemplates();
    }

    return this.$listTemplates.asObservable();
  }

  public getTemplateById(id: number): Observable<ITemplate> {
    return of(this.templates[id]);
  }

  public updateTemplate(template: ITemplate): void  {
    this.$updateStream.next(template);
  }

  public isLoaded(): Observable<boolean> {
    return this.$loaded.asObservable();
  }

  public loadTemplates(): void {
    this.storage.getTemplates()
      .subscribe(list => {
        list.forEach(item => {
          this.templateIds.push(item.id);
          this.templates[item.id] = item;
        });

        this.$listTemplates.next(list);
        this.$loaded.next(true);
      });
  }
}
