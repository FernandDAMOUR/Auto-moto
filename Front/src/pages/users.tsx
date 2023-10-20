import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import css from '../../styles/Home.module.css'
import BoxUser from '../components/User'
import { getallUsers, IUser } from '../services/Users/UsersService'
import { Header } from '../components/Layout/Header'

const Users: NextPage = () => {
  const [data, setData] = useState<IUser[]>()

  useEffect(() => {
    getallUsers().then((data) => {
      console.log(data)
      setData(data)
    })
  }, [])

  return (
    <div className={css.container}>
      <Header
        isLoggedIn={true}
        onLogout={function (): void {
          localStorage.removeItem('token')
          window.location.href = '/'
        }}
      ></Header>
      <main className={css.main}>
        <div className={css.div_users}>
          <h1 className={css.title_user}>Tous les utilisateurs</h1>
          {/* Ajoutez une div parent pour activer le défilement horizontal */}

          <div className={`${css.box_users} ${css.momo}`} >
              {data &&
                data.map((user: IUser) => (
                  <div key={user._id} className={css.mosaic_item}>
                  <BoxUser
                    key={user._id}
                    id={user._id || ''}
                    name={user.name || ''}
                    email={user.email || ''}
                    age={user.age || 0}
                    address={user.address || ''}
                    perobt={user.permisObtenues || ''}
                    role={false}
                  />
                  </div>
                ))}
                </div>
        </div>
      </main>
    </div>
  )
}

export default Users
