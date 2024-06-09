# NodeTeraGitActApp
# AWS ECS Deployment with GitHub Actions and Terraform  </p>
This repository provides a streamlined process to deploy a simple app to AWS ECS using GitHub Actions and Terraform.

# Prerequisites
Before getting started, ensure you have the following prerequisites:

* An AWS account 
* Terraform installed
* Docker installed
* NodeJS

# Getting Started
1. **Clone the Repository**: Create a GitHub repository and clone it to your local machine.
2. **Configure GitHub Secrets:**
     * In your GitHub repository, navigate to Settings > Environments > dev > Environment secrets.
     * Add the following secrets ,Ensure these credentials have necessary permissions to AWS:
       *  **AWS_ACCESS_KEY_ID** : Your AWS access key ID.
       *  **AWS_SECRET_ACCESS_KEY** : Your AWS secret access key.
3. **Modular Terraform Configuration**:
   The Terraform configuration for this project is organized into separate files to ensure a modular and maintainable infrastructure setup. Each file handles specific aspects of the AWS infrastructure and requires updates according to individual project requirements or AWS configurations.

   **Configuration Files**:
   
     1. **Config.tf**: This file contains configurations related to AWS credentials, such as access keys and secret keys. Update this file with your AWS access keys and preferred region.    
     2. **Repository.tf**: Manages the configuration of the Elastic Container Registry (ECR) repository.</p>
           * **Name**: "app_repo"
           * **Image Tag Mutability**: "MUTABLE"
                  Indicates that the image tags within the repository can be overwritten or updated.
           * **Image Scanning Configuration**:
                  *  **Scan on Push**: This feature automatically triggers a scan to identify any vulnerabilities or security issues within the images. It's a security measure to ensure that only safe and secure images are deployed into production environments.    
     3. **Vpc.tf**: Manages the configuration of the Virtual Private Cloud (VPC) and its associated resources. Update this file with your preferred VPC settings, including CIDR blocks, subnet configurations, security group rules, and networking settings.<p>
        1. **VPC Creation (aws_vpc)**:The Terraform code creates a Virtual Private Cloud (VPC) with the CIDR block 10.0.0.0/16. It also configures three subnets within the VPC. While the VPC itself is private, any instances launched in these subnets will have public IP addresses and be accessible from the internet.
        2. **Subnet Creation (aws_subnet)**:
              * To ensures high availability ,Three subnets (sn1, sn2, sn3) are created with smaller /24 CIDR blocks within the VPC.
              * Each subnet (sn1, sn2, sn3) is associated with a specific Availability Zone (ap-south-1a, ap-south-1b, ap-south-1c) and allows instances to be assigned public IP addresses upon launch , **availability_zone can be updated based individual project requirements**
        3. **Security Group**:
             * **Ingress Rules**: Allows **HTTPS** traffic on port 443 (TCP) from any source and **HTTP** traffic on port 80 (TCP) from any source.
             * **Egress Rules**: Permits all outbound traffic.
        5. **An internet gateway** : Created to serve as the gateway for internet-bound traffic originating from within the VPC.
        6. **Route Table** : A route table (rt) is defined to manage the routing of network traffic within the VPC. It contains two routes to ensure that resources within the VPC have connectivity to the internet for both IPv4 (0.0.0.0/0) and IPv6(::/0) traffic:
        7. **Route Table Associations** : Three associations (route1, route2, route3) are created to associate each subnet with the route table.
         
         
     4. **Ecs.tf**: Handles the setup of the ECS (Elastic Container Service) cluster, service, and task definition. Customize this file based on your application's requirements, including task definitions, container configurations, and desired ECS cluster settings.
        * **ECS Cluster**: Creates a cluster named app_cluster to host ECS services.
        * **ECS Service**: Deploys the app_service within app_cluster using the Fargate launch type.
             - Ensures reliable deployment by maintaining healthy instances and allowing flexibility during updates.
             - Configured to run tasks from the specified task definition.
             - Provides public IPs to tasks and secures them using defined security groups and subnets.
             - Allows ECS Execute Command to manage and interact with tasks.
        * **ECS Task Definition**: Specifies the blueprint for running container tasks.
             - Defines container settings, including image source and resource requirements.
             - Utilizes appropriate network settings and roles for permissions.      

 4. **Github action workflow**:
    * **AWS.yml** : File has following AWS sepcific configuration
          * GitHub Action for deploying to Amazon ECS
          * Triggered on push to main branch
          * Sets up AWS credentials and logs in to Amazon ECR
          * Builds and pushes Docker image
          * Updates ECS task definition
          * Deploys new task definition to specified ECS service in specified cluster
    * **TD.json** : Copy the content from "Amazon Elastic Container Service > Task definitions > app > JSON" for the latest app revision. Remove "revision: 6" and the "6" from "app:6".
    * **Trigger**: The workflow runs on pushes to the main branch.
    * **Build and Deploy**:
        - **Build and Push Docker Image**: Builds the application Docker image and pushes it to Amazon ECR.
        - **Update ECS Task Definition**: Updates the ECS task definition with the new image.
        - **Deploy to Amazon ECS**: Deploys the updated task definition to the ECS service.
# Future Enhancements
Consider implementing the following enhancements to further improve your deployment process:

1. **Implement Load Balancing**:

    This setup deploys an app with a public IP, which currently changes on each deployment; a load balancer will be added in future updates to address this.

2. **Implement Auto Scaling**:

    Configure auto scaling to automatically adjust the number of ECS tasks based on demand.

3. **Monitoring and Logging**:

    Implement robust monitoring and logging solutions using AWS CloudWatch and AWS X-Ray for better insights into application performance.

4. **Infrastructure as Code Refactoring**:

    Refactor Terraform configuration to follow best practices, modularize components, and leverage Terraform features for better organization.

5. **Security Enhancements**:

    Strengthen security by implementing encryption, fine-grained access controls, and regular security reviews.

6. **Continuous Integration and Deployment (CI/CD)**:

    Integrate CI/CD tools like AWS CodePipeline and AWS CodeBuild to automate build, test, and deployment processes.

7. **Cost Optimization**:

    Regularly review and optimize AWS resources to minimize costs while maintaining performance and availability.
# Screenshot
 the screencast demonstrates the deployment process.
    
