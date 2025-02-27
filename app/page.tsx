import AgentPulse from "@/components/AgentPulse";
import YoutubeVideoForm from "@/components/YoutubeVideoForm";
import { Button } from "@/components/ui/button";
import {
  Brain,
  Camera,
  Mic,
  MessageSquare,
  Video,
  Sparkles,
  Zap,
  BarChart3,
  Target,
} from "lucide-react";

const steps = [
  {
    title: "1. Connect Your Content",
    description: "Share your youtube video URL and let your agent get to work",
    icon: Video,
  },
  {
    title: "2. AI Agent Analysis",
    description:
      "Get insights into your video with our AI-powered analysis. Understand viewer engagement and content quality.",
    icon: Brain,
  },
  {
    title: "3. Receive Intelligence",
    description:
      "Receive detailed insights into your video performance, engagement metrics, and optimization suggestions.",
    icon: MessageSquare,
  },
];

const features = [
  {
    title: "Smart Analysis",
    description:
      "Get detailed insights about your video content and audience engagement patterns.",
    icon: Brain,
    emoji: "🎯",
  },
  {
    title: "Instant Results",
    description:
      "Receive comprehensive analysis in seconds, not hours or days.",
    icon: Zap,
    emoji: "⚡",
  },
  {
    title: "Deep Insights",
    description:
      "Understand your content's performance and impact with detailed metrics.",
    icon: BarChart3,
    emoji: "📊",
  },
  {
    title: "AI-Powered",
    description:
      "Leverage cutting-edge AI technology for content optimization and growth.",
    icon: Target,
    emoji: "🤖",
  },
  {
    title: "Smart Transcription",
    description:
      "Enhance your video content with real-time transcription. Capture key insights for your audience.",
    icon: Mic,
    emoji: "🎤",
  },
  {
    title: "Thumbnail Analysis",
    description:
      "Get AI-powered suggestions for thumbnail optimization and engagement.",
    icon: Camera,
    emoji: "📸",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-blue-600">
      {/* Hero Section */}
      <section className="pt-36 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-6xl font-bold mb-6 max-w-4xl">
              <span className="text-black">Meet Your Personal</span>{" "}
              <span className="text-white">AI Content Agent</span>
            </h1>

            <p className="text-lg text-white/90 mb-12 max-w-2xl">
              Transform your video content with AI-powered analysis,
              transcription, and insights. Get started in seconds.
            </p>

            {/* Video Form */}
            <div className="w-full max-w-2xl">
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20">
                <YoutubeVideoForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Powerful Features for Content Creators
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-2xl">{feature.emoji}</div>
                    <Icon className="w-5 h-5 text-white/90" />
                  </div>

                  <h3 className="text-xl font-semibold mb-3 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-white/90 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Meet your AI agent in 3 simple steps
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="text-center p-8 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all"
                >
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border border-white/30">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">
                    {step.title}
                  </h3>
                  <p className="text-white/90 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section className="py-20 px-4 md:px-0 bg-white/10 backdrop-blur-sm border-t border-white/20">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">
            Ready to Meet your AI Content Agent?
          </h2>
          <p className="text-xl text-white/90">
            Join Creators leveraging AI to unlock content insights
          </p>
          <blockquote className="mt-12 max-w-2xl mx-auto border-l-2 border-white/40 pl-6 italic">
            <p className="text-lg text-white/90">
              "AgentTube's AI analysis has transformed how we create content.
              It's like having a content strategist working 24/7."
            </p>
            <footer className="mt-2 text-sm text-white/70">
              — Alex Chen, YouTube Creator with 1M+ Subscribers
            </footer>
          </blockquote>
        </div>
      </section>
    </div>
  );
}
