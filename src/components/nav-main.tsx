"use client";

import {
  ChevronRight,
  Image,
  MessageSquare,
  BarChart3,
  Wand2,
  type LucideIcon,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const aiTools = [
    { title: "Analytics", icon: BarChart3, url: "/dashboard" },
    { title: "Chat", icon: MessageSquare, url: "/dashboard/chat" },
    { title: "Text to Image", icon: Image, url: "/dashboard/text-to-image" },
    // {
    //   title: "Text Generation",
    //   icon: Wand2,
    //   url: "/dashboard/text-generation",
    // },
  ];

  return (
    <>
      {/* <SidebarGroup>
        <SidebarGroupLabel>Platform</SidebarGroupLabel>
        <SidebarMenu>
          {items.map((item) => (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <a href={subItem.url}>
                            <span>{subItem.title}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarGroup> */}

      {/* AI Tools Section */}
      <SidebarGroup>
        <SidebarGroupLabel>AI Tools</SidebarGroupLabel>
        <SidebarMenu>
          {aiTools.map((tool) => (
            <SidebarMenuItem key={tool.title}>
              <SidebarMenuButton asChild tooltip={tool.title}>
                <Link href={tool.url}>
                  <tool.icon />
                  <span>{tool.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </>
  );
}

// "use client";

// import {
//   ChevronRight,
//   Image as Imageicon,
//   type LucideIcon,
// } from "lucide-react";

// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";
// import {
//   SidebarGroup,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarMenuSub,
//   SidebarMenuSubButton,
//   SidebarMenuSubItem,
// } from "@/components/ui/sidebar";
// import Link from "next/link";

// export function NavMain({
//   items,
// }: {
//   items: {
//     title: string;
//     url: string;
//     icon?: LucideIcon;
//     isActive?: boolean;
//     items?: {
//       title: string;
//       url: string;
//     }[];
//   }[];
// }) {
//   return (
//     <>
//       <SidebarGroup>
//         <SidebarGroupLabel>Platform</SidebarGroupLabel>
//         <SidebarMenu>
//           {items.map((item) => (
//             <Collapsible
//               key={item.title}
//               asChild
//               defaultOpen={item.isActive}
//               className="group/collapsible"
//             >
//               <SidebarMenuItem>
//                 <CollapsibleTrigger asChild>
//                   <SidebarMenuButton tooltip={item.title}>
//                     {item.icon && <item.icon />}
//                     <span>{item.title}</span>
//                     <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
//                   </SidebarMenuButton>
//                 </CollapsibleTrigger>
//                 <CollapsibleContent>
//                   <SidebarMenuSub>
//                     {item.items?.map((subItem) => (
//                       <SidebarMenuSubItem key={subItem.title}>
//                         <SidebarMenuSubButton asChild>
//                           <a href={subItem.url}>
//                             <span>{subItem.title}</span>
//                           </a>
//                         </SidebarMenuSubButton>
//                       </SidebarMenuSubItem>
//                     ))}
//                   </SidebarMenuSub>
//                 </CollapsibleContent>
//               </SidebarMenuItem>
//             </Collapsible>
//           ))}
//         </SidebarMenu>
//       </SidebarGroup>

//       {/* Text to Image Section */}
//       <SidebarGroup>
//         <SidebarGroupLabel>AI Tools</SidebarGroupLabel>
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <SidebarMenuButton asChild tooltip="Text to Image">
//               <Link href="/dashboard/text-to-image">
//                 <Imageicon />
//                 <span>Text to Image</span>
//               </Link>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarGroup>
//     </>
//   );
// }
