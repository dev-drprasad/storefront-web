# build environment
# make sure to match with .nvmrc version
FROM node:20.8-alpine as build
WORKDIR /app

ENV NODE_ENV=production

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install

COPY web/tsconfig.json /app
COPY web/next.config.js /app
COPY web/tailwind.config.js /app
COPY web/postcss.config.js /app
COPY web/public /app/public
COPY web/config /app/config
COPY web/bakend /app/bakend
COPY web/app /app/app
COPY web/shared /app/shared
COPY web/types /app/types
COPY web/components /app/components
COPY web/entities /app/entities
COPY web/features /app/features
COPY web/widgets /app/widgets
COPY web/pages /app/pages

ENV TSC_COMPILE_ON_ERROR=true
RUN npm run build

# production environment
FROM node:20.8-alpine

EXPOSE 80

WORKDIR /app
COPY --from=build /app/.next /app

CMD ["npm", "run", "start"]
