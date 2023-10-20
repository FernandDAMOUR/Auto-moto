/* eslint-disable react/jsx-key */
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import css from '../../styles/Home.module.css'
import { BoxComment } from '../components/Comments'
import BoxFormation from '../components/Formations'
import { getallComments, IComment } from '../services/Comments/CommentsServices'
import { getallFormations, IFormation } from '../services/Formations/FormationsService'
import { Header } from '../components/Layout/Header'
import Link from 'next/link'

const Formations: NextPage = () => {
  const [data_formation, setData_formation] = useState<IFormation[]>()
  useEffect(() => {
    getallFormations().then((data_formation) => {
      setData_formation(data_formation)
    })
  }, [])
  const [data_comment, setData_comment] = useState<IComment[]>()
  useEffect(() => {
    getallComments().then((data_comment) => {
      setData_comment(data_comment)
    })
  }, [])

  return (
    <div className={css.container}>
      <Header
        isLoggedIn={false}
        onLogout={function (): void {
          throw new Error('Function not implemented.')
        }}
      />
      <main className={css.main}>
        <div className={css.div_formations}>
          <h1 className={css.title_formation}>Nos Formations</h1>
          <div className={css.box_formations}>
          {data_formation &&
            data_formation.map((formation: IFormation) => {
              return <BoxFormation id={formation._id || ''} title={formation.title} price={formation.price}></BoxFormation>
            })}
          </div>
          <h1 className={css.title_comment}>Les avis sur nos formations</h1>
          <div className={css.box_comments}>
            {data_comment &&
              data_comment.map((comment: IComment) => {
                return (
                  <BoxComment
                    id={comment._id}
                    content={comment.content || ''}
                    rating={comment.rating || 0}
                    user_id={comment.user_id || ''}
                    formation_id={comment.formation_id ||''}
                  />
                );
              })}
           </div>
          <Link href="/addcomment">
            <button className={css.btn_addcomment}>Ajouter un commentaire</button>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default Formations
