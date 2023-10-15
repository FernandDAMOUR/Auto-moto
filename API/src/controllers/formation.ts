import { Request, Response } from 'express'
import Formation from '~/models/formation'

export const createFormation = async (req: Request, res: Response) => {
  const { title, description, price } = req.body
  const formation = new Formation({
    title,
    description,
    price,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  await formation
    .save()
    .then((formation: { title: string }) => {
      return res.status(200).json({ message: `Formation created ${formation.title}`, formation })
    })
    .catch((error: { message: any }) => {
      return res.status(500).json({
        error: error.message,
        message: 'Error while creating formation'
      })
    })
}

export const getAllFormations = async (req: Request, res: Response) => {
  await Formation.find()
    .then((formations: string | any[]) => {
      return res.status(200).json({
        message: `${formations.length} formations found`,
        formations
      })
    })
    .catch((error: { message: any }) => {
      return res.status(500).json({ message: 'Error while fetching formations, Bad request', error: error.message })
    })
}

export const getFormation = async (req: Request, res: Response) => {
  const { id } = req.params
  await Formation.findById(id)
    .select('title description price createdAt updatedAt')
    .exec()
    .then((formation) => {
      try {
        if (formation) {
          return res.status(200).json({
            message: `Formation found ${formation.title}`,
            formation
          })
        }
        return res.status(404).json({
          message: 'Formation not found'
        })
      } catch (error) {
        return res.status(500).json({
          error,
          message: 'Error while fetching formation, Bad request'
        })
      }
    })
}

export const updateFormation = async (req: Request, res: Response) => {
  const { id } = req.params
  const { title, description, price } = req.body
  await Formation.findByIdAndUpdate(
    id,
    {
      title,
      description,
      price,
      updatedAt: new Date()
    },
    { new: true }
  ).then((formation) => {
    try {
      if (formation) {
        return res.status(200).json({
          message: `Formation updated ${formation.title}`,
          formation
        })
      }
      return res.status(404).json({
        message: 'Formation not found',
        formation
      })
    } catch (error) {
      return res.status(500).json({
        error,
        message: 'Error while updating formation, you need to provide all the fields'
      })
    }
  })
}

export const deleteFormation = async (req: Request, res: Response) => {
  const { id } = req.params
  await Formation.findByIdAndRemove(id).then((formation) => {
    try {
      if (formation) {
        return res.status(200).json({
          message: `Formation deleted ${formation.title}`,
          formation
        })
      }
      return res.status(404).json({
        message: 'Formation not found',
        formation
      })
    } catch (error) {
      return res.status(500).json({
        error,
        message: 'Error while deleting formation'
      })
    }
  })
}
