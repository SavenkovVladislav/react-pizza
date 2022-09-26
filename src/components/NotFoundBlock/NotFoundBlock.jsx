import React from 'react'
import { Link } from 'react-router-dom'

import styles from './NotFoundBlock.module.scss'

const NotFoundBlock = () => {
	return (
		<>
			<h1 className={styles.root}>Страница не найдена</h1>

			<Link className={styles.button} to='/'>
				<button className='button'>На главную</button>
			</Link>
		</>
	)
}

export default NotFoundBlock
