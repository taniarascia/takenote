pipeline {
    agent any
    stages {
        stage('Construccion') {
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
                //powershell "npm run test:e2e"
            }
        }
        stage('Pruebas de seguridad') {
            steps {
                echo "OWASP Security Tests"
                //powershell "cd E:\\dev\\is\\ZAP; ./zap.bat -cmd -quickurl https://dvwa.co.uk/ -quickout E:\\dev\\is\\test\\reportForDVWA.html"

                echo "Publicando reporte"

                publishHTML (target: [
                    allowMissing: false,
                    alwaysLinkToLastBuild: false,
                    keepAll: true,
                    reportDir: 'E:\\dev\\is\\test\\',
                    reportFiles: 'reportForDVWA.html',
                    reportName: "OWASP ZAP Report",
                ])
            }
        }
        stage('Pruebas de Performance') {
            steps {
                echo "Performance Tests"

                //bat "C:\\jmeter\\bin\\jmeter -n -t E:\\dev\\is\\test\\takenote_jmeter.jmx -l E:\\dev\\is\\test\\takenote_jmeter_report.jtl"

                //perfReport "E:\\dev\\is\\test\\takenote_jmeter_report.jtl"
                
            }
        }
        stage('Despliegue') {
            steps {
                echo "Deploy"
            }
        }
    }
}