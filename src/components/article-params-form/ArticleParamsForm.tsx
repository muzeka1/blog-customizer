import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { SyntheticEvent, useState, useCallback } from 'react';
import clsx from 'clsx';
import { Separator } from 'src/ui/separator';
import { Select } from 'src/ui/select';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType,
	defaultArticleState,
	OptionsObject,
} from 'src/constants/articleProps';
import { Spacing } from 'src/ui/spacing/Spacing';
import { RadioGroup } from 'src/ui/radio-group';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	setDataHandler: (options: OptionsObject) => void;
};

export const ArticleParamsForm = ({
	setDataHandler,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [options, setOptions] = useState<OptionsObject>({
		fontFamily: defaultArticleState.fontFamilyOption,
		fontSize: defaultArticleState.fontSizeOption,
		fontColor: defaultArticleState.fontColor,
		containerWidth: defaultArticleState.contentWidth,
		backgroundColor: defaultArticleState.backgroundColor,
	});

	function openHandler() {
		setIsOpen((prev) => !prev);
	}

	function submitHandler(e: SyntheticEvent) {
		e.preventDefault();
		setIsOpen(false);
		setDataHandler(options);
	}

	function updateOptionsState(key: string, value: OptionType) {
		setOptions((prev) => ({ ...prev, [key]: value }));
	}

	function changeFontFamily(selected: OptionType) {
		updateOptionsState('fontFamily', selected);
	}

	function changeFontSize(selected: OptionType) {
		updateOptionsState('fontSize', selected);
	}

	function changeFontColor(selected: OptionType) {
		updateOptionsState('fontColor', selected);
	}

	function changeBackgroundColor(selected: OptionType) {
		updateOptionsState('backgroundColor', selected);
	}

	function changeContentWidth(selected: OptionType) {
		updateOptionsState('containerWidth', selected);
	}

	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					openHandler();
				}}
			/>
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onSubmit={submitHandler}>
					<Select
						title='шрифт'
						selected={options.fontFamily}
						options={fontFamilyOptions}
						onChange={changeFontFamily}></Select>
					<Spacing></Spacing>
					<RadioGroup
						options={fontSizeOptions}
						selected={options.fontSize}
						title='размер шрифта'
						name='font-size'
						onChange={changeFontSize}></RadioGroup>
					<Spacing></Spacing>
					<Select
						title='цвет шрифта'
						selected={options.fontColor}
						options={fontColors}
						onChange={changeFontColor}></Select>
					<Spacing></Spacing>
					<Separator></Separator>
					<Spacing></Spacing>
					<Select
						title='цвет фона'
						selected={options.backgroundColor}
						options={backgroundColors}
						onChange={changeBackgroundColor}></Select>
					<Spacing></Spacing>
					<Select
						title='ширина контента'
						selected={options.containerWidth}
						options={contentWidthArr}
						onChange={changeContentWidth}></Select>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
