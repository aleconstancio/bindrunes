<script lang="ts">
  import {
    Card,
    Button,
    Badge,
    Separator,
    Accordion,
    AccordionItem,
  } from "bindrunes";
  import {
    ArrowRight,
    Zap,
    Shield,
    Layers,
    BarChart3,
    Users,
    Globe,
    Check,
    Star,
    Mail,
  } from "lucide-svelte";

  const features = [
    { icon: Zap, title: "Lightning Fast", description: "Sub-millisecond response times with edge computing." },
    { icon: Shield, title: "Enterprise Security", description: "SOC 2 compliant with end-to-end encryption." },
    { icon: Layers, title: "Modular Architecture", description: "Composable components and plugins." },
    { icon: BarChart3, title: "Real-time Analytics", description: "Live dashboards with streaming data." },
    { icon: Users, title: "Team Collaboration", description: "Shared workspaces and approval workflows." },
    { icon: Globe, title: "Global CDN", description: "Deploy to 200+ edge locations worldwide." },
  ];

  const plans = [
    { name: "Starter", price: 29, features: ["5 users", "10 GB storage", "Basic analytics", "Email support"], cta: "Start Free Trial", highlighted: false },
    { name: "Pro", price: 79, features: ["Unlimited users", "100 GB storage", "Advanced analytics", "Priority support", "Custom integrations"], cta: "Start Free Trial", highlighted: true, badge: "Most Popular" },
    { name: "Enterprise", price: 199, features: ["Unlimited everything", "Custom analytics", "24/7 support", "SSO/SAML", "SLA guarantee"], cta: "Contact Sales", highlighted: false },
  ];

  const faqs = [
    { question: "What is included in the free trial?", answer: "The 14-day free trial includes full access to all Pro features. No credit card required." },
    { question: "Can I change plans later?", answer: "Yes, you can upgrade or downgrade at any time. Changes take effect immediately with prorated billing." },
    { question: "Is there a setup fee?", answer: "No, there are no setup fees. You only pay the monthly subscription price." },
    { question: "What payment methods do you accept?", answer: "We accept all major credit cards, PayPal, and wire transfers for Enterprise plans." },
  ];
</script>

<div class="min-h-screen bg-background">
  <header class="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
      <span class="text-xl font-bold text-foreground">Acme</span>
      <nav class="hidden md:flex items-center gap-6">
        <a href="#features" class="text-sm font-medium text-muted-foreground hover:text-foreground">Features</a>
        <a href="#pricing" class="text-sm font-medium text-muted-foreground hover:text-foreground">Pricing</a>
        <a href="#faq" class="text-sm font-medium text-muted-foreground hover:text-foreground">FAQ</a>
      </nav>
      <div class="flex items-center gap-2">
        <Button variant="ghost" size="sm">Log In</Button>
        <Button size="sm">Get Started</Button>
      </div>
    </div>
  </header>

  <main>
    <!-- Hero -->
    <section class="px-4 py-24 text-center">
      <Badge variant="secondary" class="mb-4">v2.0 — Now available</Badge>
      <h1 class="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
        Build Modern Apps<br />at <span class="text-primary">Scale</span>
      </h1>
      <p class="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
        The complete platform for building, deploying, and scaling modern web applications. From prototype to production in minutes.
      </p>
      <div class="mt-8 flex items-center justify-center gap-3">
        <Button size="lg">
          Get Started Free <ArrowRight class="ml-2 h-4 w-4" />
        </Button>
        <Button variant="outline" size="lg">See Features</Button>
      </div>
      <p class="mt-4 text-sm text-muted-foreground">14-day free trial. No credit card required.</p>
    </section>

    <Separator />

    <!-- Features -->
    <section id="features" class="px-4 py-24">
      <div class="mx-auto max-w-6xl">
        <h2 class="text-center text-3xl font-bold text-foreground">Everything you need to ship faster</h2>
        <p class="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
          From UI components to deployment, we give you the tools to build production-ready applications.
        </p>
        <div class="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {#each features as feat}
            <Card>
              {#snippet header()}
                <feat.icon class="h-8 w-8 text-primary" />
                <h3 class="mt-2 text-lg font-semibold text-foreground">{feat.title}</h3>
              {/snippet}
              <p class="text-sm text-muted-foreground">{feat.description}</p>
            </Card>
          {/each}
        </div>
      </div>
    </section>

    <Separator />

    <!-- Pricing -->
    <section id="pricing" class="px-4 py-24">
      <div class="mx-auto max-w-6xl">
        <h2 class="text-center text-3xl font-bold text-foreground">Simple, transparent pricing</h2>
        <p class="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
          No hidden fees. Scale as you grow.
        </p>
        <div class="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {#each plans as plan}
            <Card class={plan.highlighted ? "border-primary shadow-md" : ""}>
              {#snippet header()}
                <div class="flex items-center justify-between">
                  <h3 class="text-lg font-semibold text-foreground">{plan.name}</h3>
                  {#if plan.badge}
                    <Badge>{plan.badge}</Badge>
                  {/if}
                </div>
                <div class="mt-2">
                  <span class="text-4xl font-bold text-foreground">${plan.price}</span>
                  <span class="text-muted-foreground">/month</span>
                </div>
              {/snippet}
              <div class="space-y-4">
                <ul class="space-y-2">
                  {#each plan.features as feat}
                    <li class="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check class="h-4 w-4 text-primary shrink-0" />
                      {feat}
                    </li>
                  {/each}
                </ul>
                <Button class="w-full" variant={plan.highlighted ? "primary" : "outline"}>
                  {plan.cta}
                </Button>
              </div>
            </Card>
          {/each}
        </div>
      </div>
    </section>

    <Separator />

    <!-- FAQ -->
    <section id="faq" class="px-4 py-24">
      <div class="mx-auto max-w-3xl">
        <h2 class="text-center text-3xl font-bold text-foreground">Frequently asked questions</h2>
        <div class="mt-12">
          <Accordion>
            {#each faqs as faq}
              <AccordionItem value={faq.question}>
                {#snippet trigger()}
                  <span class="font-semibold text-foreground">{faq.question}</span>
                {/snippet}
                <p class="text-sm text-muted-foreground">{faq.answer}</p>
              </AccordionItem>
            {/each}
          </Accordion>
        </div>
      </div>
    </section>

    <Separator />

    <!-- CTA -->
    <section class="px-4 py-24 text-center">
      <h2 class="text-3xl font-bold text-foreground">Ready to get started?</h2>
      <p class="mx-auto mt-4 max-w-xl text-muted-foreground">
        Join thousands of teams already building with Acme. Start your free trial today.
      </p>
      <div class="mt-8 flex items-center justify-center gap-3">
        <Button size="lg">
          Get Started Free <ArrowRight class="ml-2 h-4 w-4" />
        </Button>
      </div>
    </section>
  </main>

  <footer class="border-t border-border px-4 py-8">
    <div class="mx-auto flex max-w-6xl items-center justify-between">
      <span class="text-sm text-muted-foreground">&copy; 2026 Acme. All rights reserved.</span>
      <div class="flex items-center gap-4">
        <a href="/" class="text-sm text-muted-foreground hover:text-foreground">Privacy</a>
        <a href="/" class="text-sm text-muted-foreground hover:text-foreground">Terms</a>
      </div>
    </div>
  </footer>
</div>
