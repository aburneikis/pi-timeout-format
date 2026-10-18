/**
 * Shows the bash tool's timeout as a duration in the tool call header, matching the
 * `Elapsed 3m 50s` timer below it: `(timeout 300s)` becomes `(timeout 5m)`.
 *
 * The built-in renderer reuses `context.lastComponent` as its Text, so we hand it one whose
 * setText rewrites the suffix. Everything else, including the elapsed timer, stays built-in.
 */
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { Text } from "@earendil-works/pi-tui";

const TIMEOUT_SUFFIX = /\(timeout (\d+(?:\.\d+)?)s\)(?=(?:\x1b\[[0-9;]*m)*$)/;

export function formatTimeout(seconds: number): string {
	if (seconds < 60) return `${seconds}s`;
	const total = Math.round(seconds);
	const hours = Math.floor(total / 3600);
	const minutes = Math.floor((total % 3600) / 60);
	const remainder = total % 60;
	return [hours && `${hours}h`, minutes && `${minutes}m`, remainder && `${remainder}s`].filter(Boolean).join(" ");
}

class TimeoutFormattingText extends Text {
	override setText(text: string): void {
		super.setText(text.replace(TIMEOUT_SUFFIX, (_, seconds) => `(timeout ${formatTimeout(Number(seconds))})`));
	}
}

export default function (pi: ExtensionAPI) {
	pi.registerToolRenderer((toolName, next) => {
		const renderers = next();
		if (toolName !== "bash" || !renderers?.renderCall) return renderers;
		return {
			...renderers,
			renderCall: (args, theme, context) =>
				renderers.renderCall!(args, theme, {
					...context,
					lastComponent: context.lastComponent ?? new TimeoutFormattingText("", 0, 0),
				}),
		};
	});
}
