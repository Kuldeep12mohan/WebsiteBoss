import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Code, Download, Palette, Shield, Zap, ArrowRight, Star, CheckCircle, Users, Award, Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Navbar } from "@/components/Navbar";

const Index = () => {
  const features = [
    {
      icon: <Globe className="h-12 w-12 text-blue-600" />,
      title: "Industry Templates",
      description: "Choose from professional templates designed for cosmetics, pharmacy, education and more.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Code className="h-12 w-12 text-green-200" />,
      title: "Clean Code Export",
      description: "Download your website as clean HTML, CSS, and JavaScript files in a ZIP package.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <Palette className="h-12 w-12 text-purple-600" />,
      title: "Easy Customization",
      description: "Customize colors, images, content, and branding to match your business perfectly.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Download className="h-12 w-12 text-white" />,
      title: "Instant Download",
      description: "Get your complete website files instantly after customization is complete.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: <Shield className="h-12 w-12 text-yellow-600" />,
      title: "Secure Platform",
      description: "Your data and creations are protected with enterprise-grade security.",
      gradient: "from-red-500 to-rose-500"
    },
    {
      icon: <Zap className="h-12 w-12 text-yellow-300" />,
      title: "Lightning Fast",
      description: "Generate professional websites in minutes, not hours or days.",
      gradient: "from-yellow-500 to-amber-500"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Websites Created", icon: <Globe className="h-6 w-6" /> },
    { number: "50+", label: "Templates Available", icon: <Palette className="h-6 w-6" /> },
    { number: "99.9%", label: "Uptime Guarantee", icon: <Shield className="h-6 w-6" /> },
    { number: "24/7", label: "Support Available", icon: <Users className="h-6 w-6" /> }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Beauty Salon Owner",
      content: "WebsiteBoss helped me create a stunning website for my salon in just 30 minutes. The cosmetics template was perfect!",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
      name: "Dr. Michael Chen",
      role: "Pharmacy Owner",
      content: "The healthcare template was exactly what I needed. Professional, clean, and easy to customize.",
      avatar: "https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
      name: "Emma Rodriguez",
      role: "Education Director",
      content: "Our school's new website looks amazing! The process was so simple and the results are professional.",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20">
      {/* Enhanced Header */}
      <Navbar/>

      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-600/5 dark:to-purple-600/5"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full px-6 py-3 mb-8 border border-blue-200/50 dark:border-blue-700/50">
              <Award className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">Trusted by 10,000+ businesses</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
              Build 
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent block mt-2">
                Professional Websites
              </span>
              <span className="text-5xl md:text-6xl">in Minutes</span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Choose from industry-specific templates, customize with your content, 
              and download clean, professional website code instantly. No coding required.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link to="/signup">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 px-12 py-6 text-lg rounded-2xl group">
                  Start Building Now
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/templates">
                <Button size="lg" variant="outline" className="border-2 border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-12 py-6 text-lg rounded-2xl transition-all duration-300">
                  View Templates
                  <Sparkles className="ml-3 h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mb-3 group-hover:scale-110 transition-transform duration-200">
                    <div className="text-white">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-24 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full px-6 py-3 mb-6">
              <Zap className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">Powerful Features</span>
            </div>
            <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Everything You Need to Build
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent block">
                Amazing Websites
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Powerful features designed to help you create professional websites without the complexity.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:scale-105 rounded-2xl overflow-hidden">
                <CardHeader className="text-center pb-4 relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  <div className="relative flex justify-center mb-6">
                    <div className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <div className="text-white">
                        {feature.icon}
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white relative">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <CardDescription className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Loved by Businesses Worldwide
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              See what our customers have to say about their experience with WebsiteBoss.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 italic leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4 shadow-lg"
                    />
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-24 bg-white/50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Templates for Every Industry
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Professional templates designed specifically for your business type.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="group border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-2xl overflow-hidden hover:scale-105">
              <CardHeader className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-rose-500 opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
                <CardTitle className="text-2xl font-bold text-center relative">
                  <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                    Cosmetics & Beauty
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <CardDescription className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                  Elegant templates perfect for beauty salons, cosmetic brands, and skincare businesses.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl overflow-hidden hover:scale-105">
              <CardHeader className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-500 opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
                <CardTitle className="text-2xl font-bold text-center relative">
                  <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    Pharmacy & Healthcare
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <CardDescription className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                  Professional templates for pharmacies, clinics, and healthcare providers.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl overflow-hidden hover:scale-105">
              <CardHeader className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-500 opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
                <CardTitle className="text-2xl font-bold text-center relative">
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Education & Learning
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <CardDescription className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                  Modern templates for schools, universities, and online learning platforms.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/20 rounded-full px-6 py-3 mb-8">
            <CheckCircle className="h-5 w-5 text-white" />
            <span className="text-sm font-semibold text-white">No Credit Card Required</span>
          </div>
          
          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to Build Your
            <span className="block">Dream Website?</span>
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of businesses who trust WebsiteBoss to create their professional online presence. 
            Start building today and see the difference quality makes.
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 shadow-2xl hover:shadow-3xl transition-all duration-300 px-12 py-6 text-lg font-semibold rounded-2xl group">
              Get Started for Free
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                WebsiteBoss
              </span>
            </div>
            <div className="text-gray-400 dark:text-gray-500 text-center md:text-right">
              <p>© 2024 WebsiteBoss. All rights reserved.</p>
              <p className="text-sm mt-1">Building the future of web design, one template at a time.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;