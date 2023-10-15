import { Request, Response } from 'express'
import mongoose, { ObjectId } from 'mongoose'
import { ICart } from '~/interfaces/cart'
import Cart from '~/models/cart'
import User from '~/models/user'

export const clearCart = async (userId: string): Promise<void> => {
  try {
    const user = await User.findById(userId)
    if (!user) {
      throw new Error('User not found')
    }
    const cart = await Cart.findOne({ user: user._id })
    if (!cart) {
      throw new Error('Cart not found')
    }
    cart.items = []
    await cart.save()
  } catch (error) {
    throw new Error(`Could not clear cart: ${error}`)
  }
}
export const createCart = async (userId: ObjectId): Promise<ICart> => {
  try {
    const user = await User.findById(userId)
    if (!user) {
      throw new Error('User not found')
    }
    const cart = new Cart({
      user: user._id,
      items: []
    })
    await cart.save()
    return cart
  } catch (error: unknown) {
    throw new Error(`Could not create cart: ${(error as Error).message}`)
  }
}
export const getCart = async (userId: ObjectId): Promise<ICart | null> => {
  try {
    return await Cart.findOne({ user: userId }).populate('items.formation')
  } catch (error: unknown) {
    throw new Error(`Could not get cart: ${(error as Error).message}`)
  }
}
export const addToCart = async (userId: ObjectId, formationId: string, quantity = 1): Promise<ICart | null> => {
  try {
    const cart = await Cart.findOne({ user: userId })
    if (cart) {
      const formationObjectId = new mongoose.Types.ObjectId(formationId)
      const existingItem = cart.items.find((item) => item.formation.toString() === formationObjectId.toString())
      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        cart.items.push({ formation: formationObjectId, quantity })
      }
      await cart.save()
      return cart
    }
    return null
  } catch (error: unknown) {
    throw new Error(`Could not add to cart: ${(error as Error).message}`)
  }
}
export const updateCartItemQuantity = async (
  userId: ObjectId,
  formationId: string,
  quantity: number
): Promise<ICart | null> => {
  try {
    const cart = await Cart.findOne({ user: userId })
    if (cart) {
      const formationObjectId = new mongoose.Types.ObjectId(formationId)
      const cartItem = cart.items.find((item) => item.formation.toString() === formationObjectId.toString())
      if (cartItem) {
        cartItem.quantity = quantity
        await cart.save()
        return cart
      }
    }
    return null
  } catch (error: unknown) {
    throw new Error(`Could not update cart item quantity: ${(error as Error).message}`)
  }
}
export const removeCartItem = async (userId: ObjectId, formationId: string): Promise<ICart | null> => {
  try {
    const cart = await Cart.findOne({ user: userId })
    if (cart) {
      const formationObjectId = new mongoose.Types.ObjectId(formationId)
      cart.items = cart.items.filter((item) => item.formation.toString() !== formationObjectId.toString())
      await cart.save()
      return cart
    }
    return null
  } catch (error: unknown) {
    throw new Error(`Could not remove cart item: ${(error as Error).message}`)
  }
}
// export const clearCart = async (userId: ObjectId): Promise<void> => {
//   try {
//     const cart = await Cart.findOne({ user: userId })
//     if (cart) {
//       cart.items = []
//       await cart.save()
//     }
//   } catch (error: unknown) {
//     throw new Error(`Could not clear cart: ${(error as Error).message}`)
//   }
// }
