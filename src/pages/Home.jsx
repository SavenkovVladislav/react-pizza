import React from 'react'

import Categories from '../components/Categories/Categories'
import Sort from '../components/Sort/Sort'
import PizzaBlock from '../components/PizzaBlock/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import { useState, useEffect } from 'react'

const Home = ({ searchValue }) => {
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

	// в переменную pizzas записывается массив items, который тянется с бэка.
	// 1) фильтруется массив items с помощью метода filter(). Каждый объект массива items с ключем title переводится в нижний регистр. После, с помощью метода includes() проверяется есть ли в этом title значение searchValue, которое тоже переводится в нижний регистр. Таким образом массив items фильтруется и преобразуется в массив в котором есть только те объекты, в которых ключ title соответствует значению searchValue, которое перезаписывается в компоненте Search.tsx
	// 2) получившийся массив items мапится
	// все это нужно для того, чтобы пиццы фитровались в зависимости от того, что юзер пишет в инпуте. Этот вариант подходит только для статичных массивов
	const pizzas = items
		.filter(obj => {
			if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
				return true
			}
			return false
		})
		.map(obj => <PizzaBlock key={obj.id} {...obj} />)

	const skeletons = [...new Array(6)].map((_, index) => (
		<Skeleton key={index} />
	))

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
			<div class='content__items'>{isLoading ? skeletons : pizzas}</div>
		</>
	)
}

export default Home
