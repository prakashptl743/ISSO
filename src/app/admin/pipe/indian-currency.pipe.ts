import { NgModule, Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "indianCurrency",
})
export class IndianCurrencyPipe implements PipeTransform {
  transform(value: number | string): string {
    if (value === null || value === undefined) return "";

    const num = Number(value);
    if (isNaN(num)) return "";

    return num.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
}
@NgModule({
  declarations: [IndianCurrencyPipe],
  exports: [IndianCurrencyPipe],
})
export class IndianCurrencyPipeModule {}
