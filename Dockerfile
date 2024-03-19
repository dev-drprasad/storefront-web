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
COPY config /app/config
COPY backend /app/backend
COPY styles /app/styles
COPY app /app/app
COPY shared /app/shared
COPY types /app/types
COPY components /app/components
COPY entities /app/entities
COPY features /app/features
COPY widgets /app/widgets
COPY pages /app/pages

ENV TSC_COMPILE_ON_ERROR=true
ARG BACKEND_API_URI
ARG MEDIA_URI
RUN npm run build

# production environment
FROM node:20.8-alpine

EXPOSE 3000

ENV NEXTAUTH_SECRET=
ENV BACKEND_API_URI=
ENV MEDIA_URI=

WORKDIR /app
COPY --from=build /app/.next /app/.next

RUN npm install next@13.4.19 next-auth@4.24.5

CMD ["./node_modules/.bin/next", "start"]