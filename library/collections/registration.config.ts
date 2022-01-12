import { ROOT_WIDGET_CONFIG } from './collection-config';

export function pageModule() {
  return import('library/collections/page/index').then(
    (v) => v.PageModule
  );
}

export const WIDGEt_REGISTER = [
    {
        widgetType:ROOT_WIDGET_CONFIG.page._type,
        widgetSubType: ROOT_WIDGET_CONFIG.page.standard,
        path: pageModule

    }
];
