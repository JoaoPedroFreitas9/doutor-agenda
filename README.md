# ClínicPlus: Gestão Inteligente para Clínicas e Consultórios

![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Technologies](https://img.shields.io/badge/Stack-Next.js%20%7C%20Drizzle%20%7C%20PostgreSQL-blueviolet)
![Version](https://img.shields.io/badge/Version-0.1.0-blue)

![ClínicPlus Logo](<public/Logo%20(3).svg>) 

## Sumário

- [Sobre o Projeto](#sobre-o-projeto)
- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Implantação](#implantação)
- [Licença](#licença)


## Sobre o Projeto

### Visão Geral

O ClínicPlus é uma plataforma web robusta e intuitiva, desenvolvida para modernizar e otimizar a gestão de clínicas, consultórios e centros médicos. Com uma interface de usuário cuidadosamente projetada e um backend eficiente, o sistema capacita profissionais de saúde a focar integralmente no atendimento ao paciente, minimizando as complexidades administrativas.

Construído sobre uma stack tecnológica moderna, o ClínicPlus oferece uma experiência fluida e segura, desde o agendamento inteligente de consultas até o gerenciamento detalhado de pacientes e equipes médicas.

### Funcionalidades

- **Gestão Abrangente de Clínicas:** Centralize a administração de múltiplas unidades ou de uma única clínica, garantindo organização e acessibilidade.
- **Agendamentos Inteligentes:** Um sistema de agendamento intuitivo que permite marcar, visualizar e gerenciar consultas com facilidade, otimizando o tempo dos médicos e a experiência dos pacientes.
- **Cadastro e Histórico de Pacientes:** Mantenha um banco de dados seguro e organizado com todas as informações e histórico clínico dos pacientes, sempre disponível para consulta.
- **Gerenciamento de Médicos:** Cadastre sua equipe, defina especialidades, horários de disponibilidade e valores de consulta com precisão, facilitando a organização interna.
- **Sistema de Assinaturas (SaaS):** Integrado com Stripe para gerenciamento de planos de assinatura e processamento seguro de pagamentos.
- **Dashboard Analítico:** Tenha uma visão geral e métricas importantes da performance da sua clínica através de um painel interativo e visual.

## Tecnologias Utilizadas

Este projeto foi meticulosamente desenvolvido utilizando as seguintes tecnologias e ferramentas:

- **Framework & Linguagem:** [Next.js 15.3.3](https://nextjs.org/) (React Framework), [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/) (Componentes UI)
- **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/) (como banco de dados relacional)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/) (para interação eficiente com o banco de dados)
- **Autenticação:** [Better Auth](https://github.com/diancxx/better-auth) (solução de autenticação personalizável e robusta)
- **Pagamentos:** [Stripe](https://stripe.com/) (para processamento de pagamentos e gestão de assinaturas)
- **Gerenciamento de Estado/Dados:** [React Query (@tanstack/react-query)](https://tanstack.com/query/latest) (para gerenciamento de dados assíncronos)
- **Formulários:** [React Hook Form](https://react-hook-form.com/) (para validação e gerenciamento de formulários)
- **Server Actions:** [Next-Safe-Action](https://next-safe-action.dev/) (para Server Actions tipadas e seguras)
- **Datas:** [Day.js](https://day.js.org/) (para manipulação de datas e horas)
- **Ícones:** [Lucide React](https://lucide.dev/icons/)
- **Notificações:** [Sonner](https://sonner.emilkowalski.no/) (para toasts e notificações amigáveis)

## Implantação

O ClínicPlus é projetado para implantação em plataformas de hospedagem modernas e escaláveis. Atualmente, a implantação é realizada de forma eficiente via [Vercel](https://vercel.com/).

## Licença

Este projeto está licenciado sob a licença MIT. Para mais detalhes, consulte o arquivo [LICENSE](LICENSE) na raiz do repositório. 
