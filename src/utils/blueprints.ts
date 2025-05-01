export interface CabinFormData {
  name: string;
  max_capacity: number;
  regular_price: number;
  discount: number;
  description: string;
  image?: FileList
}

export interface AddNewCabinData extends Omit<CabinFormData, "image"> {
  image: File;
}

export interface EditCabinData extends Omit<CabinFormData, "image"> {
  id: number;
  created_at?: Date;
  image?: File | undefined;
}

export interface CabinAPIData extends Omit<CabinFormData, "image"> {
  id: number;
  created_at?: Date;
  image?: string;
}

export interface CabinInsertData extends Omit<CabinFormData, "image"> {
  image: string
}

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