import React from 'react'
import ContentLoader from 'react-content-loader'

const Skeleton = () => (
	<ContentLoader
		className='pizza-block'
		speed={2}
		width={280}
		height={460}
		viewBox='0 0 280 460'
		backgroundColor='#f3f3f3'
		foregroundColor='#ecebeb'
	>
		<rect x='0' y='385' rx='10' ry='10' width='90' height='27' />
		<rect x='130' y='375' rx='20' ry='20' width='150' height='45' />
		<circle cx='135' cy='110' r='110' />
		<rect x='0' y='235' rx='10' ry='10' width='280' height='27' />
		<rect x='0' y='275' rx='10' ry='10' width='280' height='88' />
	</ContentLoader>
)

export default Skeleton
