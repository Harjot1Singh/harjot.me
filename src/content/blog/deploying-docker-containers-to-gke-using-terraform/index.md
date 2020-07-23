---
templateKey: blog-post
title: Deploying Docker containers to GKE using Terraform
image: working-with-terraform-for-managing-docker.png
date: 2020-07-23T16:47:56.362Z
tags:
  - Docker
  - Kubernetes
  - Microservices
  - Containers
  - Terraform
  - Terragrunt
  - Google Cloud Platform
  - DevOps
  - GitOps
---
So, you've built your platform, you've got some lovely microservices, and now you'd like to deploy your infrastructure with [Terraform](terraform.io).

As an added bonus, you'd love for it to deploy to a development environment when code is pushed to the `develop` branch, and to production when pushed to `master`, as part of a [GitOps](https://www.weave.works/technologies/gitops/) approach.

Let's look at how we can do this, and keep our code [DRY](https://dzone.com/articles/software-design-principles-dry-and-kiss) with [Terragrunt](https://terragrunt.gruntwork.io/). We'll look at deploying the following:

* Google Cloud Project per environment
* [Google Kubernetes Engine (GKE)](https://cloud.google.com/kubernetes-engine)
* Docker images onto Google Kubernetes Engine
* A database provisioned by [Google Cloud SQL](https://cloud.google.com/sql)

We're also going to assume that we'd like to run our development environment in a cheaper (and therefore different) region, 

Let's get started. Exemplar code is available on [GitHub](https://github.com/Harjot1Singh/terraform-example).

### Prerequisites

Install the following to get started.

* [Docker](https://www.docker.com/)
* Google Account
* [Terraform](https://learn.hashicorp.com/terraform/getting-started/install.html)
* [Terragrunt](https://terragrunt.gruntwork.io/docs/getting-started/install/)

### Structure

It's recommended to create a separate folder for all terraform/infrastructure needs at the root of your application. I will unsurprisingly designate this to be named `terraform`.

```bash
mkdir terraform
```

Now we're almost done! But do keep reading.

The remaining structure that this example uses is based off [Terragrunt's example](https://github.com/gruntwork-io/terragrunt-infrastructure-live-example) and [Jake Morisson's post](https://www.cogini.com/blog/deploying-complex-apps-to-aws-with-terraform-ansible-and-packer/).

We'll create two folders:
- **modules** - isolated Terraform modules for repeatable instances of infrastructure: databases, services, load balancers.
- **live** - Terragrunt declarations of our actual infrastructure, leveraging the modules we define.

