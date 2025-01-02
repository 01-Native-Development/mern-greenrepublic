const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const authRouter = require('./src/users/user.route')
const productsRouter = require('./src/products/products.route')
const reviewsRouter = require('./src/reviews/reviews.router')
const ordersRouter = require('./src/orders/orders.route')
const statsRouter = require('./src/stats/stats.route')
const uploadImage = require('./src/utils/upload-image')

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json({ limit: '25mb' }))
//app.use(express.urlencoded({ limit: '25mb' }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(
	cors({
		origin: 'http://localhost:5173',
		credentials: true,
	})
)

app.use('/api/auth', authRouter)
app.use('/api/products', productsRouter)
app.use('/api/reviews', reviewsRouter)
app.use('/api/orders', ordersRouter)
app.use('/api/stats', statsRouter)

app.post('/uploadImage', (req, res) => {
	uploadImage(req.body.image)
		.then((url) => res.send(url))
		.catch((err) => res.status(500).send(err))
})

async function main() {
	await mongoose.connect(process.env.MONGO_URI)

	app.get('/', (req, res) => {
		res.send('The Green Republic E-commerce Server is running....!')
	})
}

app.listen(PORT, async () => {
	await main()
		.then(() => console.log('MongoDB is successfully connected.'))
		.catch((err) => console.log(err))
	console.log(`App is listening on port ${PORT}`)
})