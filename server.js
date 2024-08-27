import express from 'express'
import { configDotenv } from 'dotenv'
import dbConfig from './config/dbConfig.js'
import globalErrorHandler from './Middlewares/globalerrorhandler.js'
import userRoutes from './Routes/users.js'
import BlogRouter from './Routes/blogRoutes.js'
configDotenv()

const app = express()
const PORT = process.env.PORT || 5000


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
dbConfig();
app.use(userRoutes)
app.use(BlogRouter)


app.use(globalErrorHandler)

app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`)
})
