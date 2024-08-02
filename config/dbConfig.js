import mongoose from 'mongoose'
import { configDotenv } from 'dotenv'
configDotenv()

const dbConfig = async () => {
    try{
        const db = await mongoose.connect(process.env.Mongo_URL)
        console.log(`Database connected at ${db.connection.host}`)
    }catch(err){
        console.log(err)
    }
}

export default dbConfig