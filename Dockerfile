FROM python:3.11

LABEL maintainer="Stefan Bogdanel <stefan@izdrail.com>"


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


#RUN curl -fsSL https://ollama.com/install.sh | sh

    
# Install Python dependencies globally
RUN pip install \
    python-multipart \
    tls_client \
    uvicorn \
    fastapi \
    markdown \
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
RUN npm install --force


#Backend
COPY backend /home/backend/

EXPOSE 1500 1501


ENTRYPOINT ["supervisord", "-c", "/etc/supervisord.conf", "-n"]


