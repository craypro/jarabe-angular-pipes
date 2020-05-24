import {
  Pipe,
  PipeTransform
} from '@angular/core';

@Pipe({
  name: 'jarabeImage'
})

export class JarabeImagePipe implements PipeTransform {

  sizes: Array < String > = ['', 'avatar', 'thumb', 'small', 'medium', 'big']

  transform(url: string, name: string = "", api ? : any): string {
    url = this.GetFullUrl(url, api);
    name = this.CheckSizeName(name);
    return this.PepareUrlWithSufix(url, name);
  }

  private GetFullUrl(url: string, api: any) {
    if (!(url.includes("https://") || url.includes("http://"))) {
      if (api) {
        if (api.hasOwnProperty("baseURL")) {
          url = api["baseURL"] + url;
        } else if (api.hasOwnProperty("getBaseURL")) {
          url = api["getBaseURL"]() + url;
        }
      }
    }
    return url;
  }

  private CheckSizeName(name) {
    if (this.sizes.findIndex(size => size == name) == -1) {
      name = "medium";
    }
    return name;
  }

  private PepareUrlWithSufix(url, name) {
    let newUrl = url.split("/").reverse()
    newUrl[0] = `${name}` + newUrl[0];
    newUrl = newUrl.reverse().join("/");
    return newUrl;
  }

}