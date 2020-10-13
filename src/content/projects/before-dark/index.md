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
## Motivation

The time that the sun sets varies throughout the year, and by country. Perhaps you have children, and you'd like to make sure they receive a friendly SMS reminder that it will be dark soon, or you're holidaying and want to make sure you get back home before dark.

## Solution

Before Dark is single page web app that uses your location to calculate the time the sun sets, and will then text you at the predefined and configurable intervals before the sun sets that day. Simply enter the phone number of whom you'd like to receive sunset notifications, and press send.

We created this as part of the Young Rewired State Festival of Code 2014, and were nominated for the best in show award, reaching the semi-finals.

### Technology

When a user enters a phone number, the browser's location is determined using the HTML5 Geolocation API. Is is the reverse-geolocated, using the Google Maps API, to provide longitude and latitude coordinates. and used to calculate the time that the sun sets. This calculated time is added to a queue for the day, stored in MySQL. A cronjob runs a PHP script at a 15 minute interval to determine which phone numbers are pending notification, and uses the Twilio SMS API to send out a message which lets the recipient know that it will be dark soon.