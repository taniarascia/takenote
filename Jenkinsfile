pipeline {
    agent any
    stages {
        stage('Construcción') {
            steps {
                echo "Instalando dependencias..."
                //powershell "npm install"
                echo "Compilando la aplicacion..."
                //powershell "npm run build"
            }
        }
        stage('Analisis estatico') {
            steps {
                echo 'SonarQube...'
                whitSonarQubeEnv('SonarQube'){
                    bat "sonar-scanner.bat"
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