---
layout: base/bar-sidebar-none
title: "Login"
title_bar: "Login"
title_secondary: ""

angular_includes:
  - "{{ site.baseurl }}/app/serverconfigapp.js"
---

<div ng-app="">
    <div class = "container">
        <div class="wrapper">
		        <form action="" method = "post" name="Login_Form" class="form-signin">       
		            <h3 class="form-signin-heading">Please Sign In</h3>
			        <hr class="colorgraph"><br>
			        <input type="text" class="form-control" name="Email" placeholder="Email" required="" autofocus="" /><br/>
			        <input type="password" class="form-control" name="Password" placeholder="Password" required=""/><br/>  
                    <button class="btn btn-small" name="Cancel" value="Cancel">Cancel</button> 
                    <button class="btn btn-small btn-primary" name="Submit" value="Login" type="Submit">Login</button> 
		        </form>	
	    </div>
	</div>
	<style> 
	    .wrapper {    
                margin-top: 80px;
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
	<script>
	    var cancelBtn = document.getElementByName("Cancel");
	    cancelBtn.addEventListener("click", false); 
	</script>
</div>

