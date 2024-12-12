import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { SyntheticEvent, useState } from 'react';
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
	setData: (options: OptionsObject) => void;
};

export const ArticleParamsForm = ({ setData }: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [options, setOptions] = useState<OptionsObject>(defaultArticleState);

	function openHandler() {
		setIsOpen((prev) => !prev);
	}

	function submitHandler(e: SyntheticEvent) {
		e.preventDefault();
		setData(options);
		setIsOpen(false);
	}

	function resetHandler() {
		setOptions(defaultArticleState);
		setData(defaultArticleState);
		setIsOpen(false);
	}

	function updateOptionsState(key: string, value: OptionType) {
		setOptions((prev) => ({ ...prev, [key]: value }));
	}

	function changeFontFamily(selected: OptionType) {
		updateOptionsState('fontFamilyOption', selected);
	}

	function changeFontSize(selected: OptionType) {
		updateOptionsState('fontSizeOption', selected);
	}

	function changeFontColor(selected: OptionType) {
		updateOptionsState('fontColor', selected);
	}

	function changeBackgroundColor(selected: OptionType) {
		updateOptionsState('backgroundColor', selected);
	}

	function changeContentWidth(selected: OptionType) {
		updateOptionsState('contentWidth', selected);
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
				<form
					className={styles.form}
					onSubmit={submitHandler}
					onReset={resetHandler}>
					<Select
						title='шрифт'
						selected={options.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={changeFontFamily}></Select>
					<Spacing></Spacing>
					<RadioGroup
						options={fontSizeOptions}
						selected={options.fontSizeOption}
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
						selected={options.contentWidth}
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
