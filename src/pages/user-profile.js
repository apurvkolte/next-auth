"use client";
import Auth from "@/components/common/Auth";
import Userprofile from "@/components/common/Userprofile";

export default function Home() {
  return (
    <Auth role={["user", "admin", "manger"]}>
      <div className="max-w-screen-xl">
        <Userprofile />
      </div>
    </Auth>
  );
}
