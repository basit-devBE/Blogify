import express from 'express'
import { configDotenv } from 'dotenv'
import dbConfig from './config/dbConfig.js'
configDotenv()

const app = express()
const PORT = process.env.PORT || 5000


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
dbConfig();

app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`)
})
