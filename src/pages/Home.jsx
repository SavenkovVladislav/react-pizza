import axios from 'axios'

import { useState, useEffect, useContext } from 'react'
import { useSelector } from 'react-redux'

import { SearchContext } from '../App'

import Categories from '../components/Categories/Categories'
import Sort from '../components/Sort/Sort'
import PizzaBlock from '../components/PizzaBlock/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Pagination from '../components/Pagination/Pagination'

const Home = () => {
	const { categoryId, sort } = useSelector(state => state.filterSlice)

	const { searchValue } = useContext(SearchContext)

	const [items, setItems] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [currentPage, setCurrentPage] = useState(1)

	// useEffect используется для того, чтобы код внутри него выполнился только тогда, когда изменятся переменные во массиве зависимостей useEffect. Если не использовать useEffect, тогда будет происходить запрос на сервер, после этого в items с помощью setItems(arr) будет записываться массив с сервера, после этого useState поменяется и ОПЯТЬ вызовет компонент App и снова выполнится запрос на сервер, тем самым эти запросы будут бесконечны.
	useEffect(() => {
		setIsLoading(true)

		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
		const sortBy = sort.sortProperty.replace('-', '')
		const category = categoryId > 0 ? `category=${categoryId}` : ''
		const search = searchValue ? `&search=${searchValue}` : ''

		axios
			.get(
				`https://632a9f84713d41bc8e735d54.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
			)
			.then(res => {
				setItems(res.data)
				setIsLoading(false)
			})

		window.scrollTo(0, 0)
	}, [categoryId, sort, searchValue, currentPage])

	const pizzas = items.map(obj => <PizzaBlock key={obj.id} {...obj} />)

	const skeletons = [...new Array(4)].map((_, index) => (
		<Skeleton key={index} />
	))

	return (
		<>
			<div class='content__top'>
				<Categories />
				<Sort />
			</div>
			<h2 class='content__title'>Все пиццы</h2>
			<div class='content__items'>{isLoading ? skeletons : pizzas}</div>
			<Pagination onChangePage={number => setCurrentPage(number)} />
		</>
	)
}

export default Home
