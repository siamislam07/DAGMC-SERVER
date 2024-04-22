const express = require('express');

const app = express();
require('dotenv').config()
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')


const PORT = process.env.PORT || 3000;


app.use(express.json())


const client = new MongoClient(process.env.DB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
})

app.use(cors(
    {
        origin: [
            'http://localhost:5173',
            'http://localhost:5173/panel-member1',
            'https://dagmcclub.netlify.app',
            'https://dagmcclub.netlify.app/gallery',
            'https://dagmc_club.surge.sh'
        ],
        credentials: true
    }
))
async function run() {
    try {

        const panelFirst = client.db('DAGMC').collection('panelFirst')



        const panelSecond = client.db('DAGMC').collection('panelSecond')


        const panelThird = client.db('DAGMC').collection('panelThird')

        const galleryCollection = client.db('DAGMC').collection('gallery')
        // const userTestCollection = client.db('healthDb').collection('test')

        // auth related api


        //middleware

        // verfy admin after verfytoken
        // const verifyAdmin = async (req, res, next) => {
        //     const email = req.decoded.email
        //     const query = { email: email }
        //     const user = await usersCollection.findOne(query)
        //     const isAdmin = user?.role === 'admin'
        //     if (!isAdmin) {
        //         return res.status(403).send({ message: 'forbidden access' })
        //     }
        //     next()
        // }

        // allTest collection get method


        app.get('/panelFirst', async (req, res) => {
            
                const result = await panelFirst.find().toArray();
                res.send(result);
            
        });

        app.get('/panelSecond', async (req, res) => {
            const result = await panelSecond.find().toArray()
            res.send(result)
        })
        app.get('/panelThird', async (req, res) => {
            const result = await panelThird.find().toArray()
            res.send(result)
        })
        app.get('/gallery', async (req, res) => {
            const result = await galleryCollection.find().toArray()
            res.send(result)
        })


        app.post('/gallery', async (req, res) => {
            const pic = req.body
            const result = await galleryCollection.insertOne(pic)
            res.send(result)
        })




        // Send a ping to confirm a successful connection
        // await client.db('admin').command({ ping: 1 })
        // console.log(
        //     'Pinged your deployment. You successfully connected to MongoDB!'
        // )
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir)
// Define a route
app.get('/', (req, res) => {
    res.send('Something went wrong  !!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
