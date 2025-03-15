"use client";
import Link from "next/link";
import AgentPulse from "./AgentPulse";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

const signInAppearance = {
  elements: {
    rootBox: "w-full",
    card: "bg-white border border-gray-100 rounded-xl shadow-lg",
    headerTitle: "text-gray-900",
    headerSubtitle: "text-gray-600",
    formButtonPrimary: "bg-blue-500 hover:bg-blue-600 text-white",
    formFieldInput: "bg-white border border-gray-200 text-gray-900",
    formFieldLabel: "text-gray-700",
    footerActionLink: "text-blue-500 hover:text-blue-600",
    identityPreviewText: "text-gray-900",
    identityPreviewEditButton: "text-gray-600 hover:text-gray-900",
  },
};

const userButtonAppearance = {
  elements: {
    avatarBox: "w-8 h-8",
    userButtonPopoverCard:
      "bg-white border border-gray-100 rounded-xl shadow-lg",
    userButtonPopoverActionButton: "text-gray-700 hover:bg-gray-50",
    userButtonPopoverActionButtonText: "text-gray-700",
    userButtonPopoverFooter: "border-gray-100",
  },
};

function Header() {
  return (
    <div className="fixed  top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <AgentPulse size="small" color="blue" />
              </div>
              <h1 className="text-lg font-medium text-gray-900">
                <span>Agent</span>
                <span className="text-blue-500">Tube</span>
              </h1>
            </Link>
          </div>

          {/* Middle */}
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900">
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-gray-600 hover:text-gray-900"
            >
              How it Works
            </a>
            <a
              href="#testimonials"
              className="text-gray-600 hover:text-gray-900"
            >
              Testimonials
            </a>
          </div>

          {/* Right */}
          <div className="flex items-center">
            <SignedOut>
              <SignInButton mode="modal" appearance={signInAppearance}>
                <Button
                  variant="ghost"
                  className="text-gray-600 text-sm font-medium hover:text-gray-900 transition-colors mr-2"
                >
                  Sign In
                </Button>
              </SignInButton>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg text-sm px-4 py-2 transition-colors">
                Get Started
              </Button>
            </SignedOut>

            <SignedIn>
              <Link href="/manage-plan">
                <Button
                  variant="ghost"
                  className="text-gray-600 text-sm font-medium hover:text-gray-900 transition-colors"
                >
                  Manage Plan
                </Button>
              </Link>
              <div className="ml-4">
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
