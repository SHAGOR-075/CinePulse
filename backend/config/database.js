import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://MovieShuttle:MovieShuttle2025@movieshuttle.5ouu8uq.mongodb.net/?retryWrites=true&w=majority&appName=MovieShuttle', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error('Database connection error:', error)
    process.exit(1)
  }
}

export default connectDB
