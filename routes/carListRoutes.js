import express from "express"
import { promises as fs } from "fs"

const { readFile, writeFile } = fs
const router = express.Router()

const getBrands = async () => {
  const carList = await fs.readFile("./car-list.json", "utf-8")
  return JSON.parse(carList)
}

router.get("/", async (req, res) => {
    try{
        const carList = JSON.parse(await readFile("car-list.json"))
        res.send(carList)

    } catch(err) {
        res.status(400).send({ error: err.message })

    }
})


router.get("/more-models", async (req, res) => {
    try{
        const carList = JSON.parse(await readFile("car-list.json"))
        
        const carsBrandAndModelsTotal = carList.map(element => {
            return { brand: element.brand, modelsTotal: element.models.length}
        })
        
        carsBrandAndModelsTotal.sort(function(a, b){return b.modelsTotal - a.modelsTotal})

        const filteredMoreModelsOcourrences = carsBrandAndModelsTotal.filter(element => {
            return element.modelsTotal === carsBrandAndModelsTotal[0].modelsTotal
        })

        res.send(filteredMoreModelsOcourrences)
        
    } catch(err) {
        res.status(400).send({ error: err.message })

    }
})


router.get("/less-models", async (req, res) => {
    try{
        const carList = JSON.parse(await readFile("car-list.json"))
        
        const carsBrandAndModelsTotal = carList.map(element => {
            return { brand: element.brand, modelsTotal: element.models.length}
        })
        
        carsBrandAndModelsTotal.sort(function(a, b){return  a.modelsTotal - b.modelsTotal})

        const filteredLessModelsOcourrences = carsBrandAndModelsTotal.filter(element => {
            return element.modelsTotal === carsBrandAndModelsTotal[0].modelsTotal
        })

        res.send(filteredLessModelsOcourrences)
        
    } catch(err) {
        res.status(400).send({ error: err.message })

    }
})


router.get("/more-models/:order", async (req, res) => {
    try{
        const carList = JSON.parse(await readFile("car-list.json"))
        const carsBrandAndModelsTotal = carList.map(element => {
            return { brand: element.brand, modelsTotal: element.models.length}
        })
        
        carsBrandAndModelsTotal.sort(function(a, b){return  b.modelsTotal - a.modelsTotal})

        res.send(carsBrandAndModelsTotal.splice(0, req.params.order))
        
    } catch(err) {
        res.status(400).send({ error: err.message })

    }
})


router.get("/less-models/:order", async (req, res) => {
    try{
        const carList = JSON.parse(await readFile("car-list.json"))
        const carsBrandAndModelsTotal = carList.map(element => {
            return { brand: element.brand, modelsTotal: element.models.length}
        })
        
        carsBrandAndModelsTotal.sort(function(a, b){return a.modelsTotal - b.modelsTotal})

        res.send(carsBrandAndModelsTotal.splice(0, req.params.order))
        
    } catch(err) {
        res.status(400).send({ error: err.message })

    }
})

router.post("/lista-modelos", async (req, res) => {
  try {
      const brands = await getBrands()
      const brand = brands.find(b =>  b.brand.toUpperCase() === req.body.nomeMarca.toUpperCase())
      if(brand) {
          res.send(brand.models)
      }
      else {
          res.send([])
      }
  } catch (error) {
      console.log(error)
      res.send(error)
  }
})

export default router