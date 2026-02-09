import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({ component: App });

const installCommands = {
	npx: "npx learn-skill@latest",
	npm: "npm install -g learn-skill",
	yarn: "yarn global add learn-skill",
	pnpm: "pnpm add -g learn-skill",
	bun: "bun add -g learn-skill",
} as const;

const valuePoints = [
	{
		title: "Local output, no black box",
		body: "Skills land at .agents/skills/<topic>/SKILL.md — plain markdown in your repo you can audit before trusting automation.",
	},
	{
		title: "Built to be modified",
		body: "The generated SKILL.md is a starting point. Edit triggers, boundaries, and instructions as your understanding grows.",
	},
	{
		title: "Portable by design",
		body: "One scaffold drops /learn-skill into OpenCode, Cursor, and Claude Code. Generated skills work the same everywhere.",
	},
	{
		title: "Versioned with your code",
		body: "Commit skills to git like any other file. Review diffs, track history, and evolve them with your team.",
	},
] as const;

const workflow = [
	{
		step: "01",
		title: "Scaffold the command",
		detail:
			"Run npx learn-skill to install the /learn-skill command into OpenCode, Cursor, and Claude Code in one step.",
	},
	{
		step: "02",
		title: "Generate a skill",
		detail:
			"Use /learn-skill <topic> inside your agent. It discovers existing skills, researches docs via Context7, and designs the right structure.",
	},
	{
		step: "03",
		title: "Review locally",
		detail:
			"The skill lands at .agents/skills/<topic>/SKILL.md. Open the markdown, audit every instruction, and validate before trusting automation.",
	},
	{
		step: "04",
		title: "Commit and evolve",
		detail:
			"Track the skill in git like any other file. Update as real usage reveals edge cases — portable across all three platforms.",
	},
] as const;

const supportedAgents = [
	{
		name: "OpenCode",
		href: "https://opencode.ai",
		logoSrc: "/agents/opencode.svg",
		logoAlt: "OpenCode logo",
		description: "Open-source AI coding agent for terminal workflows.",
	},
	{
		name: "Cursor",
		href: "https://cursor.com",
		logoSrc: "/agents/cursor.svg",
		logoAlt: "Cursor logo",
		description: "AI-first code editor built for pair-programming speed.",
	},
	{
		name: "Claude Code",
		href: "https://www.anthropic.com/claude-code",
		logoSrc: "/agents/claude.svg",
		logoAlt: "Claude logo",
		description: "Claude in your terminal for coding and repository tasks.",
	},
] as const;

const ASCII_LOGO = [
	"    ██╗██╗     ███████╗ █████╗ ██████╗ ███╗   ██╗      ███████╗██╗  ██╗██╗██╗     ██╗     ",
	"   ██╔╝██║     ██╔════╝██╔══██╗██╔══██╗████╗  ██║      ██╔════╝██║ ██╔╝██║██║     ██║     ",
	"  ██╔╝ ██║     █████╗  ███████║██████╔╝██╔██╗ ██║█████╗███████╗█████╔╝ ██║██║     ██║     ",
	" ██╔╝  ██║     ██╔══╝  ██╔══██║██╔══██╗██║╚██╗██║╚════╝╚════██║██╔═██╗ ██║██║     ██║     ",
	"██╔╝   ███████╗███████╗██║  ██║██║  ██║██║ ╚████║      ███████║██║  ██╗██║███████╗███████╗",
	"╚═╝    ╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝      ╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝",
]
	.map((l) => l.padEnd(89))
	.join("\n");

