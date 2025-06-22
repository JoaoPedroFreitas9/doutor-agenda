
import {
  Activity,
  CalendarClock,
  DollarSign,
  HeartPulse,
  LayoutDashboard,
  Users,
} from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

import { SubscriptionPlan } from "@/app/(protected)/subscription/_components/subscription-plan";
import { auth } from "@/lib/auth";


const features = [
  {
    icon: LayoutDashboard,
    title: "Dashboard Analítico Completo",
    description:
      "Tenha uma visão 360º da sua clínica com métricas de faturamento, agendamentos e performance dos médicos.",
  },
  {
    icon: CalendarClock,
    title: "Agendamentos Inteligentes e Ilimitados",
    description:
      "Otimize a agenda com um sistema de marcação e gestão de consultas que economiza seu tempo e encanta seus pacientes.",
  },
  {
    icon: DollarSign,
    title: "Controle de Faturamento",
    description:
      "Acompanhe os ganhos de cada consulta e tenha uma visão clara da saúde financeira do seu consultório.",
  },
  {
    icon: Users,
    title: "Gestão de Pacientes",
    description:
      "Centralize o histórico e as informações dos seus pacientes de forma segura, organizada e sempre acessível.",
  },
  {
    icon: HeartPulse,
    title: "Gerenciamento de Equipe Médica",
    description:
      "Cadastre até 3 médicos, defina especialidades, horários de atendimento e valores de consulta com precisão.",
  },
  {
    icon: Activity,
    title: "Suporte Prioritário",
    description:
      "Conte com nossa equipe de suporte via e-mail para resolver qualquer dúvida ou problema rapidamente.",
  },
];

export default async function NewSubscriptionPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/authentication");
  }

  if (session.user.plan) {
    redirect("/subscription");
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-blue-50 to-teal-50 dark:from-gray-900 dark:via-blue-950 dark:to-gray-900">
      
      <main className="container mx-auto grid grid-cols-1 gap-12 px-4 py-8 lg:grid-cols-2 lg:py-16">
        
        <div className="flex flex-col justify-center">
          <Image
            src="/Logo (1).svg"
            alt="ClínicPlus Logo"
            width={150}
            height={40}
            className="mb-6"
          />
          <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 lg:text-4xl dark:text-white">
            Eleve a Gestão da Sua Clínica a um Novo Patamar
          </h1>
          <p className="mb-10 text-base text-gray-600 dark:text-gray-300">
            Para continuar a transformar seu consultório, escolha o plano
            Essencial e desbloqueie todas as ferramentas que otimizam seu tempo
            e melhoram o atendimento.
          </p>

          <div className="space-y-5">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-start gap-4">
                <div className="flex-shrink-0 rounded-full bg-teal-100 p-2 dark:bg-teal-900">
                  <feature.icon className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coluna de Assinatura */}
        <div className="flex w-full items-start justify-center lg:items-center">
          <div className="w-full max-w-md">
            <SubscriptionPlan
              userEmail={session.user.email as string}
              active={false}
            />
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Ao assinar, você concorda com nossos{" "}
                <a
                  href="/terms"
                  className="text-teal-600 hover:underline dark:text-teal-400"
                >
                  Termos de Serviço
                </a>{" "}
                e nossa{" "}
                <a
                  href="/privacy"
                  className="text-teal-600 hover:underline dark:text-teal-400"
                >
                  Política de Privacidade
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
