# Documento de Arquitetura – Plataforma de Networking

## Visão Geral

A plataforma tem como objetivo centralizar a gestão de membros e interações de grupos de networking, substituindo controles manuais e planilhas por um sistema integrado que permita administrar cadastros, reuniões, indicações e desempenho do grupo.

A aplicação foi projetada com uma arquitetura em camadas, separando responsabilidades entre Frontend (Next.js + React), Backend (Express + Sequelize) e Banco de Dados (PostgreSQL).

---

## Arquitetura da Plataforma de Gestão de Networking

### Diagrama da Arquitetura


## Arquitetura do Projeto

graph TD
  A[Usuário (Membro / Admin)] -->|Navegador| B[Frontend - Next.js + React]
  B -->|API REST (HTTP/JSON)| C[Backend - Node.js + Express]
  C -->|ORM Sequelize| D[(PostgreSQL)]

  subgraph Frontend [Frontend - Next.js]
    B1[Páginas e Componentes React]
    B2[Context API / Hooks para estado global]
    B3[Axios para comunicação com a API]
  end
  B --> B1
  B1 --> B2
  B2 --> B3

  subgraph Backend [Backend - Express + Sequelize]
    C1[Rotas REST]
    C2[Controllers]
    C3[Services]
    C4[Models (ORM)]
  end
  C --> C1
  C1 --> C2
  C2 --> C3
  C3 --> C4

  subgraph Banco_de_Dados [Banco de Dados - PostgreSQL]
    D1[Tabela: Intenções]
    D2[Tabela: Membros]
    D3[Tabela: Indicações]
    D4[Tabela: Obrigados]
    D5[Tabela: Reuniões]
    D6[Tabela: Mensalidades]
  end
  D --> D1
  D --> D2
  D --> D3
  D --> D4
  D --> D5
  D --> D6

