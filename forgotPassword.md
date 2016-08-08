---
layout: base/bar-sidebar-none
title: "Forgot Password?"
title_bar: "Forgot Password?"
title_secondary: "Type your Email and Click Submit"

angular_includes:
  - "{{ site.baseurl }}/app/serverConfigApp.js"
  - "{{ site.baseurl }}/app/controllers/controllers.js"
  - "{{ site.baseurl }}/app/controllers/forgotPasswordController.js"
---
<div ng-app="serverConfigApp" ng-controller = "forgotPasswordController">
    <div class = "container">
        <div class="wrapper">
		        <form action="" method="post" name="forgotPasswordForm" class="form-signin">       
			        <input type="text" class="form-control" name="Email" placeholder="Email" autofocus="" /><br/>  
                    <button class="btn btn-small btn-primary" name="forgotPassword" value="forgotPassword" type="Submit">Submit</button><br/><br/>
                    <p><a href = "/login">If you're already signed up, login now!</a></p>
		        </form>	
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