import { getUser } from "@/actions/auth";
import Navbar from "./Navbar";

interface AuthStatusClientWrapperProps {
  navLinks: { key: string; link: string }[];
}

export default async function AuthStatusClientWrapper({ navLinks }: AuthStatusClientWrapperProps) {
  const user = await getUser();
  if ('message' in user) {
    return <Navbar user={null} navLinks={navLinks} />
  }
  return <Navbar user={user} navLinks={navLinks} />
}