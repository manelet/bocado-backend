import { Ingredient, IngredientTC } from '../models/ingredient'

export const IngredientQuery = {
  ingredientAll: IngredientTC.getResolver('findMany')
}

export const IngredientMutation = {
  ingredientCreate: IngredientTC.getResolver('createOne')
}