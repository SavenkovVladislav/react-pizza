import React, { useContext, useRef, useCallback, useState } from 'react'
import debounce from 'lodash.debounce'
import { SearchContext } from '../../App'

import styles from './Search.module.scss'

const Search = () => {
	// зачем нужен этот костыль в виде локального стейта для инпута, объясняю в комментариях ниже
	const [localSearchValue, setLocalSearchValue] = useState('')
	const { setSearchValue } = useContext(SearchContext)
	const inputRef = useRef()

	const onCLickClear = () => {
		setSearchValue('')
		setLocalSearchValue('')
		inputRef.current.focus()
	}

	const updsateSearchValue = useCallback(
		debounce(str => {
			console.log(str)
			setSearchValue(str)
		}, 500),
		[]
	)

	// изначально код функции, которая пропихивалась в onChange инпута был следующий, а в value инпута было пропихнуто значение searchValue.
	// в чем его проблема?
	// когда в инпут что-то вводилось, то в нем ничего не появлялось. Это происходит из-за того, что значение value инпута было привязано к стейту searchValue, а изменяется этот searchValue только тогда, когда мы меняем его с помощью setSearchValue в который пропихиваем event.target.value, которое является ПУСТЫМ, потому что оно зависет от searchValue.
	// const onChangeInput = useCallback(
	// 	debounce(event => {
	// 		console.log(event)
	// 		setSearchValue(event.target.value)
	// 	}, 500),
	// 	[]
	// )

	// Решение следующее: создается локальный стейт localSearchValue, которое изменяется с помощью setLocalSearchValue. В value инпута записывается значение localSearchValue, которое изменяется при каждом изменении инпута, то есть в event.target.value у нас постоянно что-то есть, если мы что-то ввели. Далее этот event.target.value просто передаем в функцию updsateSearchValue, которая изменяет глобальный стейт с помощью setSearchValue(str)
	const onChangeInput = event => {
		setLocalSearchValue(event.target.value)
		updsateSearchValue(event.target.value)
	}

	return (
		<div className={styles.root}>
			<svg
				className={styles.searchIcon}
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 32 32'
			>
				<title />
				<g id='search'>
					<path d='M29.71,28.29l-6.5-6.5-.07,0a12,12,0,1,0-1.39,1.39s0,.05,0,.07l6.5,6.5a1,1,0,0,0,1.42,0A1,1,0,0,0,29.71,28.29ZM14,24A10,10,0,1,1,24,14,10,10,0,0,1,14,24Z' />
				</g>
			</svg>
			<input
				ref={inputRef}
				value={localSearchValue}
				onChange={onChangeInput}
				className={styles.input}
				placeholder='Поиск'
			/>
			{localSearchValue && (
				<svg
					className={styles.closeIcon}
					onClick={onCLickClear}
					xmlns='http://www.w3.org/2000/svg'
					height='48'
					viewBox='0 0 48 48'
					width='48'
				>
					<path d='M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z' />
					<path d='M0 0h48v48h-48z' fill='none' />
				</svg>
			)}
		</div>
	)
}

export default Search
