FROM php:8.4.1-cli

WORKDIR /app

ENV TZ=Europe/Rome

RUN apt-get update && apt-get install -y tzdata && \
    ln -fs /usr/share/zoneinfo/$TZ /etc/localtime && \
    dpkg-reconfigure -f noninteractive tzdata

RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash -

RUN apt-get install -y nodejs

RUN apt-get update -y && apt-get install -y openssl zip unzip git 

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN apt-get update && apt-get install -y libpq-dev

RUN docker-php-ext-install pdo pdo_pgsql pcntl

COPY package*.json ./

RUN npm install

COPY . .

RUN composer install
