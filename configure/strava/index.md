---
layout: base/freelancer/freelancer
title: "Configure Strava"

angular_includes:
  - "{{ site.baseurl }}/app/tractdbConfig.js"
---

<header>
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
            </div>
        </div>
    </div>
</header>

<div class="container base-content" ng-app="serverConfigApp" ng-controller="serverConfigController" ng-strict-di>
    <div class="row">
        <div class="col-lg-12">
            <a href="https://www.strava.com/oauth/authorize?client_id=16227&response_type=code&redirect_uri=https%3A%2F%2Ftractdb.org%2Fconfigure%2Fstrava%2Fcallback&approval_prompt=force">Link to Strava</a>
        </div>
    </div>
</div>
