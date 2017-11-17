---
layout: base/freelancer/freelancer
title: "Family Sleep Diagnostic"

angular_includes:
  - "{{ site.baseurl }}/app/tractdbConfig.js"
  - "{{ site.baseurl }}/familysleepdiagnostic/diagnostic.js"
---

<header>
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
            </div>
        </div>
    </div>
</header>

<div class="container base-content" ng-app="familySleepDiagnosticApp" ng-controller="familySleepDiagnosticController" ng-strict-di>
    <div class="row">
        <div class="col-lg-12">
            <pre>Server Config: {{ 'serverConfig' | angular }}</pre>
        </div>
    </div>

    <div class="row">
        <div class="col-lg-12">
            <pre>Personas: {{ 'personas' | angular }}</pre>
        </div>
    </div>
</div>
