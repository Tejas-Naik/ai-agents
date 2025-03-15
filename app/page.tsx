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
  ArrowRight,
  CheckCircle,
  Star,
  Play,
  Sparkles,
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
  color: string;
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
    title: "AI-Powered Analysis",
    description:
      "Our advanced algorithms analyze your content to identify patterns, trends, and optimization opportunities.",
    icon: Brain,
    color: "#3B82F6",
  },
  {
    title: "Real-time Insights",
    description:
      "Get actionable insights delivered instantly to help you make data-driven decisions.",
    icon: Zap,
    color: "#F59E0B",
  },
  {
    title: "Performance Metrics",
    description:
      "Track engagement, retention, and conversion metrics to understand your content's impact.",
    icon: BarChart3,
    color: "#10B981",
  },
  {
    title: "Smart Recommendations",
    description:
      "Receive personalized recommendations to enhance your content's reach and effectiveness.",
    icon: Target,
    color: "#8B5CF6",
  },
  {
    title: "Automatic Transcription",
    description:
      "Convert your video content into text with high accuracy to improve accessibility and SEO.",
    icon: Mic,
    color: "#EC4899",
  },
  {
    title: "Thumbnail Optimization",
    description:
      "Get suggestions for thumbnail improvements that drive higher click-through rates.",
    icon: Camera,
    color: "#F97316",
  },
];

export default function Home() {
  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Navigation */}
      {/* <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <span className="font-bold text-xl text-gray-900">
                Agent<span className="text-blue-500">Tube</span>
              </span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900">How it Works</a>
              <a href="#testimonials" className="text-gray-600 hover:text-gray-900">Testimonials</a>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-900">Sign In</a>
              <a href="#" className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors">Get Started</a>
            </div>
          </div>
        </div>
      </header> */}

      {/* Hero Section */}
      <section className="pt-38 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-4">
              <Sparkles className="w-4 h-4 mr-2" /> AI-Powered Content Analysis
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-3">
              Think, analyze, and optimize
              <span className="block text-gray-400 mt-2">all in one place</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Transform your video content with AI-powered analysis,
              transcription, and insights. Get started in seconds.
            </p>
          </div>

          {/* Centered Video Input Form */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center">
                Analyze Your Video
              </h2>
              <YoutubeVideoForm />
              <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Your content is secure and private
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-8">
            {[
              { value: "10K+", label: "Videos Analyzed" },
              { value: "4.9/5", label: "User Rating" },
              { value: "98%", label: "Accuracy Rate" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful AI Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Unlock the full potential of your content with our comprehensive
              suite of AI-powered tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 group"
                >
                  <div
                    className="h-2 w-full"
                    style={{ backgroundColor: feature.color }}
                  ></div>
                  <div className="p-8">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${feature.color}15` }}
                    >
                      <Icon
                        style={{ color: feature.color }}
                        className="w-6 h-6"
                      />
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>

                    <div
                      className="mt-6 flex items-center text-sm font-medium"
                      style={{ color: feature.color }}
                    >
                      <span>Learn more</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50 relative">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three simple steps to transform your content strategy with AI
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  {/* Connector lines between steps */}
                  {index < steps.length - 1 && (
                    <div
                      className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-blue-200 z-0"
                      style={{ width: "calc(100% - 4rem)" }}
                    ></div>
                  )}

                  <div className="bg-white rounded-xl shadow-md p-8 relative z-10">
                    <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center mb-6 mx-auto">
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-center mb-3 text-gray-900">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-center">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-block p-1 bg-blue-50 rounded-full">
              <button className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-full px-8 py-3 transition-colors">
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 overflow-hidden relative bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-blue-100">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Ready to optimize your content?
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  Start using AgentTube today and see the difference AI can make
                  to your content strategy.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="#"
                    className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg flex items-center justify-center transition-colors"
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="px-8 py-3 bg-white hover:bg-gray-50 text-gray-900 font-medium rounded-lg border border-gray-200 flex items-center justify-center transition-colors"
                  >
                    View Pricing
                  </a>
                </div>
              </div>
              <div className="relative md:flex items-center justify-center p-8 md:p-0 bg-blue-50 md:bg-transparent overflow-hidden">
                <div className="absolute hidden md:block right-0 top-0 h-full w-full bg-blue-50 rounded-l-full transform translate-x-1/3"></div>
                <div className="relative z-10 flex flex-col items-center space-y-6 md:space-y-8 p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 text-yellow-400"
                          fill="#FBBF24"
                        />
                      ))}
                    </div>
                    <span className="font-medium">4.9/5 rating</span>
                  </div>
                  <div className="bg-white shadow-lg rounded-xl p-5 max-w-md">
                    <p className="italic text-gray-600">
                      &quot;AgentTube has transformed how we analyze our content. The
                      AI insights have helped us increase engagement by 43% in
                      just two months.&quot;
                    </p>
                    <div className="mt-4 flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                        JD
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">James Doe</p>
                        <p className="text-sm text-gray-500">
                          Content Creator, 1.2M subscribers
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-center gap-4">
                    <div className="bg-white shadow-sm rounded-lg px-4 py-2 font-medium text-sm">
                      No credit card required
                    </div>
                    <div className="bg-white shadow-sm rounded-lg px-4 py-2 font-medium text-sm">
                      Free 14-day trial
                    </div>
                    <div className="bg-white shadow-sm rounded-lg px-4 py-2 font-medium text-sm">
                      Cancel anytime
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Content Creators Are Saying
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of satisfied creators who have transformed their
              content strategy
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "The AI analysis helped me identify exactly why my videos weren't performing. Now I'm getting 40% more views!",
                author: "Alex Morgan",
                role: "Tech Reviewer",
                avatar: "AM",
              },
              {
                quote:
                  "I've tried many analytics tools, but nothing compares to the actionable insights I get from AgentTube.",
                author: "Sarah Johnson",
                role: "Lifestyle Creator",
                avatar: "SJ",
              },
              {
                quote:
                  "The thumbnail suggestions alone increased my CTR by 28%. This tool is invaluable for serious creators.",
                author: "Michael Chen",
                role: "Educational Content",
                avatar: "MC",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-8 border border-gray-100"
              >
                <div className="flex mb-6">
                  {[1, 2, 3, 4, 5].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400"
                      fill="#FBBF24"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 font-medium">
                    {testimonial.avatar}
                  </div>
                  <div className="ml-4">
                    <p className="font-medium text-gray-900">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <div className="inline-flex rounded-full p-1 bg-gray-100">
              <button className="rounded-full w-3 h-3 bg-blue-500 mx-1"></button>
              <button className="rounded-full w-3 h-3 bg-gray-300 mx-1"></button>
              <button className="rounded-full w-3 h-3 bg-gray-300 mx-1"></button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2">
              <div className="font-bold text-xl text-gray-900 mb-4">
                Agent<span className="text-blue-500">Tube</span>
              </div>
              <p className="text-gray-600 mb-4 max-w-xs">
                AI-powered content analysis for creators who want to grow their
                audience and optimize their videos.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">LinkedIn</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">YouTube</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Integrations
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Updates
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Press
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Guides
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    API
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              {" "}
              2025 AgentTube. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-500 hover:text-gray-900 text-sm">
                Privacy
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 text-sm">
                Terms
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 text-sm">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
