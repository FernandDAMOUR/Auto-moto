import type { NextPage } from 'next'
import Head from 'next/head'

import { useRouter } from 'next/router'
import { SyntheticEvent, useState } from 'react'
import css from '../../styles/Home.module.css'
import { login } from '../services/Users/UsersService'

const Login: NextPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()

    try {
      const user = await login(email, password)

      console.log('Utilisateur connecté:', user)
      await router.push('/formations')
    } catch (error) {
      console.error('Erreur de connexion:', error)
      await router.push('/')
    }
  }

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
        <div className={css.div_header_title}>
          <label className={css.header_title_auto}>AUTO</label>
          <label className={css.header_title__}>-</label>
          <label className={css.header_title_moto}>MOTO</label>
        </div>
        <div className={css.div_header_login}>
          <a href="/login">
            <label className={css.login_label}>Login</label>
          </a>
        </div>
        <div className={css.div_header_register}>
          <a href="/register">
            <label className={css.register_label}>Register</label>
          </a>
        </div>
      </header>

      <main className={css.main}>
        <div className={css.div_signin}>
          <h1 className={css.h1_signin}>Connectez-vous</h1>
          <form onSubmit={handleSubmit}>
            <div className={css.div_form_signin}>
              <div className={css.div_label_form}>
                <label className={css.label_form_in}>Email:</label>
                <input
                  className={css.input_form}
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </div>
              <div className={css.div_label_form}>
                <label className={css.label_form_in}>Mot de passe:</label>
                <input className={css.input_form} type="password" onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div>
                <button className={css.btn_signin} type="submit">
                  {' '}
                  Se Connecter
                </button>
              </div>
              <div className={css.div_inscri}>
                <a href="/register" className={css.inscri}>
                  {' '}
                  Vous n&apos;avez pas de compte? Inscrivez-vous !!!!!
                </a>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

export default Login
