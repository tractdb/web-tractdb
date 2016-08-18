---
layout: base/bar-sidebar-none
title: "Login"
title_bar: "Login"
title_secondary: ""

angular_includes:
  - "{{ site.baseurl }}/app/controllers/loginController.js"
---

<div ng-app="serverConfigApp" ng-controller="loginController">
    <div class = "container">
        <div class="wrapper">
		        <form id="loginForm" name="loginForm" class="form-signin">       
		            <h3 class="form-signin-heading">Please Sign In</h3>
			        <hr class="colorgraph"><br>
			        <input type="text" class="form-control" name="account" placeholder="Email" autofocus="" ng-model="formData.account" /><br/>
			        <input type="password" class="form-control" name="password" placeholder="Password" ng-model="formData.password" /><br/>  
                    <button class="btn btn-small" name="Cancel" value="Cancel">Cancel</button> 
                    <button class="btn btn-small btn-primary" name="Login" value="Login" type="Submit">Login</button><br/><br/>
                    <p><a href = "/register">If you're a new user, register now!</a></p>
                    <p><a href = "/forgotPassword">Forgot Password?</a></p>
		        </form>	
		        <pre style = "width: 1000px">   
		            hello
	                {{ "formData" | angular }}   
	            </pre>
	    </div>
	</div>
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
	</style>
</div>