import { Pipe, PipeTransform, NgModule } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeUrl'
})
export class SafeUrlPipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) {}
  transform(url) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
@NgModule({
    declarations: [SafeUrlPipe],
    exports: [SafeUrlPipe]
  })
  export class SafeUrlPipeModule {}