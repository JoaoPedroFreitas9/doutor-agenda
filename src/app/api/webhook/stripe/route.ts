import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import { db } from "@/db";
import { usersTable } from "@/db/schema";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeSecret || !webhookSecret) {
    return NextResponse.json(
      { error: "Stripe keys not found." },
      { status: 500 },
    );
  }

  const sig = req.headers.get("stripe-signature"); // 👈 aqui é a correção
  if (!sig) {
    return NextResponse.json(
      { error: "Missing Stripe signature." },
      { status: 400 },
    );
  }

  const buf = Buffer.from(await req.arrayBuffer());
  const stripe = new Stripe(stripeSecret, { apiVersion: "2025-05-28.basil" });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json(
        { error: `Webhook Error: ${err.message}` },
        { status: 400 },
      );
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const s = event.data.object as Stripe.Checkout.Session;
        const userId = s.metadata?.userId;
        const subId = s.subscription as string;
        const cusId = s.customer as string;

        if (!userId || !subId || !cusId) {
          throw new Error("Missing metadata");
        }

        await db
          .update(usersTable)
          .set({
            plan: "essential",
            stripeSubscriptionId: subId,
            stripeCustomerId: cusId,
          })
          .where(eq(usersTable.id, userId));

        break;
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        const userId = sub.metadata?.userId;

        if (!userId) {
          throw new Error("Missing userId");
        }

        await db
          .update(usersTable)
          .set({ plan: "free", stripeSubscriptionId: null })
          .where(eq(usersTable.id, userId));

        break;
      }

      default:
        console.log("Unhandled event:", event.type);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    }
    return NextResponse.json({ error: "Handler error" }, { status: 500 });
  }
}

export function GET() {
  return new Response("Method Not Allowed", { status: 405 });
}
