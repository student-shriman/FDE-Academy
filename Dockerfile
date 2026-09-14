# ==========================================
# Stage 1: Build React + Vite Frontend
# ==========================================
FROM node:20-alpine AS frontend-builder

WORKDIR /app/web

# Copy package dependency manifests
COPY web/package.json web/package-lock.json ./

# Install frontend dependencies
RUN npm ci

# Copy frontend source code
COPY web/ ./

# Pass Google OAuth Client ID into production build
ARG VITE_GOOGLE_CLIENT_ID=574828358962-7k9f5votdt2i1okq49782avapcn7v4n0.apps.googleusercontent.com
ENV VITE_GOOGLE_CLIENT_ID=$VITE_GOOGLE_CLIENT_ID

# Build production SPA assets into /app/web/dist
RUN npm run build

# ==========================================
# Stage 2: Production Python Backend Server
# ==========================================
FROM python:3.12-slim AS runner

WORKDIR /app

# Ensure Python output is sent straight to terminal without buffering
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

# Install Python production dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend server code
COPY server/ /app/server/

# Copy built frontend static bundle from Stage 1 into /app/web/dist
COPY --from=frontend-builder /app/web/dist /app/web/dist

# Expose port (defaults to 8000 for local docker, Render assigns $PORT at runtime)
ENV PORT=8000
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD python -c "import urllib.request, os; urllib.request.urlopen(f'http://localhost:{os.environ.get(\"PORT\", 8000)}/api/health')" || exit 1

# Start Uvicorn binding to 0.0.0.0 and $PORT
CMD ["sh", "-c", "uvicorn server.main:app --host 0.0.0.0 --port ${PORT:-8000}"]
