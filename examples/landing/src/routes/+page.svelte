<script lang="ts">
import { MarketingPage } from "bindrunes/landing";
import { ArrowRight, Zap, Shield, Clock, CheckCircle } from "lucide-svelte";

const features = [
  { icon: Zap, title: "Rápido", description: "Processamento em tempo real." },
  { icon: Shield, title: "Seguro", description: "Dados protegidos e criptografados." },
  { icon: Clock, title: "Automático", description: "Reduza tarefas manuais." },
  { icon: CheckCircle, title: "Confiável", description: "99.9% de uptime garantido." },
];

const plans = [
  { name: "Starter", monthly: 97, annual: 931, features: ["Feature 1", "Feature 2"], cta: { label: "Começar", variant: "outline" as const, href: "/signup" } },
  { name: "Pro", monthly: 197, annual: 1891, highlight: true, badge: "Mais popular", features: ["Feature 1", "Feature 2", "Feature 3"], cta: { label: "Começar trial", variant: "primary" as const, href: "/signup" } },
  { name: "Enterprise", monthly: 497, annual: 4771, features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"], cta: { label: "Falar com vendas", variant: "outline" as const, href: "/contact" } },
];

const faqItems = [
  { question: "O que é?", answer: "Uma plataforma incrível." },
  { question: "Como funciona?", answer: "É simples e intuitivo." },
  { question: "Tem trial?", answer: "Sim, 7 dias grátis." },
];
</script>

<MarketingPage
  logo={{ href: "/", label: "Minha SaaS" }}
  navLinks={[
    { label: "Recursos", href: "#features" },
    { label: "Planos", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ]}
  cta={{ label: "Começar", href: "/signup" }}
  badge="Nova versão disponível"
  heroDescription="Uma descrição incrível do seu produto."
  heroCtas={[
    { label: "Começar agora", href: "/signup", icon: ArrowRight },
    { label: "Saiba mais", href: "#features", variant: "outline" },
  ]}
  {features}
  {plans}
  {faqItems}
  footerLinks={[
    { label: "Sobre", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contato", href: "/contact" },
  ]}
  copyright="© 2026 Minha SaaS. Todos os direitos reservados."
  bottomLinks={[
    { label: "Termos", href: "/terms" },
    { label: "Privacidade", href: "/privacy" },
  ]}
/>
