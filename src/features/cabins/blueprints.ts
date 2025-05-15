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
  created_at?: string;
  image?: string;
}

export interface CabinInsertData extends Omit<CabinFormData, "image"> {
  image: string
}