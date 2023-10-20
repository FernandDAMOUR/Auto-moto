import { api } from '../ServiceHelper'
export interface IFormation {
  _id?: string
  title: string
  description: string
  price: number
}
export const getallFormations = async (): Promise<IFormation[]> => {
  return await api.get('/formations/get/all').then((response) => response.data.formations)
}
export const getFormation = async (id: string | string[]) => {
  return await api.get('/formations/get/' + id).then((response) => response.data.formation)
}

// export const createFormation = async (formation: IFormation): Promise<IFormation> => {
//   return await api.post('/formations/create').then((response) => response.data.formation)
// }

export const createFormation = async (formationData: IFormation) => {
  try {
    const response = await api.post('/formations/create', {
      formationData
    })

    // Vous pouvez traiter la réponse ici si nécessaire
    const newFormation = response

    return newFormation
  } catch (error) {
    console.error('Erreur lors de la création de la formation', error)
    throw error
  }
}

export const updateFormation = async (IFormation: IFormation): Promise<IFormation> => {
  return await api.put('/formations/update/' + IFormation._id).then((response) => response.data.formation)
}

export const deleteFormation = async (id: string | string[]): Promise<IFormation[]> => {
  return await api.delete('/formations/delete/' + id).then((response) => response.data.formation)
}
