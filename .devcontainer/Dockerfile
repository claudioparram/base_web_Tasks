
FROM debian:12-slim
USER root
RUN apt-get update
RUN apt-get install -y\
  python3\
  curl\
  build-essential\
  git\
  pipx\
  bash-completion

RUN pipx ensurepath
# Install Poetry
RUN pipx install poetry==1.2.0
ENV PATH="$PATH:$POETRY"

# Install Oh-my-bash
RUN bash -c "$(curl -fsSL https://raw.githubusercontent.com/ohmybash/oh-my-bash/master/tools/install.sh)"

RUN sed -i 's/OSH_THEME=".*"/OSH_THEME="agnoster"/g' ~/.bashrc

# Install NVM
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
ENV NVM_DIR="/root/.nvm"
# Install Node
RUN . "$NVM_DIR/nvm.sh" && nvm install 20
