pipeline {
    environment {
        AWS_ACCESS_KEY_ID     = credentials('JenkinsAWSKey')
        AWS_SECRET_ACCESS_KEY = credentials('JenkinsAWSKeySecret')
        TF_VAR_eb-app-name = ${JOB_NAME}
        ROLE_ARN = credentials('tf-role-arn')
        // PATH = "/root/bin:${env.PATH}"
    }

    agent {
        docker {
            image 'luther007/cynerge_images:latest'
            args '-u root'
        }
    }

    stages {
        stage('dependencies') {
            steps {
                echo 'Installing...'
                // sh 'npm ci'
            }
        }
        stage('test') {
            steps {
                echo 'Testing...'
                // sh 'npm test'
            }
        }
        // stage('Build') {
        //     steps {
        //         script {
        //             dockerImage = docker.build registry + ":$BUILD_NUMBER"
        //         }
        //     }
        // }
        stage('clone-iaas-repo') {
            steps {
                sh 'rm terraform -rf; mkdir terraform'
                dir ('terraform') {
                    git branch: 'cf_testing',
                        credentialsId: 'github-luther',
                        url: 'git@github.com:cynerge-consulting/non-containerized-pipeline-tf.git'
                }
            }
        }
        stage('provision-infrastructure') {
            when {
                anyOf {
                    branch 'cf_test'
                }
            }
            steps {
                sh 'ls'
                dir ('terraform') {
                    sh '''
                        terraform init
                        terraform plan -input=false
                        terraform apply --auto-approve
                    '''
                }
            }
        }
        stage('dev-deploy') {
            when {
                branch 'cf_test'
            }
            steps {
                sh '''
                    docker run --rm -it -v ~/.aws:/root/.aws amazon/aws-cli eb deploy dev
                    sleep 5
                    docker run --rm -it -v ~/.aws:/root/.aws amazon/aws-cli elasticbeanstalk describe-environments --environment-names dev --query "Environments[*].CNAME" --output text
                '''
            }
        }
        stage('staging-deploy') {
            when {
                branch 'staging'
            }
            steps {
                sh '''
                    docker run --rm -it -v ~/.aws:/root/.aws amazon/aws-cli eb deploy staging
                    sleep 5
                    docker run --rm -it -v ~/.aws:/root/.aws amazon/aws-cli elasticbeanstalk describe-environments --environment-names staging --query "Environments[*].CNAME" --output text
                '''
            }
        }
        stage('prod-deploy') {
            when {
                branch 'prod'
            }
            steps {
                sh '''
                    docker run --rm -it -v ~/.aws:/root/.aws amazon/aws-cli eb deploy prod
                    sleep 5
                    docker run --rm -it -v ~/.aws:/root/.aws amazon/aws-cli elasticbeanstalk describe-environments --environment-names prod --query "Environments[*].CNAME" --output text
                '''
            }
        }
    }
    post { 
        always { 
            cleanWs()
        }
    }
}