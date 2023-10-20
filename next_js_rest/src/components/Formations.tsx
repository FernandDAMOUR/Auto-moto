import css from '../../styles/Home.module.css'

export interface IformationProps {
    id: string,
    title?: string,
    description?: string,
    price?: number
}
const BoxFormation = ({ id, title, description, price }: IformationProps) => {
    const ID = 'formation/' + id;
    return (
        <a href={ID}>
            <div className={css.box_formation}>
                <p className={css.p}>{title}</p>
                <p className={css.p}>{description}</p>
                <p className={css.p}>Prix: {price}€</p>
            </div>
        </a>
    )
}
export default BoxFormation