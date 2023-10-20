import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import css from '../../../styles/GetUser.module.css'
import { BoxGetUser } from '../../components/GetComponents/GetUser'
import { Header } from '../../components/Layout/Header'

const GetUser: NextPage = () => {
  const router = useRouter()
  const { id_user } = router.query
  const { name_user } = router.query
  const { email_user } = router.query
  const { age_user } = router.query
  const { address_user } = router.query
  const { permisObtenues_user } = router.query

  return (
    <div className={css.container}>
      <Header
        isLoggedIn={false}
        onLogout={function (): void {
          throw new Error('Function not implemented.')
        }}
      />
      <main className={css.main}>
        {id_user && (
          <BoxGetUser
            id={id_user}
            name={name_user}
            email={email_user}
            age={age_user}
            address={address_user}
            permisObtenues={permisObtenues_user}
          />
        )}
      </main>
    </div>
  )
}
export default GetUser
