// src/app/(protected)/_components/app-sidebar.tsx
"use client";

import {
  CalendarDays,
  LayoutDashboard,
  LogOut,
  Stethoscope,
  UsersRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton, // Este é o SidebarMenuButton de sidebar.tsx
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Agendamentos",
    url: "/appointments",
    icon: CalendarDays,
  },
  {
    title: "Médicos",
    url: "/doctors",
    icon: Stethoscope,
  },
  {
    title: "Pacientes",
    url: "/patients",
    icon: UsersRound,
  },
];

export function AppSidebar() {
  const router = useRouter();
  const session = authClient.useSession();
  const pathname = usePathname();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/authentication");
        },
      },
    });
  };

  // Determinar as iniciais para o AvatarFallback
  const clinicName = session.data?.user?.clinic?.name;
  const userName = session.data?.user?.name;
  let fallbackText = "U"; // Padrão para Usuário

  if (clinicName) {
    fallbackText = clinicName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  } else if (userName) {
    fallbackText = userName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  }
  if (fallbackText.length > 2) {
    fallbackText = fallbackText.substring(0, 2);
  }


  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        <Image src="/Logo (1).svg" alt="ClinicPlus" width={136} height={28} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon className="size-4" /> {/* Adicionado className para consistência de tamanho */}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {/* Aplicando a correção aqui: */}
                <SidebarMenuButton asChild size="lg">
                  <div className="flex w-full items-center gap-2 text-left"> {/* Wrapper div */}
                    <Avatar>
                      <AvatarFallback>{fallbackText}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col overflow-hidden">
                      <p className="truncate text-sm font-medium">
                        {session.data?.user?.clinic?.name || "Minha Clínica"}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {session.data?.user.email}
                      </p>
                    </div>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" /> {/* Adicionado margin e tamanho */}
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}