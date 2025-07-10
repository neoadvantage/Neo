import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ContactFormData, ContactResponse } from "@shared/api";
import {
  Zap,
  Palette,
  TrendingUp,
  Monitor,
  Smartphone,
  Globe,
  CheckCircle,
  Star,
  ArrowRight,
  Loader2,
} from "lucide-react";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result: ContactResponse = await response.json();

      if (result.success) {
        toast({
          title: "Success!",
          description: result.message,
        });
        setFormData({
          fullName: "",
          company: "",
          email: "",
          phone: "",
          message: "",
        });
        setIsModalOpen(false);
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-neo-gradient">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-neo-blue-400/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-neo-blue-300/15 rounded-full blur-2xl"
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neo-blue-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 text-balance leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Web design que converte,{" "}
              <span className="bg-gradient-to-r from-neo-blue-200 to-white bg-clip-text text-transparent">
                Resultados que escalam.
              </span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl mb-8 text-neo-blue-100 max-w-2xl mx-auto text-balance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Elevate your digital presence with NEO Advantage.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className="bg-white text-neo-blue-900 hover:bg-neo-blue-50 px-8 py-4 text-lg font-semibold rounded-xl shadow-neo transition-all duration-300 hover:shadow-neo-lg hover:scale-105"
                  >
                    Get My Website
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md glass backdrop-blur-xl bg-white/95 border-white/20">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-neo-blue-900">
                      Let's Build Something Amazing
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                          className="bg-white/70"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="bg-white/70"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="bg-white/70"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="bg-white/70"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Project Details</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us about your project..."
                        className="bg-white/70"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-neo-blue-600 hover:bg-neo-blue-700 text-white"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Project Request"
                      )}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full p-1">
            <motion.div
              className="w-1 h-3 bg-white rounded-full mx-auto"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* About NEO Section */}
      <section className="py-20 bg-gradient-to-b from-white to-neo-blue-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-neo-blue-900 mb-6">
              Why NEO Advantage?
            </h2>
            <p className="text-xl text-neo-blue-700 max-w-3xl mx-auto text-balance">
              We combine cutting-edge design with conversion-focused strategy to
              deliver websites that don't just look great—they perform.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: "Performance",
                description:
                  "Lightning-fast websites optimized for search engines and user experience.",
                color: "text-neo-blue-600",
              },
              {
                icon: Palette,
                title: "Design",
                description:
                  "Stunning, modern designs that capture your brand and captivate your audience.",
                color: "text-neo-blue-600",
              },
              {
                icon: Zap,
                title: "Conversion",
                description:
                  "Strategic design elements proven to turn visitors into customers.",
                color: "text-neo-blue-600",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-neo transition-all duration-300 hover:-translate-y-2 border border-neo-blue-100">
                  <div className="mb-6">
                    <feature.icon
                      className={`h-12 w-12 ${feature.color} group-hover:scale-110 transition-transform duration-300`}
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-neo-blue-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-neo-blue-700 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-neo-blue-900 mb-6">
              Our Services
            </h2>
            <p className="text-xl text-neo-blue-700 max-w-3xl mx-auto text-balance">
              Comprehensive web solutions tailored to your business needs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Monitor,
                title: "Custom Design",
                description:
                  "Unique, responsive, and visually stunning websites tailored to your brand.",
                features: [
                  "Custom UI/UX Design",
                  "Mobile-First Approach",
                  "Brand Integration",
                  "User Experience Optimization",
                ],
              },
              {
                icon: Smartphone,
                title: "Development",
                description:
                  "Modern, fast, and secure websites built with the latest technologies.",
                features: [
                  "React & Next.js",
                  "Performance Optimization",
                  "SEO Integration",
                  "Security Best Practices",
                ],
              },
              {
                icon: Globe,
                title: "Digital Strategy",
                description:
                  "Complete digital presence management from design to deployment.",
                features: [
                  "Analytics Setup",
                  "Conversion Optimization",
                  "Content Strategy",
                  "Ongoing Support",
                ],
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-gradient-to-br from-white to-neo-blue-50 rounded-2xl p-8 shadow-lg hover:shadow-neo transition-all duration-300 hover:-translate-y-2 border border-neo-blue-100 h-full">
                  <div className="mb-6">
                    <service.icon className="h-12 w-12 text-neo-blue-600 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-neo-blue-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-neo-blue-700 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center text-neo-blue-600"
                      >
                        <CheckCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-b from-neo-blue-50 to-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-neo-blue-900 mb-6">
              Pricing Plans
            </h2>
            <p className="text-xl text-neo-blue-700 max-w-3xl mx-auto text-balance">
              Choose the perfect plan for your business needs. All plans include
              our signature quality and support.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Starter",
                price: "$2,999",
                description: "For small businesses and individuals",
                features: [
                  "5-page responsive website",
                  "Custom design",
                  "Mobile optimization",
                  "Basic SEO setup",
                  "Contact form integration",
                  "30 days support",
                ],
                popular: false,
              },
              {
                name: "Professional",
                price: "$5,999",
                description: "For growing businesses",
                features: [
                  "10-page responsive website",
                  "Premium custom design",
                  "Advanced SEO optimization",
                  "E-commerce integration",
                  "Analytics setup",
                  "CMS integration",
                  "90 days support",
                ],
                popular: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                description: "For large organizations",
                features: [
                  "Unlimited pages",
                  "Enterprise-grade design",
                  "Advanced integrations",
                  "Custom functionality",
                  "Performance optimization",
                  "Ongoing maintenance",
                  "Dedicated support",
                ],
                popular: false,
              },
            ].map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-neo-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center">
                      <Star className="h-4 w-4 mr-1" />
                      Most Popular
                    </div>
                  </div>
                )}
                <div
                  className={`glass backdrop-blur-xl rounded-2xl p-8 h-full border transition-all duration-300 hover:shadow-neo-lg hover:-translate-y-2 ${
                    plan.popular
                      ? "bg-white/80 border-neo-blue-300 shadow-neo"
                      : "bg-white/60 border-white/30"
                  }`}
                >
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-neo-blue-900 mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-neo-blue-700 mb-4">{plan.description}</p>
                    <div className="text-4xl font-bold text-neo-blue-900">
                      {plan.price}
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center text-neo-blue-700"
                      >
                        <CheckCircle className="h-5 w-5 text-neo-blue-600 mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        className={`w-full rounded-xl font-semibold transition-all duration-300 ${
                          plan.popular
                            ? "bg-neo-blue-600 hover:bg-neo-blue-700 text-white shadow-lg hover:shadow-xl"
                            : "bg-white hover:bg-neo-blue-50 text-neo-blue-900 border border-neo-blue-200"
                        }`}
                      >
                        Start Now
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md glass backdrop-blur-xl bg-white/95 border-white/20">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-neo-blue-900">
                          Get Started with {plan.name}
                        </DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input
                              id="fullName"
                              name="fullName"
                              value={formData.fullName}
                              onChange={handleInputChange}
                              required
                              className="bg-white/70"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="company">Company</Label>
                            <Input
                              id="company"
                              name="company"
                              value={formData.company}
                              onChange={handleInputChange}
                              className="bg-white/70"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="bg-white/70"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="bg-white/70"
                          />
                        </div>
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-neo-blue-600 hover:bg-neo-blue-700 text-white"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            "Submit Request"
                          )}
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-neo-gradient text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
              Ready to transform your digital presence?
            </h2>
            <p className="text-xl text-neo-blue-100 mb-8 max-w-2xl mx-auto text-balance">
              Let's create something extraordinary together. Our team of experts
              is ready to bring your vision to life.
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="bg-white text-neo-blue-900 hover:bg-neo-blue-50 px-8 py-4 text-lg font-semibold rounded-xl shadow-neo transition-all duration-300 hover:shadow-neo-lg hover:scale-105"
                >
                  Talk to a Specialist
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md glass backdrop-blur-xl bg-white/95 border-white/20">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-neo-blue-900">
                    Let's Discuss Your Project
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        className="bg-white/70"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="bg-white/70"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="bg-white/70"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="bg-white/70"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Project Details</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your project..."
                      className="bg-white/70"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-neo-blue-600 hover:bg-neo-blue-700 text-white"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Schedule Consultation"
                    )}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neo-blue-950 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2">
              <h3 className="text-2xl font-bold mb-4">NEO Advantage</h3>
              <p className="text-neo-blue-200 mb-4 max-w-md">
                Creating high-converting websites that scale with your business.
                Transform your digital presence with our expert team.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-neo-blue-200">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Web Design
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Development
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    SEO
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Consulting
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-neo-blue-200">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Portfolio
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-neo-blue-800 pt-8 text-center text-neo-blue-300">
            <p>&copy; 2024 NEO Advantage. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
