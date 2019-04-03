import { BehaviorSubject, Observable, Subject } from 'rxjs';

export interface ElementParams {
  fontSize: string;
  position?: {
    left: number,
    top: number
  };
}

export const DEFAULT_ELEMENT_PARAMS: ElementParams = {
  fontSize: ''
};

export class EditorService {

  private activatedElement: HTMLElement;
  private $changeElement: Subject<null> = new Subject();
  private $elementParams: BehaviorSubject<ElementParams> = new BehaviorSubject(DEFAULT_ELEMENT_PARAMS);

  public setFontSize(fontSize: string) {
    if (!this.activatedElement || !this.activatedElement.style) {
      return;
    }

    if (fontSize === '') {
      this.activatedElement.removeAttribute('style');
    } else {
      this.activatedElement.style.fontSize = `${fontSize}px`;
    }

    this.$changeElement.next();
    this.activatedElement.focus();
  }

  public getChangeElement(): Observable<null> {
    return this.$changeElement.asObservable();
  }

  public setActivatedElement(el: HTMLElement): void {
    this.activatedElement = el;
    this.initElementParams(el);
  }

  public resetElementParams(): void {
    this.$elementParams.next(DEFAULT_ELEMENT_PARAMS);
  }

  public getElementParams(): Observable<ElementParams> {
    return this.$elementParams.asObservable();
  }

  private initElementParams(el: HTMLElement): void {
    const params: ElementParams = { ...DEFAULT_ELEMENT_PARAMS };

    if (el.style.fontSize) {
      params.fontSize = parseInt(el.style.fontSize, 10).toString();
    }

    const {top, left} = el.getBoundingClientRect();
    params.position = { top, left };

    this.$elementParams.next(params);
  }

}
