import { Component, Input, NgModule, ComponentRef,
  ModuleWithComponentFactories, ComponentFactory,
  ViewContainerRef, ViewChild, Compiler, OnInit,
  Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// Services
import { TemplateService } from '../template.service';
import { EditorService } from '../editable/editor.service';

// Modules
import { EditableModule } from '../editable/editable.module';

@Component({
  selector: `template-editor`,
  templateUrl: './template-editor.component.html'
})
export class TemplateEditorComponent implements OnInit, OnDestroy {

  private $unsubscribe = new Subject();

  @Input()
  public template: any = '';

  @Output()
  public update = new EventEmitter<string>();

  private componentRef: ComponentRef<{}>;

  @ViewChild('container', { read: ViewContainerRef })
  public container: ViewContainerRef;

  constructor(
    private compiler: Compiler,
    private templateService: TemplateService,
    private editorService: EditorService
  ) { }

  ngOnInit() {
    this.compileTemplate();
    this.templateService.$template
      .pipe(
        takeUntil(this.$unsubscribe)
      )
      .subscribe(data => this.update.emit(data));
  }

  public onCloseToolbar(): void {
    this.editorService.resetElementParams();
  }

  private compileTemplate() {
    const metadata: Component = {
      selector: `template-${this.template.id}`,
      template: `<div class="template-container" (keyup)="onChange($event)" #content>${this.template.template}</div>`,
    };

    const factory = this.createComponentFactorySync(this.compiler, metadata);

    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
    }

    this.componentRef = this.container.createComponent(factory);
  }

  private createComponentFactorySync(compiler: Compiler, metadata: Component): ComponentFactory<any> {
    @Component(metadata)
    class RuntimeTemplateComponent implements OnInit, OnDestroy {

      private $unsubscribe: Subject<null> = new Subject();

      @ViewChild('content')
      public content: any;

      constructor(
        private templateService: TemplateService,
        private editorService: EditorService
      ) { }

      public ngOnInit(): void {
        this.editorService.getChangeElement()
          .pipe(
            takeUntil(this.$unsubscribe)
          )
          .subscribe(() => this.onChange());
      }

      public onChange(): void {
        const content = this.content.nativeElement.cloneNode(true);

        for (const element of content.getElementsByClassName('editable') as any) {
          element.removeAttribute('contenteditable');
        }

        this.templateService.updateTemplate(content.innerHTML);
      }

      public ngOnDestroy(): void {
        this.$unsubscribe.next();
        this.$unsubscribe.complete();
      }
    }

    const decoratedCmp = Component(metadata)(RuntimeTemplateComponent);

    @NgModule({
      imports: [
        EditableModule
      ],
      declarations: [
        decoratedCmp,
      ]
    })
    class RuntimeComponentModule { }

    const module: ModuleWithComponentFactories<any> = compiler.compileModuleAndAllComponentsSync(RuntimeComponentModule);

    return module.componentFactories.find(f => f.componentType === decoratedCmp);
  }

  ngOnDestroy(): void {
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }
}
