"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthModel } from "@/features/auth/model";
import { concatFirstLetters } from "@/utils/string.utils";
import { Settings, User, Briefcase, Shield, LogOut } from "lucide-react";

export default function AppTopBarAuthUserMenu() {
  const { authUser } = useAuthModel();

  const firstName = authUser?.firstName ?? "";
  const lastName = authUser?.lastName ?? "";
  const fullName = `${firstName} ${lastName}`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="ml-4">
        <Avatar className="cursor-pointer">
          {authUser?.photo && <AvatarImage src={authUser.photo} />}
          <AvatarFallback>
            {concatFirstLetters(authUser?.firstName ?? "", authUser?.lastName ?? "")}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72 bg-background px-3 py-3">
        <div className="flex items-start">
          <Avatar className="cursor-pointer w-12 h-12">
            {authUser?.photo && <AvatarImage src={authUser.photo} />}
            <AvatarFallback>{concatFirstLetters(firstName, lastName)}</AvatarFallback>
          </Avatar>
          <div className="ml-3">
            <h2 className="text-sm font-medium">{fullName}</h2>
            <span className="text-foreground/80 text-xs">{authUser?.email ?? authUser?.phone}</span>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Mon compte</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Paramètres</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Briefcase className="mr-2 h-4 w-4" />
            <span>Espace coopérative</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Shield className="mr-2 h-4 w-4" />
            <span>Espace administrateurs</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Se déconnecter</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
