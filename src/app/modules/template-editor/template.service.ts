import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class TemplateService {

  public $template = new Subject<string>();

  public updateTemplate(data: string): void {
    this.$template.next(data);
  }
}
