import { MapPin } from "lucide-react";
import Tabs from "@/components/profile/Tap";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import EditUserProfileModal from "@/components/profile/EditUserProfileModal";
import ChangePasswordModal from "@/components/profile/ChangePasswordModal";


const Page = () => {
  return (
    <div className="surface-box">
      <div className="container mx-auto py-9">
        <div className="flex flex-col lg:flex-row justify-between gap-6 cstm-card-style bg-white w-full p-6">
          <div className="flex gap-6">
            <Avatar className="size-24">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="text-primary bg-primary-100">CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-4">
              <div>
                <h4>محمد عبدالله</h4>
                <p className="text-cstm-gray">مصمم منتجات</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="flex gap-1">
                  <MapPin size={16} className="inline" />
                  <p className="text-cstm-gray">الرياض، المملكة العربية السعودية</p>
                </div>
                <p className="text-cstm-gray">عضو منذ أبريل 2024</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4">
            <EditUserProfileModal />
            <ChangePasswordModal />
          </div>
        </div>
        <div className="mt-6 cstm-card-style bg-white py-9 px-6 rounded-[16px]">
          <Tabs />
        </div>
      </div>
    </div>
  )
}

export default Page;