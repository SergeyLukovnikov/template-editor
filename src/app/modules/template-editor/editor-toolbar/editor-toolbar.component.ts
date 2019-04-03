import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { EditorService, ElementParams } from '../editable/editor.service';
import { DEFAULT_ELEMENT_PARAMS } from '../editable';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: `editor-toolbar`,
  templateUrl: './editor-toolbar.component.html',
  styleUrls: ['./editor-toolbar.component.scss']
})
export class EditorToolbarComponent implements OnInit, OnDestroy {

  private $unsubscribe: Subject<null> = new Subject();

  @HostBinding('style.display')
  public dispaly = 'none';

  @HostBinding('style.top')
  public top = '0px';

  @HostBinding('style.left')
  public left = '0px';

  public elementParams: ElementParams = DEFAULT_ELEMENT_PARAMS;
  public fontSizes: string[] = ['12', '14', '16', '18', '20', '22', '24'];

  constructor(private editorService: EditorService) {}

  public ngOnInit(): void {
    this.editorService.getElementParams()
      .pipe(
        takeUntil(this.$unsubscribe)
      )
      .subscribe(params => {
        this.elementParams = params;

        this.dispaly = (params.position) ? 'block' : 'none';
        this.top = (params.position && params.position.top) ? `${params.position.top - 30}px` : '0px';
        this.left = (params.position && params.position.left) ? `${params.position.left}px` : '0px';
      });
  }

  public onChangeFontSize(value: string): void {
    this.editorService.setFontSize(value);
  }

  public ngOnDestroy(): void {
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }

}
