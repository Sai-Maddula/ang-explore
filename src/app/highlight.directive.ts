import { Directive, ViewContainerRef, Input, Output, EventEmitter, ComponentRef, ElementRef } from '@angular/core';
import { WidgetService } from './service/widget.service';


@Directive({
  selector: '[msHighlight]'
})
export class HighlightDirective {
  @Input() msHighlight: any = 'red' 
  @Output() compRef = new EventEmitter()
  compReference!: ComponentRef<any>
  constructor(
    private viewContainerRef: ViewContainerRef,
    // private widgetService: WidgetService,
    private elementRef:ElementRef
  ) { 
    this.elementRef.nativeElement.style.backgroundColor = this.msHighlight
  }
     ngOnChanges() {
       console.log(this.msHighlight)
      this.elementRef.nativeElement.style.backgroundColor = this.msHighlight
    //   this.compReference = await this.widgetService.resolvedWidget(this.wsResolverWidget, this.viewContainerRef)
    //   this.compRef.next(this.compReference)
    //   this.compReference?.changeDetectorRef?.detectChanges()
    }

}
