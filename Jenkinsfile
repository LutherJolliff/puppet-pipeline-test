#!/usr/bin/env groovy

pipeline {
    environment {
        registry = "luther007/jenkins-eks-automated"
        registryCredential = 'docker-hub-credentials'
        dockerImage = ''
        AWS_ACCESS_KEY_ID     = credentials('JenkinsAWSKey')
        AWS_SECRET_ACCESS_KEY = credentials('JenkinsAWSKeySecret')
    }

    agent {
        docker {
            image 'node'
            args '-u root'
        }
    }

    stages {
        stage('Install') {
            steps {
                sh 'apt update -y && apt upgrade -y'
                sh 'apt install wget'
                sh 'apt install curl'
                sh 'apt install -y apt-transport-https ca-certificates curl software-properties-common apt-transport-https'
                sh 'curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -'
                sh 'add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"'
                sh 'apt update -y'
                sh 'apt-cache policy docker-ce'
                sh 'apt install -y docker-ce'
                sh 'apt-get install -y libxss1 libappindicator1 libindicator7'
                sh 'wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb'
                sh 'apt install -y ./google-chrome*.deb'
            }
        }
        // stage('Dependencies') {
        //     steps {
        //         echo 'Installing...'
        //         sh 'npm install'
        //     }
        // }
        // stage('Test') {
        //     steps {
        //         echo 'Testing...'
        //         sh 'npm test'
        //     }
        // }
        // stage('Build') {
        //     steps {
        //         script {
        //             dockerImage = docker.build registry + ":$BUILD_NUMBER"
        //         }
        //     }
        // }
        // stage('Deploy') {
        //     steps {
        //         script {
        //             docker.withRegistry( '', registryCredential ) {
        //             dockerImage.push()
        //             }
        //         }
        //     }
        // }
        // stage('Remove Unused docker image') {
        //     steps{
        //         sh "docker rmi $registry:$BUILD_NUMBER"
        //     }
        // }
        stage('Deploy Kube') {
            steps {
                sh 'curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add -'
                sh 'echo "deb https://apt.kubernetes.io/ kubernetes-xenial main" | tee -a /etc/apt/sources.list.d/kubernetes.list'
                sh 'apt-get update'
                sh 'apt-get install -y kubectl'
                sh 'kubectl config --kubeconfig=cluster-config use-context ljoliff@cynerge-cluster-6.us-east-1.eksctl.io'
                sh 'export KUBECONFIG=$KUBECONFIG:cluster-config'
                sh 'curl -o aws-iam-authenticator https://amazon-eks.s3-us-west-2.amazonaws.com/1.12.7/2019-03-27/bin/linux/amd64/aws-iam-authenticator'
                sh 'chmod +x ./aws-iam-authenticator'
                sh 'mkdir -p $HOME/bin && cp ./aws-iam-authenticator $HOME/bin/aws-iam-authenticator && export PATH=$HOME/bin:$PATH'
                sh 'echo export PATH=$HOME/bin:$PATH >> ~/.bashrc'
                sh "export AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID"
                sh "export AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY"
                // sh 'printenv | grep KUBECONFIG'
                sh 'ls'
                sh 'cp cluster-config ~/.kube/'
                sh 'cd ~/.kube'
                sh 'mv cluster-config config'
                sh 'ls'
                // sh 'kubectl create -f Deployment.yml'
                sh 'kubectl get pods -A --kubeconfig=/root/.kube/config'
            }
        }
    }
}

// node {
//     def app

//     stage('Clone repository') {
//         /* Let's make sure we have the repository cloned to our workspace */
//         checkout scm
//     }

//     stage('Build image') {
//         /* This builds the actual image; synonymous to
//          * docker build on the command line */

//         app = docker.build("luther007/jenkins-eks-automated")
//     }

//     stage('Push') {
//         docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
//             app.push("${env.BUILD_NUMBER}")
//             app.push("latest")
//         }
//     }
// }
