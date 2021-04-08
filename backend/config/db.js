import mongoose from 'mongoose';
import colors from 'colors'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.LOCAL_MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    });

    console.log(`MongoDB CONNECTED: ${conn.connection.host}`.green.bold);
  } catch (error) {
    console.log(`Error: ${ error.message }`.red.bold);
    process.exit(1)
  }
}

export default connectDB;