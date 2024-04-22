FROM  debian:buster
# FROM  ubuntu:22.04
# FROM php:8.2.12-apache
# FROM php:8.0.0-apache
ARG DEBIAN_FRONTEND=noninteractive
# RUN docker-php-ext-install mysqli
# Include alternative DB driver
# RUN docker-php-ext-install pdo
# RUN docker-php-ext-install pdo_mysql
RUN apt-get update
RUN apt-get install -y git-core curl build-essential openssl libssl-dev
RUN apt-get install curl
# RUN curl -sL https://deb.nodesource.com/setup_18.x
# RUN git clone https://github.com/nodejs/node.git \
#  && cd node \
#  && ./configure \
#  && make \
#  && sudo make install
# RUN apt-get update
# RUN apt-get upgrade
# RUN apt-get install nodejs -y



RUN curl -fsSL https://deb.nodesource.com/setup_current.x | bash - && \
    apt-get install -y nodejs \
    build-essential && \
    node --version && \
    npm --version
RUN npm install -g npm@10.2.1
# RUN npm install npm@latest -g
# RUN apt-get update \
#     && apt-get install -y sendmail libpng-dev \
#     && apt-get install -y vim \
#     && apt-get install -y lsb-release \
#     && apt-get install -y libzip-dev \
#     && apt-get install -y zlib1g-dev \
#     && apt-get install -y libonig-dev \
#     && rm -rf /var/lib/apt/lists/* \
#     && docker-php-ext-install zip

# RUN docker-php-ext-install mbstring
# RUN docker-php-ext-install zip
# RUN docker-php-ext-install gd
# RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# RUN a2enmod rewrite


# // npm install --save nuxt
