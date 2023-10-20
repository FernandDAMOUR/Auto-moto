import type { NextPage } from 'next'
import Head from 'next/head'

import { useRouter } from 'next/router'
import { SyntheticEvent, useState } from 'react'
import css from '../../styles/Home.module.css'
import { login } from '../services/Users/UsersService'
import { Header } from '../components/Layout/Header'
import { useAuth } from '../context/AuthProvider'
import Link from 'next/link'

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

  const { logout} = useAuth()

  return (
    <div className={css.container}>
     <Header isLoggedIn = {false} onLogout={logout}/>

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
                <Link href="/register" className={css.inscri}>
                  {'Vous n&apos;avez pas de compte? Inscrivez-vous !!!!! '}
                  
                </Link>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

export default Login
