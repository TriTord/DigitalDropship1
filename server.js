const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Route pour créer la session de paiement avec Stripe
app.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'eur',
                    product_data: { name: 'Produit' },
                    unit_amount: 2000, // Prix en centimes (20€)
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: 'https://frontend2-red.vercel.app/#',
        cancel_url: 'https://frontend2-red.vercel.app/#',
    });

    res.json({ id: session.id });
});

// Assurer que le serveur écoute bien sur le bon port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
