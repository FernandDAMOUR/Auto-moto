import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import css from '../../../styles/Home.module.css'
import BoxGetFormation from '../../components/GetComponents/GetFormation'
import BoxGetComment from '../../components/GetComponents/GetComment'

const GetFormation: NextPage = () => {
  const router = useRouter()
  const { id_formation } = router.query
  const { title_formation } = router.query
  const { description_formation } = router.query
  const { price_formation } = router.query
  const { user_id_comment } = router.query
  const { content_comment } = router.query
  const { rating_comment } = router.query
  const { id_comment } = router.query

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
        {id_comment && (
          <BoxGetComment
            id={id_comment as string}
            rating={rating_comment}
            content={content_comment}
            user_id={user_id_comment}
            formation_id={id_formation}
          />
        )}
        {id_formation && (
          <BoxGetFormation
            id={id_formation}
            title={title_formation}
            description={description_formation}
            price={price_formation}
          />
        )}
      </main>
    </div>
  )
}
export default GetFormation
