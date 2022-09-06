import logo from './logo.svg'
import './scss/app.scss'

import Header from './components/Header/Header'
import Categories from './components/Categories/Categories'
import Sort from './components/Sort/Sort'
import PizzaBlock from './components/PizzaBlock/PizzaBlock'

import pizzas from './assets/pizzas.json'

function App() {
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
							{pizzas.map(obj => (
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
