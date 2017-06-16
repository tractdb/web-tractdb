---
layout: base/freelancer/freelancer
title: "Profile"

angular_includes:
  - "{{ site.baseurl }}/app/tractdbConfig.js"
  - "{{ site.baseurl }}/app/profileApp.js"
---

<header>
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
            </div>
        </div>
    </div>
</header>

<div class="container base-content" ng-app="profileApp" ng-controller="profileController" ng-strict-di>
    <div class="row">
        <div class="col-lg-12">
            <h3>Profile</h3>
            <div>{{ 'viewModel.account' | angular }}</div>
        </div>
    </div>
</div>
