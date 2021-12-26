pipeline {
    agent any
    stages {
        stage('Construcción') {
            steps {
                powershell "npm install; npm run build"
            }
        }
        stage('Análisis estático') {
            steps {
                echo 'SonarQube...'
                    whitSonarQubeEnv('SonarQube'){
                        powershell "C:\sonar\sonar-scanner\bin\sonar-scanner.bat"
                    }
            }
        }
        stage('Pruebas unitarias') {
            steps {
                powershell "npm run test"
            }
        }
        stage('Pruebas funcionales') {
            steps {
                echo "Functional Tests"
            }
        }
        stage('Pruebas de seguridad') {
            steps {
                echo "OWASP Security Tests"
            }
        }
        stage('Pruebas de Performance') {
            steps {
                echo "Performance Tests"
            }
        }
        stage('Despliegue') {
            steps {
                echo "Deploy"
            }
        }
    }
}