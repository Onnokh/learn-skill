import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

const umamiScriptSrc = import.meta.env.VITE_UMAMI_SRC as string | undefined;
const umamiWebsiteId =
	import.meta.env.VITE_UMAMI_WEBSITE_ID as string | undefined;
const umamiDomains = import.meta.env.VITE_UMAMI_DOMAINS as string | undefined;
const shouldLoadUmami =
	import.meta.env.PROD && Boolean(umamiScriptSrc && umamiWebsiteId);

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "learn-skill | Build agent skills you can trust",
			},
			{
				name: "description",
				content:
					"Generate and learn AI agent skills locally so you can inspect what runs before it touches your codebase.",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),

	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
				{shouldLoadUmami ? (
					<script
						defer
						src={umamiScriptSrc}
						data-website-id={umamiWebsiteId}
						data-domains={umamiDomains}
					/>
				) : null}
			</head>
			<body>
				{children}
				<Scripts />
			</body>
		</html>
	);
}
