"use client";

import { loadStripe } from "@stripe/stripe-js";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner"; // Importe o toast para usar no onError

import { createStripeCheckout } from "@/app/actions/create-clinic/create-stripe-checkout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

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

  const { execute, status } = useAction(createStripeCheckout, {
    onSuccess: async (result) => { // 'result' contém a resposta da action
      // CORREÇÃO: Acessar sessionId através de result.data
      const sessionId = result.data?.sessionId;

      if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
        throw new Error("Stripe publishable key not found");
      }
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      );
      if (!stripe) {
        throw new Error("Stripe not found");
      }
      if (!sessionId) {
        toast.error("Não foi possível obter a sessão de checkout.");
        return;
      }
      // Redireciona para o checkout do Stripe
      await stripe.redirectToCheckout({ sessionId });
    },
    onError: (errorInfo) => {
      // CORREÇÃO: Acessar serverError através de errorInfo.error
      console.error("Erro ao criar checkout:", errorInfo);
      toast.error(errorInfo.error.serverError || "Ocorreu um erro. Tente novamente.");
    }
  });

  const features = [
    "Cadastro de até 3 médicos",
    "Agendamentos ilimitados",
    "Métricas básicas",
    "Cadastro de pacientes",
    "Confirmação manual",
    "Suporte via e-mail",
  ];

  const handleSubscribeClick = () => {
    // CORREÇÃO: Chamar execute sem argumentos, pois a action não espera nenhum
    execute();
  };

  const handleManagePlanClick = () => {
    const portalUrl = process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL;
    if (portalUrl) {
      // Usando router.push para uma navegação do lado do cliente mais suave
      router.push(`${portalUrl}?prefilled_email=${userEmail}`);
    } else {
      console.error("URL do Portal do Cliente Stripe não configurada.");
      toast.error("A página de gerenciamento não está disponível no momento.");
    }
  };
  
  const isLoading = status === 'executing';

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-900">Essential</h3>
          {active && (
            <Badge className="border-green-600 bg-green-100 text-green-700 hover:bg-green-100">
              Plano Atual
            </Badge>
          )}
        </div>
        <p className="text-gray-600">
          Para profissionais autônomos ou pequenas clínicas
        </p>
        <div className="flex items-baseline">
          <span className="text-3xl font-bold text-gray-900">R$59</span>
          <span className="ml-1 text-gray-600">/ mês</span>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4 border-t border-gray-200 pt-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <div className="flex-shrink-0">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              </div>
              <p className="ml-3 text-gray-600">{feature}</p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Button
            className="w-full"
            variant="outline"
            onClick={active ? handleManagePlanClick : handleSubscribeClick}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-1 h-4 w-4 animate-spin" />
            ) : active ? (
              "Gerenciar assinatura"
            ) : (
              "Fazer assinatura"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}