FROM node:16-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
WORKDIR /app/client
RUN npm ci && npm run build

FROM node:16-alpine
WORKDIR /app
COPY --from=build /app .
ENV NODE_ENV=production
EXPOSE 5000
RUN npm ci --only=production
CMD ["node","server/index.js"]
