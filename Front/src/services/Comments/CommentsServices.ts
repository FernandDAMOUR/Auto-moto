import { api } from "../ServiceHelper"

export interface IComment {
    _id: string,
    rating?: number,
    content?: string,
    user_id?: string,
    formation_id?: string,
}

export const getallComments = async (): Promise<IComment[]> => {
    return await api.get("/comment/get/all").then((response) => response.data.comments)
}
export const getComment = async (id: string | string[]) => {
    return await api.get("/comment/get/" + id).then((response) => response.data.comment)
}

export const createComment = async (comment: IComment) => {
    return await api.post("/comments/create", comment).then((response) => response.data.comment)
}

export const updateComment = async (comment: IComment) => {
    return await api.put("/comments/update", comment).then((response) => response.data.comment)
}


export const deleteComment = async (id: string | string[]): Promise<IComment[]> => {
    return await api.delete('/comment/delete/' + id).then((response) => response.data.comment)
  }