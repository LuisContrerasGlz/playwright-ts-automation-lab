export type CountryCode = "MX" | "US" | "CH" | "JP";
export type Currency = "MXN" | "USD" | "CHF" | "JPY";
export type Role = "customer";

export interface User {
  username: string;
  password: string;
  role?: Role;
  description: string;
}

export interface Market {
  // Accept either `countryCode` or `code` depending on JSON source
  countryCode?: CountryCode;
  code?: CountryCode;
  currency: Currency;
  fullName: string;
  // optional country name if present
  country?: string;
  phone: string;
  address: string;
  colonia?: string;
  zipCode?: string;
  // accept both `taxRate` (camelCase in JSON) and `taxrate` (legacy)
  taxRate?: number;
  taxrate?: number;
}