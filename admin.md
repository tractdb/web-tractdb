---
layout: base/freelancer/freelancer
title: "Admin"

angular_includes:
  - "{{ site.baseurl }}/app/tractdbConfig.js"
  - "{{ site.baseurl }}/app/listAccountsApp.js"
---

<div ng-app="listAccountsApp" ng-controller="listAccountsController" ng-strict-di>
  <div class="base-content">
    <p id="list-accounts">List Accounts: {{ 'accounts' | angular }}</p>
  </div>
</div>
