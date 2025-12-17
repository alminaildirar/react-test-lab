import { cookies } from "next/headers";
import UserPanelClient from "./UserPanelClient";

export default async function UserPanelServer() {
  const cookieStore = await cookies();
  const role = cookieStore.get("role")?.value ?? null;

  return <UserPanelClient role={role} />;
}
