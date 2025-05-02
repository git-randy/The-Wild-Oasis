import { UserData } from "../features/authentication/blueprints";
import supabase, { supabaseImgRootPath } from "./superbase";

const AVATAR_IMG_PATH = `${supabaseImgRootPath}/avatars//`

type SignUpArgs = {
  email: string;
  password: string;
  fullName?: string;
};

export async function signUp({ email, password, fullName }: SignUpArgs) {
  console.log(fullName, email, password)
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data.user;
}

type loginArgs = {
  email: string;
  password: string;
};

export async function login({ email, password }: loginArgs) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return data.user as UserData;
}

export async function uploadAvatar(
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
    .from("avatars")
    .upload(imageName, imageData, {
      cacheControl,
      upsert,
    });

  if (error) {
    throw new Error(`Could not upload ${imageName}. ${error.message}`);
  }
  return data;
}

type UpdateArgs = {
  password?: string | undefined,
  fullName?: string | undefined,
  avatar?: File | null | undefined
}
export async function updateUser({password, fullName, avatar}: UpdateArgs) {

  let fullImgPath = undefined

  if (avatar) {
    // Remove all forward slashes
    const imageName = avatar.name.replace("/", "");
    fullImgPath = `${AVATAR_IMG_PATH}${imageName}`;

    await uploadAvatar(imageName, avatar, true)
  }

  const updateData = {
    password,
    data: {
      fullName,
      avatar: fullImgPath
    }
  }

  const { data: user, error } = await supabase.auth.updateUser(updateData)

  if (error) throw new Error(error.message)

  return user.user
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}
