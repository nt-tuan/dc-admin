pipeline {
    agent {
        label env.agent_label
    }

    tools {
        nodejs "NodeJS"
    }

    environment {
        registry = 'nexus.morphotech.co.uk/hsb2b-admin-frontend'
        registryUrl = 'https://nexus.morphotech.co.uk'
        registryCredential = 'nexus'
        dockerImage = ''
    }

    stages {
        stage('Code analysis') {
           steps {
               script {
                  def scannerHome = tool 'SonarQubeScanner';
                  withSonarQubeEnv("Sonarqube") {
                      sh "${tool("SonarQubeScanner")}/bin/sonar-scanner"
                  }
               }
           }
        }
        stage('Build image') {
            steps {
                script {
                    dockerImage = docker.build("${registry}:${portal_admin_tag_version}", "-f Dockerfile-${env.environment} .")
                }
            }
        }
        stage('Deploy image') {
            steps {
                script {
                    docker.withRegistry( registryUrl, registryCredential ) {
                        dockerImage.push()
                    }
                }
            }
        }
    }
}
