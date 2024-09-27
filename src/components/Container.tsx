export function Container({ children }: { children: React.ReactNode }) {
	return <div className="h-full container mx-auto px-4 py-8">{children}</div>;
}
