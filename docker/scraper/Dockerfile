FROM python:3.12-slim

# Install system dependencies for Playwright
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy requirements and install Python deps
COPY scraper_api/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Install Playwright browsers (Chromium only, headless)
RUN playwright install chromium --with-deps

# Copy scraper source code
COPY scraper_api/ .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
