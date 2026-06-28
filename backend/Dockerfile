# Start with an official Python image
# This is like a clean computer with Python 3.11 already installed
FROM python:3.11-slim

# Set the working directory inside the container
# All commands will run from this folder
WORKDIR /app

# Copy requirements first (before copying code)
# This is a Docker optimization — if requirements don't change,
# Docker reuses the cached layer and skips reinstalling packages
COPY requirements.txt .

# Install all Python packages
RUN pip install --no-cache-dir -r requirements.txt

# Now copy the rest of your backend code
COPY ./app ./app
COPY alembic ./alembic
COPY alembic.ini .
COPY start.sh .

RUN chmod +x start.sh

# Tell Docker this container listens on port 8000
EXPOSE 8000

# The command to run when the container starts
CMD ["bash", "start.sh"]