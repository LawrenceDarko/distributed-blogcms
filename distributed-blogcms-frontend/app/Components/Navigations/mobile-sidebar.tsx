// import { Menu } from "lucide-react"
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
// import Sidebar from "./sidebar"

// export const MobileSidebar = () => {
//     return (
//         <Sheet>
//             <SheetTrigger className="pr-4 transition md:hidden hover:opacity-75">
//                 <Menu />
//             </SheetTrigger>
//             <SheetContent side='left' className="p-0 bg-white">
//                 <Sidebar />
//             </SheetContent>
//         </Sheet>
//     )
// }

// 'use client'

// import { useState } from 'react';
// // import { Menu } from 'lucide-react';

// const MobileSidebar = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     console.log("Hey")
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div className="relative">
//       {/* Menu Trigger */}
//       <div className="pr-4 transition-opacity cursor-pointer md:hidden hover:opacity-75" onClick={toggleSidebar}>
//         {/* <Menu /> */}
//         Menu
//       </div>

//       {/* Sidebar */}
//       {isSidebarOpen && (
//         <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={toggleSidebar}>
//           <div className="fixed inset-y-0 left-0 w-full max-w-xs overflow-y-auto transition-transform duration-300 ease-in-out transform translate-x-0 bg-white">
//             {/* Sidebar Content */}
//             <div className="p-4">
//               {/* Your Sidebar content goes here */}
//               <p>Sidebar Content</p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MobileSidebar;