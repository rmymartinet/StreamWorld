//nous pouvons utiliser async qui cest serveur side compoentn
//!! singifie que si user est true alors on affiche le composant

import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, currentUser } from "@clerk/nextjs";
import { Clapperboard } from "lucide-react";
import Link from "next/link";

export const Actions = async () => {
  const user = await currentUser();
  return (
    <div className="flex items-center justify-center gap-x-2 ml-4 lg:ml-0">
      {!user && (
        <SignInButton>
          <Button>Login</Button>
        </SignInButton>
      )}
      {!!user && (
        <div className="flex items-center gap-x-4 border">
          <Button
            size="sm"
            variant="ghost"
            className=" text-muted-foreground hover:text-primary"
          >
            <Link href={`/u/${user.username}`}>
              <Clapperboard className="h-5 w-5 lg:mr-2 text-muted-foreground" />
            </Link>
            <span className="hidden lg:block">Dashboard</span>
          </Button>

          <UserButton afterSignOutUrl="/" />
        </div>
      )}
    </div>
  );
};
