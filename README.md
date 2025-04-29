[![Build Status](https://app.travis-ci.com/navindu-sachintha/hopeline.svg?token=xmypyZXQs3K5qtQiMqq6&branch=main)](https://app.travis-ci.com/navindu-sachintha/hopeline)
# Hopeline Project Developer Guide

## Overview

Hopeline is a web application built with the T3 Stack that includes professional dashboard features for case management. This guide will help developers get started with the project, understand its structure, and contribute effectively.

## Tech stack

- [Next.js](https://nextjs.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [Sanity]()

## Learn More

## Overview

Hopeline is a web application built with the T3 Stack that includes professional dashboard features for case management. This guide will help developers get started with the project, understand its structure, and contribute effectively.

## Tech Stack

- [Next.js](https://nextjs.org) - React framework
- [Prisma](https://prisma.io) - Database ORM
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS
- [Radix UI](https://www.radix-ui.com/) - Headless UI components
- [Sanity](https://www.sanity.io/) - Content management

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PNPM package manager
- PostgreSQL database

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/navindu-sachintha/hopeline.git
   cd hopeline
   ```

2. Install dependencies
   ```bash
   pnpm install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env.local
   ```
   Edit .env.local with your configuration values.

4. Start the development database
   ```bash
   ./start-database.sh
   ```

5. Run the development server
   ```bash
   pnpm dev
   ```

## Project Structure

- src - Application source code
  - `/app` - Next.js app directory
  - `/components` - Reusable UI components
    - `/ui` - Base UI components (buttons, cards, etc.)
    - `/proDash` - Professional dashboard components
  - `/lib` - Utility functions
  - `/sanity` - Sanity CMS configuration

## Key Components

### Professional Dashboard

The ProfessionalDashboard.tsx component provides an interface for professionals to manage cases. It includes:

- Responsive sidebar navigation
- Case management functionality
- Mobile-friendly design

### UI Components

The project uses custom UI components built with Radix UI primitives:

- ScrollArea - Enhanced scrollable areas

## Database Management

The project uses both Prisma and Drizzle for database operations:

- Configure Prisma in the prisma directory
- Drizzle configuration is in drizzle.config.ts

## Sanity CMS Integration

The project integrates Sanity CMS for content management:

- Configuration in sanity.config.ts
- Schema types in schemaTypes
- Accessible at `/sanity` route

## Deployment

Deploy to production environments following these guides:
- [Vercel Deployment](https://create.t3.gg/en/deployment/vercel)
- [Netlify Deployment](https://create.t3.gg/en/deployment/netlify)

## Contributing

1. Create a feature branch from `main`
2. Make your changes and test thoroughly
3. Submit a pull request with a clear description
4. Ensure CI passes via Travis CI

## Resources

- [T3 Stack Documentation](https://create.t3.gg/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)