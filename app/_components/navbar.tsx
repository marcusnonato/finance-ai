"use client";

import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";

export function NavBar() {
  const pathname = usePathname();

  const NavLinks = ({ onLinkClick }: { onLinkClick?: () => void }) => (
    <>
      <Link
        href="/"
        className={
          pathname === "/"
            ? "text-primary font-bold"
            : "text-muted-foreground hover:text-foreground"
        }
        onClick={onLinkClick}
      >
        Dashboard
      </Link>
      <Link
        href="/transactions"
        className={
          pathname === "/transactions"
            ? "text-primary font-bold"
            : "text-muted-foreground hover:text-foreground"
        }
        onClick={onLinkClick}
      >
        Transações
      </Link>
      <Link
        href="/subscription"
        className={
          pathname === "/subscription"
            ? "text-primary font-bold"
            : "text-muted-foreground hover:text-foreground"
        }
        onClick={onLinkClick}
      >
        Assinatura
      </Link>
    </>
  );

  return (
    <nav className="border-b border-solid px-4 py-4 md:px-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 md:gap-10">
          <Image
            src="/logo.svg"
            alt="Finance AI"
            width={173}
            height={39}
            className="h-8 w-auto md:h-auto md:w-[173px]"
          />
          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 md:flex md:gap-10">
            <NavLinks />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <UserButton
            showName
            appearance={{
              theme: dark,
              elements: {
                userButtonOuterIdentifier: "hidden md:block",
              },
            }}
          />
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <MenuIcon size={24} />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px]">
              <SheetHeader className="pb-4">
                <Image
                  src="/logo.svg"
                  alt="Finance AI"
                  width={140}
                  height={32}
                />
              </SheetHeader>
              <nav className="flex flex-col gap-4 px-4">
                <NavLinks />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
