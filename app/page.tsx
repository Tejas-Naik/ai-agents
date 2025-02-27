import {
  Brain,
  Camera,
  Mic,
  MessageSquare,
  Video,
  Zap,
  BarChart3,
  Target,
  LucideIcon,
} from "lucide-react";
import YoutubeVideoForm from "@/components/YoutubeVideoForm";

interface Step {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
  emoji: string;
}

const steps: Step[] = [
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

const features: Feature[] = [
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
    <div className="min-h-screen bg-[#1E1B4B] text-white">
      {/* Hero Section */}
      <section className="pt-32 lg:pt-40 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <div className="inline-block px-4 py-1.5 mb-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <span className="text-sm font-medium text-white/90">
                ✨ AI-Powered Content Analysis
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl">
              Meet Your Personal
              <br />
              AI Content Agent
            </h1>

            <p className="text-lg text-white/80 mb-12 max-w-2xl leading-relaxed">
              Transform your video content with AI-powered analysis,
              transcription, and insights. Get started in seconds.
            </p>

            {/* Video Form */}
            <div className="w-full max-w-2xl">
              <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 shadow-2xl">
                <YoutubeVideoForm />
                <p className="mt-4 text-sm text-white/60 text-center">
                  🔒 Your content is secure and private
                </p>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-wrap justify-center items-center gap-8">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🚀</span>
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold">10K+</div>
                  <div className="text-sm text-white/60">Videos Analyzed</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl">⭐</span>
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold">4.9/5</div>
                  <div className="text-sm text-white/60">User Rating</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🎯</span>
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold">98%</div>
                  <div className="text-sm text-white/60">Accuracy Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#2D2A6E]/30 to-transparent"></div>
        <div className="container mx-auto px-4 max-w-6xl relative">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mx-auto">
            <span className="text-sm font-medium text-white/90">
              🚀 Powerful Features
            </span>
          </div>
          <h2 className="text-3xl font-bold mb-12 text-center">
            Everything You Need to Succeed
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group relative bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                        {feature.emoji}
                      </div>
                      <Icon className="w-5 h-5 text-white/90" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#2D2A6E]/30 to-transparent"></div>
        <div className="container mx-auto px-4 max-w-6xl relative">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mx-auto">
            <span className="text-sm font-medium text-white/90">
              🎯 Getting Started
            </span>
          </div>
          <h2 className="text-3xl font-bold text-center mb-12">
            Meet your AI agent in 3 simple steps
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="relative group text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                  <div className="relative">
                    <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border border-white/20 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-10 h-10 text-white/90" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-white/70 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-3xl"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to transform your content?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Join thousands of creators using AI to unlock their full potential
            </p>
            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold transition-colors">
              Get Started Free
            </button>
            <p className="mt-4 text-sm text-white/60">
              No credit card required • 14-day free trial
            </p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section className="py-20 px-4 md:px-0 bg-black/20 backdrop-blur-sm border-t border-white/10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <span className="text-sm font-medium text-white/90">
              💫 Join the Community
            </span>
          </div>
          <blockquote className="mt-12 max-w-2xl mx-auto border-l-4 border-blue-500 pl-6 italic bg-white/5 p-8 rounded-2xl">
            <p className="text-lg text-white/90">
              &ldquo;AgentTube&apos;s AI analysis has transformed how we create
              content. It&apos;s like having a content strategist working
              24/7.&rdquo;
            </p>
            <footer className="mt-4 text-sm text-white/60">
              &mdash; Alex Chen, YouTube Creator with 1M+ Subscribers
            </footer>
          </blockquote>
        </div>
      </section>
    </div>
  );
}
