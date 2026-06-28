# Start with Node.js 20
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first (optimization)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Tell Docker this container listens on port 3000
EXPOSE 3000

# Start the Next.js development server
CMD ["npm", "run", "dev"]