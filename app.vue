<template>
	<NuxtLayout id="app" class="flex min-h-screen flex-col">
		<!-- add the header from components/molecules -->
		<moleculesHeader />
		<div class="flex-grow app">
			<NuxtPage />
		</div>
		<moleculesFooter />
	</NuxtLayout>
</template>

<style>
	app {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
