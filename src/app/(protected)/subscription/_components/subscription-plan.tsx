// src/app/(protected)/subscription/_components/subscription-plan.tsx

"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

import { createStripeCheckout } from "@/app/actions/create-clinic/create-stripe-checkout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface SubscriptionPlanProps {
  active?: boolean;
  className?: string;
  userEmail: string;
}

export function SubscriptionPlan({
  active = false,
  className,
  userEmail,
}: SubscriptionPlanProps) {
  const router = useRouter();
  const createStripeCheckoutAction = useAction(createStripeCheckout, {
    onSuccess: async ({ data }) => {
      if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
        throw new Error("Stripe publishable key not found");
      }
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      );
      if (!stripe) {
        throw new Error("Stripe not found");
      }
      if (!data?.sessionId) {
        throw new Error("Session ID not found");
      }
      await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });
    },
    onError: (error) => {
      toast.error(
        "Houve um problema ao iniciar o pagamento. Tente novamente.",
        {
          description:
            error.error?.serverError ||
            error.error?.thrownError?.message ||
            "Erro desconhecido.",
        },
      );
    },
  });

  const handleSubscribeClick = () => {
    createStripeCheckoutAction.execute();
  };

  const handleManagePlanClick = () => {
    if (!process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL) {
      toast.error("O portal de gerenciamento não está configurado.");
      return;
    }
    router.push(
      `${process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL}?prefilled_email=${userEmail}`,
    );
  };

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
            Plano Essencial
          </CardTitle>
          {active && (
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900 dark:text-green-300">
              Plano Atual
            </Badge>
          )}
        </div>
        <CardDescription className="text-gray-600 dark:text-gray-300">
          Para profissionais e clínicas que buscam eficiência máxima.
        </CardDescription>
        <div className="flex items-baseline pt-2">
          <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
            R$60
          </span>
          <span className="ml-1.5 text-lg text-gray-600 dark:text-gray-400">
            /mês
          </span>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="pt-6">
        <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
          {active
            ? "Este é o seu plano atual. Todas as funcionalidades estão ativas na sua conta."
            : "O plano inclui acesso a todas as funcionalidades listadas ao lado, além de atualizações futuras."}
        </p>

        <div className="mt-4">
          <Button
            className="w-full py-6 text-base"
            variant="default"
            size="lg"
            onClick={active ? handleManagePlanClick : handleSubscribeClick}
            disabled={createStripeCheckoutAction.isExecuting}
          >
            {createStripeCheckoutAction.isExecuting ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : active ? (
              "Gerenciar Assinatura"
            ) : (
              "Assinar Agora"
            )}
          </Button>
          {!active && (
            <p className="mt-3 text-center text-xs text-gray-500">
              Ao assinar, você concorda com nossos Termos de Serviço e Política
              de Privacidade.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
