import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'newline'
})
export class NewlinePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let data:string = value;

    data.replace('\n','<br>');
    return data;
  }

}
