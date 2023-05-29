import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './components/Header/Header'
import Home from './pages/Home'
import Cart from './pages/Cart'
import NotFound from './pages/NotFound'
import NotFoundBlock from './components/NotFoundBlock/NotFoundBlock'

import { useState } from 'react'

import './scss/app.scss'

export const SearchContext = React.createContext()

function App() {
	const [searchValue, setSearchValue] = useState('')
	return (
		<div className='App'>
			<div class='wrapper'>
				<SearchContext.Provider value={{ searchValue, setSearchValue }}>
					<Header />
					<div class='content'>
						<div class='container'>
							<Routes>
								<Route path='/' element={<Home />} />
								<Route path='/cart' element={<Cart />} />
								<Route path='*' element={<NotFound />} />
							</Routes>
						</div>
					</div>
				</SearchContext.Provider>
			</div>
		</div>
	)
}

export default App
