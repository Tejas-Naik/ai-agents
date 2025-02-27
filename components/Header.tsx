"use client";
import Link from "next/link";
import AgentPulse from "./AgentPulse";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

const signInAppearance = {
  elements: {
    rootBox: "w-full",
    card: "bg-white/20 backdrop-blur-md border border-white/30 rounded-xl shadow-lg",
    headerTitle: "text-white",
    headerSubtitle: "text-white/80",
    formButtonPrimary: "bg-white/20 hover:bg-white/30 text-white",
    formFieldInput: "bg-white/10 border border-white/30 text-white",
    formFieldLabel: "text-white",
    footerActionLink: "text-white hover:text-white/80",
    identityPreviewText: "text-white",
    identityPreviewEditButton: "text-white/80 hover:text-white",
  },
};

const userButtonAppearance = {
  elements: {
    avatarBox: "w-8 h-8",
    userButtonPopoverCard: "bg-white/20 backdrop-blur-md border border-white/30 rounded-xl shadow-lg",
    userButtonPopoverActionButton: "text-white hover:bg-white/10",
    userButtonPopoverActionButtonText: "text-white",
    userButtonPopoverFooter: "border-white/10",
  }
};

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
              <SignInButton mode="modal" appearance={signInAppearance}>
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
                <UserButton appearance={userButtonAppearance} />
              </div>
            </SignedIn>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
