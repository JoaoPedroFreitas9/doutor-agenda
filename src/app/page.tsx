import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button"; //
import { auth } from "@/lib/auth"; //

export default async function HomePage() {
  // Verifica se o usuário já está logado e redireciona para o dashboard
  const session = await auth.api.getSession({
    headers: await headers(), // Necessário para Server Components que usam auth.api.getSession
  });

  if (session?.user) {
    redirect("/dashboard"); // Redireciona para o dashboard se já houver sessão
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 p-6 text-gray-800">
      <header className="animate-fade-in-down mb-12 text-center">
        {/* Você pode adicionar um logo aqui se desejar */}
        {/* <img src="/logo.png" alt="Doutor Agenda Logo" className="mx-auto mb-6 h-24 w-auto" /> */}
        <h1 className="mb-4 text-5xl font-bold text-indigo-700">
          Bem-vindo ao ClínicPlus!
        </h1>
        <p className="mx-auto max-w-2xl text-xl text-gray-600">
          Sua solução completa para gerenciamento de clínicas, agendamentos,
          médicos e pacientes. Simplifique sua rotina e foque no que realmente
          importa: o cuidado com seus pacientes.
        </p>
      </header>

      <main className="mb-12 text-center">
        <p className="mb-8 text-lg text-gray-700">
          Acesse sua conta ou crie um novo cadastro para começar a transformar a
          gestão da sua clínica.
        </p>
        <Link href="/authentication" passHref>
          <Button
            size="lg"
            className="transform rounded-lg bg-indigo-600 px-10 py-4 font-semibold text-white shadow-xl transition duration-300 ease-in-out hover:scale-105 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            aria-label="Acessar a plataforma Doutor Agenda"
          >
            Acessar Plataforma
          </Button>
        </Link>
      </main>

      <section className="mx-auto my-12 w-full max-w-4xl rounded-xl bg-white/70 p-8 shadow-2xl backdrop-blur-md">
        <h2 className="mb-8 text-center text-3xl font-semibold text-indigo-700">
          Funcionalidades Principais
        </h2>
        <div className="grid gap-8 text-center md:grid-cols-3">
          <div className="rounded-lg border border-indigo-200 p-6 transition-shadow duration-300 hover:shadow-lg">
            <h3 className="mb-2 text-xl font-semibold text-indigo-600">
              Gestão de Clínicas
            </h3>
            <p className="text-gray-600">
              Cadastre e gerencie múltiplas clínicas de forma centralizada.
            </p>
          </div>
          <div className="rounded-lg border border-indigo-200 p-6 transition-shadow duration-300 hover:shadow-lg">
            <h3 className="mb-2 text-xl font-semibold text-indigo-600">
              Agendamentos Inteligentes
            </h3>
            <p className="text-gray-600">
              Marque, visualize e gerencie consultas de forma fácil e intuitiva.
            </p>
          </div>
          <div className="rounded-lg border border-indigo-200 p-6 transition-shadow duration-300 hover:shadow-lg">
            <h3 className="mb-2 text-xl font-semibold text-indigo-600">
              Cadastro de Pacientes
            </h3>
            <p className="text-gray-600">
              Mantenha o histórico e informações dos seus pacientes organizados.
            </p>
          </div>
        </div>
      </section>

      <footer className="mt-auto py-6 text-center text-gray-600">
        <p>
          &copy; {new Date().getFullYear()} Doutor Agenda. Todos os direitos
          reservados.
        </p>
      </footer>
    </div>
  );
}
