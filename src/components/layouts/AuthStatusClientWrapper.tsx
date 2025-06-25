import { getUser } from "@/actions/user";
import Navbar from "./Navbar";

interface AuthStatusClientWrapperProps {
  navLinks: { key: string; link: string }[];
}

export default async function AuthStatusClientWrapper({ navLinks }: AuthStatusClientWrapperProps) {
  const user = await getUser();
  return <Navbar user={user} navLinks={navLinks} />
}