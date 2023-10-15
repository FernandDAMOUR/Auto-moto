import { faker } from '@faker-js/faker'
import User from '../models/user'
import { hash } from 'bcryptjs'

export const seedUsers = async () => {
  const users = []
  for (let i = 0; i < 10; i++) {
    const user = new User({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: await hash(faker.internet.password(), 10),
      age: faker.random.numeric(2),
      role: faker.random.word(),
      address: faker.address.streetAddress(),
      permisObtenues: faker.fake('{{random.boolean}}')
    })
    users.push(user)
  }
  await User.insertMany(50)
}

export const seed = async () => {
  await seedUsers()
}

export default seed
