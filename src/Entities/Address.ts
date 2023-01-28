export class Address {
  [x: string]: any;
  public city: string;
  public province: string;
  public postalCode: string;
  public country: string;

  get state(): string {
    return this.province;
  }

  set state(value: string) {
    this.province = value;
  }

  set line1(value: string) {
    this["line_1"] = value;
  }

  set line2(value: string) {
    this["line_2"] = value;
  }

  set line3(value: string) {
    this["line_3"] = value;
  }

  // get line1(): string {
  //   return this["line_1"];
  // }

  // get line2(): string {
  //   return this["line_2"];
  // }

  // get line3(): string {
  //   return this["line_3"];
  // }
}
