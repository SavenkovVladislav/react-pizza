import './scss/app.scss'

import Header from './components/Header/Header'
import Categories from './components/Categories/Categories'
import Sort from './components/Sort/Sort'
import PizzaBlock from './components/PizzaBlock/PizzaBlock'
import { useState, useEffect } from 'react'

function App() {
	const [items, setItems] = useState([])

	// useEffect используется для того, чтобы код внутри него выполнился только раз (при монтировании компонента App). Если не использовать useEffect, тогда будет происходить запрос на сервер, после этого в items с помощью setItems(arr) будет записываться массив с сервера, после этого useState поменяется и ОПЯТЬ вызовет компонент App и снова выполнится запрос на сервер, тем самым эти запросы будут бесконечны.
	useEffect(() => {
		// когда произойдет запрос
		fetch('https://632a9f84713d41bc8e735d54.mockapi.io/items')
			//тогда (then) верни ответ в формате .json
			.then(res => {
				res.json()
			})
			// после что-то происходит, нужно читать про фетч. Вроде он берет res и преобразует его в массив объектов
			.then(arr => {
				setItems(arr)
			})
	}, [])

	return (
		<div className='App'>
			<div class='wrapper'>
				<Header />
				<div class='content'>
					<div class='container'>
						<div class='content__top'>
							<Categories />
							<Sort />
						</div>
						<h2 class='content__title'>Все пиццы</h2>
						<div class='content__items'>
							{items.map(obj => (
								<PizzaBlock
									// title={obj.title}
									// price={obj.price}
									// imageUrl={obj.imageUrl}
									// sizes={obj.sizes}
									// types={obj.types}
									{...obj} // это называется spread-оператор и он эквивалентен всему тому, что написано выше. То есть он берет все ключи из объекта obj и передает их в пропсы нашего компонента <PizzaBlock/>. Работает это при условии того, что наши пропсы(title,price,imageUrl etc.) названы так же, как и ключи в объекте obj
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default App
