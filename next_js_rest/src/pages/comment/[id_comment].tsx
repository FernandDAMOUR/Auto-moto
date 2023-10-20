import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import css from '../../../styles/Home.module.css'
import BoxGetComment from '../../components/GetComponents/GetComment'
import { BoxGetUser } from '../../components/GetComponents/GetUser'
import { Header } from '../../components/Layout/Header'

export const GetComment: NextPage = () => {
  const router = useRouter()
  const { id_comment } = router.query
  const { rating_comment } = router.query
  const { content_comment } = router.query
  const { formation_id_comment } = router.query
  const { user_id_comment } = router.query

  return (
    <div className={css.container}>
      <Header
        isLoggedIn={false}
        onLogout={function (): void {
          throw new Error('Function not implemented.')
        }}
      />
      <main className={css.main}>
        {id_comment && (
          <BoxGetComment
            id={id_comment}
            rating={rating_comment}
            content={content_comment}
            formation_id={formation_id_comment}
            user_id={user_id_comment}
          />
        )}
      </main>
    </div>
  )
}
