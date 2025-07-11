"use client";

import AllUsers from "@/components/common/AllUsers";
import Auth from "@/components/common/Auth";

export default function Home() {
  return (
    <Auth role="admin">
      <div className="max-w-screen-xl mx-auto">
        <AllUsers />
      </div>
    </Auth>
  );
}
