import React, { useEffect, useState } from 'react'
import css from '../../../styles/Home.module.css'
import { deleteComment, getComment } from '../../services/Comments/CommentsServices'
import { useRouter } from 'next/router'

export interface IGetCommentProps {
  id: string
  content?: string | string[]
  rating?: number | number[] | string | string[]
  user_id?: string | string[]
  formation_id?: string | string[]
}

export const BoxGetComment = ({ id }: IGetCommentProps) => {
  const [showmodif, setShowmodif] = useState(false)
  function toggle() {
    setShowmodif(!showmodif)
  }
  const deleteC = async () => {
    await deleteComment(id)
    window.location.href = '/formations'
    console.log(deleteComment(id))
  }
  const [data, setData] = useState<IGetCommentProps>()
  useEffect(() => {
    getComment(id).then((data) => {
      setData(data)
      // console.log(data);
    })
  }, [id])
  const router = useRouter()
  const [content, setContent] = useState('')
  const [rating, setRating] = useState(0)
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await fetch('http://localhost:4000/comment/update' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content,
        rating
      })
    })
    await router.push('/formations')
  }
  return (
    <>
      {data && (
        <div className={css.div_getcomment}>
          <h1 className={css.h1_getcomment}>Tous commentaire de cette formation</h1>
          <div className={css.box_getcomment}>
            <div className={css.box_getcomment}>
              <div className={css.label_getcomment}>Note</div>
              <p className={css.label_getcomment}>{data.rating} /10</p>
            </div>

            <div className={css.box_getcomment}>
              <div className={css.getComment}>Commentaire</div>

              <label className={css.label_getcomment}>{data.content}</label>
            </div>
            <div className={css.box_getcomment}>
              <span className={css.label}>Auteur:</span>
              <label className={css.label_getcomment}> {data.user_id}</label>
            </div>
          </div>
          <div className={css.div_btn}>
            <button className={css.btn_delete} onClick={deleteC}>
              Supprimer l&lsquoutilisateur
            </button>
            <button onClick={toggle} className={css.btn_toggle}>
              Modifier l&lsquoutilisateur
            </button>
          </div>
          <div className={css.div_modif} style={{ display: showmodif ? 'block' : 'none' }}>
            <form onSubmit={submit}>
              <div className={css.div_form_addformation}>
                <div className={css.div_label_form}>
                  <label className={css.label_form_up}>Contenu du commentaire</label>
                  <input
                    className={css.input_form}
                    type="text"
                    placeholder="Que vous voulez dire dans ce commentaire"
                    minLength={10}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
                <div className={css.div_label_form}>
                  <label className={css.label_form_up}>La note du commentaire sur 10</label>
                  <input
                    className={css.input_form}
                    type="number"
                    name="price_formation"
                    placeholder="0"
                    min={0}
                    max={10}
                    onChange={(e) => setRating(e.target.valueAsNumber)}
                  />
                </div>
                <div>
                  <button className={css.btn_addcomment} type="submit">
                    {''} Modifier{''}
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
export default BoxGetComment
