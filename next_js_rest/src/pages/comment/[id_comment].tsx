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
  // Convertir les valeurs en chaînes de caractères si elles sont des tableaux
const idCommentString = Array.isArray(id_comment) ? id_comment[0] : id_comment;
const ratingCommentString = Array.isArray(rating_comment) ? rating_comment[0] : rating_comment;
const contentCommentString = Array.isArray(content_comment) ? content_comment[0] : content_comment;
const formationIdCommentString = Array.isArray(formation_id_comment) ? formation_id_comment[0] : formation_id_comment;
const userIdCommentString = Array.isArray(user_id_comment) ? user_id_comment[0] : user_id_comment;


  return (
    <div className={css.container}>
      <Header isLoggedIn={false} onLogout={logout} />
      <main className={css.main}>
        {id_comment && (
          <BoxGetComment
          id={idCommentString || ''}
          rating={ratingCommentString}
          content={contentCommentString}
          formation_id={formationIdCommentString}
          user_id={userIdCommentString}
        />
        )}
      </main>
    </div>
  )
}

export default GetComment
