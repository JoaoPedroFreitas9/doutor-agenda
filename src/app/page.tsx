import {
  Activity, // Exemplo de ícone, pode ser trocado por um mais específico para "Gestão de Clínicas"
  CalendarClock,
  Stethoscope,
  Users,
} from "lucide-react"; // Ícones para as funcionalidades
import { headers } from "next/headers";
import Image from "next/image"; // Para o logo, se decidir usar
import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/lib/auth";

export default async function HomePage() {
  // Verifica se o usuário já está logado e redireciona para o dashboard
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user) {
    redirect("/dashboard");
  }

  const features = [
    {
      icon: Activity, // Considere trocar por um ícone como Home, Building2, Hospital
      title: "Gestão de Clínicas",
      description:
        "Administre múltiplas unidades ou foque em uma única clínica com facilidade e organização centralizada.",
    },
    {
      icon: CalendarClock,
      title: "Agendamentos Inteligentes",
      description:
        "Marque, visualize e gerencie consultas de forma intuitiva, otimizando o tempo de médicos e pacientes.",
    },
    {
      icon: Users,
      title: "Cadastro de Pacientes",
      description:
        "Mantenha o histórico e informações dos seus pacientes seguros, organizados e sempre acessíveis.",
    },
    {
      icon: Stethoscope,
      title: "Gerenciamento de Médicos",
      description:
        "Cadastre sua equipe, defina especialidades, horários de atendimento e valores de consulta com precisão.",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
      {/* Seção Hero */}
      <section className="w-full bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 py-16 md:py-24 lg:py-32 dark:from-slate-800 dark:via-slate-900 dark:to-black">
        <div className="container mx-auto px-4 text-center">
          {/* Opcional: Adicionar o logo aqui */}
          <Image
            src="/Fundo.jpg"
            alt="Doutor Agenda Logo"
            width={180}
            height={45}
            className="priority mx-auto"
          />{" "}
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl dark:text-slate-50">
            Bem-vindo ao{" "}
            <span className="text-indigo-600 dark:text-indigo-400">
              ClínicPlus
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-700 dark:text-slate-300">
            Sua solução completa para gerenciamento de clínicas, agendamentos,
            médicos e pacientes. Simplifique sua rotina e foque no que realmente
            importa: o cuidado com seus pacientes.
          </p>
          <div className="mt-10">
            <Link href="/authentication" passHref>
              <Button
                size="lg"
                className="focus:ring-opacity-50 transform rounded-lg bg-indigo-600 px-8 py-3 text-base font-semibold text-white shadow-xl transition duration-300 ease-in-out hover:scale-105 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:bg-indigo-500 dark:hover:bg-indigo-600"
                aria-label="Acessar a plataforma Doutor Agenda"
              >
                Acessar Plataforma
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Seção de Funcionalidades */}
      <section id="features" className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center md:mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-50">
              Transforme a Gestão da Sua Clínica
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
              Descubra como o Doutor Agenda pode otimizar seu dia a dia e
              melhorar a experiência dos seus pacientes.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg transition-shadow duration-300 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-800"
              >
                <CardHeader className="pb-4">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-400">
                    <feature.icon className="h-6 w-6" strokeWidth={2.5} />
                  </div>
                  <CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="text-base text-slate-600 dark:text-slate-300">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Seção de Chamada para Ação Final (Opcional) */}
      <section className="w-full bg-slate-100 py-16 md:py-24 dark:bg-slate-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-50">
            Pronto para Simplificar?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600 dark:text-slate-300">
            Experimente o Doutor Agenda e veja como a tecnologia pode
            revolucionar a administração da sua clínica.
          </p>
          <div className="mt-10">
            <Link href="/authentication" passHref>
              <Button
                size="lg"
                className="focus:ring-opacity-50 transform rounded-lg bg-indigo-600 px-8 py-3 text-base font-semibold text-white shadow-xl transition duration-300 ease-in-out hover:scale-105 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:bg-indigo-500 dark:hover:bg-indigo-600"
              >
                Comece Agora Gratuitamente
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="border-t border-slate-200 py-8 text-center dark:border-slate-700">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          &copy; {new Date().getFullYear()} ClÍnicPlus. Todos os direitos
          reservados.
        </p>
      </footer>
    </div>
  );
}
