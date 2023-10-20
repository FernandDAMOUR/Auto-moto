import React, { useEffect } from "react"
import css from '../../styles/Home.module.css'

export interface IuserProps {
    id: string,
    name: string,
    email: string,
    age: number,
    role: boolean,
    address: string,
    perobt: string
}

const BoxUser = ({ id, name, email, age, address, perobt }: IuserProps) => {
    const ID = "users/" + id;
    return (
        <a href= {ID}>
            <div className={css.box_user}>
                <p className={css.p}>{name}</p>
                <p className={css.p}>{email}</p>
                <p className={css.p}>{age}</p>
                <p className={css.p}>{address}</p>
                <p className={css.p}>{perobt}</p>
            </div>
        </a>

    )
}
export default BoxUser