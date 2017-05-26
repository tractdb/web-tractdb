---
layout: base/freelancer/freelancer
title: "Configure Strava"

angular_includes:
  - "{{ site.baseurl }}/app/tractdbConfig.js"
  - "{{ site.baseurl }}/app/stravaCallbackApp.js"
---

<header>
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
            </div>
        </div>
    </div>
</header>

<div class="container base-content" ng-app="stravaCallbackApp" ng-controller="stravaCallbackController" ng-strict-di>
    <div class="row">
        <div class="col-lg-12">
            <h3 class="form-signin-heading">Click below to finish authenticating</h3>
            <button class="btn btn-small btn-primary" name="Submit" value="Submit" ng-click="submitCode()">Save code</button><br/><br/>
        </div>
    </div>
</div>
