import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import css from '../../../styles/Home.module.css'
import BoxGetComment from '../../components/GetComponents/GetComment'
import { Header } from '../../components/Layout/Header'
import { useAuth } from '../../context/AuthProvider'

export const GetComment: NextPage = () => {
  const router = useRouter()
  const { id_comment } = router.query
  const { rating_comment } = router.query
  const { content_comment } = router.query
  const { formation_id_comment } = router.query
  const { user_id_comment } = router.query

  const { logout } = useAuth()

  return (
    <div className={css.container}>
      <Header isLoggedIn={false} onLogout={logout} />
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

export default GetComment
