import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// Services
import { TemplateService } from '@app/template.service';

// Types
import { ITemplate } from '@app/interfaces';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.scss']
})
export class TemplateListComponent implements OnInit {

  public $templates: Observable<ITemplate[]>;

  constructor(private templateService: TemplateService) { }

  public ngOnInit() {
    this.$templates = this.templateService.getTemplates();
  }

}
