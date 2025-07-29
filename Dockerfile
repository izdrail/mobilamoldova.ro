# Main application image
FROM php:8.3

# Install required system packages
RUN apt-get update && apt-get install -y --no-install-recommends \
    procps \
    gnupg \
    nodejs \
    npm \
    gosu \
    curl \
    ca-certificates \
    protobuf-compiler \
    zip \
    unzip \
    git \
    supervisor \
    sqlite3 \
    libcap2-bin \
    libpng-dev \
    python3 \
    python3-pip \
    python3.11-venv \
    dnsutils \
    librsvg2-bin \
    fswatch \
    nano \
    cargo \
    ffmpeg \
    poppler-utils \
    libzip-dev \
    libonig-dev \
    libjson-c-dev \
    build-essential \
    autoconf \
    zlib1g-dev \
    pkg-config \
    wget \
    redis \
    golang \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install bcmath gd exif zip pdo_mysql pcntl sockets && \
    docker-php-ext-enable bcmath gd exif zip pcntl sockets
RUN mkdir -p /usr/src/php/ext/redis && \
    curl -fsSL https://pecl.php.net/get/redis --ipv4 | tar xvz -C "/usr/src/php/ext/redis" --strip 1 && \
    docker-php-ext-install redis



RUN curl -sSL https://getcomposer.org/download/latest-stable/composer.phar -o /usr/local/bin/composer && \
    chmod +x /usr/local/bin/composer

# Set up application
WORKDIR /var/www/
COPY . .


# Install PHP dependencies
RUN composer install --no-interaction --no-suggest --ignore-platform-req=ext-gd --ignore-platform-req=ext-exif

# Install and build Node.js assets
RUN npm install --legacy-peer-deps && npm run build


# Configure Supervisor
COPY ./docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf


# Expose ports
EXPOSE 1600 1601 2114

# Set working directory back to application root
WORKDIR /var/www/

# Start Supervisor
ENTRYPOINT ["supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf", "-n"]
