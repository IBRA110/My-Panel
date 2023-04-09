#!/bin/bash

echo "Checking Docker exist ..."

if [ -x "$(command -v docker)" ]; then
		echo "Docker exists. Proceed to next step."	
else
		echo "Docker cannot be found in the system."
  	read -p "Do you want to install Docker? (y/N) " decision

		if [ "$decision" != "Y" ] && [ "$decision" != "y" ]; then
    		exit
  	fi
    
		if [ ! -x "$(command -v apt-get)" ]; then
        echo "apt-get command could not be found"
				
				echo "Installing apt-get"
				wget mozilla.debian.net/pkg-mozilla-archive-keyring_1.1_all.deb
				dpkg -i pkg-mozilla-archive-keyring_1.1_all.deb
        
    fi
		
		echo "Installing ..."			
		
		echo "Installing a few prerequisite packages which let apt use packages over HTTPS:"	
		apt-get install apt-transport-https ca-certificates curl gnupg2 software-properties-common
		
		echo "Adding the GPG key for the official Docker repository to your system..."
		curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add -
		
		# If previous command does't work try this
		# curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
		
		
		echo "Add the Docker repository to APT sources..."
		add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable"
		
		echo "updating the package database with the Docker packages from the newly added repo..."
		apt-get update

		echo "Checking docker-ce..."
		apt-cache policy docker-ce

		echo "Installing docker..."
		apt-get install docker-ce
		
		echo "Checking status docker..."
		systemctl status docker
		
		echo "Docker version"
		docker -v

		echo "Docker successfully installed!"
		docker run hello-world

fi

echo "Checking Docker Compose exists ..."
if [ -x "$(command -v docker-compose)" ]; then
    echo "Docker compose exists. Proceed to next step."
else
    echo "Docker Compose cannot be found in the system."
    read -p "Do you want to install Docker Compose? (y/N) " decision
    if [ "$decision" != "Y" ] && [ "$decision" != "y" ]; then
        exit
    fi
		
		if [ ! -x "$(command -v apt-get &> /dev/null)" ]; then
        echo "apt-get command could not be found"
       	
				echo "Installing apt-get"
				wget mozilla.debian.net/pkg-mozilla-archive-keyring_1.1_all.deb
				dpkg -i pkg-mozilla-archive-keyring_1.1_all.deb
    fi

		echo "Checking the current release..."
		curl -L https://github.com/docker/compose/releases/download/1.25.3/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose 
 		
		echo "Setting the permissions..."
		chmod +x /usr/local/bin/docker-compose
		
		echo "Checking the version..."
		docker-compose --version

		echo "Docker compose successfully installed!"
fi

systemctl enable docker.service
systemctl enable containerd.service
