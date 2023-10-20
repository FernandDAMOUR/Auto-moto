import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import css from '../../styles/Home.module.css'
import { Header } from '../components/Layout/Header'
import { useAuth } from '../context/AuthProvider'

const Menu: NextPage = () => {
  const {logout}= useAuth()
  return (
    <div className={css.container}>
      <Header isLoggedIn={false } onLogout={logout}/>
      <main className={css.main}>
        <div className={css.div_menu}>
          <Link href="/formations">
            <button className={css.btn_menu}>Nos formations</button>
          </Link>
          <Link href="/users">
            <button className={css.btn_menu}>Tous les utilisateurs</button>
          </Link>
          <Link href="/addformation">
            <button className={css.btn_menu}>Ajouter une formation</button>
          </Link>
        </div>
      </main>
    </div>
  )
}
export default Menu
