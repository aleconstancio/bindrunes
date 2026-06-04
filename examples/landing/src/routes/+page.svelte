<script lang="ts">
  import {
    createLandingState,
    LandingNav,
    HeroSection,
    MetricsBar,
    HowItWorks,
    FeatureGrid,
    PricingTable,
    Testimonial,
    FAQ,
    FinalCTA,
    SiteFooter,
  } from 'bindrunes/landing';
  import { ArrowRight, Zap, Shield, Clock, CheckCircle } from 'lucide-svelte';

  const landing = createLandingState();

  const navLinks = [
    { label: 'Métricas', href: '#metrics' },
    { label: 'Recursos', href: '#features' },
    { label: 'Como funciona', href: '#how-it-works' },
    { label: 'Planos', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ];

  const metrics = [
    { value: '10k+', label: 'Usuários ativos', variant: 'default' as const },
    { value: '99.9%', label: 'Uptime', variant: 'success' as const },
    { value: '4.9/5', label: 'Satisfação', variant: 'warning' as const },
  ];

  const steps = [
    { icon: Zap, title: 'Cadastre-se', description: 'Crie sua conta em segundos.' },
    { icon: Shield, title: 'Configure', description: 'Defina suas preferências.' },
    { icon: Clock, title: 'Automatize', description: 'Deixe a IA trabalhar por você.' },
    { icon: CheckCircle, title: 'Resultados', description: 'Acompanhe suas métricas.' },
  ];

  const features = [
    { icon: Zap, title: 'Rápido', description: 'Processamento em tempo real.' },
    { icon: Shield, title: 'Seguro', description: 'Dados protegidos e criptografados.' },
    { icon: Clock, title: 'Automático', description: 'Reduza tarefas manuais.' },
    { icon: CheckCircle, title: 'Confiável', description: '99.9% de uptime garantido.' },
    { icon: Zap, title: 'Escalável', description: 'Cresça sem limites.' },
    { icon: Shield, title: 'Integrável', description: 'API completa e documentada.' },
  ];

  const plans = [
    {
      name: 'Starter',
      monthly: 97,
      annual: 931,
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
      cta: { label: 'Começar', variant: 'outline' as const, href: '/signup' },
    },
    {
      name: 'Pro',
      monthly: 197,
      annual: 1891,
      highlight: true,
      badge: 'Mais popular',
      features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5'],
      cta: { label: 'Começar trial', variant: 'primary' as const, href: '/signup' },
    },
    {
      name: 'Enterprise',
      monthly: 497,
      annual: 4771,
      features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5', 'Feature 6'],
      cta: { label: 'Falar com vendas', variant: 'outline' as const, href: '/contact' },
    },
  ];

  const faqItems = [
    { question: 'O que é?', answer: 'Uma plataforma incrível.' },
    { question: 'Como funciona?', answer: 'É simples e intuitivo.' },
    { question: 'Tem trial?', answer: 'Sim, 7 dias grátis.' },
  ];
</script>

<div class="landing-page">
  <LandingNav
    logo={{ href: '/', label: 'Minha SaaS' }}
    links={navLinks}
    cta={{ label: 'Começar', href: '/signup' }}
    sectionIds={['metrics', 'features', 'how-it-works', 'pricing', 'faq']}
  />

  <HeroSection
    badge="Nova versão disponível"
    title="Título <br />da Landing Page"
    titleGradient
    description="Uma descrição incrível do seu produto."
    ctas={[
      { label: 'Começar agora', href: '/signup', icon: ArrowRight },
      { label: 'Saiba mais', href: '#features', variant: 'outline' },
    ]}
    footnote={{ title: 'Sem cartão de crédito.', description: 'Cancele quando quiser.' }}
  />

  <section id="metrics" class="px-6 py-16 section-reveal">
    <MetricsBar {metrics} />
  </section>

  <section id="features" class="px-6 py-16 section-reveal">
    <div class="mx-auto max-w-6xl">
      <h2 class="text-center text-3xl font-extrabold">Recursos</h2>
      <div class="mt-10">
        <FeatureGrid {features} columns={2} variant="minimal" />
      </div>
    </div>
  </section>

  <section id="how-it-works" class="px-6 py-16 section-reveal">
    <div class="mx-auto max-w-6xl">
      <h2 class="text-center text-3xl font-extrabold">Como funciona</h2>
      <div class="mt-10">
        <!-- showConnector is true by default, enabling the connecting line between steps -->
        <HowItWorks {steps} showConnector />
      </div>
    </div>
  </section>

  <section id="pricing" class="border-t border-border px-6 py-16 section-reveal">
    <div class="mx-auto max-w-6xl">
      <h2 class="text-center text-3xl font-extrabold">Planos</h2>
      <PricingTable {plans} />
      <!-- 
        Custom card example:
        <PricingTable {plans}>
          {#snippet customCard(plan, { annual, format })}
            <div class="custom-card">
              <h3>{plan.name}</h3>
              <p>{annual ? format(plan.annual) : format(plan.monthly)}</p>
            </div>
          {/snippet}
        </PricingTable>
      -->
    </div>
  </section>

  <section class="px-6 py-16 section-reveal">
    <div class="mx-auto max-w-6xl space-y-16">
      <Testimonial
        quote="Este produto mudou a forma como trabalhamos."
        author="Maria Silva"
        role="CEO da Empresa"
        avatar="https://i.pravatar.cc/150?u=maria"
      />
      <Testimonial
        quote="Recomendo para todos os escritórios."
        author="João Santos"
        role="Advogado"
        avatarFallback="JS"
      />
    </div>
  </section>

  <section id="faq" class="border-t border-border px-6 py-16 section-reveal">
    <div class="mx-auto max-w-6xl">
      <h2 class="text-center text-3xl font-extrabold">Perguntas frequentes</h2>
      <!-- Components handle empty arrays gracefully (e.g. FAQ with []) -->
      <FAQ items={faqItems} />
    </div>
  </section>

  <FinalCTA
    title="Pronto para começar?"
    description="Junte-se a milhares de usuários satisfeitos."
    ctas={[{ label: 'Começar agora', href: '/signup', icon: ArrowRight }]}
    footnote={{ title: 'Trial gratuito.', description: '7 dias sem compromisso.' }}
  />

  <SiteFooter
    logo={{ label: 'Minha SaaS' }}
    links={[
      { label: 'Sobre', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contato', href: '/contact' },
    ]}
    copyright="© 2026 Minha SaaS. Todos os direitos reservados."
    bottomLinks={[
      { label: 'Termos', href: '/terms' },
      { label: 'Privacidade', href: '/privacy' },
    ]}
  />
</div>
