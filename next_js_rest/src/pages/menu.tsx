import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import css from '../../styles/Home.module.css'

const Menu: NextPage = () => {
  return (
    <div className={css.container}>
      <Head>
        <title> AUTO-MOTO</title>
        <link rel="icon" href="/AUTO-MOTO.ico" type="favicon" />
        <meta charSet="utf-8" />
      </Head>
      <header className={css.header}>
        <a href="/formations">
          <img className={css.logo_img} src="/AUTO-MOTO.ico" alt="" />
        </a>
        <a href="/menu">
          <h1 className={css.title_menu}>Menu</h1>
        </a>
        <div className={css.div_header_title}>
          <label className={css.header_title_auto}>AUTO</label>
          <label className={css.header_title__}>-</label>
          <label className={css.header_title_moto}>MOTO</label>
        </div>
      </header>
      <main className={css.main}>
        <div className={css.div_menu}>
          <a href="/formations">
            <button className={css.btn_menu}>Nos formations</button>
          </a>
          <a href="/users">
            <button className={css.btn_menu}>Tous les utilisateurs</button>
          </a>
          <a href="/addformation">
            <button className={css.btn_menu}>Ajouter une formation</button>
          </a>
        </div>
      </main>
    </div>
  )
}
export default Menu
