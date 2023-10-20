// /* eslint-disable @next/next/no-document-import-in-page */
// import { NextPage } from 'next'
// import { Head } from 'next/document'
// import css from '@styles/Home.module.css'

// export const Header: NextPage = (props: any) => {
//   return (
//     <>
//       <div>
//         <Head>
//           <title> AUTO-MOTO</title>
//           <link rel="icon" href="/AUTO-MOTO.ico" type="favicon" />
//           <meta charSet="utf-8" />
//         </Head>
//         <header className={css.header}>
//           <a href="/formations">
//             <img className={css.logo_img} src="/AUTO-MOTO.ico" alt="" />
//           </a>
//           <div className={css.div_header_title}>
//             <label className={css.header_title_auto}>AUTO</label>
//             <label className={css.header_title__}>-</label>
//             <label className={css.header_title_moto}>MOTO</label>
//           </div>

//           <div className={css.div_header}>
//             <a href="/signin">LOGIN</a>
//             <a href="/signup">REGISTER</a>
//           </div>
//         </header>
//       </div>
//     </>
//   )
// }

import React from 'react'
import { useState, useEffect } from 'react'
import css from '../../../styles/Header.module.css' // Assurez-vous d'importer vos styles CSS appropriés
import router from 'next/router'
import { useAuth } from '../../context/AuthProvider'

interface HeaderProps {
  isLoggedIn: boolean
  onLogout: () => void
}

export const Header: React.FC<HeaderProps> = () => {
  const [searchQuery, setSearchQuery] = useState<string>('') // État pour la barre de recherche
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)

  const goToLogin = () => {
    router.push('/login')
  }
  const handleLogOut = () => {
    logout()
    setIsLoggedIn(false)
  }

  const { token, login, userName, logout } = useAuth()

  const [isLoggedIn, setIsLoggedIn] = useState(token !== null)

  useEffect(() => {
    setIsLoggedIn(token !== null)
  }, [token])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Faites quelque chose avec la valeur de recherche (searchQuery)
    console.log('Recherche soumise :', searchQuery)
  }

  // Fonction pour basculer l'état du menu déroulant
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  // Contenu du menu déroulant
  const dropdownContent = isDropdownOpen && (
    <div className={css.dropdownContent}>
      <a href="/formations">Nos formations</a>
      <a href="/users">Tous les utilisateurs</a>
      <a href="/addformation">Ajouter une formation</a>
    </div>
  )

  const dropdownClass = isDropdownOpen ? `${css.dropdownAppear} ${css.dropdownOpen}` : css.dropdownAppear

  return (
    <header className={css.header}>
      <div className={css.logo}>
        <span className={css.siteName}>AUTO-MOTO</span>
      </div>
      <div className={css.search}>
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={css.inputField}
          />
          <button type="submit">Rechercher</button>
        </form>
      </div>
      <div className={css.dropdown}>
        <button onClick={toggleDropdown}>Menu</button>
        <div className={dropdownClass}>
          <a href="/formations">Nos formations</a>
          <a href="/users">Tous les utilisateurs</a>
          <a href="/addformation">Ajouter une formation</a>
        </div>{' '}
      </div>
      {isLoggedIn ? (
        <div className={css.login}>
          <p>Bienvenue, {userName} !</p>
          <button onClick={handleLogOut}>Déconnexion</button>
        </div>
      ) : (
        <>
          <div className={css.login}>
            <button onClick={goToLogin}>Connexion</button>
          </div>
          <div className={css.register}>
            <button onClick={goToLogin}>Inscription</button>
          </div>
        </>
      )}
    </header>
  )
}
