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

Let's look at how we can do this, and keep our code [DRY](https://dzone.com/articles/software-design-principles-dry-and-kiss). We'll look at deploying the following:

* [Google Kubernetes Engine (GKE)](https://cloud.google.com/kubernetes-engine)
* Docker images onto Google Kubernetes Engine
* A database provisioned by [Google Cloud SQL](https://cloud.google.com/sql)

Let's get started. 