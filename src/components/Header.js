import { useState, useEffect } from 'react'

// img
import logo from '../assets/claw.png'

//styles
import styles from './Header.module.css'

export default function Header({ handleSubmit }) {

  return (
    <header>
        <img className={styles.logo} src={logo} alt="Image of a claw" />
    </header>
  )
}