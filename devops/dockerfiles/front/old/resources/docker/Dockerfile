FROM public.ecr.aws/e6k1b4j9/bahia/amtega_php81:latest

# Install r-base for execute R scrips
RUN apt-get update && apt-get install -y r-base 

## create directories
RUN mkdir -p /scriptsR

## copy files
COPY /scriptsR/install_packages.R /scriptsR/install_packages.R

## install R-packages
RUN Rscript /scriptsR/install_packages.R
