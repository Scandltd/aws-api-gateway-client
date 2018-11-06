FROM node:10.13.0

RUN apt-get update \
    && apt-get install -y git make curl

RUN mkdir -p /app

WORKDIR /app

EXPOSE 3000

CMD ["yarn", "run", "start"]

