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
  - [Docker Hub e Repositórios](#4️⃣-docker-hub-e-repositórios)
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
ARG PORT_BUILD=6000       # Argumento de build (valor padrão: 6000)
ENV PORT=${PORT_BUILD}    # Variável de ambiente usando o argumento
EXPOSE ${PORT_BUILD}      # Documenta a porta que o container expõe
COPY . .                  # Copia arquivos do projeto para o container
RUN npm install           # Instala dependências
ENTRYPOINT npm start      # Comando executado ao iniciar o container
```

**Detalhamento:**
- **FROM**: Define a imagem base (já vem com Node.js instalado)
- **WORKDIR**: Cria e define o diretório onde os comandos serão executados
- **ARG**: Define um argumento que pode ser passado durante o build com `--build-arg`
- **ENV**: Define uma variável de ambiente disponível no container
- **EXPOSE**: Documenta qual porta o container usa (não publica automaticamente)
- **COPY**: Copia arquivos do host para o container
- **RUN**: Executa comandos durante a construção da imagem
- **ENTRYPOINT**: Define o comando principal do container

**🔑 Diferença entre ARG e ENV:**
- **ARG**: Disponível apenas durante o build da imagem
- **ENV**: Disponível durante o build E na execução do container

**💡 Exemplo com porta customizada:**
```bash
# Build com porta padrão (6000)
docker build -t gabrieltrindade/app-node:1.0 .

# Build com porta customizada
docker build -t gabrieltrindade/app-node:1.0 --build-arg PORT_BUILD=8080 .
```

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

### 4️⃣ **Docker Hub e Repositórios**

**Docker Hub** é um registro público de imagens Docker (similar ao GitHub para código). Permite armazenar, compartilhar e distribuir imagens Docker.

#### 🏷️ **Tags (Versões)**

Tags são usadas para versionar imagens Docker. A sintaxe é:

```
usuário/nome-imagem:tag
```

**Exemplos:**
- `iamgabstrindade/app-node:1.0` → Versão 1.0
- `iamgabstrindade/app-node:1.1` → Versão 1.1
- `iamgabstrindade/app-node:latest` → Última versão (padrão)

**💡 Boas práticas de tags:**
- Use versões semânticas: `1.0.0`, `2.1.3`
- Tag `latest` para a versão mais recente
- Tags descritivas: `prod`, `dev`, `staging`

---

#### 📤 **Publicando Imagens no Docker Hub**

**Passo 1: Login no Docker Hub**
```bash
docker login
```
- Insira seu username e password do Docker Hub

**Passo 2: Criar a imagem com seu username**
```bash
docker build -t iamgabstrindade/app-node:1.1 .
```

**Passo 3: Fazer push da imagem**
```bash
docker push iamgabstrindade/app-node:1.1
```

---

#### 🏷️ **Criando Tags Adicionais**

```bash
# Criar uma nova tag a partir de uma imagem existente
docker tag iamgabstrindade/app-node:1.1 iamgabstrindade/app-node:latest

# Fazer push da nova tag
docker push iamgabstrindade/app-node:latest
```

---

#### 📥 **Baixando Imagens do Docker Hub**

```bash
# Baixar uma imagem específica
docker pull iamgabstrindade/app-node:1.1

# Baixar a versão latest (padrão)
docker pull iamgabstrindade/app-node
```

---

#### 🔍 **Benefícios do Docker Hub**

- ✅ **Compartilhamento**: Distribua suas imagens publicamente ou privadamente
- ✅ **Versionamento**: Mantenha múltiplas versões da mesma imagem
- ✅ **Portabilidade**: Acesse suas imagens de qualquer lugar
- ✅ **CI/CD**: Integre com pipelines de deploy automatizado
- ✅ **Backup**: Suas imagens ficam armazenadas na nuvem

---

## 🚀 Comandos Docker Utilizados

### 🔨 Construir a Imagem

```bash
# Build com porta padrão (6000)
docker build -t gabrieltrindade/app-node:1.0 .

# Build com porta customizada (usando ARG)
docker build -t gabrieltrindade/app-node:1.0 --build-arg PORT_BUILD=8080 .
```

- `build`: Constrói a imagem
- `-t`: Define a tag (nome:versão)
- `--build-arg`: Passa argumentos para o Dockerfile (ARG)
- `.`: Contexto (diretório atual)

---

### ▶️ Executar o Container

```bash
# Com a porta padrão definida no Dockerfile (6000)
docker run -d -p 8081:6000 gabrieltrindade/app-node:1.0

# Ou se você fez build com porta customizada (ex: 8080)
docker run -d -p 8081:8080 gabrieltrindade/app-node:1.0
```

- `run`: Cria e inicia um container
- `-d`: Modo **detached** (background)
- `-p 8081:6000`: Mapeia porta **host:container**
  - `8081` → Porta no seu computador
  - `6000` → Porta dentro do container (definida por ENV PORT)
- `gabrieltrindade/app-node:1.0`: Imagem a ser usada

**Acesso:** http://localhost:8081

**💡 Dica:** A porta do container deve corresponder ao valor de `PORT_BUILD` usado no build.

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

### 🔐 Login no Docker Hub

```bash
docker login
```

Insira suas credenciais do Docker Hub para fazer push de imagens.

---

### 🏷️ Criar Tag para uma Imagem

```bash
# Criar uma tag a partir de uma imagem existente
docker tag iamgabstrindade/app-node:1.1 iamgabstrindade/app-node:latest
```

---

### 📤 Publicar Imagem no Docker Hub

```bash
# Push de uma versão específica
docker push iamgabstrindade/app-node:1.1

# Push de múltiplas tags
docker push iamgabstrindade/app-node:latest
```

---

### 📥 Baixar Imagem do Docker Hub

```bash
# Baixar versão específica
docker pull iamgabstrindade/app-node:1.1

# Baixar latest (padrão)
docker pull iamgabstrindade/app-node
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
# Build da imagem (porta padrão)
docker build -t iamgabstrindade/app-node:1.1 .

# Build da imagem (porta customizada)
docker build -t iamgabstrindade/app-node:1.1 --build-arg PORT_BUILD=8080 .

# Rodar container (ajuste a porta do container conforme o build)
docker run -d -p 8081:6000 iamgabstrindade/app-node:1.1

# Ver containers rodando
docker ps

# Parar container
docker stop <id>

# Ver logs
docker logs <id>

# Remover container
docker rm <id>

# Remover imagem
docker rmi iamgabstrindade/app-node:1.1

# Login no Docker Hub
docker login

# Criar tag adicional
docker tag iamgabstrindade/app-node:1.1 iamgabstrindade/app-node:latest

# Push para Docker Hub
docker push iamgabstrindade/app-node:1.1
docker push iamgabstrindade/app-node:latest

# Pull do Docker Hub
docker pull iamgabstrindade/app-node:1.1
```

---

## 🎓 Aprendizados

- ✅ Como criar um `Dockerfile`
- ✅ Diferença entre imagem e container
- ✅ Uso de **ARG** para argumentos de build
- ✅ Uso de **ENV** para variáveis de ambiente
- ✅ Comando **EXPOSE** para documentar portas
- ✅ Build de imagens Docker com argumentos customizados
- ✅ Execução de containers em background
- ✅ Mapeamento de portas (port binding)
- ✅ Gerenciamento básico de containers
- ✅ Uso do `.dockerignore`
- ✅ **Tags** e versionamento de imagens
- ✅ Publicar imagens no **Docker Hub**
- ✅ Login e autenticação no Docker Hub
- ✅ Download de imagens de repositórios remotos

---

## 🔗 Recursos

- [Documentação Oficial Docker](https://docs.docker.com/)
- [Docker Hub](https://hub.docker.com/)
- [Curso Alura - Docker](https://cursos.alura.com.br/course/docker-criando-gerenciando-containers)

---

**Autor:** Gabriel Trindade  
**Data:** Novembro 2025
