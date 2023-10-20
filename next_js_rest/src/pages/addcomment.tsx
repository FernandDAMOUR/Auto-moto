import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import css from '../../styles/Home.module.css'

const AddComment: NextPage = () => {
    const router = useRouter()
    const [content, setContent] = useState('')
    const [rating, setRating] = useState(0)
    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await fetch('http://localhost:4000/comment/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content,
                rating
            })
        })
        await router.push('/formations')
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
                                <label className={css.label_form_up}>Contenu du commentaire</label>
                                <input
                                    className={css.input_form}
                                    type="text"
                                    placeholder="Que vous voulez dire dans ce commentaire"
                                    minLength={10}
                                    onChange={(e) => setContent(e.target.value)}
                                />
                            </div>
                            <div className={css.div_label_form}>
                                <label className={css.label_form_up}>La note du commentaire sur 10</label>
                                <input
                                    className={css.input_form}
                                    type="number"
                                    name="price_formation"
                                    placeholder="0"
                                    min={0}
                                    max={10}
                                    onChange={(e) => setRating(e.target.valueAsNumber)}
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
export default AddComment
