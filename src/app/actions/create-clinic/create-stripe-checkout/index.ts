// em src/app/actions/create-clinic/create-stripe-checkout/index.ts

"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import Stripe from "stripe";

import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";

export const createStripeCheckout = actionClient.action(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Não autorizado. Por favor, faça o login.");
  }

  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_ESSENTIAL_PLAN_PRICE_ID) {
    throw new Error("As chaves de configuração do Stripe não foram encontradas.");
  }

  const userFromDb = await db.query.usersTable.findFirst({
    where: eq(usersTable.id, session.user.id),
  });

  if (!userFromDb) {
    throw new Error("Usuário não encontrado no banco de dados.");
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-05-28.basil", // Atualizado para a versão esperada pelo tipo
  });

  let stripeCustomerId = userFromDb.stripeCustomerId;

  if (!stripeCustomerId) {
    const customer = await stripe.customers.create({
      email: userFromDb.email!,
      name: userFromDb.name,
    });
    stripeCustomerId = customer.id;

    await db
      .update(usersTable)
      .set({ stripeCustomerId })
      .where(eq(usersTable.id, session.user.id));
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    customer: stripeCustomerId,
    payment_method_types: ["card"],
    mode: "subscription",
    line_items: [
      {
        price: process.env.STRIPE_ESSENTIAL_PLAN_PRICE_ID,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard?payment_success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/subscription?payment_canceled=true`,
    
    // --- MELHORIA APLICADA AQUI ---
    // Anexa o userId diretamente à sessão de checkout.
    // Isso facilita a recuperação do ID no webhook 'checkout.session.completed'.
    metadata: {
      userId: session.user.id,
    },
    
    // É bom manter aqui também para que fique atrelado diretamente à assinatura.
    subscription_data: {
      metadata: {
        userId: session.user.id,
      },
    },
  });

  if (!checkoutSession.id) {
    throw new Error("Não foi possível criar a sessão de checkout.");
  }
  
  return {
    sessionId: checkoutSession.id,
  };
});