import React from 'react'
import { useState } from 'react'

export default function Categories() {
	const [activeIndex, setActiveIndex] = useState(0)

	const categories = [
		'Все',
		'Мясные',
		'Вегетарианская',
		'Гриль',
		'Острые',
		'Закрытые',
	]

	return (
		<div className='categories'>
			<ul>
				{categories.map((value, index) => (
					<li
						className={activeIndex === index ? 'active' : ''}
						onClick={() => setActiveIndex(index)}
						key={index}
					>
						{value}
					</li>
				))}
			</ul>
		</div>
	)
}
