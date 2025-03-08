require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/create-checkout-session', async (req, res) => {
    try {
        const { price } = req.body;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'eur',
                    product_data: { name: 'Produit' },
                    unit_amount: parseInt(price), // Prix en centimes
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: 'https://tonsite.com/success.html',
            cancel_url: 'https://tonsite.com/cancel.html',
        });

        res.json({ id: session.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log("Serveur démarré sur http://localhost:3000"));
