FROM mcr.microsoft.com/vscode/devcontainers/typescript-node as journal-frontend
RUN apt-get update && DEBIAN_FRONTEND=noninteractive && apt-get -y install git
RUN npm install -g pnpm