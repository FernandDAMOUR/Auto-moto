// Vérifie si l'utilisateur est authentifié
import jwt from 'jsonwebtoken'

import { NextFunction, Request, Response } from 'express'

// Vérifie si l'utilisateur est authentifié

interface AuthenticatedRequest extends Request {
  user?: any
}

export const authenticateUser = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '')

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  try {
    const decoded = jwt.verify(token, 'itssecret') // Remplacez 'your-secret-key' par votre clé secrète JWT
    req.user = decoded // Stockez l'utilisateur dans un champ personnalisé (par exemple, req.authUser)
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed' })
  }
}

// export const authMiddleware = async (req, res, next) => {
//   try {
//     const token = req.header('Authorization')
//     if (!token) {
//       return res.status(401).json({ message: 'Unauthorized' })
//     }

//     const decoded = jwt.verify(token.replace('Bearer ', ''), 'votre_secret') // Remplacez 'votre_secret' par votre clé secrète

//     const user = await User.findById(decoded.valueOf().id

//     if (!user) {
//       return res.status(401).json({ message: 'Unauthorized' })
//     }

//     // Vous pouvez également stocker l'utilisateur dans l'objet req pour une utilisation ultérieure
//     req.user = user

//     next() // Appel au prochain middleware
//   } catch (error) {
//     console.error(error)
//     res.status(401).json({ message: 'Unauthorized' })
//   }
// }
