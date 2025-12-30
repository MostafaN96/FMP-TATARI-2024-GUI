import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedCashService {

  private cache: { [key: string]: any[] } = {};

  // تخزين بالقاموس
  setCache(key: string, data: any[]) {
    this.cache[key] = data;
  }

  // جلب من الكاش
  getCache(key: string): any[] | null {
  return this.cache[key] ?? [];  
}

getFilterOptions(data: any[], cacheKey: string, columnKey: string) {
  let cached = this.getCache(cacheKey) ?? [];
  if (cached.length === 0) {
    cached = this.uniqueArray(data, columnKey);
    this.setCache(cacheKey, cached);
  }
  return cached;
}

  uniqueArray(data: any = [], key) {
    const seen = new Set();
  return data.filter(item => {
    if (item[key] !== undefined && !seen.has(item[key])) {
      seen.add(item[key]);
      return true;
    }
    return false;
  });
  }

}