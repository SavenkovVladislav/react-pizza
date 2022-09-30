import React from 'react'

export default function Categories({ value, onClickCategory }) {
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
						className={value === category.id && 'active'}
						onClick={() => onClickCategory(category.id)}
						key={category.id}
					>
						{category.title}
					</li>
				))}
			</ul>
		</div>
	)
}
