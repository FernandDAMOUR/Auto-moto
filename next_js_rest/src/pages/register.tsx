import axios from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import css from '../../styles/Home.module.css'
import { IUser, register } from '../services/Users/UsersService'

const Register: NextPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [age, setAge] = useState(0)
  const [address, setAddress] = useState('')
  const [role, setRole] = useState(false)
  const [permisObtenues, setPermisObtenues] = useState('')
  const router = useRouter()

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await fetch('http://localhost:4000/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password, age, address, role, permisObtenues })
    })

    await router.push('/formations')
  }

  console.log(submit)

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
        <div className={css.div_signup}>
          <h1 className={css.h1_signup}>Inscrivez-vous</h1>
          <form onSubmit={submit}>
            <div className={css.div_form_signup}>
              <div className={css.div_label_form}>
                <label className={css.label_form_up}>Nom :</label>
                <input className={css.input_form} type="text" required onChange={(e) => setName(e.target.value)} />
              </div>
              <div className={css.div_label_form}>
                <label className={css.label_form_up}>Email:</label>
                <input className={css.input_form} type="email" required onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className={css.div_label_form}>
                <label className={css.label_form_up}>Mot de passe:</label>
                <input
                  className={css.input_form}
                  type="password"
                  required
                  minLength={6}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className={css.div_label_form}>
                <label className={css.label_form_up}>Âge:</label>
                <input
                  className={css.input_form}
                  type="number"
                  required
                  min={16}
                  max={99}
                  onChange={(e) => setAge(e.target.valueAsNumber)}
                />
              </div>
              <div className={css.div_label_form}>
                <label className={css.label_form_up}>Adresse:</label>
                <input className={css.input_form} type="text" required onChange={(e) => setAddress(e.target.value)} />
              </div>
              <div className={css.div_label_form}>
                <label className={css.label_form_up}>Role:</label>
                <input className={css.input_form} type="boolean" required value="false" onChange={(e) => setRole} />
              </div>
              <div className={css.div_label_form}>
                <label className={css.label_form_up}>Permis Obtenu(s):</label>
                <div className={css.div_label_form}>
                  <div className={css.box_input_form}>
                    <input
                      type="text"
                      name="permisobtenu"
                      id="a2"
                      required
                      onChange={(e) => setPermisObtenues(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div>
                <button className={css.btn_signup} type="submit">
                  {' '}
                  S&apos;inscrire`{' '}
                </button>
              </div>
              <div className={css.div_connect}>
                <a href="/login" className={css.connect}>
                  {' '}
                  Vous avez déjà un compte? Connectez-vous !!!!!
                </a>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

export default Register
