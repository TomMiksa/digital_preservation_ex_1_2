export class Item {
  constructor(
    private text: string,
    private value: number) {
  }
}

export class FormControlMetadata {

  constructor(
    private label: string,
    private data: Array<Item>) {
  }
}

