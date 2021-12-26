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
                //withSonarQubeEnv('SonarQube') {
                    //bat "C:\\sonar\\sonar-scanner\\bin\\sonar-scanner.bat"
                //}
            }
        }
        stage('Pruebas unitarias') {
            steps {
                echo 'Ejecutando pruebas unitarias...'
                //powershell "npm run test"
            }
        }
        stage('Pruebas funcionales') {
            steps {
                echo 'Ejecutando pruebas funcionales...'
                powershell "npm run test:e2e"
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