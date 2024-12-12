import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';
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
import { RadioGroup } from 'src/ui/radio-group';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	setData: (options: OptionsObject) => void;
};

export const ArticleParamsForm = ({ setData }: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [options, setOptions] = useState<OptionsObject>(defaultArticleState);
	const container = useRef<HTMLElement | null>(null);

	useEffect(() => {
		let isInitial = true;
		const handleClose = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			if (isInitial) {
				isInitial = !isInitial;
				return;
			}
			if (
				!(
					container.current?.contains(target) || target.closest('[data-testid]')
				)
			) {
				setIsOpen(false);
			}
		};
		if (isOpen) {
			document.addEventListener('click', handleClose);
		}

		return () => {
			document.removeEventListener('click', handleClose);
		};
	}, [isOpen]);

	function openHandler() {
		setIsOpen(true);
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
				ref={container}
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
					<RadioGroup
						options={fontSizeOptions}
						selected={options.fontSizeOption}
						title='размер шрифта'
						name='font-size'
						onChange={changeFontSize}></RadioGroup>
					<Select
						title='цвет шрифта'
						selected={options.fontColor}
						options={fontColors}
						onChange={changeFontColor}></Select>
					<Separator></Separator>
					<Select
						title='цвет фона'
						selected={options.backgroundColor}
						options={backgroundColors}
						onChange={changeBackgroundColor}></Select>
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
