# Documents

PDFs served as-is and read in place by `src/components/DocReader.astro`.

The reader is never rendered for a file that is not here. `docExists()` in
`src/lib/docs.ts` checks at build time, and the section it feeds is omitted when
the check fails, so a missing document costs a section and never an empty frame.
Drop the file in and the next build grows the section back.

## What goes where

| Path | What |
|---|---|
| `pipelines/<slug>.pdf` | One KC pipeline sheet, named for the pipeline slug: `voice-vault.pdf`, `split-at-source.pdf`, `identity-lock.pdf`, `multiplier.pdf`, `phantom-set.pdf`, `continuity-spine.pdf`, `operator-stack.pdf` |
| `TwinMoons_Process_TaleCrafters.pdf` | The Twin Moons process document |
| `Skyrunner_Process_TaleCrafters.pdf` | The Skyrunner process document |

Nothing here is committed yet. Both film process documents and all seven
pipeline sheets are still outstanding.
