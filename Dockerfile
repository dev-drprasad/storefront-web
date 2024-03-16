# build environment
# make sure to match with .nvmrc version
FROM node:20.8-alpine as build
WORKDIR /app

ENV NODE_ENV=production

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install

COPY tsconfig.json /app
COPY next.config.js /app
COPY tailwind.config.js /app
COPY postcss.config.js /app
COPY public /app/public
COPY config /app/config
COPY backend /app/backend
COPY app /app/app
COPY shared /app/shared
COPY types /app/types
COPY components /app/components
COPY entities /app/entities
COPY features /app/features
COPY widgets /app/widgets
COPY pages /app/pages

ENV TSC_COMPILE_ON_ERROR=true
RUN npm run build

# production environment
FROM node:20.8-alpine

EXPOSE 80

WORKDIR /app
COPY --from=build /app/.next /app

CMD ["npm", "run", "start"]
