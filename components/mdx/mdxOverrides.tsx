import type { MarkdownToJSX } from 'markdown-to-jsx';
import Code from 'components/Article/Code';
import dynamic from 'next/dynamic';

const NeteaseMusic = dynamic(() => import('components/Article/NeteaseMusic'), {
	ssr: false,
});

const Bilibili = dynamic(() => import('components/Article/Bilibili'), {
	ssr: false,
});

const overrides: MarkdownToJSX.Overrides | undefined = {
	Bilibili: {
		component: Bilibili,
		props: {},
	},
	NeteaseMusic: {
		component: NeteaseMusic,
		props: {},
	},
	h1: {
		props: {
			className: 'text-3xl text-black !mt-8 font-bold',
		},
	},
	h2: {
		props: {
			className: 'text-2xl text-black !mt-8 font-bold',
		},
	},
	h3: {
		props: {
			className: 'text-xl text-black !mt-8 font-bold',
		},
	},
	h4: {
		props: {
			className: 'text-lg text-black !mt-8 font-bold',
		},
	},
	h5: {
		props: {
			className: 'text-base font-bold text-black !mt-8 font-bold',
		},
	},
	h6: {
		props: {
			className: 'text-sm font-bold text-black !mt-8 font-bold',
		},
	},
	p: {
		props: {
			className: 'text-base leading-7',
		},
	},
	a: {
		props: {
			target: '_blank',
			rel: 'noreferrer',
			className:
				'relative after:block after:absolute mx-0.5 px-0.5 after:block after:h-1/4 after:w-full after:-z-10 after:bottom-0 after:left-0 after:bg-gray-300',
		},
	},
	ul: {
		props: {
			className: 'space-y-1.5 pl-4 list-disc',
		},
	},
	ol: {
		props: {
			className: 'space-y-1.5 pl-4 list-decimal',
		},
	},
	li: {
		props: {
			className: 'text-sm  list-inside',
		},
	},
	img: {
		props: {
			className: 'rounded-md shadow-lg my-4',
		},
	},
	blockquote: {
		props: {
			className: 'border-l-4 border-gray-900 pl-4 space-y-2 bg-gray-100 py-2',
		},
	},
	code: {
		component: Code,
		props: {},
	},
};

export default overrides;
