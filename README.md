# pi-timeout-format

A [pi](https://github.com/earendil-works/pi) extension that shows the bash tool's timeout as a readable duration, in the same style as the `Elapsed` timer under it.

## Before / after

Before:

```
$ npm run build (timeout 300s)

Elapsed 3m 50s
```

After:

```
$ npm run build (timeout 5m)

Elapsed 3m 50s
```

| timeout (seconds) | before                  | after                    |
| ----------------- | ----------------------- | ------------------------ |
| `45`              | `(timeout 45s)`         | `(timeout 45s)`          |
| `300`             | `(timeout 300s)`        | `(timeout 5m)`           |
| `330`             | `(timeout 330s)`        | `(timeout 5m 30s)`       |
| `3600`            | `(timeout 3600s)`       | `(timeout 1h)`           |
| `5400`            | `(timeout 5400s)`       | `(timeout 1h 30m)`       |
| `7384`            | `(timeout 7384s)`       | `(timeout 2h 3m 4s)`     |

Zero parts are dropped. Like pi's own `Elapsed` timer, durations top out at hours (`90000` shows as `25h`).

## Install

From GitHub:

```sh
pi install https://github.com/aburneikis/pi-timeout-format
```

Or clone and install the local copy:

```sh
git clone https://github.com/aburneikis/pi-timeout-format
pi install ./pi-timeout-format
```

Add `-l` to either `pi install` to write project settings (`.pi/settings.json`) instead of global ones. Then run `/reload` in pi, or restart it.

Try it for one session without installing:

```sh
pi -e https://github.com/aburneikis/pi-timeout-format
```

Remove with `pi remove` and the same source you installed from.

## How it works

Only the rendering changes. The extension registers a tool renderer with `pi.registerToolRenderer` that wraps the built-in bash `renderCall` and rewrites the trailing `(timeout Ns)`. The bash tool itself is not replaced, so it coexists with extensions that hook or override bash, and a literal `(timeout 9s)` inside a command is left alone.

## License

MIT
