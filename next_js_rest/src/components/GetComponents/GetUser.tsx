import React, { useEffect, useState } from 'react'
import css from '../../../styles/Home.module.css'
import { deleteUser, getUser } from '../../services/Users/UsersService'

export interface IGetUserProps {
  id: string | string[]
  name?: string | string[]
  email?: string | string[]
  age?: string | string[]
  address?: string | string[]
  permisObtenues?: string | string[]
}

export const BoxGetUser = ({ id }: IGetUserProps) => {
  const [data, setData] = useState<IGetUserProps | null>(null)
  const [showModif, setShowModif] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const userData = await getUser(id)
        setData(userData)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [id])

  const handleDelete = async () => {
    try {
      await deleteUser(id)
      window.location.href = '/users' // This line will navigate to the '/users' page.
    } catch (error) {
      console.error(error)
    }
  }

  const handleToggle = () => {
    setShowModif(!showModif)
  }

  return (
    <div className={css.div_getuser}>
      {data && (
        <>
          <h1 className={css.h1_getuser}>Toutes les informations de l&apos;Utilisateur:</h1>
          {renderUserDataField('Nom:', data.name || '')}
          {renderUserDataField('Email:', data.email || '')}
          {renderUserDataField('Age:', data.age || '')}
          {renderUserDataField('Adresse:', data.address || '')}
          {renderUserDataField('Permis Obtenue:', data.permisObtenues || '')}
          <div className={css.div_btn}>
            <button className={css.btn_delete} onClick={handleDelete}>
              Supprimer l&aposutilisateur
            </button>
            <button onClick={handleToggle} className={css.btn_toggle}>
              Modifier l&aposutilisateur
            </button>
          </div>
          <div className={css.div_modif} style={{ display: showModif ? 'block' : 'none' }}></div>
        </>
      )}
    </div>
  )

  function renderUserDataField(label: string, value: string | string[] | number | null) {
    return (
      <div className={css.box_getuser}>
        <label className={css.label_getuser}>{label}</label>
        <label className={css.label_getuser}>{value}</label>
      </div>
    )
  }
}
