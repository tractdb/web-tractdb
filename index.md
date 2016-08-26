---
layout: base/bar/bar-sidebar-none
modal-id: 1
date: 2016-07-18
img: cabin.png
alt: image-alt
project-date: July 2014
client: The Client
category: Web Development
description: The description of the project
title: "title"
title_bar: "title_bar"
title_secondary: "title_secondary"

angular_includes:
  - "{{ site.baseurl }}/app/tractdbConfig.js"
  - "{{ site.baseurl }}/app/serverConfigApp.js"
---

<div ng-app="serverConfigApp" ng-controller="serverConfigController" ng-strict-di>
  <div class="base-content">
    <p id="server-config">Server Config: {{ 'serverConfig' | angular }}</p>
    <br/>
    <br/>
    <p><a href = "/login">Login</a></p>
    <p><a href = "/register">Register</a></p>
  </div>
</div>
