import { headers } from "next/headers";
import { redirect } from "next/navigation";

import {
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/ui/page-container";
import { auth } from "@/lib/auth";

import { SubscriptionPlan } from "./_components/subscription-plan";

// Usar uma constante torna o código mais claro e fácil de atualizar
const ESSENTIAL_PLAN_ID = "essential"; // ou "pro", conforme seu banco de dados

const SubscriptionPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Sugestão: redirecionar para /authentication para consistência
  if (!session?.user) {
    redirect("/authentication");
  }

  if (!session.user.clinic) {
    redirect("/clinic-form");
  }

  // A lógica principal permanece a mesma
  const isPlanActive = session.user.plan === ESSENTIAL_PLAN_ID;

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Assinatura</PageTitle>
          <PageDescription>Gerencie a sua assinatura.</PageDescription>
        </PageHeaderContent>
      </PageHeader>
      <PageContent>
        <div className="flex w-full pt-8">
          <SubscriptionPlan
            className="w-full max-w-sm" // max-w-sm é bom para responsividade
            active={isPlanActive}
            userEmail={session.user.email as string} // Adicionar 'as string' ou '!' para garantir o tipo
          />
        </div>
      </PageContent>
    </PageContainer>
  );
};

export default SubscriptionPage;
