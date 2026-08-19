import type { Completion, CompletionResult, CompletionSource } from '@codemirror/autocomplete';
import { emmetCompletionSource } from '@emmetio/codemirror6-plugin';

interface EmmetCompletion extends Completion {
  tracker?: { abbreviation?: string };
}

function simplify(result: CompletionResult | null): CompletionResult | null {
  if (!result) return result;

  return {
    ...result,
    options: (result.options as EmmetCompletion[]).map((option) => ({
      ...option,
      label: option.tracker?.abbreviation || option.label,
      detail: undefined,
      info: undefined,
    })),
    // The library's own update() always recomputes from/to/options straight from live
    // tracker state (ignores whatever we pass as `current`), so re-simplifying its result
    // here keeps the label clean on every keystroke without affecting expand positions.
    update: result.update ? (current, from, to, ctx) => simplify(result.update!(current, from, to, ctx)) : undefined,
  };
}

export const emmetSuggestionSource: CompletionSource = async (context) =>
  simplify(await emmetCompletionSource(context));
