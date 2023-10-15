// appointment.ts
import mongoose from 'mongoose'
import { Schema } from 'mongoose'
import { IAppointment } from '~/interfaces/appointmentInterface'

// Schéma Mongoose pour un rendez-vous
export const AppointmentSchema: Schema = new Schema({
  formation: { type: Schema.Types.ObjectId, ref: 'Formation' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, required: true },
  time: { type: String, required: true }
})

// Modèle Mongoose pour un rendez-vous
export default mongoose.model<IAppointment>('Appointment', AppointmentSchema)
