import { SignIn } from "@clerk/nextjs";
import { Brain, Zap, BarChart3 } from "lucide-react";

const features = [
  {
    title: "Smart Analysis",
    description: "Get detailed insights about your video content",
    icon: Brain,
  },
  {
    title: "Instant Results",
    description: "Receive analysis in seconds, not hours",
    icon: Zap,
  },
  {
    title: "Deep Insights",
    description: "Understand your content's performance",
    icon: BarChart3,
  },
];

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-blue-600 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full mx-auto grid md:grid-cols-2 gap-8">
        {/* Left Side - Features */}
        <div className="hidden md:flex flex-col justify-center space-y-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Icon className="w-6 h-6 text-white" />
                  <h3 className="text-lg font-semibold text-white">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-white/80">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Right Side - Sign In */}
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20">
          <SignIn 
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "bg-transparent shadow-none",
                headerTitle: "text-white text-2xl",
                headerSubtitle: "text-white/80",
                socialButtonsBlockButton: "bg-white/10 border border-white/20 text-white hover:bg-white/20",
                dividerLine: "bg-white/20",
                formFieldLabel: "text-white",
                formFieldInput: "bg-white/10 border-white/20 text-white placeholder:text-white/50",
                formButtonPrimary: "bg-blue-600 hover:bg-blue-700",
                footerActionLink: "text-white hover:text-white/80",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
