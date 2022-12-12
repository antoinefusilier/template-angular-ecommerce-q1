import { Pipe, PipeTransform } from '@angular/core';
import { ColorType, colorType } from '../helpers/color';

@Pipe({
    name: 'colorType'
})
export class ColorTypePipe implements PipeTransform {
    transform(value: string): ColorType {
        return colorType(value);
    }
}
