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
    }
}