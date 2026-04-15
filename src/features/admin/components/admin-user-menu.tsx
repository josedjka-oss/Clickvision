"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/features/auth/context/auth-context";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/routes";

export const AdminUserMenu = () => {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [pending, setPending] = useState(false);

  const handleSignOut = async () => {
    setPending(true);
    try {
      await signOut();
      router.push(routes.home);
      router.refresh();
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 text-sm">
      <span className="max-w-[200px] truncate text-muted" title={user?.email ?? undefined}>
        {user?.email}
      </span>
      <Link href={routes.account} className="text-accent underline-offset-4 hover:underline">
        Cuenta
      </Link>
      <Button type="button" variant="ghost" size="sm" disabled={pending} onClick={handleSignOut}>
        {pending ? "…" : "Salir"}
      </Button>
    </div>
  );
};