function App() {
	const [activeManager, setActiveManager] =
		useState<keyof typeof installCommands>("npm");
	const [copied, setCopied] = useState(false);

	const command = installCommands[activeManager];

	const handleCopy = async () => {
		await navigator.clipboard.writeText(command);
		setCopied(true);
		setTimeout(() => setCopied(false), 1200);
	};

	return (
		<main className="page">
			<a
				className="brand"
				href="https://github.com/onnokh/learn-skill"
				target="_blank"
				rel="noreferrer"
			>
				<pre className="ascii-logo">
					{ASCII_LOGO}
				</pre>
			</a>
			<div className="shell">
				<nav className="top-nav">
					<a
						className="coffee-link"
						href="https://buymeacoffee.com/onnokh1i"
						target="_blank"
						rel="noreferrer"
					>
						Buy me a coffee
					</a>
					<a
						href="https://github.com/onnokh/learn-skill"
						target="_blank"
						rel="noreferrer"
					>
						GitHub
					</a>
					<a
						href="https://www.npmjs.com/package/learn-skill"
						target="_blank"
						rel="noreferrer"
					>
						npm package
					</a>
				</nav>

				<section className="hero">
					<p className="eyebrow">Scaffold the /learn-skill command</p>
					<h1>
						Agent skills that live in your repo.
						<span>Readable. Editable. Yours.</span>
					</h1>
					<p className="lede">
						Scaffold /learn-skill into OpenCode, Cursor, and Claude Code — then
						generate skills as local files you can review, version, and own.
					</p>

					<section className="install" aria-label="Install command">
						<p className="install-label">Scaffold in one command</p>
						<div className="install-panel">
							<div
								className="install-tabs"
								role="tablist"
								aria-label="Package manager"
							>
								{(
									Object.keys(installCommands) as Array<
										keyof typeof installCommands
									>
								).map((manager) => (
									<button
										key={manager}
										type="button"
										role="tab"
										aria-selected={activeManager === manager}
										className="install-tab"
										data-active={activeManager === manager}
										onClick={() => setActiveManager(manager)}
									>
										{manager}
									</button>
								))}
							</div>

							<div className="install-command-row">
								<div className="install-command" aria-live="polite">
									<span>$</span>
									<code>{command}</code>
								</div>
								<button
									type="button"
									className="copy-button"
									onClick={handleCopy}
								>
									{copied ? (
										"Copied"
									) : (
										<>
											<svg viewBox="0 0 24 24" aria-hidden="true">
												<rect x="8" y="8" width="14" height="14" />
												<path d="M16 4H4v12" />
											</svg>
											Copy
										</>
									)}
								</button>
							</div>
						</div>
					</section>
				</section>

				<div className="divider" aria-hidden="true" />

				<section className="workflow" aria-labelledby="workflow-title">
					<div>
						<p className="eyebrow">Workflow</p>
						<h2 id="workflow-title">
							A sharper path from idea to production skill
						</h2>
					</div>
					<ol>
						{workflow.map((item) => (
							<li key={item.step}>
								<span>{item.step}</span>
								<div>
									<h3>{item.title}</h3>
									<p>{item.detail}</p>
								</div>
							</li>
						))}
					</ol>
				</section>

				<div className="divider" aria-hidden="true" />

				<section className="agents" aria-labelledby="agents-title">
					<div className="agents-head">
						<p className="eyebrow">Supported agents</p>
						<h2 id="agents-title">Works where you already ship</h2>
					</div>
					<ul>
						{supportedAgents.map((agent) => (
							<li key={agent.name}>
								<a href={agent.href} target="_blank" rel="noreferrer">
									<div className="agent-logo">
										<img src={agent.logoSrc} alt={agent.logoAlt} loading="lazy" />
									</div>
									<div className="agent-copy">
										<h3>{agent.name}</h3>
										<p>{agent.description}</p>
									</div>
									<span className="agent-link">Visit</span>
								</a>
							</li>
						))}
					</ul>
				</section>

				<div className="divider" aria-hidden="true" />

				<section className="features" aria-label="Value points">
					{valuePoints.map((item) => (
						<div key={item.title} className="feature-row">
							<h2>{item.title}</h2>
							<p>{item.body}</p>
						</div>
					))}
				</section>

				<footer className="footer-dots">
					<p>learn-skill.sh</p>
					<a href="https://www.npmjs.com/package/learn-skill">
						View npm package
					</a>
				</footer>
			</div>
		</main>
	);
}
