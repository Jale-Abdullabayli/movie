import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addDate'
})
export class DatePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
