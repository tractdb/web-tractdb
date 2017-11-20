---
layout: base/freelancer/freelancer
title: "Configure Fitbit"

angular_includes:
  - "{{ site.baseurl }}/app/tractdbConfig.js"
  - "{{ site.baseurl }}/app/fitbitConfigureApp.js"
---

<header>
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
            </div>
        </div>
    </div>
</header>

<div class="container base-content" ng-app="fitbitConfigureApp" ng-controller="fitbitConfigureController" ng-strict-di>
    <div class="row">
        <div class="col-lg-12">
            <a href="{{ site.tractdb.configure.url_fitbit }}">Authorize a Fitbit Account</a>
        </div>
    </div>

    <div class="row">
        <div class="col-lg-12">
            <pre>Fitbit Devices: {{ 'fitbitDevices' | angular }}</pre>
        </div>
    </div>
</div>
