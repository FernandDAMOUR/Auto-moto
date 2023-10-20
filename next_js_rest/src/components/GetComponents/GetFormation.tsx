import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import css from '../../../styles/Home.module.css'
import { deleteFormation, getFormation } from '../../services/Formations/FormationsService'
import BoxGetComment from './GetComment'

export interface IGetFormationProps {
  id: string | string[]
  title?: string | string[] | null
  description?: string | string[] | null
  price?: number | number[] | null
}
const BoxGetFormation = ({ id }: IGetFormationProps) => {
  const [showmodif, setShowmodif] = useState(false)
  function toggle() {
    setShowmodif(!showmodif)
  }

  const deleteF = async () => {
    await deleteFormation(id)
    window.location.href = '/formations'
    console.log(deleteFormation(id))
  }
  const [data, setData] = useState<IGetFormationProps>()
  useEffect(() => {
    getFormation(id).then((data) => {
      setData(data)
    })
  }, [id])

  const [comment, setComment] = useState('')
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await fetch('http://localhost:4000/formations/update/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorisation: `Bearer ${localStorage.getItem('token')}`
      },

      body: JSON.stringify({
        title,
        description,
        price
      })
    })
    await router.push('/formations')
  }
  return (
    <>
      {data && (
        <div className={css.div_getformation}>
          <h1 className={css.h1_getformation}>Toutes les informations sur la Formation:</h1>
          <div className={css.box_getformation}>
            <div className={css.box_getformation}>
              <label className={css.label_getformation}>Nom de la formation: </label>
              <label className={css.label_getformation}>{data.title} ✔️</label>
            </div>
            <div className={css.box_getformation}>
              <div className={css.label_getFormation}>Description</div>
              <label className={css.label_getformation}>{data.description}</label>
            </div>
            <div className={css.box_getformation}>
              <label className={css.label_getformation}>Prix:</label>
              <label className={css.label_getformation}> {data.price} €</label>
            </div>
          </div>
          <div className={css.div_btn}>
            <button className={css.btn_delete} onClick={deleteF}>
              {`Supprimer la formation`}
            </button>
            <button onClick={toggle} className={css.btn_toggle}>
              {`Modifier la formation`}
            </button>
          </div>
          <div className={css.div_modif} style={{ display: showmodif ? 'block' : 'none' }}>
            <form onSubmit={submit}>
              <div className={css.div_form_addformation}>
                <div className={css.div_label_form}>
                  <label className={css.label_form_up}>Titre de la formation</label>
                  <input
                    className={css.input_form}
                    type="text"
                    placeholder="Quel sera votre titre"
                    minLength={10}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className={css.div_label_form}>
                  <label className={css.label_form_up}>Description de la formation: </label>
                  <textarea
                    className={css.input_form}
                    placeholder="Ajouter une petite description"
                    minLength={10}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className={css.div_label_form}>
                  <label className={css.label_form_up}>Prix de la formation</label>
                  <input
                    className={css.input_form}
                    type="number"
                    name="price_formation"
                    placeholder="Ne soit pas trop cher non plus"
                    min={0}
                    onChange={(e) => setPrice(e.target.valueAsNumber)}
                  />
                </div>
                <div>
                  <button className={css.btn_addcomment} type="submit">
                    {'Modifier '}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
export default BoxGetFormation
