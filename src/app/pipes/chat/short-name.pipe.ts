import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "shortName"
})
export class ShortNamePipe implements PipeTransform {
  transform(fullName: string): any {
    return fullName?.charAt(0)?.toUpperCase() ?? "U"
  }
}

