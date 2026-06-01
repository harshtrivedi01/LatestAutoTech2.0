require('dotenv').config({ path: '.env.local' })
const mongoose = require('mongoose')
const connect = require('../lib/mongoose')
const Category = require('../models/Category')
const Blog = require('../models/Blog')
const User = require('../models/User')

async function seed(){
  await connect()
  await Category.deleteMany()
  await Blog.deleteMany()
  await User.deleteMany()

  const cats = await Category.insertMany([
    { name: 'Cars', slug: 'cars' },
    { name: 'Bikes', slug: 'bikes' },
    { name: 'Smartphones', slug: 'smartphones' },
    { name: 'EV', slug: 'ev' }
  ])

  const admin = new User({ name: 'Admin', email: 'admin@techdrives.test', password: 'password' })
  await admin.save()

  await Blog.insertMany([
    { title: 'Future EVs 2026', slug: 'future-evs-2026', description: 'Electric future', content: '# EVs', category: cats[3]._id, featuredImage: '' , author: 'Admin'},
    { title: 'Top Cars 2026', slug: 'top-cars-2026', description: 'Car roundup', content: '# Cars', category: cats[0]._id, featuredImage: '', author: 'Admin'},
  ])
  console.log('Seed done')
  process.exit()
}
seed().catch(err=>{console.error(err);process.exit(1)})
