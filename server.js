import express from 'express'
import { configDotenv } from 'dotenv'
configDotenv()

const app = express()
const PORT = process.env.PORT || 5000
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`)
})
