import { Material } from './Material'

export class Link implements Material {
    url: string;
    readonly title: string

    constructor (title: string, url: string) {
      this.title = title
      this.url = url
    }
}
