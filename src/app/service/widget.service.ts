import {
  Compiler,
  Injectable,
  Injector,
  ViewContainerRef,
} from '@angular/core';
import { WIDGEt_REGISTER } from 'library/collections/registration.config';

@Injectable({
  providedIn: 'root',
})
export class WidgetService {
  availableWidgets!: Map<any, any>;
  private widgetConfig = WIDGEt_REGISTER;

  constructor(private compiler: Compiler, private injector: Injector) {
    const registrationConfig: Map<any, any> = new Map();
    this.widgetConfig.forEach((widget) => {
      console.log(widget)
      const key = WidgetService.getWidgetKey(widget);
      registrationConfig.set(key, widget);
    });
    console.log('reg',registrationConfig)
    this.availableWidgets = registrationConfig;
  }

  static getWidgetKey(config: any) {
    return `widget:${config.widgetType}_${config.widgetSubType}`;
  }

  async resolvedWidget(recievedConfig: any, containerRef: ViewContainerRef) {
    console.log(recievedConfig)
    const key = WidgetService.getWidgetKey(recievedConfig);
    console.log(key)
    const config = this.availableWidgets.get(key);
    console.log(this.availableWidgets,config)
    const module = await config?.path();
    const component = module.rootComponent;

    const moduleFactory = await this.compiler.compileModuleAsync(module);
    const moduleRef = moduleFactory.create(this.injector);

    const componentFactory =
      moduleRef.componentFactoryResolver.resolveComponentFactory(
        component
      ) as any;

    return this.widgetResolved(
      containerRef,
      recievedConfig,
      undefined,
      componentFactory
    );
  }

  widgetResolved(
    containerRef: ViewContainerRef,
    compData: any,
    component?: any,
    componentFactory?: any
  ) {
    let compRef:any;

    if (componentFactory) {
      compRef = containerRef.createComponent(componentFactory);
    }
    compRef.instance.widgetData = compData.widgetData;
    return compRef
  }
}
