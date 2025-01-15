# Frontend Angular

Este é o frontend de uma aplicação desenvolvida em Angular 18, conectada a uma API backend construída com NestJS. O projeto implementa autenticação segura, proteção de rotas e uma interface intuitiva para o gerenciamento de tarefas.

---

## 🚀 Funcionalidades

- **Autenticação JWT**: Login seguro e persistência da sessão do usuário.
- **Proteção de Rotas**: Apenas usuários autenticados têm acesso às áreas restritas.
- **Formulários Reativos**: Validação dinâmica com mensagens personalizadas de erro.
- **Conexão com Backend**: Integração com API REST via `HttpClient` para operações de CRUD.
- **Design Responsivo**: Interface adaptada para dispositivos móveis e desktops.

---

## 🛠️ Tecnologias Utilizadas

- **Framework**: Angular 18
- **Linguagem**: TypeScript
- **Gerenciamento de Estado**: RxJS
- **Estilização**: SCSS
- **Comunicação HTTP**: Angular HttpClient

---

## 🌐 Rotas da Aplicação

- **`/login`**:  
  Página de autenticação onde o usuário insere suas credenciais (usuário e senha) para acessar o sistema.

- **`/task`** *(rota protegida)*:  
  Página principal com o gerenciamento de tarefas. Apenas usuários autenticados podem acessá-la.

