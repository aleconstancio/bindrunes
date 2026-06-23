import type { Dict } from "../utils/createI18n.svelte";

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

	"common.logout": "Sair",
	"common.loadingError": "Erro ao carregar",
};

export default ptBR;
