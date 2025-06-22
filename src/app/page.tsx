import {
  Activity,
  CalendarClock,
  Github,
  Linkedin,
  Mail,
  Phone,
  Stethoscope,
  Users,
} from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
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
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user) {
    redirect("/dashboard");
  }

  const features = [
    {
      icon: Activity,
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
    <div className="flex min-h-screen flex-col bg-blue-50 dark:bg-blue-950">
      {/* Seção Hero */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-blue-100 via-teal-50 to-green-100 py-16 md:py-24 lg:py-32 dark:from-blue-900 dark:via-blue-950 dark:to-gray-900">
        {/* Adicione um fundo abstrato ou um padrão sutil aqui */}
        <div
          className="absolute inset-0 opacity-20 dark:opacity-10"
          style={{
            backgroundImage: 'url("/Fundo.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <Image
            src="/Logo (1).svg"
            alt="ClínicPlus Logo"
            width={180}
            height={45}
            priority
            className="mx-auto mb-6"
          />
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-gray-50">
            Bem-vindo ao{" "}
            <span className="text-teal-600 dark:text-teal-400">ClínicPlus</span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-700 dark:text-gray-300">
            Sua solução completa para gerenciamento de clínicas, agendamentos,
            médicos e pacientes. Simplifique sua rotina e foque no que realmente
            importa: o cuidado com seus pacientes.
          </p>
          <div className="mt-10">
            <Link href="/authentication" passHref>
              <Button
                size="lg"
                className="focus:ring-opacity-50 transform rounded-lg bg-teal-600 px-8 py-3 text-base font-semibold text-white shadow-xl transition duration-300 ease-in-out hover:scale-105 hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:outline-none dark:bg-teal-500 dark:hover:bg-teal-600"
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
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-50">
              Transforme a Gestão da Sua Clínica
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-700 dark:text-gray-300">
              Descubra como o ClínicPlus pode otimizar seu dia a dia e melhorar
              a experiência dos seus pacientes.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="flex flex-col overflow-hidden rounded-xl border border-blue-200 bg-white shadow-lg transition-shadow duration-300 hover:shadow-2xl dark:border-blue-700 dark:bg-blue-800"
              >
                <CardHeader className="pb-4">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-600 dark:bg-teal-900 dark:text-teal-400">
                    <feature.icon className="h-6 w-6" strokeWidth={2.5} />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="text-base text-gray-700 dark:text-gray-300">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Seção de Chamada para Ação Final */}
      <section className="w-full bg-blue-100 py-16 md:py-24 dark:bg-blue-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-50">
            Pronto para Simplificar?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-gray-700 dark:text-gray-300">
            Experimente o ClínicPlus e veja como a tecnologia pode revolucionar
            a administração da sua clínica.
          </p>
          <div className="mt-10">
            <Link href="/authentication" passHref>
              <Button
                size="lg"
                className="focus:ring-opacity-50 transform rounded-lg bg-teal-600 px-8 py-3 text-base font-semibold text-white shadow-xl transition duration-300 ease-in-out hover:scale-105 hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:outline-none dark:bg-teal-500 dark:hover:bg-teal-600"
              >
                Comece Agora
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Rodapé com cor de contraste (Azul Marinho) e organização */}
      <footer className="w-full bg-blue-950 py-12 text-white dark:bg-blue-900">
        <div className="container mx-auto grid grid-cols-1 gap-10 px-4 md:grid-cols-3">
          {/* Coluna 1: Logo e Descrição */}
          <div className="flex flex-col items-start gap-4">
            <Image
              src="/Logo (3).svg"
              alt="ClínicPlus Logo"
              width={120}
              height={30}
            />
            <p className="text-sm leading-relaxed text-gray-300">
              Sua clínica moderna e conectada. Otimize agendamentos, pacientes e
              sua equipe médica com nossa plataforma.
            </p>
          </div>

          {/* Coluna 2: Contato */}
          <div className="md:pl-8">
            <h3 className="mb-4 text-lg font-semibold text-white">Contato</h3>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:joaopedrofreitas0901@gmail.com"
                className="flex items-center gap-2 text-gray-300 transition-colors hover:text-gray-100"
              >
                <Mail size={16} /> joaopedrofreitas0901@gmail.com
              </a>
              <a
                href="tel:+5538997502338"
                className="flex items-center gap-2 text-gray-300 transition-colors hover:text-gray-100"
              >
                <Phone size={16} /> +55 (38) 99750-2338
              </a>
            </div>
          </div>

          {/* Coluna 3: Conecte-se e Redes Sociais */}
          <div className="md:pl-8">
            <h3 className="mb-4 text-lg font-semibold text-white">
              Conecte-se
            </h3>
            <div className="mb-4 flex gap-3">
              <a
                href="https://www.linkedin.com/in/jo%C3%A3o-pedro-freitas9/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-blue-800 p-3 transition-colors hover:bg-teal-600 hover:text-white dark:bg-blue-950"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://github.com/JoaoPedroFreitas9"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-blue-800 p-3 transition-colors hover:bg-teal-600 hover:text-white dark:bg-blue-950"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="mailto:joaopedrofreitas0901@gmail.com"
                className="rounded-md bg-blue-800 p-3 transition-colors hover:bg-teal-600 hover:text-white dark:bg-blue-950"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
              <a
                href="tel:+5538997502338"
                className="rounded-md bg-blue-800 p-3 transition-colors hover:bg-teal-600 hover:text-white dark:bg-blue-950"
                aria-label="Telefone"
              >
                <Phone size={20} />
              </a>
              {/* Adicione outros ícones sociais aqui (ex: Twitter, Facebook, Instagram) */}
            </div>
            <p className="mb-4 text-sm text-gray-300">
              Siga-nos nas redes sociais para novidades e atualizações.
            </p>
          </div>
        </div>

        <div className="container mx-auto mt-8 flex flex-col items-center justify-between border-t border-blue-800 pt-8 text-center text-sm text-gray-400 md:flex-row">
          <p>
            &copy; {new Date().getFullYear()} ClínicPlus. Todos os direitos
            reservados.
          </p>
          <div className="mt-4 flex gap-4 md:mt-0">
            <Link href="#" className="transition-colors hover:text-gray-100">
              Política de Privacidade
            </Link>
            <Link href="#" className="transition-colors hover:text-gray-100">
              Termos de Uso
            </Link>
            <Link href="#" className="transition-colors hover:text-gray-100">
              Cookies
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
