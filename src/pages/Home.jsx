import React from 'react'

import Categories from '../components/Categories/Categories'
import Sort from '../components/Sort/Sort'
import PizzaBlock from '../components/PizzaBlock/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import { useState, useEffect } from 'react'

const Home = () => {
	const [items, setItems] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	// useEffect используется для того, чтобы код внутри него выполнился только раз (при монтировании компонента App). Если не использовать useEffect, тогда будет происходить запрос на сервер, после этого в items с помощью setItems(arr) будет записываться массив с сервера, после этого useState поменяется и ОПЯТЬ вызовет компонент App и снова выполнится запрос на сервер, тем самым эти запросы будут бесконечны.
	useEffect(() => {
		// когда произойдет запрос
		fetch('https://632a9f84713d41bc8e735d54.mockapi.io/items')
			//тогда (then) верни ответ в формате .json
			.then(res => res.json())
			// после что-то происходит, нужно читать про фетч. Вроде он берет res и преобразует его в массив объектов
			.then(arr => {
				setItems(arr)
				setIsLoading(false)
			})
	}, [])

	return (
		<>
			<div class='content__top'>
				<Categories />
				<Sort />
			</div>
			<h2 class='content__title'>Все пиццы</h2>
			<div class='content__items'>
				{isLoading
					? [...new Array(6)].map((item, index) => <Skeleton key={index} />)
					: items.map(obj => <PizzaBlock key={obj.id} {...obj} />)}
			</div>
		</>
	)
}

export default Home
