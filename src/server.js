import express from 'express'
import bodyParser from 'body-parser'
import {MongoClient} from 'mongodb'
import path from 'path'
import history from 'connect-history-api-fallback'

const app = express()
app.use(bodyParser.json())

app.use('/images', express.static(path.join(__dirname, '../assets')))

app.use(express.static(path.resolve(__dirname, '../dist'), {maxAge: '1y', etag:false}))
app.use(history())

app.get('/api/products', async (req, res) => {
  
    const client = await MongoClient.connect(
      'mongodb+srv://paveltrninkov:123@cluster0.jvmrq2b.mongodb.net/?retryWrites=true&w=majority',
      {useNewUrlParser: true, useUnifiedTopology: true}
    )

    const db = client.db('BAIS3200Demo')
    const products = await db.collection('Products').find({}).toArray()

    res.status(200).json(products)
    client.close()
})

app.get('/api/users/:userId/cart', async (req, res) => {
  const {userId} = req.params
  const client = await MongoClient.connect(
    'mongodb+srv://paveltrninkov:123@cluster0.jvmrq2b.mongodb.net/?retryWrites=true&w=majority',
    {useNewUrlParser: true, useUnifiedTopology: true}
  )

  const db = client.db('BAIS3200Demo')
  const user = await db.collection('Users').findOne({id: userId})

  if (!user) return res.status(404).json('Could not find user')
  const products = await db.collection('Products').find({}).toArray()
  const cartItemIds = user.cartItems
  const cartItems = cartItemIds.map( id => products.find(product => product.id === id))

  res.status(200).json(cartItems)
  client.close()  
})

app.get('/api/products/:productId', async (req, res) => {

  const {productId} = req.params

  const client = await MongoClient.connect(
    'mongodb+srv://paveltrninkov:123@cluster0.jvmrq2b.mongodb.net/?retryWrites=true&w=majority',
    {useNewUrlParser: true, useUnifiedTopology: true}
  )

  const db = client.db('BAIS3200Demo')

  const product = await db.collection('Products').findOne({id: productId})
  
  if (product) {
      res.status(200).json(product)
  }
  else {
      res.status(404).json('Could not find product')
  }
  client.close()
})

app.post('/api/users/:userId/cart', async (req, res) => {
    const {productId} = req.body
    const {userId} = req.params

    const client = await MongoClient.connect(
      'mongodb+srv://paveltrninkov:123@cluster0.jvmrq2b.mongodb.net/?retryWrites=true&w=majority',
      {useNewUrlParser: true, useUnifiedTopology: true}
    )
  
    const db = client.db('BAIS3200Demo')

    await db.collection('Users').updateOne({id: userId}, {
      $addToSet: {cartItems: productId }
    })  

    const user = await db.collection('Users').findOne({id: userId})
    const cartItemIds = user.cartItems
    const products = await db.collection('Products').find({}).toArray()
    const cartItems = cartItemIds.map( id => products.find(product => product.id === id))
    
    res.status(200).json(cartItems)
    client.close()
})

app.delete('/api/users/:userId/cart/:productId', async (req, res) => {
    const {userId, productId} = req.params

    const client = await MongoClient.connect(
      'mongodb+srv://paveltrninkov:123@cluster0.jvmrq2b.mongodb.net/?retryWrites=true&w=majority',
      {useNewUrlParser: true, useUnifiedTopology: true}
    )
  
    const db = client.db('BAIS3200Demo')

    await db.collection('Users').updateOne({id: userId}, {
      $pull: {cartItems: productId }
    })  
    
    const user = await db.collection('Users').findOne({id: userId})
    const cartItemIds = user.cartItems
    const products = await db.collection('Products').find({}).toArray()
    const cartItems = cartItemIds.map( id => products.find(product => product.id === id))

    res.status(200).json(cartItems)
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.listen(8000, () => {
    console.log("Server is listening on Port: 8000")
})

