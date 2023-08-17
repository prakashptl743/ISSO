import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'texttransform'})
export class TextTransformPipe implements PipeTransform {
  transform(value: string, inputComma: any): string {
   console.log('Im pipe==>'+inputComma);
    const splitBy = ','
    const splitComaa = ' '
    const splittedText = value.split( splitBy );
    if (inputComma === 0) {
        console.log('Im zero comma 1')
        return `${ splittedText[0] }\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 <br>`;
    } else if (inputComma === 1) {
        console.log('Im comma 1')
        return `${ splittedText[0] }\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 ${ splitComaa } <br> ${splittedText[1] }`;
    } else if (inputComma === 2) {
      console.log('Im comma 2')
       return `${ splittedText[0] }\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 ${ splitComaa } <br> ${ splittedText[1] } ${ splitComaa }<br> ${ splittedText[2] }`;
    } else if(inputComma === 3) {
      console.log('Im comma 3')
       return `${ splittedText[0] }\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 ${ splitComaa } <br> ${ splittedText[1] } ${ splitComaa }<br> ${ splittedText[2] }<br> ${ splittedText[3] }`;
    } else if(inputComma === 4) {
       return `${ splittedText[0] }\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 ${ splitComaa } <br> ${ splittedText[1] } ${ splitComaa }<br> ${ splittedText[2] }<br> ${ splittedText[3] }<br> ${ splittedText[4] }`;
    } else if(inputComma === 5) {
       return `${ splittedText[0] }\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 ${ splitBy } <br> ${ splittedText[1] } ${ splitBy }<br> ${ splittedText[2] }<br> ${ splittedText[3] }<br> ${ splittedText[4] }<br> ${ splittedText[5] }`;
    } else if(inputComma === 6) {
      return `${ splittedText[0] }\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 ${ splitBy } <br> ${ splittedText[1] } ${ splitBy }<br> ${ splittedText[2] }<br> ${ splittedText[3] }<br> ${ splittedText[4] }<br> ${ splittedText[5] }<br> ${ splittedText[6] }`;
    } else if(inputComma === 7) {
      return `${ splittedText[0] }\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 ${ splitBy } <br> ${ splittedText[1] } ${ splitBy }<br> ${ splittedText[2] }<br> ${ splittedText[3] }<br> ${ splittedText[4] }<br> ${ splittedText[5] }<br> ${ splittedText[6] }><br> ${ splittedText[7] }`;
   } 
}
}
@NgModule({
    declarations: [TextTransformPipe],
    exports: [TextTransformPipe]
})
export class TextTransformPipeModule {}
  