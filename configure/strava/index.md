---
layout: base/freelancer/freelancer
title: "Configure Strava"

angular_includes:
  - "{{ site.baseurl }}/app/tractdbConfig.js"
  - "{{ site.baseurl }}/app/loginForStravaApp.js"
---

<header>
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
            </div>
        </div>
    </div>
</header>

<div class="container base-content" ng-app="loginForStravaApp" ng-controller="loginForStravaController">
    <div class="row">
        <div class="col-lg-12">
            <form ng-submit="submitLoginForm()" id="loginForm" name="loginForm" class="form-signin">
                <h3 class="form-signin-heading">Please Sign In</h3>
                <hr class="colorgraph"><br>
                <input class="form-control" name="account" placeholder="Account" autofocus="" required="" maxlength="20" ng-model="viewModel.account" /><br/>
                <input type="password" class="form-control" name="password" placeholder="Password" required="" maxlength="24" ng-model="viewModel.password" /><br/>
                <button class="btn btn-small" name="Cancel" value="Cancel">Cancel</button>
                <button class="btn btn-small btn-primary" name="Login" value="Login" type="submit">Login</button><br/><br/>
            </form>
        </div>
    </div>
</div>
