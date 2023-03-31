import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'journal'
})
export class JournalPipe implements PipeTransform {

  transform(value: string) {
    if (value == 'KSQ' || value == 'BSQ') {
      return 'greenrow';
    }
    return 'default';

  }

}
