FROM python:3.11

LABEL maintainer="Stefan Bogdanel <stefan@izdrail.com>"

# Set a var to store the version of the image
ENV VERSION="0.0.1"


LABEL version="${VERSION}"


# Update and install necessary packages
RUN apt update && apt install -y \
    curl \
    wget \
    nodejs \
    npm \
    git \
    unzip \
    supervisor \
    libpq-dev \
    libssl-dev \
    libffi-dev \
    libxml2-dev \
    libxslt-dev \
    libjpeg-dev \
    libpng-dev \
    libpq-dev \
    mlocate \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies globally
RUN pip install \
    python-multipart \
    tls_client \
    uvicorn \
    fastapi \
    litellm \
    xmltodict \
    fastapi-cors \
    asyncio \
    sqlalchemy

# Copy Supervisor configuration
COPY docker/supervisord.conf /etc/supervisord.conf


#Frontend
COPY frontend /home/frontend/
COPY frontend/package.json /home/frontend/package.json
WORKDIR /home/frontend/
RUN npm install --legacy-peer-deps


#Backend
COPY backend /home/backend/

EXPOSE 1500 1501


ENTRYPOINT ["supervisord", "-c", "/etc/supervisord.conf", "-n"]


