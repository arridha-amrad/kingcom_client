"use server";

import { cookies } from "next/headers";

export const changeTheme = async (theme: "light" | "dark") => {
  const cookie = await cookies();
  cookie.set("theme", theme);
};
