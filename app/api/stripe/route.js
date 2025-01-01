import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

// export async function handler(req, res) {
//   if (req.method === 'POST') {
//     try {
//       console.log(req.body)
//       const cartItems = JSON.parse(req.body)
//       console.log('Cart items:', cartItems)

//       const params = {
//         submit_type: 'pay',
//         mode: 'payment',
//         payment_method_types: ['card'],
//         billing_address_collection: 'auto',
//         shipping_options: [
//           { shipping_rate: 'shr_1QcGQDC5y9tJkFGmY2nC8Tgs' },
//           { shipping_rate: 'shr_1QcGUvC5y9tJkFGmUcHrlbnU' },
//         ],
//         line_items: req.body.map((item) => {
//           const img = item.image[0].asset._ref;
//           const newImage = img.replace('image-', 'https://cdn.sanity.io/images/vfxfwnaw/production/').replace('-webp', '.webp');

//           return {
//             price_data: {
//               currency: 'usd',
//               product_data: {
//                 name: item.name,
//                 images: [newImage],
//               },
//               unit_amount: item.price * 100,
//             },
//             adjustable_quantity: {
//               enabled:true,
//               minimum: 1,
//             },
//             quantity: item.quantity
//           }
//         }),
//         success_url: `${req.headers.origin}/success`,
//         cancel_url: `${req.headers.origin}/canceled`,
//       }

//       // Create Checkout Sessions from body params.
//       const session = await stripe.checkout.sessions.create(params);

//       // res.status(200).json(session);
//       return new Response(JSON.stringify(session), { status: 200 });
//     } catch (err) {
//       // res.status(err.statusCode || 500).json(err.message);
//       return new Response(JSON.stringify({ error: err.message }), { status: err.statusCode || 500 });
//     }
//   } else {
//     res.setHeader('Allow', 'POST');
//     res.status(405).end('Method Not Allowed');
//   }
// }


export async function POST(req) {
  try {
    // Parse the request body (in Next.js 13+ App Directory, use req.json())
    const cartItems = await req.json();
    // console.log('Cart items:', cartItems);

    // console.log('Origin header:', req.headers.origin);
    
    // Fallback URL if origin is not provided
    const baseUrl = req.headers.origin || 'http://localhost:3000'; 
    // console.log('Using base URL:', baseUrl);

    const params = {
      submit_type: 'pay',
      mode: 'payment',
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      shipping_options: [
        { shipping_rate: 'shr_1QcGQDC5y9tJkFGmY2nC8Tgs' },
        // { shipping_rate: 'shr_1QcGUvC5y9tJkFGmUcHrlbnU' },
      ],
      line_items: cartItems.map((item) => {
        const img = item.image[0].asset._ref;
        const newImage = img.replace('image-', 'https://cdn.sanity.io/images/pumgsg9s/production/').replace('-webp', '.webp');

        return {
          price_data: { 
            currency: 'usd',
            product_data: { 
              name: item.name,
              images: [newImage],
            },
            unit_amount: item.price * 100,
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.quantity
        };
      }),
      // success_url: `${req.headers.origin}/success`,
      // cancel_url: `${req.headers.origin}/canceled`,
      success_url: `${baseUrl}/success`,
      cancel_url: `${baseUrl}/canceled`,
    };

    // Create Checkout Sessions from the body params.
    const session = await stripe.checkout.sessions.create(params);

    // Send the session data back as JSON
    return new Response(JSON.stringify(session), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: err.statusCode || 500 });
  }
}

