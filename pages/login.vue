<template>
	<div class="login-page">
		<div class="login-container">
			<DynamicForm
				v-if="login"
				:fields="signupFields"
				submitLabel="Signup"
				:onSubmit="handleSignup"
			/>
			<DynamicForm
				v-else
				:fields="loginFields"
				submitLabel="Login"
				:onSubmit="handleLogin"
			/>
		</div>
		<!-- button to swap between login and signup -->
		<div class="text-center mt-4">
			<button class="text-blue-500 hover:text-blue-700" @click="login = !login">
				{{
					login
						? "Already have an account? Login"
						: "Don't have an account? Signup"
				}}
			</button>
		</div>
	</div>
</template>

<script setup>
	import DynamicForm from "@/components/atoms/DynamicForm.vue";
	import useUserStore from "../stores/user";

	const { $registerUser, $loginUser } = useNuxtApp();
	const router = useRouter();

	const login = ref(true); // Whether to show the login or signup form

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

	const loginFields = [
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
	];

	const handleSignup = async (formValues) => {
		if (formValues.password !== formValues.confirmPassword) {
			alert("Passwords do not match");
			return;
		}

		try {
			const userCredentials = await $registerUser(
				formValues.email,
				formValues.password
			);
			if (userCredentials && userCredentials.uid) {
				// Set user data in the store
				const userStore = useUserStore();
				userStore.setUser(userCredentials.uid, formValues.email);

				alert("Signup successful");
				router.push("/");
			}
		} catch (error) {
			if (error.code === "auth/email-already-in-use") {
				alert("This email is already in use. Please use a different email.");
			} else {
				alert(error.message);
			}
		}
	};

	const handleLogin = async (formValues) => {
		try {
			const userCredentials = await $loginUser(
				formValues.email,
				formValues.password
			);
			console.log(userCredentials);
			if (userCredentials && userCredentials.uid) {
				// Set user data in the store
				const userStore = useUserStore();
				userStore.setUser(userCredentials.uid, formValues.email);

				alert("Login successful");
				router.push("/");
			}
		} catch (error) {
			if (error.code === "auth/user-not-found") {
				alert("This email is not registered. Please signup first.");
			} else if (error.code === "auth/wrong-password") {
				alert("The password is incorrect. Please try again.");
			} else {
				alert(error.message);
				console.log("not working");
			}
		}
	};
</script>

<style scoped lang="scss">
	.login-page {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		height: 100%; /* Use min-height instead of height */
		background-color: #f5f5f5;

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
		}
	}
</style>
