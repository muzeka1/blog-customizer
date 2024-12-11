import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState, OptionsObject } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [options, setOptions] = useState<OptionsObject>({
		fontFamily: defaultArticleState.fontFamilyOption,
		fontSize: defaultArticleState.fontSizeOption,
		fontColor: defaultArticleState.fontColor,
		containerWidth: defaultArticleState.contentWidth,
		backgroundColor: defaultArticleState.backgroundColor,
	});

	function submitHandler(options: OptionsObject) {
		setOptions(options);
	}

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': options.fontFamily.value,
					'--font-size': options.fontSize.value,
					'--font-color': options.fontColor.value,
					'--container-width': options.containerWidth.value,
					'--bg-color': options.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm setDataHandler={submitHandler}></ArticleParamsForm>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
