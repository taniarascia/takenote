pipeline {
    agent any
    stages {
        stage('Construccion') {
            steps {
                echo "Instalando dependencias..."
                powershell "npm install"
                
                echo "Compilando la aplicacion..."
                powershell "npm run build"
            }
        }
        stage('Analisis estatico') {
            steps {
                echo 'SonarQube...'
                withSonarQubeEnv('SonarQube') {
                    bat "C:\\sonar\\sonar-scanner\\bin\\sonar-scanner.bat"
                }
            }
        }
    }
}

