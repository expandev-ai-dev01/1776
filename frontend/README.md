# Catálogo de Carros

Listagem de carros, onde ao clicar no card consigo ver detalhes e preencher um formulário de contato.

## Tecnologias

- React 19.2.0
- TypeScript 5.9.3
- Vite 7.2.2
- Tailwind CSS 4.1.17
- React Router DOM 7.9.6
- TanStack Query 5.90.2
- Zustand 5.0.8
- React Hook Form 7.66.1
- Zod 4.1.12
- Axios 1.13.2

## Estrutura do Projeto

```
src/
├── assets/          # Estilos e recursos estáticos
├── core/            # Componentes e lógica compartilhada
│   ├── components/  # Componentes UI reutilizáveis
│   ├── contexts/    # Contextos React
│   ├── lib/         # Configurações de bibliotecas
│   ├── types/       # Tipos TypeScript globais
│   └── utils/       # Funções utilitárias
├── domain/          # Domínios de negócio
├── layouts/         # Layouts da aplicação
├── pages/           # Páginas da aplicação
├── router/          # Configuração de rotas
├── App.tsx          # Componente raiz
└── main.tsx         # Ponto de entrada
```

## Instalação

```bash
npm install
```

## Configuração

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:3000
VITE_API_VERSION=v1
VITE_API_TIMEOUT=30000
```

## Desenvolvimento

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Lint

```bash
npm run lint
```

## Funcionalidades

- **Listagem de carros**: Exibição de todos os veículos disponíveis no catálogo
- **Visualização de detalhes**: Página com informações detalhadas do veículo
- **Formulário de contato**: Formulário para manifestar interesse no veículo

## Arquitetura

### Componentes Core

Componentes reutilizáveis seguem o padrão single-file:
- Button
- Card
- Input
- Textarea
- Label
- LoadingSpinner
- ErrorBoundary

### API Client

Dois clientes HTTP configurados:
- `publicClient`: Para endpoints públicos (`/api/v1/external`)
- `authenticatedClient`: Para endpoints autenticados (`/api/v1/internal`)

### State Management

- **TanStack Query**: Gerenciamento de estado do servidor
- **Zustand**: Estado global da aplicação
- **React Hook Form**: Gerenciamento de formulários

### Validação

- **Zod**: Validação de schemas TypeScript-first
- Validações comuns disponíveis em `src/core/lib/validation.ts`

## Padrões de Código

### Importações

Use o alias `@/` para importações:

```typescript
import { Button } from '@/core/components/Button';
import { apiConfig } from '@/core/lib/api';
```

### Componentes

Componentes core seguem o padrão single-file com tipos, variantes e JSX no mesmo arquivo.

### Estilização

Use apenas classes Tailwind CSS:
- Variáveis CSS para cores: `bg-[--color-primary-600]`
- Utilitários customizados: `center`, `stack`
- Responsive design: mobile-first

## Licença

MIT