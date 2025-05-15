export interface UpdateSettingsData {
  min_booking_length?: number;
  max_booking_length?: number;
  max_guests_per_booking?: number;
  breakfast_price?: number;
}

export enum Discount {
  ParamName = "discount",
  All = "all",
  With = "with-discount",
  Without = "no-discount",
}

export enum PageURLQuery {
  ParamName = "page"
}

export enum CabinSort {
  ParamName = "sortBy",
  NameDescLabel = "Sort by name (Z-A)",
  NameAscLabel = "Sort by name (A-Z)",
  PriceDescLabel = "Sort by price (high first)",
  PriceAscLabel = "Sort by price (low first)",
  CapacityDescLabel = "Sort by max capacity (high first)",
  CapacityAscLabel = "Sort by max capacity (low first)",
  NameDescValue = "name-desc",
  NameAscValue = "name-asc",
  PriceDescValue = "regular_price-desc",
  PriceAscValue = "regular_price-asc",
  CapacityDescValue = "max_capacity-desc",
  CapacityAscValue = "max_capacity-asc"
}

export interface GuestAPIData {
  id: number;
  created_at?: Date;
  full_name: string;
  email: string;
  national_id?: string;
  nationality?: string;
  country_flag?: string;
}