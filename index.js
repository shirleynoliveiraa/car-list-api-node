import express from "express"
import carsRouter from "./routes/carListRoutes.js"
import { promises as fs } from "fs"

const app = express()
const port = 3000
const { readFile, writeFile } = fs

app.use(express.json())
app.use("/cars", carsRouter)

app.listen(port, async () => {
    try {
        await readFile("car-list.json")
        console.log(`API Started! Listen on http://localhost:${port}`)

    } catch(err) {
        const initialJson = []

        writeFile("car-list.json", JSON.stringify(initialJson)).then(() => {
            console.log(`API Started! listen on http://localhost:${port}, FIle Created!`)
        }).catch(err => {
            console.log(err)
        })
    }
})