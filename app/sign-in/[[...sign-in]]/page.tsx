import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-600">
      <div className="bg-white/20 backdrop-blur-md p-8 rounded-xl border border-white/30 shadow-lg">
        <SignIn 
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "bg-transparent shadow-none",
              headerTitle: "text-white",
              headerSubtitle: "text-white/80",
              formButtonPrimary: "bg-white/20 hover:bg-white/30 text-white",
              formFieldInput: "bg-white/10 border border-white/30 text-white",
              formFieldLabel: "text-white",
              footerActionLink: "text-white hover:text-white/80",
              identityPreviewText: "text-white",
              identityPreviewEditButton: "text-white/80 hover:text-white",
            },
          }}
        />
      </div>
    </div>
  );
}