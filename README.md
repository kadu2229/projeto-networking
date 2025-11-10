# Documento de Arquitetura – Plataforma de Networking

## Visão Geral

A plataforma tem como objetivo centralizar a gestão de membros e interações de grupos de networking, substituindo controles manuais e planilhas por um sistema integrado que permita administrar cadastros, reuniões, indicações e desempenho do grupo.

A aplicação foi projetada com uma arquitetura em camadas, separando responsabilidades entre Frontend (Next.js + React), Backend (Express + Sequelize) e Banco de Dados (PostgreSQL).

---

## Arquitetura da Plataforma de Gestão de Networking

### Diagrama da Arquitetura


## Arquitetura do Projeto

Veja o diagrama abaixo:

```mermaid
graph TD
  A[Usuário] --> B[Frontend - Next.js]
  B --> C[Backend - Express + Sequelize]
  C --> D[(PostgreSQL)]
