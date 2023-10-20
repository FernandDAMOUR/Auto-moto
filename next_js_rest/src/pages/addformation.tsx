import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import css from '../../styles/Home.module.css'
import { createFormation } from '../services/Formations/FormationsService'

const AddFormation: NextPage = () => {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  // const submit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   await fetch('http://localhost:4000/formations/create', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${localStorage.getItem('token')}`,
  //       'Access-Control-Allow-Origin': '*'
  //     },

  //     body: JSON.stringify({
  //       title,
  //       description,
  //       price
  //     })
  //   })

  //   console.log('body', title, description, price)
  //   await router.push('/formations')
  // }
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = {
      title,
      description,
      price
    }

    console.log('body', form)
    try {
      // Utilisez la fonction createFormation pour créer la formation
      const newFormation = await createFormation(form)
      console.log('Formation créée', newFormation)
      await router.push('/formations')
    } catch (error) {
      console.error('Erreur lors de la création de la formation', error)
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
        <Link href="/formations">
          <img className={css.logo_img} src="/AUTO-MOTO.ico" alt="" />
        </Link>
        <Link href="/menu">
          <h1 className={css.title_menu}>Menu</h1>
        </Link>
        <div className={css.div_header_title}>
          <label className={css.header_title_auto}>AUTO</label>
          <label className={css.header_title__}>-</label>
          <label className={css.header_title_moto}>MOTO</label>
        </div>
      </header>
      <main className={css.main}>
        <div className={css.div_addformation}>
          <h1 className={css.h1_addformation}>Ajouter une formation</h1>
          <form onSubmit={submit}>
            <div className={css.div_form_addformation}>
              <div className={css.div_label_form}>
                <label className={css.label_form_up}>Titre de la formation</label>
                <input
                  className={css.input_form}
                  type="text"
                  name="title"
                  placeholder="Quel sera votre titre"
                  minLength={10}
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </div>
              <div className={css.div_label_form}>
                <label className={css.label_form_up}>Description de la formation: </label>
                <textarea
                  className={css.input_form}
                  name="description"
                  placeholder="Ajouter une petite description"
                  minLength={10}
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
              </div>
              <div className={css.div_label_form}>
                <label className={css.label_form_up}>Prix de la formation</label>
                <input
                  className={css.input_form}
                  type="number"
                  name="price"
                  placeholder="Ne soit pas trop cher non plus"
                  min={0}
                  onChange={(e) => setPrice(e.target.valueAsNumber)}
                  value={price}
                />
              </div>
              <div>
                <button className={css.btn_addformation} type="submit">
                  {''} Ajouter{''}
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
export default AddFormation
