import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './components/Header/Header'
import Home from './pages/Home'
import Cart from './pages/Cart'
import NotFound from './pages/NotFound'
import NotFoundBlock from './components/NotFoundBlock/NotFoundBlock'

import './scss/app.scss'

function App() {
	return (
		<div className='App'>
			<div class='wrapper'>
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
			</div>
		</div>
	)
}

export default App
