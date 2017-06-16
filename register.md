---
layout: base/freelancer/freelancer
title: "Register"

angular_includes:
  - "{{ site.baseurl }}/app/tractdbConfig.js"
  - "{{ site.baseurl }}/app/registerApp.js"
---

<header>
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
            </div>
        </div>
    </div>
</header>

<div class="container base-content" ng-app="registerApp" ng-controller="registerController">
    <div class="row">
        <div class="col-lg-12">
            <form ng-submit="submitRegisterForm()" id="registerForm" name="registerForm" class="form-signin">
                <h3 class="form-signin-heading">Register a New Account</h3>
                <hr class="colorgraph"><br>
                <input class="form-control" name="account" placeholder="Account" autofocus="" required="" maxlength="20" ng-model="viewModel.account" />
                <br/>
                <input type="password" class="form-control" name="password" placeholder="Password" required="" maxlength="24" ng-model="viewModel.password" />
                <br/>
                <input type="password" class="form-control" name="confirmPassword" placeholder="Confirm Password" required="" maxlength="24" ng-model="viewModel.confirmPassword" />
                <br/>
                <button class="btn btn-small btn-primary" name="Register" value="Register" type="submit">Register</button>
                <button class="btn btn-small" name="Cancel" value="Cancel">Cancel</button>
                <br/><br/>
                <p>Already have an account? <a href = "/login">Sign in.</a></p>
            </form>
        </div>
    </div>
</div>

<!--
  <style>
    .wrapper {
      margin-top: 20px;
      margin-bottom: 20px;
    }
    form {
      width: 320px;
      margin: 0 auto;
    }
    .btn-small {
      width:80px !important;
      display: inline !important;
    }
    .tac {
      font-size: 10px;
    }
  </style>
-->
