import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'setResidental'
})
export class SetResidentalPipe implements PipeTransform {

  transform(value: string): string {
    if (value === 'RESIDENTAL') {
      return 'Yaşayış'
    }

    if (value === 'NON_RESIDENTAL') {
      return 'Qeyri-yaşayış'
    }

    return ''
  }

}
