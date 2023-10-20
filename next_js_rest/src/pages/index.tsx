import type { NextPage } from 'next'
import Head from 'next/head'
import css from '../../styles/Home.module.css'
import { Header } from '../components/Layout/Header'

const Home: NextPage = () => {
  return (
    <div className={css.container}>
      <Header
        isLoggedIn={false}
        onLogout={function (): void {
          throw new Error('Function not implemented.')
        }}
      />
      <main className={css.main}>
        <h1 className={css.text_home}>
          Bienvenue sur{' '}
          <div className={css.div_title}>
            <label className={css.title_auto}>AUTO</label>
            <label className={css.title__}>-</label>
            <label className={css.title_moto}>MOTO</label>
          </div>
        </h1>

        <div className={css.grid}>
          <a href="/register" className={css.card}>
            <h2>S&apos;incrire</h2>
            <p>Inscrivez-vous pour commencer votre formation de conduite</p>
          </a>
          <a href="/login" className={css.card}>
            <h2>Se connecter &rarr;</h2>
            <p>connectez-vous pour continuer votre formation de conduite</p>
          </a>
          <a href="/formations" className={css.card}>
            <h2>Nos Formations </h2>
            <p>Découvrez toutes nos formations </p>
          </a>
        </div>
      </main>
    </div>
  )
}

export default Home
