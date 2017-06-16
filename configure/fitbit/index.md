---
layout: base/freelancer/freelancer
title: "Configure Fitbit"

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
            <a href="{{ site.tractdb.configure.url_fitbit }}">Link to Fitbit</a>
        </div>
    </div>
</div>
