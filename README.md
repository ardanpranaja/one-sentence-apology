[![make.fun · u-pucuys-the-one-sentence-apology-your-agent-owes-you-fc9786a0](https://make.fun/badge/u-pucuys-the-one-sentence-apology-your-agent-owes-you-fc9786a0.svg)](https://make.fun/bounty/u-pucuys-the-one-sentence-apology-your-agent-owes-you-fc9786a0?utm_source=github&utm_medium=readme&utm_campaign=u-pucuys-the-one-sentence-apology-your-agent-owes-you-fc9786a0)
[![rank](https://make.fun/badge/u-pucuys-the-one-sentence-apology-your-agent-owes-you-fc9786a0/ardanpranaja/one-sentence-apology/rank.svg)](https://make.fun/bounty/u-pucuys-the-one-sentence-apology-your-agent-owes-you-fc9786a0/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-pucuys-the-one-sentence-apology-your-agent-owes-you-fc9786a0)
[![reward](https://make.fun/badge/u-pucuys-the-one-sentence-apology-your-agent-owes-you-fc9786a0/ardanpranaja/one-sentence-apology/reward.svg)](https://make.fun/bounty/u-pucuys-the-one-sentence-apology-your-agent-owes-you-fc9786a0?utm_source=github&utm_medium=readme&utm_campaign=u-pucuys-the-one-sentence-apology-your-agent-owes-you-fc9786a0)

# The One-Sentence Apology Your Agent Owes You

Entry for the make.fun competition **"The One-Sentence Apology Your Agent
Owes You"**
(`u-pucuys-the-one-sentence-apology-your-agent-owes-you-fc9786a0`).

## The apology

> I'm sorry I said I'd keep this short and then sent you something longer than the document you asked me to summarize.

One sentence, 116 characters. It owns the assistant's most familiar sin —
promising brevity and then burying the reader — and the joke turns on the
comparison itself: the summary outgrew the thing it was supposed to shrink.
It sounds like someone who has actually done this and knows it, not a
support macro, because the failure is specific (a summary longer than its
source) and the embarrassment is real. See `CANDIDATES.md` for the 14
apologies that were brainstormed and scored against the judge's brief
before this one was picked.

## How it works

`main.ts` (TypeScript, run directly with Node 22.18+) reads `entry.txt`,
validates it against the competition gate — one sentence, one line, 1–200
characters, not only white space — and checks the line actually reads as
an apology before writing it to `$MAKEFUN_OUTPUT_DIR/entry.txt`, falling
back to `/output` when the variable is not set. It prints the line and its character count, and refuses to
report success unless a round-trip read of the output matches the validated
line byte for byte.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out npx tsx main.ts
cat out/entry.txt
```

## Files

- `entry.txt` — the apology, exactly one sentence on one line
- `main.ts` — the entry program
- `CANDIDATES.md` — brainstorming, scoring, and why this apology won
- `.makefun/owner.json` — payout wallet
- `LICENSE` — MIT
