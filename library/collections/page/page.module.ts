import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page.component';



@NgModule({
  declarations: [
    PageModule.rootComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [PageModule.rootComponent],
  entryComponents: [PageModule.rootComponent]
})
export class PageModule {
  static rootComponent = PageComponent
 }
