import type { PortableTextComponentProps } from '@portabletext/react';
import { codeToHtml } from 'shiki';

async function highlight(code: string, language: string) {
  return codeToHtml(code, {
    lang: language,
    themes: {
      light: 'vitesse-light',
    },
    cssVariablePrefix: '--shiki-',
    defaultColor: false,
  });
}

export async function PortableTextCodeBlock(
  props: PortableTextComponentProps<{
    language: string
    code: string
    filename?: string
  }>,
) {
  const { value } = props;

  if (!value.language) {
    return (
      <code className='rounded-md bg-zinc-50 px-1.5 py-0.5 font-mono font-bold text-sky-700 before:hidden after:hidden dark:bg-zinc-800 dark:text-green-400'>
        {value.code}
      </code>
    );
  }

  const html = await highlight(value.code, value.language);
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
