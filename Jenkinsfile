pipeline {
    environment {
        // AWS_ACCESS_KEY_ID     = credentials('JenkinsAWSKey')
        // AWS_SECRET_ACCESS_KEY = credentials('JenkinsAWSKeySecret')
        TF_VAR_eb_app_name = 'sampleApp'
        TF_VAR_role_arn = credentials('tf-role-arn')
        AWS_ACCESS_KEY_ID = credentials('tf_aws_access_key_id')
        AWS_SECRET_ACCESS_KEY = credentials('tf_secret_access_key_id')
    }

    // agent {
    //     docker {
    //         image 'luther007/cynerge_images:latest'
    //         args '-u root'
    //     }
    // }
    agent {
        node {
            label 'master'
        }
    }

    stages {
        stage('dependencies') {
            steps {
                sh 'whoami'
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
                        credentialsId: 'luther-github-ssh',
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
                script {
                    sh 'ls'
                    dir ('terraform') {
                        sh '''
                            terraform --version
                            terraform init
                            terraform plan -input=false
                            terraform apply --auto-approve
                        '''
                    }
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
}