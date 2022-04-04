<template>
	<div class="p-10">
		<h2 class="text-center text-2xl font-main text-[#501111]">
			No has sido verificado aun, para ser verificado ingresa tu número Whatsapp y
			te enviaremos un código.
		</h2>
		<h4 class="text-center text-xl text-[#501111] mt-5">
			Si no recibes el código en pocos minutos;
		</h4>
		<ul class="text-center text-[#501111] mb-5">
			<li>
				<p>1. Asegurate de que el código del país sea el correcto. (Ex: Ve +58)</p>
			</li>
			<li>
				<p>2. Asegurate de colocar el código de operador sin cero. (Ex: 414)</p>
			</li>
		</ul>
		<EditPhone :user-prop="user" :open="true" />
	</div>
</template>

<script>
export default {
	computed: {
		user() {
			return { ...this.$store.state.user }
		},
	},
}
</script>

<style></style>
