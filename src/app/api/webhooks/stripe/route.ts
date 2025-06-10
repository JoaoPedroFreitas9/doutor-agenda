import { eq } from "drizzle-orm";
import { headers } from "next/headers"; // CORREÇÃO: Importar 'headers' de 'next/headers'
import { NextResponse } from "next/server";
import Stripe from "stripe";

import { db } from "@/db";
import { usersTable } from "@/db/schema";

export async function POST(request: Request) {
  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeSecret || !webhookSecret) {
    return NextResponse.json(
      { error: "As chaves de configuração do Stripe não foram encontradas." },
      { status: 500 },
    );
  }

  const headersList = await headers();
  const signature = headersList.get("stripe-signature");
  if (!signature) {
    return NextResponse.json(
      { error: "Assinatura do Stripe não encontrada." },
      { status: 400 },
    );
  }

  const text = await request.text();
  const stripe = new Stripe(stripeSecret, {
    // CORREÇÃO: Usar a versão da API que seu sistema espera para evitar conflito de tipo
    apiVersion: "2025-05-28.basil",
  });

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(text, signature, webhookSecret);
  } catch (err) {
    // CORREÇÃO: Usar 'unknown' e fazer type check para evitar erro de lint
    if (err instanceof Error) {
      console.error(`❌ Erro na verificação do webhook: ${err.message}`);
      return NextResponse.json(
        { error: `Webhook Error: ${err.message}` },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { error: "Erro desconhecido na verificação do webhook." },
      { status: 400 },
    );
  }

  try {
    switch (event.type) {
      // MUDANÇA DE LÓGICA: Usar 'checkout.session.completed' é mais direto e confiável
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        const userId = session.metadata?.userId;
        const subscriptionId = session.subscription;
        const customerId = session.customer;

        if (
          !userId ||
          typeof subscriptionId !== "string" ||
          typeof customerId !== "string"
        ) {
          throw new Error(
            "Dados essenciais (userId, subscriptionId, customerId) não encontrados no evento de checkout.",
          );
        }

        console.log(
          `✅ Checkout concluído para o usuário: ${userId}. Atualizando plano.`,
        );

        await db
          .update(usersTable)
          .set({
            plan: "essential", // MUDANÇA: Definindo o plano como 'essential' diretamente
            stripeSubscriptionId: subscriptionId,
            stripeCustomerId: customerId,
          })
          .where(eq(usersTable.id, userId));

        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const userId = subscription.metadata.userId;

        if (!userId) {
          throw new Error(
            "User ID não encontrado nos metadados da assinatura.",
          );
        }

        console.log(
          `🗑️ Assinatura cancelada para o usuário: ${userId}. Revertendo plano.`,
        );

        await db
          .update(usersTable)
          .set({
            stripeSubscriptionId: null,
            plan: "free",
          })
          .where(eq(usersTable.id, userId));

        break;
      }

      default:
        console.log(`🔔 Evento não tratado recebido: ${event.type}`);
    }
  } catch (err) {
    // CORREÇÃO: Usar 'unknown' e fazer type check
    if (err instanceof Error) {
      console.error("❌ Erro ao processar o evento do webhook:", err.message);
      return NextResponse.json(
        { error: "Erro interno ao processar o webhook." },
        { status: 500 },
      );
    }
    return NextResponse.json(
      { error: "Erro interno desconhecido." },
      { status: 500 },
    );
  }

  return NextResponse.json({ received: true });
}
export function GET() {
  return new Response("Method Not Allowed", { status: 405 });
}
