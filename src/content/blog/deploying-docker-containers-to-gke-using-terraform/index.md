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
So, you've built your platform, you've got some lovely microservices, and now you'd like to deploy your infrastructure with [Terraform](https://terraform.io).

As an added bonus, you'd love for it to deploy to a development environment when code is pushed to the `develop` branch, and to production when pushed to `master`, as part of a [GitOps](https://www.weave.works/technologies/gitops/) approach.

Let's look at how we can do this, and keep our code [DRY](https://dzone.com/articles/software-design-principles-dry-and-kiss) with [Terragrunt](https://terragrunt.gruntwork.io/). We'll look at deploying the following:

* Google Cloud Project per environment
* [Google Kubernetes Engine (GKE)](https://cloud.google.com/kubernetes-engine)
* Docker images onto Google Kubernetes Engine
* A database provisioned by [Google Cloud SQL](https://cloud.google.com/sql)

We're also going to assume that we'd like to run our development environment in a cheaper (and therefore different) region, and with less nodes in our GKE cluster, so we need to be able to configure some of these parameters on a per-environment basis.

Let's get started. Exemplar code is available on [GitHub](https://github.com/Harjot1Singh/terraform-example).

## Prerequisites

Install the following to get started.

* [Docker](https://www.docker.com/)
* Google Account
* [Terraform](https://learn.hashicorp.com/terraform/getting-started/install.html)
* [Terragrunt](https://terragrunt.gruntwork.io/docs/getting-started/install/)

Now, create two projects with [Google Console](https://console.cloud.google.com), named anything. One will be used for `development` deployments, and another, `production` deployments. Create a service account for each project, with `Editor` access. Once a service account is created, you can create a key for the service account (choose JSON), and download these. Keep them safe, we will need these.

![](google-service-account.png)

## Structure

It's recommended to create a separate folder for all terraform/infrastructure needs at the root of your application. I will unsurprisingly designate this to be named `terraform`.

```bash
mkdir terraform
```

Now we're almost done! (No, do keep reading)

The remaining structure that this example uses is based off [Terragrunt's example](https://github.com/gruntwork-io/terragrunt-infrastructure-live-example) and [Jake Morisson's post](https://www.cogini.com/blog/deploying-complex-apps-to-aws-with-terraform-ansible-and-packer/).

We'll create two folders:

* **modules** - Isolated Terraform modules for repeatable instances of infrastructure: databases, services, load balancers.
* **live** - Terragrunt declarations of our actual infrastructure, leveraging the modules we define. Create folders to hold the declarations for any different environments inside:

  * **development**
  * **production**

The `development` and `production` folders will contain sub-directories corresponding to each unit of infrastructure. These folders will call upon any of our `modules` that we define.

An example: `live/production/gcp-gke` will provide the specific parameters required by `modules/gcp-gke`. This means that we can configure a different `live/development/gcp-gke` unit for our development environment, but only need to change the variables we pass. 

We will place `.hcl` files in the corresponding environment directories, which will contain environment-specific shared variables across the services. E.g. `live/development/env.hcl` will contain our development Google Account details.

Now we're DRY-ing ✔.

### What does Terragrunt do for us?

A lot of the original USPs that Terragrunt boasts are slowly making their way into Terraform. But that still leaves a few worthwhile reasons to pick it up.

Terragrunt can read and include these files, so that we can keep them in one place. We can now include other `.hcl` files with the `include` block and cleanly represent dependencies with the `dependency` block. More information on the extensions that Terragrunt provides is available via the [Terragrunt Docs](https://terragrunt.gruntwork.io/docs/getting-started/configuration/).

When we run `terragrunt apply-all`, it will find all `terragrunt.hcl` files in all sub-folders and execute them. So, to deploy production infrastructure, all we now need to do is `cd production && terragrunt apply-all`. Can you do this with Terraform, you ask? Well, yes, by defining various variable files and supplying CLI arguments. This approach becomes cumbersome on a day-to-day basis. This [Reddit post](https://www.reddit.com/r/Terraform/comments/hv9gdl/when_is_terragrunt_needed/) provides a good example of this.

## Enough talk, show me the money!

So far, we have:

```bash
- terraform/
  - live/
    - development/
    - production/
  - modules/
```

We are going to work towards ending up with:

```bash
- terraform/
  - live/
    - terragrunt.hcl <= Common parameterised, declarations for state storage etc, used by children files
    - development/
      - credentials.json <= Development Project's Google Service Account credentials
      - env.hcl <= Variables for development environment
      - gcp-gke/
        - terragrunt.hcl <= Includes env files and supplies values to corresponding module
      - gcp-sql/
        - terragrunt.hcl
    - production/
      - credentials.json <= Production Project's Google Service Account credentials
      - env.hcl  <= Variables for production environment
      - gcp-gke/
        - terragrunt.hcl
      - gcp-sql/
        - terragrunt.hcl
  - modules/
    - gcp-gke/
      - main.tf <= Declarations
      - variables.tf <= Module's input variables
      - output.tf <= Module's output variables
    - gcp-sql/
      - main.tf
      - variables.tf
      - output.tf
```
Go ahead and create these directories.

Although you may see a duplication of structure, do remember that `modules/gcp-gke` specifies how to create a Google Kubernetes Cluster, whilst `development/gcp-gke` will leverage `modules/gcp-gke` to create a Google Kubernetes Cluster for the development environment with the supplied configuration.

### Service Account Credentials

For now, place the two service accounts that you created earlier into the corresponding directories. You should *never* commit these to a repository. Instead, the contents should be supplied as an environment variable by CI and written to disk during the execution of pipeline, or a secrets manager should decode the files during the pipeline run.


