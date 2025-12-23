import React, { useCallback, useEffect, useRef } from 'react';
import { cn } from '../../utils/cn';

interface CodeEditorProps {
  value: string;
  onChange?: (value: string) => void;
  language?: string;
  theme?: 'light' | 'dark';
  readOnly?: boolean;
  showLineNumbers?: boolean;
  fontSize?: number;
  height?: string;
  className?: string;
  placeholder?: string;
}

export function CodeEditor({
  value,
  onChange,
  language = 'javascript',
  theme = 'light',
  readOnly = false,
  showLineNumbers = true,
  fontSize = 14,
  height = '300px',
  className,
  placeholder = 'Enter your code here...',
}: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      onChange?.(newValue);
    },
    [onChange],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const target = e.target as HTMLTextAreaElement;
        const start = target.selectionStart;
        const end = target.selectionEnd;
        const newValue = value.substring(0, start) + '  ' + value.substring(end);
        onChange?.(newValue);

        setTimeout(() => {
          target.selectionStart = target.selectionEnd = start + 2;
        }, 0);
      }
    },
    [value, onChange],
  );

  const syncScroll = useCallback(() => {
    if (textareaRef.current && preRef.current) {
      preRef.current.scrollTop = textareaRef.current.scrollTop;
      preRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  }, []);

  const getLineNumbers = () => {
    const lines = value.split('\n');
    return lines.map((_, index) => index + 1).join('\n');
  };

  useEffect(() => {
    syncScroll();
  }, [value, syncScroll]);

  const themeClasses = {
    light: 'bg-white text-gray-900 border-gray-300',
    dark: 'bg-gray-900 text-gray-100 border-gray-600',
  };

  const editorClasses = cn(
    'relative border font-mono text-sm overflow-hidden',
    themeClasses[theme],
    className,
  );

  return (
    <div className={editorClasses} style={{ height }}>
      <div className="flex h-full">
        {showLineNumbers && (
          <div
            className={cn('flex-shrink-0 px-2 py-2 text-right select-none border-r font-mono', {
              'bg-gray-50 border-gray-200 text-gray-500': theme === 'light',
              'bg-gray-800 border-gray-700 text-gray-400': theme === 'dark',
            })}
          >
            <pre
              className="whitespace-pre text-xs leading-5"
              style={{ fontSize: `${fontSize - 2}px` }}
            >
              {getLineNumbers()}
            </pre>
          </div>
        )}

        <div className="relative flex-1 overflow-hidden">
          <pre
            ref={preRef}
            className={cn(
              'absolute inset-0 p-3 whitespace-pre-wrap font-mono pointer-events-none overflow-auto',
              {
                'text-gray-400': theme === 'light',
                'text-gray-500': theme === 'dark',
              },
            )}
            style={{ fontSize: `${fontSize}px`, lineHeight: '1.25' }}
          >
            {value || placeholder}
          </pre>

          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onScroll={syncScroll}
            readOnly={readOnly}
            placeholder=""
            spellCheck={false}
            className={cn(
              'absolute inset-0 p-3 resize-none border-0 outline-none bg-transparent font-mono whitespace-pre-wrap overflow-auto',
              {
                'cursor-default': readOnly,
                'cursor-text': !readOnly,
                'text-gray-900': theme === 'light',
                'text-gray-100': theme === 'dark',
              },
            )}
            style={{
              fontSize: `${fontSize}px`,
              lineHeight: '1.25',
              color: value ? 'inherit' : 'transparent',
            }}
          />
        </div>
      </div>

      <div
        className={cn('absolute top-2 right-2 px-2 py-1 text-xs font-mono border', {
          'bg-gray-100 text-gray-700 border-gray-200': theme === 'light',
          'bg-gray-800 text-gray-300 border-gray-700': theme === 'dark',
        })}
      >
        {language.toUpperCase()}
      </div>
    </div>
  );
}
