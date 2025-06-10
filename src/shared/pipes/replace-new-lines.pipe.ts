import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceNewLines',
  standalone: true,
})
export class ReplaceNewLinesPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/\n/g, '</br>');
  }
}
