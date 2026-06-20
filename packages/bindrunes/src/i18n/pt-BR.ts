import type { Dict } from "../utils/useI18n.svelte";

const ptBR: Dict = {
	"common.reload": "Recarregar",
	"common.loading": "Carregando",
	"common.save": "Salvar",
	"common.search": "Pesquisar",
	"common.pagination": "Paginação",
	"common.home": "Início",

	"form.Form.submit": "Salvar",
	"form.Form.success": "Salvo com sucesso!",
	"form.Form.error": "Erro ao salvar.",

	"error.ErrorBoundary.title": "Algo deu errado",
	"error.ErrorBoundary.description": "Ocorreu um erro inesperado. Tente recarregar a página.",
	"error.ErrorBoundary.retry": "Recarregar",
	"error.ErrorBoundary.home": "Página Inicial",

	"data.DataTable.empty": "Nenhum resultado encontrado.",
	"data.DataTable.page": "Página",
	"table.page": "Página {current} de {total}",
	"pagination.perPage": "{count} por página",

	"input.Select.placeholder": "Selecione...",

	"omnibar.Omnibar.placeholder": "Pesquisar comandos, rotas, memória...",
	"omnibar.Omnibar.searchLabel": "Pesquisar",
	"omnibar.Omnibar.noResults": 'Nenhum resultado encontrado para "{query}"',

	"auth.AuthGuard.loggedOut": "Sessão encerrada.",

	"theme.ThemeToggle.light": "Modo Claro",
	"theme.ThemeToggle.dark": "Modo Escuro",

	"dashboard.RuleFootnote.title": "Regra Crítica",
	"dashboard.DashboardShell.defaultTitle": "Início",

	"formatters.formatRelative.now": "agora",
	"formatters.formatRelative.minuteAgo": "1 minuto atrás",
	"formatters.formatRelative.minutesAgo": "{minutes} minutos atrás",
	"formatters.formatRelative.hourAgo": "1 hora atrás",
	"formatters.formatRelative.hoursAgo": "{hours} horas atrás",
	"formatters.formatRelative.yesterday": "ontem",
	"formatters.formatRelative.daysAgo": "{days} dias atrás",

	"dashboard.social.title": "Social",
	"dashboard.social.queueEmpty": "Fila de Triagem Limpa",
	"dashboard.social.queueEmptyDesc":
		"Todos os eventos de e-mail foram triados e promovidos com sucesso. Excelente trabalho!",
	"dashboard.social.pendingQueue": "PENDÊNCIA NA FILA",
	"dashboard.social.promotionGate": "PROMOTION GATE",
	"dashboard.social.rawEmail": "RAW EMAIL CONTENTS",

	"dashboard.triage.title": "Painel de Triagem",
	"dashboard.triage.desc": "Correções, reenvio e monitoramento de prazos processuais",
	"dashboard.triage.pending": "Pendentes",

	"dashboard.ingestion.title": "Monitor de Ingestão de Atos",
	"dashboard.ingestion.desc": "Gerenciamento de conexões IMAP/API e logs de captura em tempo real.",
	"dashboard.ingestion.sync": "Sincronizar Canais Agora",

	"dashboard.context.title": "Painel de Contexto",
	"dashboard.context.desc":
		"Suficiência de dossiês, indexação de documentos e dependências do agente local.",

	"dashboard.audit.title": "Livro de Auditoria Imutável",
	"dashboard.audit.desc":
		"Rastreabilidade ponta a ponta. Cada análise, monólogo e decisão do motor do agente é registrada com sua assinatura.",

	"common.logout": "Sair",
	"common.loadingError": "Erro ao carregar",
};

export default ptBR;
