import { SchemaComposer } from 'graphql-compose'
import { IngredientQuery, IngredientMutation } from '../schema/Ingredient'

const schemaComposer = new SchemaComposer()

schemaComposer.Query.addFields({
  ...IngredientQuery
})

schemaComposer.Mutation.addFields({
  ...IngredientMutation
})

export default schemaComposer.buildSchema()