import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

// Services
import { TemplateService } from '@app/template.service';

// Types
import { ITemplate } from '@app/interfaces';

@Component({
  selector: 'app-template-edit',
  templateUrl: './template-edit.component.html',
  styleUrls: ['./template-edit.component.scss']
})
export class TemplateEditComponent implements OnInit, OnDestroy {

  private $unsubscribe: Subject<null> = new Subject();

  public template: ITemplate;

  constructor(
    private activateRouter: ActivatedRoute,
    private templateService: TemplateService
  ) { }

  public ngOnInit(): void {
    const templateId = parseInt(this.activateRouter.snapshot.params.id, 10);
    this.templateService.getTemplateById(templateId)
      .pipe(
        takeUntil(this.$unsubscribe)
      )
      .subscribe(template => this.template = template);
  }

  public onUpdateTemplate(template: string): void {
    this.template.template = template;
    this.template.modified = new Date().getTime();

    this.templateService.updateTemplate(this.template);
  }

  public ngOnDestroy(): void {
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }
}
