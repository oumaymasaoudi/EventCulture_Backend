const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/create-checkout-session', async (req, res) => {
  try {
    const { eventId, quantity, montant, userEmail } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: userEmail,
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `Billet Événement ID ${eventId}`,
            },
            unit_amount: montant * 100, // Stripe attend les montants en centimes
          },
          quantity,
        },
      ],
      success_url: `http://localhost:3000/success`, // adapte cette URL
      cancel_url: `http://localhost:3000/cancel`,    // adapte aussi si besoin
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Erreur création session Stripe :", error);
    res.status(500).json({ error: 'Erreur lors de la création du paiement' });
  }
});

module.exports = router;
