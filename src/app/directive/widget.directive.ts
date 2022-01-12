import { ComponentRef, Directive, EventEmitter, Input, Output, ViewContainerRef, OnChanges } from '@angular/core';
import { WidgetService } from '../service/widget.service';

@Directive({
  selector: '[msResolverWidget]'
})
export class WidgetDirective implements OnChanges {
  @Input() msResolverWidget: any = null 
  @Output() compRef = new EventEmitter()
  compReference!: ComponentRef<any>
  constructor(
    private viewContainerRef: ViewContainerRef,
    private widgetService: WidgetService
  ) { }
    async ngOnChanges() {
      this.compReference = await this.widgetService.resolvedWidget(this.msResolverWidget, this.viewContainerRef)
      this.compRef.next(this.compReference)
      this.compReference?.changeDetectorRef?.detectChanges()
    }
}
