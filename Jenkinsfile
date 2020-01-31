pipeline {
    agent any
    // environment {
    //     scannerHome = tool 'Sonarqube'
    // //     registry = "luther007/jenkins-eks-automated"
    // //     registryCredential = 'docker-hub-credentials'
    // //     releaseName = 'jenkins'
    // //     chartPath = 'deploy/charts/puppet-pipeline-test-jenkins'
    // //     valuePath = 'deploy/feature/app.values.yml'
    // //     dockerImage = ''
    // //     AWS_ACCESS_KEY_ID     = credentials('JenkinsAWSKey')
    // //     AWS_SECRET_ACCESS_KEY = credentials('JenkinsAWSKeySecret')
    // //     PATH = "/root/bin:${env.PATH}"
    // }

    stages {
        // stage('Install') {
        //     steps {
                // sh 'apt update -y && apt upgrade -y'
                // sh 'apt install wget'
                // sh 'apt install curl'
                // sh 'apt install -y apt-transport-https ca-certificates curl software-properties-common apt-transport-https'
                // sh 'curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -'
                // sh 'add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"'
                // sh 'apt update -y'
                // sh 'apt-cache policy docker-ce'
                // sh 'apt install -y docker-ce'
                // sh 'apt-get install -y libxss1 libappindicator1 libindicator7'
                // sh 'wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb'
                // sh 'apt install -y ./google-chrome*.deb'
        //     }
        // }
        // stage('SCM') {
        //     steps {
        //         git url: 'https://github.com/LutherJolliff/puppet-pipeline-test.git'
        //     }
        // }
        stage('Dependencies') {
            agent {
                docker {
                    image 'luther007/cynerge_images:latest'
                    args '-u root'
                }
            }
            steps {
                echo 'Installing...'
                sh 'echo $GIT_BRANCH'
                sh 'npm install'
            }
        }
        // stage('Sonarqube Analysis') {
        //     environment {
        //         scannerHome = tool 'Sonarqube'
        //     }            
        //     steps {
        //         withSonarQubeEnv('AWS-Sonarqube') {
        //             // sh '/var/jenkins_home/tools/hudson.plugins.sonar.SonarRunnerInstallation/Sonarqube/bin/sonar-scanner'
        //             sh "${scannerHome}/bin/sonar-scanner"
        //         }
        //     }
        // }
        stage('Pa11y') {
            agent {
                docker {
                    image 'luther007/cynerge_images:latest'
                    args '-u root'
                }
            }
            steps {
                sh 'npm run build-pa11y'
            }
        }
        //  Pretend this is a Deploy step
        stage('Lighthouse') {
            steps {
                // sh 'npm install -g lighthouse-batch'
                sh 'npm run build-lighthouse'
                // sh 'lighthouse-batch -h -s https://www.google.com,https://www.cynerge.com'
            }
            post {
                always {
                    publishHTML (target: [
                        allowMissing: false,
                        alwaysLinkToLastBuild: false,
                        keepAll: false,
                        reportDir: './report/lighthouse',
                        reportFiles: 'www_cynerge_com.report.html, www_google_com.report.html',
                        reportName: "Lighthouse"
                    ])
                }
            }

        }
    }
    //     stage('Build') {
    //         steps {
    //             script {
    //                 dockerImage = docker.build registry + ":$BUILD_NUMBER"
    //             }
    //         }
    //     }
    //     stage('Deploy') {
    //         steps {
    //             script {
    //                 docker.withRegistry( '', registryCredential ) {
    //                 dockerImage.push()
    //                 dockerImage.push('latest')
    //                 }
    //             }
    //         }
    //     }
    //     stage('Remove Unused docker image') {
    //         steps{
    //             sh "docker rmi $registry:$BUILD_NUMBER"
    //         }
    //     }
    //     stage('Deploy Kube') {
    //         steps {
    //             // sh 'curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add -'
    //             // sh 'echo "deb https://apt.kubernetes.io/ kubernetes-xenial main" | tee -a /etc/apt/sources.list.d/kubernetes.list'
    //             // sh 'apt-get update'
    //             // sh 'apt-get install -y kubectl'
    //             // sh 'kubectl config --kubeconfig=cluster-config use-context ljoliff@cynerge-cluster-6.us-east-1.eksctl.io'
    //             // sh 'export KUBECONFIG=$KUBECONFIG:cluster-config'
    //             // sh 'curl -o aws-iam-authenticator https://amazon-eks.s3-us-west-2.amazonaws.com/1.12.7/2019-03-27/bin/linux/amd64/aws-iam-authenticator'
    //             // sh 'chmod +x ./aws-iam-authenticator'
    //             // sh 'mkdir -p $HOME/bin && cp ./aws-iam-authenticator $HOME/bin/aws-iam-authenticator && export PATH=$HOME/bin:$PATH && cp ./aws-iam-authenticator /usr/bin/aws-iam-authenticator'
    //             // sh 'echo export PATH=$HOME/bin:$PATH >> ~/.bashrc'
    //             sh "export AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID"
    //             sh "export AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY"
    //             sh 'printenv'
    //             // sh 'cp cluster-config ~/.kube/'
    //             // sh "kubectl set image deployment/jenkins-eks-automated mike1=luther007/jenkins-eks-automated-feature:$BUILD_NUMBER --namespace=feature --kubeconfig=cluster-config"
    //             sh 'pwd'
    //             sh 'curl -O https://get.helm.sh/helm-v2.14.1-linux-amd64.tar.gz'
    //             sh 'tar -zxvf helm-v2.14.1-linux-amd64.tar.gz'
    //             sh 'cp linux-amd64/helm /usr/local/bin/helm'
    //             sh 'ls'
    //             sh "helm init --kubeconfig=$kubeConfig"
    //             sh 'aws eks --region us-east-1 update-kubeconfig --name cynerge'
    //             sh "helm upgrade --install $releaseName $chartPath -f $valuePath --namespace=${env.BRANCH_NAME}"
    //         }
    //     }
    // }
    // post { 
    //     always { 
    //         cleanWs()
    //     }
    // }
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
