import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { setCategoryId } from '../../redux/slices/filterSlice'

export default function Categories() {
	const categoryId = useSelector(state => state.filterSlice.categoryId)
	const dispatch = useDispatch()

	const categories = [
		{ title: 'Все', id: 0 },
		{ title: 'Мясные', id: 1 },
		{ title: 'Вегетарианская', id: 2 },
		{ title: 'Гриль', id: 3 },
		{ title: 'Острые', id: 4 },
		{ title: 'Закрытые', id: 5 },
	]

	return (
		<div className='categories'>
			<ul>
				{categories.map(category => (
					<li
						className={categoryId === category.id && 'active'}
						onClick={() => dispatch(setCategoryId(category.id))}
						key={category.id}
					>
						{category.title}
					</li>
				))}
			</ul>
		</div>
	)
}
