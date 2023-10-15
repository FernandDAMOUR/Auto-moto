import * as CartController from '~/controllers/cart'
import { authenticateUser } from '~/middlewares/authMiddleware' // Assurez-vous d'importer votre contrôleur correctement

import { Router } from 'express'

const router = Router()
// Middleware d'authentification (Assurez-vous d'avoir votre middleware d'authentification configuré)
router.use(authenticateUser)
// Obtenir le contenu du panier de l'utilisateur actuellement authentifié
router.get('/cart', CartController.getCart)
router.post('/cart/create', CartController.createCart) // Créer un panier pour l'utilisateur actuellement authentifié

router.post('/cart/add/:formationId', CartController.addToCart) // Ajouter une formation au panier de l'utilisateur
router.put('/cart/update/:formationId', authenticateUser, CartController.updateCartItemQuantity) // Mettre à jour la quantité d'une formation dans le panier
router.delete('/cart/remove/:formationId', authenticateUser, CartController.removeCartItem) // Supprimer une formation du panier de l'utilisateur

// Fix type errors
router.post('/cart/create', async (req, res) => {
  const userId: string = req.user._id.toString()
  const cart = await CartController.createCart(userId)
  res.json(cart)
})

router.delete('/cart/clear', authenticateUser, async (req, res) => {
  const userId: string = req.user._id.toString()
  await CartController.clearCart(userId)
  res.sendStatus(204)
})

export default router
// Vider le panier de l'utilisateur
