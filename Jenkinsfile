#!/usr/bin/env groovy

pipeline {

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
                sh 'apt-get install -y libxss1 libappindicator1 libindicator7'
                sh 'wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb'
                sh 'apt install -y ./google-chrome*.deb'
            }
        }
        stage('Build') {
            steps {
                echo 'Building...'
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing...'
                sh 'npm test'
            }
        }
    }
}

node {
    def app

    stage('Clone repository') {
        /* Let's make sure we have the repository cloned to our workspace */
        checkout scm
    }

    stage('Build image') {
        /* This builds the actual image; synonymous to
         * docker build on the command line */

        app = docker.build("luther007/jenkins-eks-automated")
    }

    stage('Push') {
        docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
            app.push("${env.BUILD_NUMBER}")
            app.push("latest")
        }
    }
}
