import React from "react"
import Logo from "./logo"
// import SidebarRoutes from "./sidebar-routes"
// import { SidebarRoutes } from "./sidebar-routes"

const Sidebar = () => {
    return (
        <div className="flex my-custom-scrollbar flex-col h-full overflow-y-auto bg-[#0256D5] border-r shadow-sm">
            <div className="flex items-center justify-center w-full p-6">
                <Logo />
                {/* <img src="/images/logo.png"/> */}
            </div>
            <div className="flex flex-col w-full">
                {/* <SidebarRoutes /> */}
            </div>
        </div>
    )
}

// export default Sidebar
export default React.memo(Sidebar)