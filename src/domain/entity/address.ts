export default class Address {
  _street: String = "";
  _number: number = 0;
  _zip: String = "";
  _country: String = "";
  _city: String = "";
  _active: boolean = false;

  constructor(
    street: String,
    number: number,
    zip: string,
    city: String,
    country: String
  ) {
    this._street = street;
    this._zip = zip;
    this._number = number;
    this._country = country;
    this._city = city;
    this._country = country;
  }
  get street(): String {
    return this._street;
  }
  get zip(): String {
    return this._zip;
  }
  get number(): Number {
    return this._number;
  }
  get country(): String {
    return this._country;
  }
  get city(): String {
    return this._city;
  }
  validation() {
    if (this._street.length === 0) {
      throw new Error("Street is required");
    } else if (this._zip.length < 8) {
      throw new Error("Zip is required");
    }
    this._active = true;
  }
  toJson() {
    return {
      street: this._street,
      number: this._number,
      city: this._city,
      country: this._country,
      zip: this._zip,
      active: this._active,
    };
  }
}
