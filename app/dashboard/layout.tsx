import React from "react";
import SideNav from "@/components/nav/side-nav";
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span1">
        <SideNav />
      </div>

      <div className="col-span3">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
          sapiente voluptatum rem asperiores iure inventore molestiae quas porro
          optio, consequatur natus nostrum, eius libero sequi amet eaque cumque
          incidunt facere!
        </p>
      </div>

      <div className="col-span1">
        <SideNav />
      </div>
    </div>
  );
}
