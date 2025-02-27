"use client";
import Link from "next/link";
import AgentPulse from "./AgentPulse";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

function Header() {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 w-[80%] z-50">
      <div className="bg-gradient-to-b from-white/70 to-white/20 backdrop-blur-md border border-white/30 rounded-full shadow-lg">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Left */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-4">
              <div className="p-2 rounded-full bg-gradient-to-b from-white/30 to-white/10 backdrop-blur-sm border border-white/20">
                <AgentPulse size="small" color="blue" />
              </div>
              <h1 className="text-xl font-semibold text-white">
                AgentTube
              </h1>
            </Link>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            <SignedIn>
              <Link href="/manage-plan">
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/20 transition-colors"
                >
                  Manage Plan
                </Button>
              </Link>

              <div className="p-2 w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-b from-white/30 to-white/10 backdrop-blur-sm border border-white/20">
                <UserButton />
              </div>
            </SignedIn>

            <SignedOut>
              <SignInButton mode="modal">
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/20 transition-colors"
                >
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
