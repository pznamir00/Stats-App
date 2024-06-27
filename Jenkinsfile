pipeline {
    agent { 
        node {
            label 'docker-agent-python'
            }
      }
    triggers {
        pollSCM '*/5 * * * *'
    }
    stages {
        stage('Build') {
            steps {
                echo "Building..."
                sh '''
                npm install
                ng build --configuration production
                '''
            }
        }
        stage('Test') {
            steps {
                echo "Testing..."
                sh '''
                npm run check-formatting
                npm run test
                '''
            }
        }
        stage('Deliver') {
            steps {
                echo 'Deliver....'
                sh '''
                echo "Done!"
                '''
            }
        }
    }
}
