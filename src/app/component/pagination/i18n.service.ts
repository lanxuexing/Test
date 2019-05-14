import { Inject, Injectable, Optional } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { DateLocale, NzI18nInterface, IndexableObject, NZ_DATE_LOCALE, NZ_I18N } from './pagination.util';

@Injectable({
  providedIn: 'root'
})
export class NzI18nService {
  // tslint:disable-next-line:variable-name
  zh_CN = {
    locale: 'zh-cn',
    Pagination: {
      items_per_page: '条/页',
      jump_to: '跳至',
      jump_to_confirm: '确定',
      page: '页',
      prev_page: '上一页',
      next_page: '下一页',
      prev_5: '向前 5 页',
      next_5: '向后 5 页',
      prev_3: '向前 3 页',
      next_3: '向后 3 页'
    }
  };
  // tslint:disable-next-line:variable-name
  private _locale: NzI18nInterface;
  // tslint:disable-next-line:variable-name
  private _change = new BehaviorSubject<NzI18nInterface>(this._locale);
  private dateLocale: DateLocale;

  get localeChange(): Observable<NzI18nInterface> {
    return this._change.asObservable();
  }

  constructor(
    @Optional() @Inject(NZ_I18N) locale: NzI18nInterface,
    @Optional() @Inject(NZ_DATE_LOCALE) dateLocale: DateLocale
  ) {
    this.setLocale(locale || this.zh_CN);
    this.setDateLocale(dateLocale || null);
  }

  // [NOTE] Performance issue: this method may called by every change detections
  // TODO: cache more deeply paths for performance
  /* tslint:disable-next-line:no-any */
  translate(path: string, data?: any): string {
    // this._logger.debug(`[NzI18nService] Translating(${this._locale.locale}): ${path}`);
    let content = this._getObjectPath(this._locale, path) as string;
    if (typeof content === 'string') {
      if (data) {
        Object.keys(data).forEach(key => (content = content.replace(new RegExp(`%${key}%`, 'g'), data[key])));
      }
      return content;
    }
    return path;
  }

  setLocale(locale: NzI18nInterface): void {
    if (this._locale && this._locale.locale === locale.locale) {
      return;
    }
    this._locale = locale;
    this._change.next(locale);
  }

  getLocale(): NzI18nInterface {
    return this._locale;
  }

  getLocaleId(): string {
    return this._locale ? this._locale.locale : '';
  }

  setDateLocale(dateLocale: DateLocale): void {
    this.dateLocale = dateLocale;
  }

  getDateLocale(): DateLocale {
    return this.dateLocale;
  }

  // tslint:disable-next-line:no-any
  getLocaleData(path?: string, defaultValue?: any): any {
    const result = path ? this._getObjectPath(this._locale, path) : this._locale;
    return result || defaultValue;
  }

  // tslint:disable-next-line:no-any
  private _getObjectPath(obj: IndexableObject, path: string): string | object | any {
    let res = obj;
    const paths = path.split('.');
    const depth = paths.length;
    let index = 0;
    while (res && index < depth) {
      res = res[paths[index++]];
    }
    return index === depth ? res : null;
  }
}
