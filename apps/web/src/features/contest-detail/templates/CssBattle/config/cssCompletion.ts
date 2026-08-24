import type { CompletionSource } from '@codemirror/autocomplete';
import { cssCompletionSource } from '@codemirror/lang-css';
import { syntaxTree } from '@codemirror/language';
import type { SyntaxNode } from '@lezer/common';
import { CSS_PROPERTY_VALUES } from './cssPropertyValues';

const identifierPattern = /^(\w[\w-]*|-\w[\w-]*|)$/;

function propertyNameFor(valueNode: SyntaxNode) {
  for (let node = valueNode.parent; node; node = node.parent) {
    if (node.name === 'Declaration') {
      return node.getChild('PropertyName');
    }
  }
  return null;
}

export const cssValueCompletionSource: CompletionSource = (context) => {
  const node = syntaxTree(context.state).resolveInner(context.pos, -1);

  if (node.name === 'ValueName') {
    const propertyNode = propertyNameFor(node);
    const propertyName = propertyNode && context.state.doc.sliceString(propertyNode.from, propertyNode.to);
    const values = propertyName && CSS_PROPERTY_VALUES[propertyName];

    if (values) {
      return {
        from: node.from,
        options: values.map((label: string) => ({ label, type: 'keyword' })),
        validFor: identifierPattern,
      };
    }
  }

  return cssCompletionSource(context);
};
