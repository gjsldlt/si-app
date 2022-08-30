import { useState } from "react";
import { useRouter } from "next/router";

import HeaderBar from "../headerBar/headerBar.component";
import Sidebar from "../sidebar/sidebar.component";

import AppRoutes from "../../helpers/routes.helper";
import { RouteItem } from "../../types/MasterTypes.types";
import { LayoutProps } from "../../types/MasterPageComponent.type";

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const [sidebarShow, setSidebarShow] = useState(false);
  const [breadcrumb] = useState(["home"]);

  const tailwindClasses = {
    layout: "layout-container flex",
    body: "body relative md:ml-sidebar-min w-full h-screen",
    content: "content relative flex flex-col items-stretch h-screen",
  };

  const goToRoute = (routeItem: RouteItem) => {
    router.push(routeItem.route);
  };

  console.log("layout render ");
  return (
    <div className={tailwindClasses.layout}>
      <HeaderBar
        breadcrumb={breadcrumb}
        onMenuClick={() => setSidebarShow(!sidebarShow)}
        show={sidebarShow}
      />
      <div className={tailwindClasses.body}>
        <Sidebar
          onRouteClick={goToRoute}
          routes={AppRoutes}
          show={sidebarShow}
        />
        <div className={`${tailwindClasses.content}`}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
