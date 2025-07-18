import { MapPin } from "lucide-react";
import Tabs from "@/components/profile/Tap";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import EditUserProfileModal from "@/components/profile/EditUserProfileModal";
import ChangePasswordModal from "@/components/profile/ChangePasswordModal";
import { getUser } from "@/actions/user";
import { redirect } from 'next/navigation';

const Page = async ({ searchParams }: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {

  const {
    page = "1",
  } = await searchParams;

  const user = await getUser();
  if (!user) {
    redirect('/');
  }
  const userName = user.name;
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  return (
    <div className="surface-box">
      <div className="container mx-auto py-9">
        <div className="flex flex-col lg:flex-row justify-between gap-6 cstm-card-style bg-white w-full p-6">
          <div className="flex gap-6">
            <Avatar className="size-24">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="text-primary bg-primary-100">{ initials }</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-4">
              <div>
                <h4>{user.name}</h4>
                {user.job_title && <p className="text-cstm-gray">{user.job_title}</p>}
              </div>
              <div className="flex flex-wrap gap-4">
                {(user.city || user.country )&&<div className="flex gap-1">
                  <MapPin size={16} className="inline" />
                  <p className="text-cstm-gray">{user.city}، {user.country}</p>
                </div>}
                <p className="text-cstm-gray">
                  عضو منذ {new Date(user.created_at).toLocaleString('ar-EG', { month: 'long', year: 'numeric' })}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4">
            <EditUserProfileModal user={user} />
            <ChangePasswordModal />
          </div>
        </div>
        <div className="mt-6 cstm-card-style bg-white py-9 px-6 rounded-[16px]">
          <Tabs page={page}/>
        </div>
      </div>
    </div>
  )
}

export default Page;