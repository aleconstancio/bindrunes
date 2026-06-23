import type { Dict } from "../utils/createI18n.svelte";

const en: Dict = {
	"common.reload": "Reload",
	"common.loading": "Loading",
	"common.save": "Save",
	"common.search": "Search",
	"common.pagination": "Pagination",
	"common.home": "Home",

	"form.Form.submit": "Save",
	"form.Form.success": "Saved successfully!",
	"form.Form.error": "Error saving.",

	"error.ErrorBoundary.title": "Something went wrong",
	"error.ErrorBoundary.description": "An unexpected error occurred. Try reloading the page.",
	"error.ErrorBoundary.retry": "Reload",
	"error.ErrorBoundary.home": "Home",

	"data.DataTable.empty": "No results found.",
	"data.DataTable.page": "Page",
	"table.page": "Page {current} of {total}",
	"pagination.perPage": "{count} per page",

	"input.Select.placeholder": "Select...",

	"omnibar.Omnibar.placeholder": "Search commands, routes, memory...",
	"omnibar.Omnibar.searchLabel": "Search",
	"omnibar.Omnibar.noResults": 'No results found for "{query}"',

	"auth.AuthGuard.loggedOut": "Session ended.",

	"theme.ThemeToggle.light": "Light Mode",
	"theme.ThemeToggle.dark": "Dark Mode",

	"dashboard.RuleFootnote.title": "Critical Rule",
	"dashboard.DashboardShell.defaultTitle": "Home",

	"formatters.formatRelative.now": "now",
	"formatters.formatRelative.minuteAgo": "1 minute ago",
	"formatters.formatRelative.minutesAgo": "{minutes} minutes ago",
	"formatters.formatRelative.hourAgo": "1 hour ago",
	"formatters.formatRelative.hoursAgo": "{hours} hours ago",
	"formatters.formatRelative.yesterday": "yesterday",
	"formatters.formatRelative.daysAgo": "{days} days ago",

	"landing.LandingNav.toggleTheme": "Toggle theme",
	"landing.PricingTable.monthly": "Monthly",
	"landing.PricingTable.annual": "Annual",
	"landing.PricingTable.saveUpTo": "Save up to 20%",
	"landing.PricingTable.perYear": "per year",
	"landing.PricingTable.perMonth": "per month",
	"landing.PricingTable.save": "save $",
	"landing.PricingTable.mostChosen": "Most Popular",
	"landing.SiteFooter.allRightsReserved": "All rights reserved.",
	"landing.SiteFooter.legalLinks": "Legal Links",
	"landing.HowItWorks.stepDone": "Step completed",
	"landing.HowItWorks.step": "Step",
	"landing.Newsletter.placeholder": "your@email.com",
	"landing.Newsletter.button": "Subscribe",
	"landing.FeatureComparison.feature": "Feature",

	"common.logout": "Log out",
	"common.loadingError": "Error loading",
};

export default en;
