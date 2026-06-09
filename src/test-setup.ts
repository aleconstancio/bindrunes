import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// jsdom polyfills for bits-ui
if (typeof window !== 'undefined') {
	window.CSS = { supports: () => true, escape: (s: string) => s } as any;
	window.Element.prototype.scrollTo = () => {};
	class MockResizeObserver {
		observe() {}
		unobserve() {}
		disconnect() {}
	}
	window.ResizeObserver = MockResizeObserver as any;
	class MockIntersectionObserver {
		observe() {}
		unobserve() {}
		disconnect() {}
	}
	window.IntersectionObserver = MockIntersectionObserver as any;
	window.HTMLElement.prototype.hasPointerCapture = () => false;
}

vi.mock('svelte-sonner', () => ({
	Toaster: (() => '') as unknown as any,
	toast: {
		error: vi.fn(),
		success: vi.fn(),
		info: vi.fn(),
		warning: vi.fn(),
	},
}));

vi.mock('mode-watcher', () => {
	const mode = { current: 'dark', subscribe: (fn: any) => { fn('dark'); return () => {}; } };
	const theme = { current: 'dark', subscribe: (fn: any) => { fn('dark'); return () => {}; } };
	return {
		ModeWatcher: (() => '') as unknown as any,
		mode,
		theme,
		toggleMode: vi.fn(),
		setMode: vi.fn(),
		resetMode: vi.fn(),
		modeStorageKey: 'mode',
		themeStorageKey: 'theme',
		userPrefersMode: 'dark',
		systemPrefersMode: 'dark',
		generateSetInitialModeExpression: vi.fn(),
	};
});

vi.mock('lucide-svelte', () => {
	const icon = () => '';
	icon.size = 16;
	return {
		Sun: icon,
		Moon: icon,
		Check: icon,
		X: icon,
		ChevronDown: icon,
		ChevronUp: icon,
		ChevronLeft: icon,
		ChevronRight: icon,
		Menu: icon,
		Search: icon,
		Plus: icon,
		XCircle: icon,
		AlertCircle: icon,
		Info: icon,
		Eye: icon,
		EyeOff: icon,
		Trash2: icon,
		Edit: icon,
		CheckCircle2: icon,
		Loader2: icon,
		ExternalLink: icon,
		Filter: icon,
		ArrowUpDown: icon,
		ArrowUp: icon,
		ArrowDown: icon,
		Bell: icon,
		Sparkles: icon,
		Settings: icon,
		MoreVertical: icon,
		Star: icon,
		Circle: icon,
		Globe: icon,
		Mail: icon,
		MessageCircle: icon,
		HelpCircle: icon,
		LayoutDashboard: icon,
		LogOut: icon,
		BookOpen: icon,
		Bookmark: icon,
		User: icon,
		Users: icon,
		Home: icon,
		Heart: icon,
		Share2: icon,
		Lightbulb: icon,
		FileText: icon,
		Zap: icon,
		Shield: icon,
		Lock: icon,
		Key: icon,
		Tag: icon,
		Layers: icon,
		Box: icon,
		Package: icon,
		ShoppingCart: icon,
		CreditCard: icon,
		BarChart3: icon,
		PieChart: icon,
		LineChart: icon,
		TrendingUp: icon,
		TrendingDown: icon,
		Activity: icon,
		Clock: icon,
		Calendar: icon,
		MapPin: icon,
		Phone: icon,
		Link: icon,
		Copy: icon,
		Download: icon,
		Upload: icon,
		Save: icon,
		Send: icon,
		RefreshCw: icon,
		RotateCcw: icon,
		Undo: icon,
		Redo: icon,
		Volume2: icon,
		VolumeX: icon,
		Mic: icon,
		MicOff: icon,
		Video: icon,
		VideoOff: icon,
		Image: icon,
		Camera: icon,
		PlayCircle: icon,
		PauseCircle: icon,
		SkipBack: icon,
		SkipForward: icon,
		Type: icon,
		Bold: icon,
		Italic: icon,
		Underline: icon,
		Strikethrough: icon,
		Code: icon,
		Code2: icon,
		Terminal: icon,
		GitBranch: icon,
		GitCommit: icon,
		GitMerge: icon,
		GitPullRequest: icon,
		Wand2: icon,
		Magic: icon,
		Palette: icon,
		Brush: icon,
		Pen: icon,
		Pencil: icon,
		Eraser: icon,
		Crop: icon,
		Sliders: icon,
		ToggleLeft: icon,
		ToggleRight: icon,
		LogIn: icon,
		UserPlus: icon,
		KeyRound: icon,
		ArrowLeft: icon,
		Trash: icon,
		GripVertical: icon,
	};
});
