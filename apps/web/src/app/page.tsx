"use client"
import { SignedOut, useAuth } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"
import Link from "next/link"
import { redirect } from "next/navigation"
import { Calendar, Users, Bell, BarChart3, Clock, Shield, Smartphone, Zap } from "lucide-react"

export default  function Page() {
  const { userId } = useAuth()
  if (userId) redirect("/workspaces")

  return (
    <SignedOut>
      <main className="min-h-screen bg-background">
        <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-foreground">Scrub In</span>
            </div>
            <div className="flex gap-3">
              <Link
                href="/sign-in"
                className="px-6 py-2 rounded-lg border-2 border-primary text-primary font-medium hover:bg-primary/10 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="px-6 py-2 rounded-lg bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-colors shadow-lg"
              >
                Get Started
              </Link>
            </div>
          </div>
        </header>

        <section className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Veterinary Shift Scheduling Made Simple
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-balance leading-tight">
              Schedule Smarter, <span className="text-primary">Care Better</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed">
              The all-in-one shift scheduling platform designed specifically for veterinary clinics. Reduce scheduling
              conflicts and focus on what matters most.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="/sign-up"
                className="px-8 py-4 rounded-lg bg-accent text-accent-foreground text-lg font-semibold hover:bg-accent/90 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
              >
                Start Free Trial
              </Link>
              <Link
                href="/sign-in"
                className="px-8 py-4 rounded-lg border-2 border-primary text-primary text-lg font-semibold hover:bg-primary/10 transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center space-y-2">
              <div className="text-5xl font-bold text-primary">98%</div>
              <div className="text-muted-foreground">Staff Satisfaction</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-5xl font-bold text-accent">5hrs</div>
              <div className="text-muted-foreground">Saved Per Week</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-5xl font-bold text-primary">500+</div>
              <div className="text-muted-foreground">Clinics Trust Us</div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-20">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-balance">Everything You Need to Manage Your Team</h2>
            <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
              Powerful features designed specifically for veterinary practices
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow space-y-3">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Smart Scheduling</h3>
              <p className="text-muted-foreground leading-relaxed">
                AI-powered scheduling that prevents conflicts and optimizes coverage
              </p>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow space-y-3">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold">Team Management</h3>
              <p className="text-muted-foreground leading-relaxed">
                Manage roles, availability, and preferences all in one place
              </p>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow space-y-3">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Bell className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Instant Notifications</h3>
              <p className="text-muted-foreground leading-relaxed">
                Real-time alerts for shift changes, requests, and updates
              </p>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow space-y-3">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold">Analytics & Reports</h3>
              <p className="text-muted-foreground leading-relaxed">
                Track hours, costs, and staffing patterns with detailed insights
              </p>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow space-y-3">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Time Off Management</h3>
              <p className="text-muted-foreground leading-relaxed">
                Streamline PTO requests and approvals with automated workflows
              </p>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow space-y-3">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold">Compliance Ready</h3>
              <p className="text-muted-foreground leading-relaxed">
                Stay compliant with labor laws and veterinary regulations
              </p>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow space-y-3">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Mobile First</h3>
              <p className="text-muted-foreground leading-relaxed">
                Access schedules anywhere with our mobile-optimized platform
              </p>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow space-y-3">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <Zap className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold">Quick Setup</h3>
              <p className="text-muted-foreground leading-relaxed">
                Get your clinic up and running in minutes, not hours
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center space-y-8 p-12 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-border">
            <h2 className="text-4xl md:text-5xl font-bold text-balance">Ready to Transform Your Scheduling?</h2>
            <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
              Join hundreds of veterinary clinics already saving time and reducing stress with Scrub In
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="/sign-up"
                className="px-8 py-4 rounded-lg bg-accent text-accent-foreground text-lg font-semibold hover:bg-accent/90 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
              >
                Start Your Free Trial
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </section>

        <footer className="border-t border-border bg-muted/30 py-8">
          <div className="container mx-auto px-4 text-center text-muted-foreground">
            <p>&copy; 2025 Scrub In. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </SignedOut>
  )
}
