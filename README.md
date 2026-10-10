# Tasty Burger

React, TypeScript, and Vite frontend with a Node.js and SQLite order API.

## Run locally

Use Node.js 24 or newer. Install the project dependencies, then run:

```sh
npm install
npm run dev
```

The development command starts the Vite site and the order API. The menu's current item and variation prices are generated into a server-owned catalog before startup and before production builds. Checkout submits product IDs, quantities, and displayed prices; the API rejects stale prices and calculates the order total from its own catalog.

The development site listens on the local network so other devices on the same Wi-Fi/LAN can open it at `http://<this-computer's-local-IP>:5173`. Find the computer's IPv4 address with `ipconfig`. Allow Node.js through Windows Defender Firewall on private networks if prompted.

Cash orders are stored in `data/orders.sqlite`. Keep that file on persistent storage in production and include it in the application's backup plan. The API allocates unique, sequential queue numbers and safely returns the same order when a request is retried with its idempotency key.

## Production

```sh
npm run build
npm start
```

`npm start` serves both the built frontend and the order API. Set `PORT` to choose the listening port and `DATABASE_PATH` to place SQLite on persistent storage. The runtime requires Node.js 24 or newer for its built-in SQLite module.

## Cashier payment confirmation

New cash orders are saved as **Pending Payment** and **Awaiting Payment**. A cashier system can confirm receipt by sending an authenticated `POST /api/orders/{queueNumber}/payment/confirm` request with an `Authorization: Bearer <key>` header. Configure `CASHIER_API_KEY` with a randomly generated secret of at least 32 characters. Successful confirmation changes the order to **Paid** and **Preparing**; repeated confirmations are safe. Do not expose this key in the browser.

## Online payments

Online payment is intentionally unavailable until a payment provider is configured. No payment is simulated or marked paid by the checkout UI. Provider credentials, payment-intent creation, and verified webhook handling must be added before enabling a wallet, card, or bank option.
