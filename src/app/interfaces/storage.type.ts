import { Observable } from 'rxjs';
import { ITemplate } from './template.type';

export interface IStorage {
  getTemplates(): Observable<ITemplate[]>;
  updateTemplate(template: ITemplate): Observable<ITemplate>;
}
