import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import ogImagePath from "../../og.png?url";

const siteUrl = "https://learn-skill.sh";
const siteName = "learn-skill";
const pageTitle = "learn-skill | Build agent skills you can trust";
const pageDescription =
	"Generate and learn AI agent skills locally so you can inspect what runs before it touches your codebase.";
const ogImageUrl = `${siteUrl}${ogImagePath}`;

const structuredData = [
	{
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: siteName,
		url: siteUrl,
		description: pageDescription,
	},
	{
		"@context": "https://schema.org",
		"@type": "Organization",
		name: siteName,
		url: siteUrl,
		logo: ogImageUrl,
		sameAs: [
			"https://github.com/onnokh/learn-skill",
			"https://www.npmjs.com/package/learn-skill",
		],
	},
	{
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: siteName,
		url: siteUrl,
		description: pageDescription,
		applicationCategory: "DeveloperApplication",
		operatingSystem: "Windows, macOS, Linux",
		offers: {
			"@type": "Offer",
			price: "0",
			priceCurrency: "USD",
		},
	},
];

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
				title: pageTitle,
			},
			{
				name: "description",
				content: pageDescription,
			},
			{
				name: "robots",
				content: "index, follow",
			},
			{
				name: "theme-color",
				content: "#0b0f1a",
			},
			{
				property: "og:type",
				content: "website",
			},
			{
				property: "og:site_name",
				content: siteName,
			},
			{
				property: "og:title",
				content: pageTitle,
			},
			{
				property: "og:description",
				content: pageDescription,
			},
			{
				property: "og:url",
				content: `${siteUrl}/`,
			},
			{
				property: "og:image",
				content: ogImageUrl,
			},
			{
				property: "og:image:alt",
				content: "learn-skill landing page preview",
			},
			{
				name: "twitter:card",
				content: "summary_large_image",
			},
			{
				name: "twitter:title",
				content: pageTitle,
			},
			{
				name: "twitter:description",
				content: pageDescription,
			},
			{
				name: "twitter:image",
				content: ogImageUrl,
			},
		],
		links: [
			{
				rel: "canonical",
				href: `${siteUrl}/`,
			},
			{
				rel: "icon",
				href: "/favicon.ico",
			},
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
				{structuredData.map((entry) => (
					<script
						key={entry["@type"]}
						type="application/ld+json"
					>
						{JSON.stringify(entry)}
					</script>
				))}
			</head>
			<body>
				{children}
				<Scripts />
			</body>
		</html>
	);
}
