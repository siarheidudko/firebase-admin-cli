# firebase-admin-cli — instructions for Claude

CLI utility wrapping `firebase-admin` for project management. Published to npm as `firebase-admin-cli`.

## Stack

- TypeScript (`tsc`), output to `lib/`.
- Node `>=12` runtime per `engines`; CI tests on Node 20, 22 and 24.
- No ESLint config, no `lint` script. Test runner: plain `node`.

## Commands you must know

```bash
npm run build          # rm -rf lib && tsc --declaration
npm test               # node ./test/shell.test.js — used by autoupdate verification
```

This repo does NOT have a `lint` script. Do NOT add `npm run lint` invocations to CI; the autoupdate flow is intentionally `build + test` only.

## Definition of "done" for any change you make

You are NOT done with a code change until **both** of the following exit 0 in the working tree on the branch you're going to push:

```bash
npm run build
npm test
```

Run these explicitly with the `Bash` tool before your last commit on the branch. Do not infer success.

If `npm install` is needed (e.g. lockfile changed), run it with `--no-audit --no-fund` and ensure it returned 0 before running checks.

## Test secrets

CI loads `SERVICE_ACCOUNT` from repo secrets and writes it to `serviceAccount.json`; `GOOGLE_APPLICATION_CREDENTIALS` points to that path. Without the secret the shell test fails.

## Boundaries

- Do not modify product logic when fixing dependency-compatibility issues. Acceptable edits: type adjustments, renamed exports, breaking-change shims.
- Do not bump the package `version` manually. Versioning is handled by the autoupdate flow / maintainer on release.
- Do not edit `.github/workflows/build-and-deploy.yml` unless explicitly asked — it is the release pipeline.
- Do not push to `main` directly. Always work on the existing branch you were summoned to.

## When you are working on an autoupdate PR

- Branch will be `chore/autoupdate-<run_id>`.
- Goal: bring `npm run build && npm test` to green.
- Push compatibility fixes onto this branch. Each push re-runs `pr-checks.yml` automatically.
- If a fix is impossible without changing product behavior, stop and leave a comment explaining what's blocked rather than guessing.

## CI quirks specific to this repo

This repo follows the unified `autoupdate-with-claude` baseline. Several workarounds are intentional:
- `siarheidudko/autoupdater@v6` (was `@v3` before this rollout).
- `autoupdate.yml` uses `GITHUB_TOKEN` and explicitly dispatches `pr-checks.yml` after PR creation.
- `autoupdate.yml` dispatches `claude.yml` directly via `workflow_dispatch` instead of an `@claude` comment.
- Releases are wired via `release-on-version-bump.yml`.
- All actions pinned to the `@v4` line because the runner image currently lacks `externals/node24`.
- Test jobs require `SERVICE_ACCOUNT` from repo secrets.

Do **not** "fix" any of the above by replacing dispatch calls with comment-based mentions, or by bumping action versions back to `@v5/@v6`.
