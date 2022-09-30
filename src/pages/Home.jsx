import React from 'react'

import Categories from '../components/Categories/Categories'
import Sort from '../components/Sort/Sort'
import PizzaBlock from '../components/PizzaBlock/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import { useState, useEffect } from 'react'

const Home = () => {
	const [items, setItems] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	const [categoryId, setCategoryId] = useState(0)
	const [sortType, setSortType] = useState({
		name: 'популярности',
		sortProperty: 'rating',
		id: 0,
	})

	// useEffect используется для того, чтобы код внутри него выполнился только тогда, когда изменятся переменные во массиве зависимостей useEffect. Если не использовать useEffect, тогда будет происходить запрос на сервер, после этого в items с помощью setItems(arr) будет записываться массив с сервера, после этого useState поменяется и ОПЯТЬ вызовет компонент App и снова выполнится запрос на сервер, тем самым эти запросы будут бесконечны.
	useEffect(() => {
		setIsLoading(true)

		const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
		const sortBy = sortType.sortProperty.replace('-', '')
		const category = categoryId > 0 ? `category=${categoryId}` : ''

		// когда произойдет запрос
		fetch(
			`https://632a9f84713d41bc8e735d54.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`
		)
			//тогда (then) верни ответ в формате .json
			.then(res => {
				return res.json()
			})
			// после что-то происходит, нужно читать про фетч. Вроде он берет res и преобразует его в массив объектов
			.then(arr => {
				setItems(arr)
				setIsLoading(false)
			})
		window.scrollTo(0, 0)
	}, [categoryId, sortType])

	return (
		<>
			<div class='content__top'>
				<Categories
					value={categoryId}
					onClickCategory={index => setCategoryId(index)}
				/>
				<Sort value={sortType} onClickSort={index => setSortType(index)} />
			</div>
			<h2 class='content__title'>Все пиццы</h2>
			<div class='content__items'>
				{isLoading
					? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
					: items.map(obj => <PizzaBlock key={obj.id} {...obj} />)}
			</div>
		</>
	)
}

export default Home
