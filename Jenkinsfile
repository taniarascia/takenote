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
        stage('Pruebas unitarias') {
            steps {
                echo 'Ejecutando pruebas unitarias...'
                powershell "npm run test"
                echo "Generando reporte de pruebas..."
                echo "Publicando reporte de pruebas..."
                publishHTML (target: [
                    allowMissing: false,
                    alwaysLinkToLastBuild: false,
                    keepAll: true,
                    reportDir: 'reports/jest',
                    reportFiles: 'test-report.html',
                    reportName: "Reporte de pruebas unitarias",
                ])
            }
        }
    }
}
