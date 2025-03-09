"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Check,
  ArrowRight,
  Menu,
  X,
  Github,
  Twitter,
  Linkedin,
  Facebook,
  ChevronDown,
  Play,
  Zap,
  Shield,
  Clock,
  Users,
  BarChart,
  Send,
  MessageSquare,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";

export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const [isTyping, setIsTyping] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      text: "Hi there! How can I help you today?",
      sender: "bot",
      visible: true,
    },
    {
      id: 2,
      text: "I need help with project management",
      sender: "user",
      visible: false,
    },
    {
      id: 3,
      text: "I can definitely help with that! StreamLine offers powerful project management tools.",
      sender: "bot",
      visible: false,
    },
    {
      id: 4,
      text: "Can you show me how it works?",
      sender: "user",
      visible: false,
    },
    {
      id: 5,
      text: "Of course! You can create tasks, assign them to team members, set deadlines, and track progress all in one place.",
      sender: "bot",
      visible: false,
    },
  ]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(1);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    Object.keys(sectionRefs.current).forEach((id) => {
      const element = sectionRefs.current[id];
      if (element) observer.observe(element);
    });

    return () => {
      Object.keys(sectionRefs.current).forEach((id) => {
        const element = sectionRefs.current[id];
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  // Chatbot animation
  useEffect(() => {
    if (currentMessageIndex >= chatMessages.length) return;
    const timer = setTimeout(() => {
      if (chatMessages[currentMessageIndex].sender === "bot") {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setChatMessages((prev) =>
            prev.map((msg, i) =>
              i === currentMessageIndex ? { ...msg, visible: true } : msg
            )
          );
          setCurrentMessageIndex((prev) => prev + 1);
        }, 1500);
      } else {
        setChatMessages((prev) =>
          prev.map((msg, i) =>
            i === currentMessageIndex ? { ...msg, visible: true } : msg
          )
        );
        setCurrentMessageIndex((prev) => prev + 1);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [currentMessageIndex, chatMessages]);

  const registerSection = (id: string, ref: HTMLElement | null) => {
    if (ref) {
      sectionRefs.current[id] = ref;
    }
  };

  // Central Line animation values
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const circlePosition = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="flex min-h-screen flex-col relative">
      {/* Central Line - Only in How It Works section */}
      {activeSection === "how-it-works" && (
        <div className="fixed left-1/2 top-0 bottom-0 w-[3px] bg-primary/10 z-10 transform -translate-x-1/2 pointer-events-none">
          <motion.div
            className="w-full bg-primary"
            style={{
              height: lineHeight,
              top: 0,
              position: "absolute",
            }}
          />
          <motion.div
            className="absolute w-5 h-5 bg-primary rounded-full left-1/2 transform -translate-x-1/2"
            style={{
              top: circlePosition,
            }}
          />
        </div>
      )}

      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/placeholder.svg?height=32&width=32"
              alt="StreamLine Logo"
              width={32}
              height={32}
            />
            <span className="text-xl font-bold">StreamLine</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-3 lg:gap-6">
            <Link
              href="#features"
              className={cn(
                "text-sm font-medium transition-colors",
                activeSection === "features"
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className={cn(
                "text-sm font-medium transition-colors",
                activeSection === "how-it-works"
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              How It Works
            </Link>
            <Link
              href="#demo"
              className={cn(
                "text-sm font-medium transition-colors",
                activeSection === "demo"
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              Demo
            </Link>
            <Link
              href="#testimonials"
              className={cn(
                "text-sm font-medium transition-colors",
                activeSection === "testimonials"
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              Testimonials
            </Link>
            <Link
              href="#pricing"
              className={cn(
                "text-sm font-medium transition-colors",
                activeSection === "pricing"
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              Pricing
            </Link>
          </nav>

          <div className="hidden md:flex gap-4">
            <Button variant="outline">Dashboard</Button>
            <Button variant="outline">Log in</Button>
            {/* <Button size="sm">Sign up</Button> */}
            <ModeToggle />
          </div>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 pt-6 mx-6">
                <Link
                  href="#features"
                  className="text-sm font-medium hover:text-primary"
                >
                  Features
                </Link>
                <Link
                  href="#how-it-works"
                  className="text-sm font-medium hover:text-primary"
                >
                  How It Works
                </Link>
                <Link
                  href="#demo"
                  className="text-sm font-medium hover:text-primary"
                >
                  Demo
                </Link>
                <Link
                  href="#testimonials"
                  className="text-sm font-medium hover:text-primary"
                >
                  Testimonials
                </Link>
                <Link
                  href="#pricing"
                  className="text-sm font-medium hover:text-primary"
                >
                  Pricing
                </Link>
                <div className="flex flex-col gap-2 mt-4">
                  <Button variant="outline" size="sm">
                    Dashboard
                  </Button>
                  <Button variant="outline" size="sm">
                    Log in
                  </Button>
                  <Button size="sm">Sign up</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section with Hexagonal Pattern */}
        <section className="relative w-full py-12 md:py-24 lg:py-28  xl:py-30 overflow-hidden">
          {/* Hexagonal Background Pattern */}
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            <HexagonalPattern />
          </div>

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-2"
                >
                  <Badge className="inline-flex">New Features Available</Badge>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Streamline your workflow like never before
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    The all-in-one platform that helps teams manage projects,
                    automate workflows, and collaborate seamlessly.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex flex-col gap-2 min-[400px]:flex-row"
                >
                  <Button size="lg" className="gap-1">
                    Get started for free
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline">
                    Book a demo
                  </Button>
                </motion.div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-xs text-muted-foreground"
                >
                  No credit card required. 14-day free trial.
                </motion.p>
              </div>

              {/* Text-to-Image AI Animation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative mx-auto w-full max-w-[500px] h-[400px] rounded-xl border bg-card p-4 shadow-xl"
              >
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <MessageSquare className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">StreamLine Assistant</h3>
                      <p className="text-xs text-muted-foreground">Online</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="h-[280px] overflow-y-auto py-4 flex flex-col gap-3">
                  <AnimatePresence>
                    {chatMessages.map(
                      (message) =>
                        message.visible && (
                          <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className={cn(
                              "max-w-[80%] rounded-lg p-3",
                              message.sender === "bot"
                                ? "bg-muted self-start rounded-bl-none"
                                : "bg-primary text-primary-foreground self-end rounded-br-none"
                            )}
                          >
                            {message.text}
                          </motion.div>
                        )
                    )}

                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="max-w-[80%] rounded-lg p-3 bg-muted self-start rounded-bl-none"
                      >
                        <div className="flex gap-1">
                          <span className="animate-bounce">●</span>
                          <span
                            className="animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          >
                            ●
                          </span>
                          <span
                            className="animate-bounce"
                            style={{ animationDelay: "0.4s" }}
                          >
                            ●
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 rounded-md border bg-background px-3 py-2 text-sm"
                  />
                  <Button size="icon" className="rounded-full">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <p className="text-sm text-muted-foreground">Scroll to explore</p>
            <ChevronDown className="h-5 w-5 animate-bounce" />
          </motion.div>
        </section>

        {/* Logos Section */}
        <section className="w-full py-6 md:py-12 lg:py-16 border-y bg-muted/40">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-xl font-medium tracking-tight md:text-2xl">
                  Trusted by companies worldwide
                </h2>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
                {[1, 2, 3, 4, 5].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.7 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    whileHover={{ opacity: 1, scale: 1.05 }}
                  >
                    <Image
                      src={`/placeholder.svg?height=40&width=120&text=LOGO+${i}`}
                      alt={`Company ${i} logo`}
                      width={120}
                      height={40}
                      className="h-8 w-auto grayscale transition-all hover:grayscale-0"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          ref={(el) => registerSection("features", el)}
          className="w-full py-12 md:py-24 lg:py-32"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="space-y-2"
              >
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl/tight">
                  Powerful features to boost productivity
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Everything you need to manage your projects, automate
                  workflows, and collaborate with your team.
                </p>
              </motion.div>
            </div>
            <div className="grid grid-cols-1 gap-6 pt-12 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Project Management",
                  description:
                    "Create, assign, and track tasks with ease. Set deadlines, priorities, and dependencies.",
                  icon: <BarChart className="h-8 w-8" />,
                },
                {
                  title: "Workflow Automation",
                  description:
                    "Automate repetitive tasks and processes with customizable workflows and triggers.",
                  icon: <Zap className="h-8 w-8" />,
                },
                {
                  title: "Team Collaboration",
                  description:
                    "Real-time communication, file sharing, and collaborative editing for seamless teamwork.",
                  icon: <Users className="h-8 w-8" />,
                },
                {
                  title: "Analytics & Reporting",
                  description:
                    "Gain insights into team performance, project progress, and resource allocation.",
                  icon: <BarChart className="h-8 w-8" />,
                },
                {
                  title: "Advanced Security",
                  description:
                    "Enterprise-grade security with role-based access control and data encryption.",
                  icon: <Shield className="h-8 w-8" />,
                },
                {
                  title: "Time Tracking",
                  description:
                    "Track time spent on tasks and projects to improve productivity and billing accuracy.",
                  icon: <Clock className="h-8 w-8" />,
                },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="flex flex-col items-center text-center h-full">
                    <CardHeader>
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-2">
                        {feature.icon}
                      </div>
                      <CardTitle>{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section
          id="how-it-works"
          ref={(el) => registerSection("how-it-works", el)}
          className="w-full py-12 md:py-24 lg:py-32 bg-muted/40"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="space-y-2"
              >
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl/tight">
                  How StreamLine Works
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Get started in minutes and transform how your team works
                </p>
              </motion.div>
            </div>

            <div className="mt-16 relative">
              {/* Connecting Line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-primary/30 transform -translate-x-1/2 hidden md:block" />

              {/* Steps */}
              <div className="space-y-20 md:space-y-0 relative">
                {[
                  {
                    title: "Sign up and create your workspace",
                    description:
                      "Create your account and set up your team workspace in just a few clicks. No credit card required to get started.",
                    image:
                      "/placeholder.svg?height=300&width=500&text=Setup+Workspace",
                  },
                  {
                    title: "Invite your team members",
                    description:
                      "Add your team members to your workspace and assign roles and permissions based on their responsibilities.",
                    image:
                      "/placeholder.svg?height=300&width=500&text=Invite+Team",
                  },
                  {
                    title: "Create your first project",
                    description:
                      "Set up your project, define milestones, and create tasks to start organizing your work efficiently.",
                    image:
                      "/placeholder.svg?height=300&width=500&text=Create+Project",
                  },
                  {
                    title: "Automate your workflows",
                    description:
                      "Set up automation rules to reduce manual work and keep your projects moving forward automatically.",
                    image:
                      "/placeholder.svg?height=300&width=500&text=Automate+Workflows",
                  },
                ].map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className={cn(
                      "md:grid md:grid-cols-2 md:gap-8 items-center",
                      i % 2 === 1 ? "md:rtl" : ""
                    )}
                  >
                    <div
                      className={cn(
                        "relative z-10 md:py-8",
                        i % 2 === 1 ? "md:ltr" : ""
                      )}
                    >
                      <div className="bg-card p-6 rounded-lg shadow-lg border relative">
                        {/* Step Number */}
                        <div className="absolute top-0 left-0 md:left-auto md:right-full md:translate-x-1/2 transform -translate-y-1/2 bg-primary text-primary-foreground h-10 w-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                          {i + 1}
                        </div>

                        <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                        <p className="text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    <div
                      className={cn(
                        "mt-8 md:mt-0",
                        i % 2 === 1 ? "md:ltr" : ""
                      )}
                    >
                      {i === 0 && (
                        <div className="rounded-lg shadow-lg border bg-card p-4 h-[300px] relative overflow-hidden">
                          <div className="flex items-center justify-between border-b pb-3 mb-3">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                                <Users className="h-4 w-4 text-primary" />
                              </div>
                              <h3 className="font-medium">Workspace Setup</h3>
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-3 animate-pulse">
                            <div className="h-24 rounded-md bg-muted"></div>
                            <div className="h-24 rounded-md bg-muted"></div>
                            <div className="h-24 rounded-md bg-muted"></div>
                            <div className="h-24 rounded-md bg-muted"></div>
                            <div className="h-24 rounded-md bg-muted"></div>
                            <div className="h-24 rounded-md bg-muted"></div>
                          </div>
                          <div className="absolute bottom-4 left-4 right-4">
                            <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                              <motion.div
                                className="h-full bg-primary"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{
                                  duration: 2,
                                  repeat: Number.POSITIVE_INFINITY,
                                  repeatType: "loop",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {i === 1 && (
                        <div className="rounded-lg shadow-lg border bg-card p-4 h-[300px] relative overflow-hidden">
                          <div className="flex items-center justify-between border-b pb-3 mb-3">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                                <Users className="h-4 w-4 text-primary" />
                              </div>
                              <h3 className="font-medium">Team Invitations</h3>
                            </div>
                          </div>
                          <div className="space-y-3">
                            {[1, 2, 3].map((user) => (
                              <motion.div
                                key={user}
                                initial={{ x: -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{
                                  duration: 0.5,
                                  delay: user * 0.5,
                                  repeat: Number.POSITIVE_INFINITY,
                                  repeatDelay: 3,
                                }}
                                className="flex items-center justify-between p-3 rounded-md border"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="h-10 w-10 rounded-full bg-muted"></div>
                                  <div>
                                    <div className="h-4 w-24 bg-muted rounded"></div>
                                    <div className="h-3 w-32 bg-muted/50 rounded mt-1"></div>
                                  </div>
                                </div>
                                <Button size="sm" variant="outline">
                                  Invite
                                </Button>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}

                      {i === 2 && (
                        <div className="rounded-lg shadow-lg border bg-card p-4 h-[300px] relative overflow-hidden">
                          <div className="flex items-center justify-between border-b pb-3 mb-3">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                                <BarChart className="h-4 w-4 text-primary" />
                              </div>
                              <h3 className="font-medium">Project Dashboard</h3>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-3 mb-3">
                            <div className="h-16 rounded-md bg-muted flex items-center justify-center">
                              <div className="h-8 w-8 rounded-full bg-primary/20"></div>
                            </div>
                            <div className="h-16 rounded-md bg-muted flex items-center justify-center">
                              <div className="h-8 w-8 rounded-full bg-primary/20"></div>
                            </div>
                          </div>
                          <div className="h-32 rounded-md bg-muted p-3">
                            <div className="flex h-full items-end gap-2">
                              {[40, 70, 30, 80, 60, 50, 75, 45].map(
                                (height, i) => (
                                  <motion.div
                                    key={i}
                                    initial={{ height: "0%" }}
                                    animate={{ height: `${height}%` }}
                                    transition={{
                                      duration: 1,
                                      delay: i * 0.1,
                                      repeat: Number.POSITIVE_INFINITY,
                                      repeatDelay: 3,
                                    }}
                                    className="flex-1 bg-primary/60 rounded-t"
                                  ></motion.div>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {i === 3 && (
                        <div className="rounded-lg shadow-lg border bg-card p-4 h-[300px] relative overflow-hidden">
                          <div className="flex items-center justify-between border-b pb-3 mb-3">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                                <Zap className="h-4 w-4 text-primary" />
                              </div>
                              <h3 className="font-medium">
                                Workflow Automation
                              </h3>
                            </div>
                          </div>
                          <div className="relative h-[220px]">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <svg
                                width="200"
                                height="200"
                                viewBox="0 0 200 200"
                              >
                                <motion.path
                                  d="M20,100 C20,60 60,20 100,20 C140,20 180,60 180,100 C180,140 140,180 100,180 C60,180 20,140 20,100"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  className="text-primary"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{
                                    duration: 2,
                                    repeat: Number.POSITIVE_INFINITY,
                                    repeatType: "loop",
                                  }}
                                />
                                <motion.circle
                                  cx="100"
                                  cy="20"
                                  r="5"
                                  fill="currentColor"
                                  className="text-primary"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: [0, 1, 0] }}
                                  transition={{
                                    duration: 2,
                                    repeat: Number.POSITIVE_INFINITY,
                                    repeatType: "loop",
                                    times: [0, 0.1, 1],
                                  }}
                                />
                                <motion.circle
                                  cx="180"
                                  cy="100"
                                  r="5"
                                  fill="currentColor"
                                  className="text-primary"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: [0, 1, 0] }}
                                  transition={{
                                    duration: 2,
                                    repeat: Number.POSITIVE_INFINITY,
                                    repeatType: "loop",
                                    delay: 0.5,
                                    times: [0, 0.1, 1],
                                  }}
                                />
                                <motion.circle
                                  cx="100"
                                  cy="180"
                                  r="5"
                                  fill="currentColor"
                                  className="text-primary"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: [0, 1, 0] }}
                                  transition={{
                                    duration: 2,
                                    repeat: Number.POSITIVE_INFINITY,
                                    repeatType: "loop",
                                    delay: 1,
                                    times: [0, 0.1, 1],
                                  }}
                                />
                                <motion.circle
                                  cx="20"
                                  cy="100"
                                  r="5"
                                  fill="currentColor"
                                  className="text-primary"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: [0, 1, 0] }}
                                  transition={{
                                    duration: 2,
                                    repeat: Number.POSITIVE_INFINITY,
                                    repeatType: "loop",
                                    delay: 1.5,
                                    times: [0, 0.1, 1],
                                  }}
                                />
                              </svg>
                            </div>
                            <motion.div
                              className="absolute h-10 w-10 rounded-md bg-primary/20 flex items-center justify-center"
                              initial={{ x: 95, y: 20 }}
                              animate={{
                                x: [95, 180, 95, 20, 95],
                                y: [20, 95, 180, 95, 20],
                              }}
                              transition={{
                                duration: 8,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "linear",
                              }}
                            >
                              <Zap className="h-5 w-5 text-primary" />
                            </motion.div>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Demo Section */}
        <section
          id="demo"
          ref={(el) => registerSection("demo", el)}
          className="w-full py-12 md:py-24 lg:py-32"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="space-y-2"
              >
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl/tight">
                  See StreamLine in Action
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Watch how StreamLine can transform your team's productivity
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-12 relative aspect-video max-w-4xl mx-auto rounded-xl overflow-hidden border shadow-xl"
            >
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full h-16 w-16 p-0"
                >
                  <Play className="h-8 w-8" />
                </Button>
              </div>
              <Image
                src="/placeholder.svg?height=720&width=1280&text=Product+Demo+Video"
                alt="Product Demo"
                width={1280}
                height={720}
                className="w-full h-full object-cover"
              />
            </motion.div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Project Dashboard",
                  description:
                    "Get a bird's eye view of all your projects and their status.",
                },
                {
                  title: "Task Management",
                  description:
                    "Create, assign, and track tasks with powerful filtering options.",
                },
                {
                  title: "Team Collaboration",
                  description:
                    "Comment, share files, and collaborate in real-time.",
                },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          ref={(el) => registerSection("testimonials", el)}
          className="w-full py-12 md:py-24 lg:py-32 bg-muted/40"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="space-y-2"
              >
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl/tight">
                  Loved by teams worldwide
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  See what our customers have to say about StreamLine.
                </p>
              </motion.div>
            </div>

            <div className="mt-12">
              {/* Featured Testimonial */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto mb-16"
              >
                <Card className="p-8">
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="md:w-1/3">
                      <div className="aspect-square relative rounded-full overflow-hidden border-4 border-primary/20 w-32 h-32 mx-auto">
                        <Image
                          src="/placeholder.svg?height=128&width=128&text=CEO"
                          alt="CEO Testimonial"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="text-center mt-4">
                        <h4 className="font-bold">Jennifer Martinez</h4>
                        <p className="text-sm text-muted-foreground">
                          CEO, TechInnovate
                        </p>
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <div className="flex mb-4">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <svg
                              key={i}
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="h-6 w-6 text-yellow-500"
                            >
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          ))}
                      </div>
                      <blockquote className="text-xl italic">
                        "StreamLine has completely transformed how our entire
                        organization operates. The productivity gains have been
                        remarkable, and the ROI was evident within the first
                        month. I can't imagine running our business without it
                        now."
                      </blockquote>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    quote:
                      "StreamLine has completely transformed how our team works. We've reduced meeting time by 50% and increased productivity by 30%.",
                    author: "Sarah Johnson",
                    role: "Product Manager, TechCorp",
                  },
                  {
                    quote:
                      "The automation features alone have saved us countless hours. It's like having an extra team member who never sleeps.",
                    author: "Michael Chen",
                    role: "CTO, StartupX",
                  },
                  {
                    quote:
                      "We've tried many project management tools, but StreamLine is by far the most intuitive and powerful. It's a game-changer.",
                    author: "Emily Rodriguez",
                    role: "Team Lead, DesignHub",
                  },
                  {
                    quote:
                      "The customer support team is exceptional. They helped us customize StreamLine to fit our unique workflow perfectly.",
                    author: "David Kim",
                    role: "Operations Director, GlobalCorp",
                  },
                  {
                    quote:
                      "Our team collaboration has improved dramatically since we started using StreamLine. Everyone is on the same page now.",
                    author: "Lisa Thompson",
                    role: "Marketing Manager, BrandWave",
                  },
                  {
                    quote:
                      "The analytics and reporting features give me the insights I need to make data-driven decisions for our projects.",
                    author: "Robert Jackson",
                    role: "Project Director, BuildRight",
                  },
                ].map((testimonial, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * i }}
                    viewport={{ once: true }}
                  >
                    <Card className="flex flex-col justify-between h-full">
                      <CardHeader>
                        <div className="space-y-2">
                          <div className="flex gap-0.5">
                            {Array(5)
                              .fill(0)
                              .map((_, i) => (
                                <svg
                                  key={i}
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="h-5 w-5 text-yellow-500"
                                >
                                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                </svg>
                              ))}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <p className="text-muted-foreground">
                          "{testimonial.quote}"
                        </p>
                      </CardContent>
                      <CardFooter className="flex flex-col items-start border-t pt-4">
                        <p className="font-semibold">{testimonial.author}</p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section
          id="pricing"
          ref={(el) => registerSection("pricing", el)}
          className="w-full py-12 md:py-24 lg:py-32"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="space-y-2"
              >
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl/tight">
                  Simple, transparent pricing
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Choose the plan that's right for your team. All plans include
                  a 14-day free trial.
                </p>
              </motion.div>
            </div>
            <div className="grid grid-cols-1 gap-6 pt-12 md:grid-cols-3">
              {[
                {
                  name: "Starter",
                  price: "$12",
                  description: "Perfect for small teams just getting started.",
                  features: [
                    "Up to 5 team members",
                    "10 projects",
                    "Basic reporting",
                    "24/7 email support",
                  ],
                  cta: "Get started",
                  popular: false,
                },
                {
                  name: "Professional",
                  price: "$29",
                  description:
                    "Ideal for growing teams with more complex needs.",
                  features: [
                    "Up to 20 team members",
                    "Unlimited projects",
                    "Advanced reporting",
                    "Workflow automation",
                    "Priority support",
                  ],
                  cta: "Get started",
                  popular: true,
                },
                {
                  name: "Enterprise",
                  price: "$79",
                  description:
                    "For large organizations with advanced requirements.",
                  features: [
                    "Unlimited team members",
                    "Unlimited projects",
                    "Custom reporting",
                    "Advanced automation",
                    "Dedicated support",
                    "SSO & advanced security",
                  ],
                  cta: "Contact sales",
                  popular: false,
                },
              ].map((plan, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  viewport={{ once: true }}
                >
                  <Card
                    className={`flex flex-col h-full ${
                      plan.popular ? "border-primary shadow-lg" : ""
                    }`}
                  >
                    <CardHeader>
                      {plan.popular && (
                        <Badge className="w-fit mb-2">Most Popular</Badge>
                      )}
                      <CardTitle>{plan.name}</CardTitle>
                      <div className="flex items-baseline">
                        <span className="text-3xl font-bold">{plan.price}</span>
                        <span className="text-muted-foreground ml-1">
                          /month per user
                        </span>
                      </div>
                      <CardDescription>{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <ul className="space-y-2">
                        {plan.features.map((feature, j) => (
                          <li key={j} className="flex items-center">
                            <Check className="h-4 w-4 mr-2 text-primary" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full"
                        variant={plan.popular ? "default" : "outline"}
                      >
                        {plan.cta}
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="space-y-2"
              >
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl/tight">
                  Frequently Asked Questions
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Find answers to common questions about StreamLine
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-12 max-w-3xl mx-auto space-y-4"
            >
              {[
                {
                  question: "How does the 14-day free trial work?",
                  answer:
                    "You can sign up for StreamLine and use all features for 14 days without providing any payment information. At the end of the trial, you can choose a plan that fits your needs or continue with the free plan with limited features.",
                },
                {
                  question: "Can I change my plan later?",
                  answer:
                    "Yes, you can upgrade, downgrade, or cancel your plan at any time. If you upgrade, the new features will be available immediately. If you downgrade, the changes will take effect at the end of your current billing cycle.",
                },
                {
                  question:
                    "Is there a limit to how many projects I can create?",
                  answer:
                    "The Starter plan allows up to 10 projects. The Professional and Enterprise plans offer unlimited projects. You can always upgrade your plan if you need more projects.",
                },
                {
                  question: "How secure is my data?",
                  answer:
                    "StreamLine uses enterprise-grade security measures, including encryption at rest and in transit, regular security audits, and compliance with industry standards. Your data is stored in secure data centers with 24/7 monitoring.",
                },
                {
                  question: "Can I integrate StreamLine with other tools?",
                  answer:
                    "Yes, StreamLine offers integrations with popular tools like Slack, Google Workspace, Microsoft Office, GitHub, and many more. We also provide an API for custom integrations.",
                },
              ].map((faq, i) => (
                <Card key={i} className="overflow-hidden">
                  <CardHeader className="p-4 cursor-pointer">
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Integrations Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="space-y-2"
              >
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl/tight">
                  Seamless Integrations
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Connect StreamLine with your favorite tools and services
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-12"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {Array.from({ length: 18 }).map((_, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -5, scale: 1.05 }}
                    className="flex flex-col items-center justify-center p-6 rounded-xl border bg-card hover:shadow-md transition-all"
                  >
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                      <Image
                        src={`/placeholder.svg?height=48&width=48&text=App+${
                          i + 1
                        }`}
                        alt={`Integration ${i + 1}`}
                        width={48}
                        height={48}
                        className="h-8 w-8"
                      />
                    </div>
                    <p className="text-sm font-medium">Integration {i + 1}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="space-y-2"
              >
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl/tight">
                  Success Stories
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  See how leading companies are transforming their workflows
                  with StreamLine
                </p>
              </motion.div>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  company: "TechGiant Inc.",
                  title: "How TechGiant Reduced Project Delivery Time by 40%",
                  image:
                    "/placeholder.svg?height=200&width=400&text=TechGiant+Case+Study",
                },
                {
                  company: "Global Finance",
                  title:
                    "Global Finance Improved Team Collaboration Across 12 Countries",
                  image:
                    "/placeholder.svg?height=200&width=400&text=Global+Finance+Case+Study",
                },
                {
                  company: "Creative Studios",
                  title:
                    "Creative Studios Streamlined Their Content Production Pipeline",
                  image:
                    "/placeholder.svg?height=200&width=400&text=Creative+Studios+Case+Study",
                },
              ].map((study, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <Card className="overflow-hidden h-full">
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={study.image || "/placeholder.svg"}
                        alt={study.title}
                        width={400}
                        height={200}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                        <div className="p-4">
                          <Badge className="mb-2">{study.company}</Badge>
                          <h3 className="text-lg font-bold text-white">
                            {study.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                    <CardContent className="pt-4">
                      <p className="text-muted-foreground">
                        Learn how they transformed their workflow and achieved
                        remarkable results with StreamLine.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Read Case Study
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="space-y-2"
              >
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl/tight">
                  Latest from Our Blog
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Insights, tips, and news about productivity and project
                  management
                </p>
              </motion.div>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "10 Ways to Boost Team Productivity with Automation",
                  excerpt:
                    "Discover how automation can transform your team's workflow and eliminate repetitive tasks.",
                  date: "June 12, 2023",
                  image:
                    "/placeholder.svg?height=200&width=400&text=Productivity+Blog",
                },
                {
                  title: "The Future of Remote Work and Project Management",
                  excerpt:
                    "How leading companies are adapting their project management strategies for remote teams.",
                  date: "May 28, 2023",
                  image:
                    "/placeholder.svg?height=200&width=400&text=Remote+Work+Blog",
                },
                {
                  title:
                    "Building a Culture of Collaboration in Distributed Teams",
                  excerpt:
                    "Strategies for fostering collaboration and communication in geographically dispersed teams.",
                  date: "May 15, 2023",
                  image:
                    "/placeholder.svg?height=200&width=400&text=Collaboration+Blog",
                },
              ].map((post, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="overflow-hidden h-full">
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        width={400}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="pt-4">
                      <p className="text-sm text-muted-foreground mb-2">
                        {post.date}
                      </p>
                      <h3 className="text-lg font-bold mb-2">{post.title}</h3>
                      <p className="text-muted-foreground">{post.excerpt}</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" className="p-0 h-auto">
                        Read More →
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button variant="outline">View All Articles</Button>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl/tight">
                  Stay Updated with StreamLine
                </h2>
                <p className="text-primary-foreground/80 md:text-xl">
                  Get the latest updates, tips, and exclusive offers delivered
                  straight to your inbox.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 rounded-md border bg-primary-foreground/10 border-primary-foreground/20 px-3 py-2 text-primary-foreground placeholder:text-primary-foreground/50"
                />
                <Button variant="secondary">Subscribe</Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="space-y-2"
              >
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl/tight">
                  Ready to streamline your workflow?
                </h2>
                <p className="max-w-[600px] md:text-xl">
                  Join thousands of teams that use StreamLine to work smarter,
                  not harder.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col gap-2 min-[400px]:flex-row"
              >
                <Button size="lg" variant="secondary" className="gap-1">
                  Get started for free
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10"
                >
                  Book a demo
                </Button>
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-sm text-primary-foreground/80"
              >
                No credit card required. 14-day free trial.
              </motion.p>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
            <div className="flex flex-col gap-2 lg:col-span-2">
              <div className="flex items-center gap-2">
                <Image
                  src="/placeholder.svg?height=32&width=32"
                  alt="StreamLine Logo"
                  width={32}
                  height={32}
                />
                <span className="text-xl font-bold">StreamLine</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The all-in-one platform for project management, workflow
                automation, and team collaboration.
              </p>
              <div className="flex gap-4 mt-4">
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-medium">Product</h3>
              <nav className="flex flex-col gap-2">
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Features
                </Link>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Pricing
                </Link>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Integrations
                </Link>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Changelog
                </Link>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Roadmap
                </Link>
              </nav>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-medium">Resources</h3>
              <nav className="flex flex-col gap-2">
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Blog
                </Link>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Documentation
                </Link>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Guides
                </Link>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Help Center
                </Link>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  API
                </Link>
              </nav>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-medium">Company</h3>
              <nav className="flex flex-col gap-2">
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  About
                </Link>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Careers
                </Link>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Contact
                </Link>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Privacy
                </Link>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Terms
                </Link>
              </nav>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} StreamLine. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Hexagonal Pattern Component
function HexagonalPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="hexagons"
            width="30"
            height="26"
            patternUnits="userSpaceOnUse"
            patternTransform="scale(3) rotate(0)"
          >
            <path
              d="M15 0 L30 8.66 L30 23.14 L15 31.8 L0 23.14 L0 8.66 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              opacity="0.4"
              className="text-primary"
            >
              <animate
                attributeName="opacity"
                values="0.2;0.5;0.2"
                dur="8s"
                repeatCount="indefinite"
              />
            </path>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexagons)" />

        {/* Animated Hexagons */}
        {Array.from({ length: 40 }).map((_, i) => {
          const size = 10 + Math.random() * 20;
          const x = Math.random() * 100;
          const y = Math.random() * 100;
          const duration = 15 + Math.random() * 30;
          const delay = Math.random() * -duration;
          const direction = Math.random() > 0.5 ? 1 : -1;
          const horizontalMove = Math.random() * 10 * direction;

          return (
            <g key={i}>
              <path
                d={`M${size / 2} 0 L${size} ${size * 0.288} L${size} ${
                  size * 0.772
                } L${size / 2} ${size * 1.06} L0 ${size * 0.772} L0 ${
                  size * 0.288
                } Z`}
                fill="none"
                stroke="currentColor"
                strokeWidth="0.8"
                opacity="0.5"
                className="text-primary"
                transform={`translate(${x}%, ${y}%) scale(1.5)`}
              >
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  from={`${x}% ${y}%`}
                  to={`${x + horizontalMove}% ${y - 15}%`}
                  dur={`${duration}s`}
                  begin={`${delay}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0;0.5;0"
                  dur={`${duration}s`}
                  begin={`${delay}s`}
                  repeatCount="indefinite"
                />
              </path>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
