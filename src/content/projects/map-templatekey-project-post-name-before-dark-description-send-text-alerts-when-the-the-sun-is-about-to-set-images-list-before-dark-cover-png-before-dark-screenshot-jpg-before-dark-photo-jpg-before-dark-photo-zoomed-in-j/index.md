---
templateKey: project-post
featured: false
name: Before Dark
description: Send text alerts when the the sun is about to set
images:
  - before-dark-cover.png
  - before-dark-screenshot.jpg
  - before-dark-photo.jpg
  - before-dark-photo-zoomed-in.jpg
year: "2013"
tags:
  - PHP
  - MySQL
  - Twilio SMS
  - Bootstrap
---
## Why?

The time that the sun sets varies throughout the year, and by country. Perhaps you have children, and you'd like to make sure they receive a friendly reminder that it will be dark soon, or you're holidaying and want to make sure you get back home before dark.

## Solution

Before Dark is single page web app uses your location to calculate the time the sun sets, and will then text you at the predefined and configurable intervals before the sun sets that day.

We created this as part of the Young Rewired State Festival of Code 2014, and were nominated for the best in show award, reaching the semi-finals.

The Google Maps API and HTML5 were used to reverse-geolocate the user, and calculate the sunset based on the longitude and latitude of the user. The Twilio API was then used to send out SMS messages to the number before the sun set.