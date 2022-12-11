import Role from '../models/role.model.js'

export const initialSetup = {
  createRoles: async () => {
    try {
      const count = await Role.estimatedDocumentCount()
      if (count > 0) return
      const values = await Promise.all([
        new Role({ name: 'admin' }).save(),
        new Role({ name: 'moderator' }).save(),
        new Role({ name: 'gold' }).save(),
        new Role({ name: 'silver' }).save(),
        new Role({ name: 'bronze' }).save(),
        new Role({ name: 'free' }).save()
      ])
      console.log('Initial setup: ', values)
    } catch (error) {
      console.error(error)
    }
  }
}
