import { Request, Response } from 'express'
import AppointmentModel from '../models/appointment' // Assurez-vous que le chemin du modèle est correct
import { IAppointment } from '../interfaces/appointmentInterface'

// Créer un rendez-vous
export const createAppointment = async (req: Request, res: Response) => {
  try {
    const { user_Id, formation_Id, date, time } = req.body

    if (!user_Id || !formation_Id || !date || !time) {
      return res.status(400).json({ error: 'Tous les champs sont requis.' })
    }

    const datetime = new Date(`${date}T${time}`) // Combinez la date et l'heure

    // Vérifier si un rendez-vous existe déjà à la même date et à la même formation
    const existingAppointment: IAppointment | null = await AppointmentModel.findOne({
      formation_Id,
      date: datetime // Utilisez la date et l'heure combinées
    })

    if (existingAppointment) {
      return res.status(400).json({ error: 'Un rendez-vous existe déjà à cette date et pour cette formation.' })
    }

    const appointment: IAppointment = new AppointmentModel({
      formation_Id,
      user_Id,
      date: datetime // Utilisez la date et l'heure combinées
    })

    await appointment.save()
    return res.status(201).json(appointment)
  } catch (error) {
    return res.status(500).json({ error: 'Erreur lors de la création du rendez-vous.' })
  }
}

// Obtenir un rendez-vous spécifique
export const getAppointment = async (req: Request, res: Response) => {
  try {
    const appointmentId: string = req.params.id

    const appointment: IAppointment | null = await AppointmentModel.findById(appointmentId)

    if (!appointment) {
      return res.status(404).json({ error: 'Rendez-vous non trouvé.' })
    }

    return res.json(appointment)
  } catch (error) {
    return res.status(500).json({ error: 'Erreur lors de la récupération du rendez-vous.' })
  }
}

// Obtenir les rendez-vous d'un utilisateur
export const getUserAppointments = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.userId

    const appointments: IAppointment[] = await AppointmentModel.find({ userId })

    return res.json(appointments)
  } catch (error) {
    return res.status(500).json({ error: 'Erreur lors de la récupération des rendez-vous.' })
  }
}

export const getAllAppointments = async (req: Request, res: Response) => {
  try {
    const appointments: IAppointment[] = await AppointmentModel.find()

    return res.json(appointments)
  } catch (error) {
    return res.status(500).json({ error: 'Erreur lors de la récupération des rendez-vous.' })
  }
}

export const updateAppointment = async (req: Request, res: Response) => {
  try {
    const appointmentId: string = req.params.id
    const { user_Id, formation_Id, date } = req.body

    if (!user_Id || !formation_Id || !date) {
      return res.status(400).json({ error: 'Tous les champs sont requis.' })
    }

    const updatedAppointment: IAppointment | null = await AppointmentModel.findByIdAndUpdate(
      appointmentId,
      { user_Id, formation_Id, date },
      { new: true } // Pour retourner le nouveau document mis à jour
    )

    if (!updatedAppointment) {
      return res.status(404).json({ error: 'Rendez-vous non trouvé.' })
    }

    return res.json(updatedAppointment)
  } catch (error) {
    return res.status(500).json({ error: 'Erreur lors de la mise à jour du rendez-vous.' })
  }
}

// Supprimer un rendez-vous
export const deleteAppointment = async (req: Request, res: Response) => {
  try {
    const appointmentId: string = req.params.id

    const deletedAppointment: IAppointment | null = await AppointmentModel.findByIdAndDelete(appointmentId)

    if (!deletedAppointment) {
      return res.status(404).json({ error: 'Rendez-vous non trouvé.' })
    }

    return res.status(204).end() //Statut 204 pour indiquer la suppression réussie
  } catch (error) {
    return res.status(500).json({ error: 'Erreur lors de la suppression du rendez-vous.' })
  }
}
