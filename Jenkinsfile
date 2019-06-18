#!/usr/bin/env groovy

pipeline {
    environment {
        registry = "luther007/jenkins-eks-automated"
        registryCredential = 'dockerhub'
        dockerImage = ''
    }
    agent any
    tools {nodejs "node" }
    // agent {
    //     docker {
    //         image 'node'
    //         args '-u root'
    //     }
    // }

    stages {
        stage('Install') {
            steps {
                sh 'apt update -y && apt upgrade -y'
                sh 'apt install wget'
                sh 'apt install curl'
                sh 'apt-get install -y software-properties-common'
                sh 'curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -'
                sh 'add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"'
                sh 'apt update -y'
                sh 'apt-cache policy docker-ce'
                sh 'apt-get install -y docker-ce'
                sh 'apt-get install -y libxss1 libappindicator1 libindicator7'
                sh 'wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb'
                sh 'apt install -y ./google-chrome*.deb'
            }
        }
        stage('Dependencies') {
            steps {
                echo 'Installing...'
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing...'
                sh 'npm test'
            }
        }
        stage('Build') {
            steps {
                script {
                    dockerImage = docker.build registry + ":BUILD_NUMBER"
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    docker.withRegistry( '', registryCredential ) {
                    dockerImage.push()
                    }
                }
            }
        }
        stage('Remove Unused docker image') {
            steps{
                sh "docker rmi $registry:$BUILD_NUMBER"
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
