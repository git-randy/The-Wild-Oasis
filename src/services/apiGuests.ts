import { GuestFormData } from "../features/bookings/blueprints";
import { GuestAPIData } from "../utils/blueprints";
import supabase from "./superbase";

export async function addGuest(guest: GuestFormData): Promise<GuestAPIData> {
  const { data, error } = await supabase.from("guests").upsert(guest).select().single();

  if (error) throw new Error(`Could not add new guest. ${error.message}`,);

  return data;
}
