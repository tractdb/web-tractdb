---
layout: base/bar-sidebar-none
title: "Register"
title_bar: "Register"
title_secondary: "Enter Information Below"

angular_includes:
  - "{{ site.baseurl }}/app/serverconfigapp.js"
---

<div ng-app="">
    <div class="container-fluid">
    <section class="container">
		<div class="container-page">				
			<div class="col-md-6">
				<h3 class="dark-grey">Registration</h3>
				<div class="form-group col-lg-12">
					<label>Username</label>
					<input type="" name="" class="form-control" id="" value="">
				</div>
				<div class="form-group col-lg-6">
					<label>Password</label>
					<input type="password" name="" class="form-control" id="" value="">
				</div>
				<div class="form-group col-lg-6">
					<label>Repeat Password</label>
					<input type="password" name="" class="form-control" id="" value="">
				</div>			
				<div class="form-group col-lg-6">
					<label>Email Address</label>
					<input type="" name="" class="form-control" id="" value="">
				</div>
				<div class="form-group col-lg-6">
					<label>Repeat Email Address</label>
					<input type="" name="" class="form-control" id="" value="">
				</div>			
				<div class="col-sm-6">
					<input type="checkbox" class="checkbox" />Sigh up for our newsletter
				</div>
				<div class="col-sm-6">
					<input type="checkbox" class="checkbox" />Send notifications to this email
				</div>				
			</div>
			<div class="col-md-6">
				<h3 class="dark-grey">Terms and Conditions</h3>
				<p>
					By clicking on "Register" you agree to The Company's' Terms and Conditions
				</p>
				<button type="submit" class="btn btn-primary">Register</button>
			</div>
		</div>
	</section>
</div>
</div>
