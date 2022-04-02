<template>
	<div class="p-10 px-auto w-screen text-center">
		<NewOrder
			v-if="user.verificado == true && confirmado == false"
			class="mx-auto mt-10"
			@confirm="confirmOrder"/>
		<OrderConfirm
			v-if="user.verificado == true && confirmado == true"
			:pedido="pedido"/>
		<button
			v-if="user.verificado == true && confirmado == true"
			class="bg-green-500 rounded-3xl px-4 mt-4 py-2 text-white hover:text-[#501111]"
			@click="confirmado = false">
			Continuar
		</button>
	</div>
</template>

<script>
export default {
	middleware: "auth",
	data() {
		return {
			pedido: {},
			confirmado: false,
		}
	},
	computed: {
		user() {
			return { ...this.$store.state.user }
		},
	},
	methods: {
		confirmOrder(pedido) {
			this.pedido = pedido
			this.confirmado = true
		},
	},
}
</script>
