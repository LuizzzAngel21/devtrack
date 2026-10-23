# Etapa 1: instalar dependencias
FROM node:20-alpine AS deps

WORKDIR /app

# Copia solo los archivos de dependencias primero
COPY package*.json ./
RUN npm ci --only=production

# Etapa 2: imagen final
FROM node:20-alpine

WORKDIR /app

# Copia las dependencias ya instaladas desde la etapa anterior
COPY --from=deps /app/node_modules ./node_modules

# Copia el código fuente
COPY src/    ./src/
COPY views/  ./views/
COPY package.json ./

# Usuario no-root por seguridad (buena práctica)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 3000

CMD ["node", "src/server.js"]