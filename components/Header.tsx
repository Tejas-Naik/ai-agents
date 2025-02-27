"use client";
import Link from "next/link";
import AgentPulse from "./AgentPulse";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

function Header() {
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] z-50">
      <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-full shadow-lg">
        <div className="flex items-center justify-between h-14 px-6">
          {/* Left */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <AgentPulse size="small" color="white" />
              </div>
              <h1 className="text-lg font-medium text-white">
                AgentTube
              </h1>
            </Link>
          </div>

          {/* Right */}
          <div className="flex items-center">
            <SignedOut>
              <SignInButton mode="modal">
                <Button
                  variant="ghost"
                  className="text-white text-sm font-medium hover:bg-white/10 transition-colors rounded-full px-6"
                >
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <Link href="/manage-plan">
                <Button
                  variant="ghost"
                  className="text-white text-sm font-medium hover:bg-white/10 transition-colors"
                >
                  Manage Plan
                </Button>
              </Link>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center ml-4">
                <UserButton />
              </div>
            </SignedIn>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
