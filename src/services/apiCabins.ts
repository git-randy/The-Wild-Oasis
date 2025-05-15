import supabase, { supabaseImgRootPath } from "./superbase";
import { title } from "../utils/helpers";
import {
  CabinAPIData,
  AddNewCabinData,
  CabinInsertData,
  EditCabinData,
} from "../features/cabins/blueprints";

const CABIN_IMG_PATH = `${supabaseImgRootPath}/cabin-images//`;

export async function getCabins(): Promise<CabinAPIData[]> {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function deleteCabinById(id: number) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error(`Cabin with id ${id} could not be deleted`);
  }

  return data;
}

export async function addNewCabin(cabin: AddNewCabinData) {
  // We don't want supabase to create nested
  // folders so remove all forward slashes
  const imageName = cabin.image.name.replace("/", "");
  const fullImgPath = `${CABIN_IMG_PATH}${imageName}`;

  const { data: exists } = await supabase.storage
    .from("cabin-images")
    .exists(imageName);

  if (!exists) {
    await uploadCabinImage(imageName, cabin.image);
  }

  const { data, error } = await supabase
    .from("cabins")
    .insert({ ...cabin, image: fullImgPath });

  if (error) {
    console.error(error);
    throw new Error(`Unable to add new Cabin. ${title(error.message)}`);
  }

  return data;
}

export async function copyCabin(cabin: CabinInsertData) {
  const { data, error } = await supabase.from("cabins").insert(cabin);

  if (error) {
    console.error(error);
    throw new Error(`Unable to duplicate cabin. ${title(error.message)}`);
  }

  return data;
}

export async function uploadCabinImage(
  imageName: string,
  imageData: File,
  upsert: boolean = false,
  cacheControl: string = "3600"
): Promise<{ id: string; path: string; fullPath: string }> {
  /**
   * @param {string} imageName - Name of the image
   * @param {File} imageData - A File object of the image
   * @param {boolean} upsert - Choose whether to upsert the image
   * @param {string} cacheControl - How long a file is cached by the browser
   * @returns - A promise of a postgresql data object
   */

  const { data, error } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, imageData, {
      cacheControl,
      upsert,
    });

  if (error) {
    throw new Error(`Could not upload ${imageName}. ${error.message}`);
  }
  return data;
}

export async function updateCabin(cabin: EditCabinData) {
  let fullImgPath = undefined;

  if (cabin.image) {
    const imageName = cabin.image.name.replace("/", "");
    fullImgPath = `${CABIN_IMG_PATH}${imageName}`;
    try {
      await uploadCabinImage(cabin.image.name, cabin.image);
    } catch (err) {
      throw new Error(`Cabin was not updated. ${err}`);
    }
  }

  const { data, error } = await supabase
    .from("cabins")
    .update({ ...cabin, image: fullImgPath })
    .eq("id", cabin.id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Unable to edit cabin");
  }

  return data;
}
