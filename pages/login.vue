<template>
  <div class="login-page">
    <div class="login-container">
      <DynamicForm
        :fields="signupFields"
        submitLabel="Signup"
        :onSubmit="handleSignup"
      />
    </div>
  </div>
</template>

<script setup>
	import DynamicForm from "@/components/atoms/DynamicForm.vue";

	const { $registerUser } = useNuxtApp();
  const router = useRouter();

	const signupFields = [
		{
			name: "email",
			label: "Email",
			type: "email",
			placeholder: "Enter your email",
		},
		{
			name: "password",
			label: "Password",
			type: "password",
			placeholder: "Enter your password",
		},
		{
			name: "confirmPassword",
			label: "Confirm Password",
			type: "password",
			placeholder: "Confirm your password",
		},
	];

	const handleSignup = async (formValues) => {
		if (formValues.password !== formValues.confirmPassword) {
			alert("Passwords do not match");
			return;
		}

		try {
			await $registerUser(formValues.email, formValues.password);
			alert("Signup successful");
      router.push("/");

		} catch (error) {
			if (error.code === "auth/email-already-in-use") {
				alert("This email is already in use. Please use a different email.");
			} else {
				alert(error.message);
			}
		}
	};
</script>

<style scoped lang="scss">
	.login-page {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		background-color: #f5f5f5; // Soft background color for a gentle feel

		.login-container {
			padding: 40px;
			background: #fff;
			border-radius: 8px;
			box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
			width: 100%;
			max-width: 400px; // Ensures the form doesn't stretch too wide on larger screens

			h1 {
				text-align: center;
				color: #333;
				margin-bottom: 20px; // Space above the form
			}

			// Additional styling can be placed here for other elements you might have
			// For example, links, buttons, or informational text outside the form
		}
	}
</style>
