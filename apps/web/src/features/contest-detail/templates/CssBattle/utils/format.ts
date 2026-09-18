import beautify from 'js-beautify';

export function formatCssBattleCode(code: string): string {
  if (!code || !code.trim()) return '';

  const trimmed = code.trim();

  if (/<[a-z][\s\S]*>/i.test(trimmed)) {
    return beautify.html(trimmed, {
      indent_size: 2,
      wrap_line_length: 0,
      indent_inner_html: true,
      extra_liners: [],
    });
  }

  return beautify.css(trimmed, {
    indent_size: 2,
  });
}
