const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.port || 5000;
const mongoose = require('mongoose');
require('dotenv').config();

//middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', 'https://book-store-app-frontend-drab.vercel.app'],
    credentials: true,
}))

//routes
const bookRoutes = require('./src/books/book.route');
const orderRoutes = require('./src/orders/order.route');
const userRoutes = require('./src/users/user.route');
const adminRoutes = require('./src/stats/admin.stats');

app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);

async function main() {
    await mongoose.connect(process.env.DB_URL);
    app.use('/', (req, res) => {
        res.send('Bookstore server is running...')
    })
}

main().then(() => console.log("MongoDB connected successfully")).catch(err => console.log(err));

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})