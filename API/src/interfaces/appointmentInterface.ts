import { Document, Schema } from 'mongoose'
// Interface pour la définition d'un rendez-vous
export interface IAppointment extends Document {
  id: string
  date: Date // Date et heure du rendez-vous
  time: string // Heure du rendez-vous
  formation_Id: { type: Schema.Types.ObjectId; ref: 'Formation' }
  user_Id: { type: Schema.Types.ObjectId; ref: 'User' }
}
