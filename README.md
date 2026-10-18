# pi-timeout-format

Shows the bash tool's timeout in the tool call header as a duration, in the same style as the `Elapsed 3m 50s` timer:

| model passes | shown              |
| ------------ | ------------------ |
| `45`         | `(timeout 45s)`    |
| `300`        | `(timeout 5m)`     |
| `330`        | `(timeout 5m 30s)` |
| `5400`       | `(timeout 1h 30m)` |

Only the rendering changes. The bash tool itself is not replaced, so this coexists with extensions that hook or override bash.

## Install

Add to `~/.pi/agent/settings.json`:

```json
"packages": ["../../Code/pi-timeout-format"]
```
