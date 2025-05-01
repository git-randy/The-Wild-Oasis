import { User } from "@supabase/supabase-js"

export interface signUpFormData {
  fullName?: string,
  email: string,
  password: string,
}

export interface UserMetadata {
  avatar?: string;
  fullName: string;
  email: string;
  email_verified?: boolean;
  phone_verified?: boolean;
  sub?: string;
}

export interface UserData extends Omit<User, "user_metadata"> {
  user_metadata: UserMetadata
}