import mongoose from 'mongoose'
import User from '../models/User.js'

const createAdmin = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/movieshuttle')
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@movieshuttle.com' })
    if (existingAdmin) {
      console.log('Admin user already exists')
      process.exit(0)
    }

    // Create admin user
    const admin = new User({
      email: 'admin@movieshuttle.com',
      password: 'admin123',
      role: 'admin'
    })

    await admin.save()
    console.log('Admin user created successfully')
    console.log('Email: admin@movieshuttle.com')
    console.log('Password: admin123')
    
    process.exit(0)
  } catch (error) {
    console.error('Error creating admin:', error)
    process.exit(1)
  }
}

createAdmin()
