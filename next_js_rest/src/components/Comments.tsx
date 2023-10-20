import css from '../../styles/Home.module.css'

export interface ICommentProps {
    id: string,
    content: string,
    rating: number,
    user_id: string,
    formation_id: string,
}

export const BoxComment = ({ id, content, rating, user_id, formation_id }: ICommentProps) => {
    const ID = 'comment/' + id
    return (
        <a href={ID}>
            <div className={css.box_comment}>
                <p className={css.p}>{content}</p>
                <p className={css.p}>{rating}/10</p>
                <p className={css.p}>{user_id}</p>
                <p className={css.p}>{formation_id}</p>
            </div>
        </a>
    )
}