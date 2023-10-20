import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import css from '../../../styles/Home.module.css'
import BoxGetFormation from '../../components/GetComponents/GetFormation'
import BoxGetComment from '../../components/GetComponents/GetComment'
import { Header } from '../../components/Layout/Header'
import { useAuth } from '../../context/AuthProvider'

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

  const { logout } = useAuth()


  const priceFormation = Array.isArray(price_formation) ? price_formation[0] : price_formation;

  return (
    <div className={css.container}>
      <Header isLoggedIn={false} onLogout={logout} />

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
            price={typeof priceFormation === 'string' ? parseFloat(priceFormation) : priceFormation || 0}
          />
        )}
      </main>
    </div>
  )
}
export default GetFormation
