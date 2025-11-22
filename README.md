# 🐳 Docker API - Servidor Node.js Básico

Projeto de aprendizado de Docker com uma API simples em Node.js + Express.

**Curso:** [Docker: Criando e Gerenciando Containers - Alura](https://cursos.alura.com.br/course/docker-criando-gerenciando-containers)

**Docker Hub:** [iamgabstrindade/app-node](https://hub.docker.com/r/iamgabstrindade/app-node)

---

## 🚀 Quick Start

### Opção 1: Docker Compose (Recomendado)

```bash
# Clonar o repositório e executar
docker compose up -d

# Acessar: http://localhost:3000
```

### Opção 2: Docker Run (Manual)

```bash
# Baixar e executar a última versão
docker pull iamgabstrindade/app-node:1.3
docker run -d -p 3000:6000 iamgabstrindade/app-node:1.3

# Acessar: http://localhost:3000
```

---

## 📑 Índice

- [O que é Docker?](#-o-que-é-docker)
- [Conceitos Aplicados](#️-conceitos-aplicados)
  - [Dockerfile](#1️⃣-dockerfile)
  - [Imagem vs Container](#2️⃣-imagem-vs-container)
  - [.dockerignore](#3️⃣-dockerignore)
  - [Docker Hub e Repositórios](#4️⃣-docker-hub-e-repositórios)
  - [Persistência de Dados](#5️⃣-persistência-de-dados-volumes-e-bind-mounts)
  - [Docker Networks](#6️⃣-docker-networks-redes)
  - [Docker Compose](#7️⃣-docker-compose)
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
COPY ./CODE .             # Copia arquivos da pasta CODE para o container
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

### 5️⃣ **Persistência de Dados (Volumes e Bind Mounts)**

Por padrão, os dados dentro de um container são **temporários** e são perdidos quando o container é removido. Para persistir dados, o Docker oferece duas soluções principais:

---

#### 📦 **Volumes (Gerenciados pelo Docker)**

Volumes são gerenciados completamente pelo Docker e armazenados em uma área específica do sistema host (`/var/lib/docker/volumes/` no Linux).

**Características:**
- ✅ Gerenciados pelo Docker
- ✅ Independentes do sistema de arquivos do host
- ✅ Melhor performance
- ✅ Fácil backup e migração
- ✅ Podem ser compartilhados entre containers

**Criar um volume:**
```bash
docker volume create meu-volume
```

**Listar volumes:**
```bash
docker volume ls
```

**Inspecionar um volume:**
```bash
docker volume inspect meu-volume
```

**Usar volume em um container:**
```bash
docker run -d -v meu-volume:/app/data nome-imagem
#              ^^^^^^^^^^^^ ^^^^^^^^
#              volume       caminho no container
```

**Remover um volume:**
```bash
docker volume rm meu-volume

# Remover todos os volumes não utilizados
docker volume prune
```

---

#### 📁 **Bind Mounts (Mapeamento de Diretórios)**

Bind mounts vinculam um diretório/arquivo específico do **host** a um caminho dentro do **container**.

**Características:**
- ✅ Acesso direto aos arquivos do host
- ✅ Útil para desenvolvimento (hot reload)
- ✅ Caminho completo do host é especificado
- ⚠️ Dependente do sistema de arquivos do host

**Sintaxe:**
```bash
docker run -d -v /caminho/host:/caminho/container nome-imagem
```

**Exemplo prático (Windows):**
```bash
docker run -d -v D:/projeto/data:/app/data nome-imagem
```

**Exemplo com código em desenvolvimento:**
```bash
# Hot reload - alterações no código refletem no container
docker run -d -v D:/projeto/CODE:/app-node iamgabstrindade/app-node:1.3
```

---

#### 🆚 **Volume vs Bind Mount**

| Característica | Volume | Bind Mount |
|----------------|--------|------------|
| **Gerenciamento** | Docker gerencia | Você gerencia |
| **Localização** | Área interna do Docker | Qualquer lugar do host |
| **Performance** | Melhor (Linux) | Depende do SO |
| **Uso recomendado** | Produção, dados persistentes | Desenvolvimento, configurações |
| **Portabilidade** | Alta | Baixa (depende do caminho) |
| **Sintaxe moderna** | `--mount type=volume` | `--mount type=bind` |

---

#### 💾 **tmpfs Mount (Temporário na Memória)**

Dados armazenados **apenas na RAM** do host - extremamente rápido, mas perdido ao parar o container.

**Uso:**
```bash
docker run -d --tmpfs /app/cache:rw,size=100m nome-imagem
```

**Quando usar:**
- Cache temporário
- Dados sensíveis que não devem ser gravados em disco
- Performance máxima para dados efêmeros

---

### 6️⃣ **Docker Networks (Redes)**

Docker Networks permitem que containers se comuniquem entre si de forma isolada e segura.

---

#### 🌐 **Tipos de Redes**

**1. Bridge (Padrão)**
- Rede privada interna do Docker
- Containers na mesma rede bridge podem se comunicar
- Isolada da rede do host

**2. Host**
- Container usa diretamente a rede do host
- Sem isolamento de rede
- Melhor performance (sem overhead de NAT)

**3. None**
- Container sem interface de rede
- Completamente isolado

**4. Custom Bridge**
- Rede bridge personalizada
- Permite DNS automático entre containers
- **Recomendada para produção**

---

#### 🔧 **Comandos de Rede**

**Criar uma rede:**
```bash
docker network create minha-rede

# Criar rede bridge (padrão)
docker network create --driver bridge minha-bridge
```

**Listar redes:**
```bash
docker network ls
```

**Inspecionar uma rede:**
```bash
docker network inspect minha-rede
```

**Conectar container a uma rede:**
```bash
docker run -d --network minha-rede --name app1 imagem
```

**Conectar container existente:**
```bash
docker network connect minha-rede container-id
```

**Desconectar:**
```bash
docker network disconnect minha-rede container-id
```

**Remover rede:**
```bash
docker network rm minha-rede
```

---

#### 🔗 **Comunicação entre Containers**

Containers na **mesma rede customizada** podem se comunicar usando o **nome do container** como hostname:

```bash
# Criar rede
docker network create app-network

# Container 1 (banco de dados)
docker run -d --network app-network --name db postgres

# Container 2 (aplicação)
docker run -d --network app-network --name app minha-app
```

Dentro do container `app`, você pode acessar o banco assim:
```javascript
const connection = {
  host: 'db',  // ← Nome do container!
  port: 5432
}
```

---

### 7️⃣ **Docker Compose**

Docker Compose é uma ferramenta para **definir e executar aplicações Docker multi-container** usando um arquivo YAML.

---

#### 📄 **Estrutura do docker-compose.yaml**

```yaml
version: '3.9'  # Versão do Docker Compose

services:       # Define os containers
  app:          # Nome do serviço
    image: iamgabstrindade/app-node:1.3  # Imagem a usar
    networks:
      - compose-bridge  # Rede a conectar
    ports:
      - 3000:6000       # Mapeamento de portas (host:container)

networks:       # Define as redes
  compose-bridge:
    driver: bridge      # Tipo de rede
```

---

#### 🔑 **Conceitos Principais**

**1. Services (Serviços)**
- Cada serviço é um container
- Pode ser escalado (múltiplas instâncias)

**2. Networks (Redes)**
- Todos os serviços podem se comunicar pelo nome
- Isolamento automático

**3. Volumes**
- Persistência de dados
- Compartilhamento entre serviços

**4. Environment Variables**
- Configurações por ambiente

---

#### 📝 **Exemplo Completo**

```yaml
version: '3.9'

services:
  # Banco de dados
  db:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: senha123
    volumes:
      - db-data:/var/lib/postgresql/data
    networks:
      - backend

  # Aplicação Node.js
  app:
    image: iamgabstrindade/app-node:1.3
    ports:
      - 3000:6000
    environment:
      - PORT=6000
      - DB_HOST=db  # ← Nome do serviço!
    depends_on:
      - db  # Inicia depois do db
    networks:
      - backend
    volumes:
      - ./CODE:/app-node  # Bind mount para desenvolvimento

volumes:
  db-data:  # Volume gerenciado pelo Docker

networks:
  backend:
    driver: bridge
```

---

#### 🚀 **Comandos Docker Compose**

**Iniciar todos os serviços:**
```bash
docker compose up

# Modo background
docker compose up -d

# Recriar containers
docker compose up --force-recreate
```

**Parar serviços:**
```bash
docker compose stop
```

**Parar e remover containers:**
```bash
docker compose down

# Remover também volumes
docker compose down -v

# Remover também imagens
docker compose down --rmi all
```

**Ver logs:**
```bash
# Todos os serviços
docker compose logs

# Serviço específico
docker compose logs app

# Seguir logs em tempo real
docker compose logs -f
```

**Listar containers do compose:**
```bash
docker compose ps
```

**Executar comando em um serviço:**
```bash
docker compose exec app sh
```

**Recriar apenas um serviço:**
```bash
docker compose up -d --no-deps --build app
```

---

#### 🎯 **Vantagens do Docker Compose**

- ✅ **Simplicidade**: Um comando para subir toda a stack
- ✅ **Reprodutível**: Mesmo ambiente em qualquer máquina
- ✅ **Versionado**: `docker-compose.yaml` no Git
- ✅ **Desenvolvimento**: Bind mounts, hot reload
- ✅ **Orquestração básica**: `depends_on`, ordem de inicialização
- ✅ **Isolamento**: Cada projeto tem sua própria rede

---

#### 💡 **Diferença: docker-compose.yaml vs Dockerfile**

| Arquivo | Propósito | Quando usar |
|---------|-----------|-------------|
| **Dockerfile** | Define como **construir** uma imagem | Criar imagem customizada |
| **docker-compose.yaml** | Define como **executar** containers | Orquestrar múltiplos containers |

**Exemplo prático:**
```yaml
version: '3.9'

services:
  app:
    build: .  # ← Usa o Dockerfile local para buildar
    ports:
      - 3000:6000
```

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
├── CODE/                 # Pasta com o código da aplicação
│   ├── app.js           # Servidor Express
│   └── package.json     # Dependências Node.js
├── Dockerfile           # Instruções para criar a imagem
├── docker-compose.yaml  # Orquestração de containers
├── .dockerignore        # Arquivos ignorados no build
├── .gitignore           # Arquivos ignorados no Git
└── README.md            # Documentação do projeto
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

### 🔨 Build e Run Básico

```bash
# Build da imagem (porta padrão)
docker build -t iamgabstrindade/app-node:1.3 .

# Build da imagem (porta customizada)
docker build -t iamgabstrindade/app-node:1.3 --build-arg PORT_BUILD=8080 .

# Rodar container
docker run -d -p 3000:6000 iamgabstrindade/app-node:1.3

# Rodar com bind mount (desenvolvimento)
docker run -d -p 3000:6000 -v D:/projeto/CODE:/app-node iamgabstrindade/app-node:1.3

# Rodar com volume
docker run -d -p 3000:6000 -v dados-app:/app-node/data iamgabstrindade/app-node:1.3
```

### 📦 Gerenciamento de Containers

```bash
# Ver containers rodando
docker ps

# Ver todos (incluindo parados)
docker ps -a

# Parar container
docker stop <id>

# Iniciar container parado
docker start <id>

# Remover container
docker rm <id>

# Remover container em execução
docker rm -f <id>

# Ver logs
docker logs <id>

# Seguir logs
docker logs -f <id>
```

### 🖼️ Gerenciamento de Imagens

```bash
# Listar imagens
docker images

# Remover imagem
docker rmi iamgabstrindade/app-node:1.3

# Remover todas as imagens
docker rmi $(docker images -aq) --force

# Criar tag
docker tag iamgabstrindade/app-node:1.3 iamgabstrindade/app-node:latest
```

### 🔐 Docker Hub

```bash
# Login
docker login

# Push
docker push iamgabstrindade/app-node:1.3

# Pull
docker pull iamgabstrindade/app-node:1.3
```

### 💾 Volumes

```bash
# Criar volume
docker volume create meu-volume

# Listar volumes
docker volume ls

# Inspecionar volume
docker volume inspect meu-volume

# Remover volume
docker volume rm meu-volume

# Remover volumes não utilizados
docker volume prune
```

### 🌐 Networks

```bash
# Criar rede
docker network create minha-rede

# Listar redes
docker network ls

# Inspecionar rede
docker network inspect minha-rede

# Conectar container
docker network connect minha-rede <container-id>

# Remover rede
docker network rm minha-rede
```

### 🐳 Docker Compose

```bash
# Iniciar serviços
docker compose up

# Iniciar em background
docker compose up -d

# Parar serviços
docker compose stop

# Parar e remover
docker compose down

# Remover com volumes
docker compose down -v

# Ver logs
docker compose logs

# Logs de um serviço específico
docker compose logs app

# Seguir logs
docker compose logs -f

# Listar containers
docker compose ps

# Recriar containers
docker compose up --force-recreate

# Executar comando em serviço
docker compose exec app sh
```

---

## 🎓 Aprendizados

### 📦 Conceitos Fundamentais
- ✅ Como criar um `Dockerfile`
- ✅ Diferença entre imagem e container
- ✅ Uso de **ARG** para argumentos de build
- ✅ Uso de **ENV** para variáveis de ambiente
- ✅ Comando **EXPOSE** para documentar portas
- ✅ Build de imagens Docker com argumentos customizados
- ✅ Uso do `.dockerignore`

### 🚀 Execução e Gerenciamento
- ✅ Execução de containers em background (`-d`)
- ✅ Mapeamento de portas (port binding)
- ✅ Gerenciamento de ciclo de vida de containers
- ✅ Inspeção de logs de containers

### 💾 Persistência de Dados
- ✅ **Volumes**: Armazenamento gerenciado pelo Docker
- ✅ **Bind Mounts**: Mapeamento de diretórios do host
- ✅ **tmpfs**: Armazenamento temporário em memória
- ✅ Diferenças entre Volume e Bind Mount
- ✅ Quando usar cada tipo de persistência

### 🌐 Redes e Comunicação
- ✅ Tipos de redes Docker (bridge, host, none)
- ✅ Criação de redes customizadas
- ✅ Comunicação entre containers usando nomes
- ✅ DNS automático em redes customizadas
- ✅ Isolamento de rede entre containers

### 🐳 Docker Hub
- ✅ **Tags** e versionamento de imagens
- ✅ Publicar imagens no **Docker Hub**
- ✅ Login e autenticação no Docker Hub
- ✅ Download de imagens de repositórios remotos

### 🎼 Docker Compose
- ✅ Orquestração de múltiplos containers
- ✅ Definição de serviços em YAML
- ✅ Gerenciamento de dependências entre serviços
- ✅ Configuração de redes e volumes via Compose
- ✅ Variáveis de ambiente em Compose
- ✅ Comandos `up`, `down`, `logs`, `ps`
- ✅ Diferença entre Dockerfile e docker-compose.yaml

---

## 🔗 Recursos

- [Documentação Oficial Docker](https://docs.docker.com/)
- [Docker Hub](https://hub.docker.com/)
- [Repositório da Imagem no Docker Hub](https://hub.docker.com/r/iamgabstrindade/app-node)
- [Curso Alura - Docker](https://cursos.alura.com.br/course/docker-criando-gerenciando-containers)

---

**Autor:** Gabriel Trindade  
**Data:** Novembro 2025  
**Versão Atual:** 1.3
