import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  public transform(value: any, keys: string, term: string) {
    if (!term) return value;
    return (value || []).filter((item: any) => keys.split(',').some(key => {
      let subProperties = []
      if (key.includes('.')){
        subProperties = key.split('.')
        return item[subProperties[0]] && item[subProperties[0]][subProperties[1]] && new RegExp(term, 'gi').test(typeof item[subProperties[0]][subProperties[1]] === "string" ?
            (item[subProperties[0]][subProperties[1]]).toLowerCase() : item[subProperties[0]][subProperties[1]]);
      }

      return item.hasOwnProperty(key) && new RegExp(term, 'gi').test(typeof item[key] === "string" ? item[key].toLowerCase() : item[key]);
    }));
  }

}
