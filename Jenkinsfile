pipeline {
    agent any

    environment {
        FRONTEND_DIR = 'medcare'
        BACKEND_DIR = 'medcare-server'
    }

    stages {
        stage('Checkout') {
           steps {
               script {
                    withCredentials([string(credentialsId: 'Github_Secret', variable: 'GITHUB_SECRET')]) {
                        git branch: 'main', url: 'https://github.com/Debayanmondal/medd-test.git', credentialsId: ''
                    }
                    def workspaceDir = env.WORKSPACE
                    sh """
                        git config --global --add safe.directory $workspaceDir
                        cd $workspaceDir
                    """
                }
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir("${env.FRONTEND_DIR}") {
                    sh """
                    curl -fsSL https://rpm.nodesource.com/setup_14.x | sudo bash -
                    sudo yum install -y nodejs
                    npm i
                    """
                }
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir("${env.BACKEND_DIR}") {
                    sh 'npm i && sudo npm i pm2 -g'
                }
            }
        }

        stage('Start Backend') {
            steps {
                dir("${env.BACKEND_DIR}") {
                    sh 'pm2 start app.js'
                }
            }
        }
    }

    post {
        always {
           // cleanWs()
            echo "Pipeline End"
        }
    }
}
