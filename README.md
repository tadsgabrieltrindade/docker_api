# 🐳 Docker API - Servidor Node.js Básico

Projeto de aprendizado de Docker com uma API simples em Node.js + Express.

**Curso:** [Docker: Criando e Gerenciando Containers - Alura](https://cursos.alura.com.br/course/docker-criando-gerenciando-containers)

---

## 📑 Índice

- [O que é Docker?](#-o-que-é-docker)
- [Conceitos Aplicados](#️-conceitos-aplicados)
  - [Dockerfile](#1️⃣-dockerfile)
  - [Imagem vs Container](#2️⃣-imagem-vs-container)
  - [.dockerignore](#3️⃣-dockerignore)
- [Comandos Docker Utilizados](#-comandos-docker-utilizados)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Testando a API](#-testando-a-api)
- [Comandos Rápidos](#-comandos-rápidos)
- [Aprendizados](#-aprendizados)
- [Recursos](#-recursos)

---

## 📋 O que é Docker?

Docker é uma plataforma que permite **empacotar aplicações** e suas dependências em **containers**. Um container é como uma "caixa isolada" que contém tudo que a aplicação precisa para rodar (código, bibliotecas, Node.js, etc.).

### 🎯 Vantagens do Docker

- ✅ **Portabilidade**: Roda em qualquer ambiente (Windows, Linux, Mac)
- ✅ **Isolamento**: Cada container é independente
- ✅ **Consistência**: "Funciona na minha máquina" → "Funciona em qualquer máquina"
- ✅ **Facilita deploy**: Mesmo ambiente em desenvolvimento e produção

---

## 🏗️ Conceitos Aplicados

### 1️⃣ **Dockerfile**

O `Dockerfile` é a "receita" para criar uma imagem Docker. Cada linha é uma instrução:

```dockerfile
FROM node:24              # Imagem base (Node.js versão 24)
WORKDIR /app-node         # Diretório de trabalho dentro do container
COPY . .                  # Copia arquivos do projeto para o container
RUN npm install           # Instala dependências
ENTRYPOINT npm start      # Comando executado ao iniciar o container
```

**Detalhamento:**
- **FROM**: Define a imagem base (já vem com Node.js instalado)
- **WORKDIR**: Cria e define o diretório onde os comandos serão executados
- **COPY**: Copia arquivos do host para o container
- **RUN**: Executa comandos durante a construção da imagem
- **ENTRYPOINT**: Define o comando principal do container

---

### 2️⃣ **Imagem vs Container**

| Conceito | Descrição | Analogia |
|----------|-----------|----------|
| **Imagem** | Template/modelo imutável | 📦 "Receita de bolo" |
| **Container** | Instância em execução da imagem | 🍰 "Bolo pronto" |

- Uma **imagem** pode gerar vários **containers**
- Imagens são criadas com `docker build`
- Containers são criados com `docker run`

---

### 3️⃣ **.dockerignore**

Similar ao `.gitignore`, evita copiar arquivos desnecessários para a imagem:

```
node_modules     # Não copiar dependências locais
.env             # Não copiar variáveis de ambiente
.git             # Não copiar histórico do Git
```

**Por quê?** 
- ⚡ Reduz tamanho da imagem
- 🚀 Acelera o build
- 🔒 Evita conflitos de dependências entre SO

---

## 🚀 Comandos Docker Utilizados

### 🔨 Construir a Imagem

```bash
docker build -t gabrieltrindade/app-node:1.0 .
```

- `build`: Constrói a imagem
- `-t`: Define a tag (nome:versão)
- `.`: Contexto (diretório atual)

---

### ▶️ Executar o Container

```bash
docker run -d -p 8081:3000 gabrieltrindade/app-node:1.0
```

- `run`: Cria e inicia um container
- `-d`: Modo **detached** (background)
- `-p 8081:3000`: Mapeia porta **host:container**
  - `8081` → Porta no seu computador
  - `3000` → Porta dentro do container
- `gabrieltrindade/app-node:1.0`: Imagem a ser usada

**Acesso:** http://localhost:8081

---

### 📋 Listar Containers

```bash
# Containers em execução
docker ps

# Todos os containers (incluindo parados)
docker ps -a
```

---

### 🛑 Parar um Container

```bash
docker stop <container_id>
```

---

### 🗑️ Remover um Container

```bash
docker rm <container_id>

# Forçar remoção (mesmo em execução)
docker rm -f <container_id>
```

---

### 🔍 Ver Logs do Container

```bash
docker logs <container_id>

# Acompanhar logs em tempo real
docker logs -f <container_id>
```

---

### 📊 Listar Imagens

```bash
docker images
```

---

### 🗑️ Remover uma Imagem

```bash
docker rmi gabrieltrindade/app-node:1.0
```

---

## 📂 Estrutura do Projeto

```
docker_api/
├── app.js              # Servidor Express
├── package.json        # Dependências Node.js
├── Dockerfile          # Instruções para criar a imagem
├── .dockerignore       # Arquivos ignorados no build
├── .gitignore          # Arquivos ignorados no Git
└── README.md           # Documentação do projeto
```

---

## 🧪 Testando a API

Após executar o container:

```bash
curl http://localhost:8081
```

**Resposta esperada:**
```json
{
  "message": "Hello Docker!"
}
```

---

## 📚 Comandos Rápidos

```bash
# Build da imagem
docker build -t gabrieltrindade/app-node:1.0 .

# Rodar container
docker run -d -p 8081:3000 gabrieltrindade/app-node:1.0

# Ver containers rodando
docker ps

# Parar container
docker stop <id>

# Ver logs
docker logs <id>

# Remover container
docker rm <id>

# Remover imagem
docker rmi gabrieltrindade/app-node:1.0
```

---

## 🎓 Aprendizados

- ✅ Como criar um `Dockerfile`
- ✅ Diferença entre imagem e container
- ✅ Build de imagens Docker
- ✅ Execução de containers em background
- ✅ Mapeamento de portas (port binding)
- ✅ Gerenciamento básico de containers
- ✅ Uso do `.dockerignore`

---

## 🔗 Recursos

- [Documentação Oficial Docker](https://docs.docker.com/)
- [Docker Hub](https://hub.docker.com/)
- [Curso Alura - Docker](https://cursos.alura.com.br/course/docker-criando-gerenciando-containers)

---

**Autor:** Gabriel Trindade  
**Data:** Novembro 2025
