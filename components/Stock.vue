<template>
	<div
		class="rounded-xl p-10 bg-gray-50 text-center overflow-hidden shadow-md border-2 border-yellow-400">
		<h3
			class="-m-10 py-4 px-10 bg-yellow-400 mb-10 font-main text-[#501111] text-xl">
			INVENTARIO
		</h3>
		<h4 class="font-bold text-xl text-[#501111] align-middle mb-4">
			Comidas Disponibles: <br /><span class="text-4xl">{{ stock }}</span>
		</h4>
		<h4 class="font-bold text-xl text-yellow-400 align-middle mb-4">
			Comidas Por Entregadas: <br /><span class="text-4xl">{{ sold }}</span>
		</h4>
		<div class="mt-4 flex-row">
			<h5 class="mb-6">Agregar Comidas Disponibles:</h5>
			<input
				v-model="newStock"
				type="number"
				class="text-center py-2 border-2 rounded-3xl border-yellow-400"/>
			<button
				class="bg-[#501111] rounded-3xl px-4 md:ml-4 mt-4 md:mt-0 py-2 text-white hover:text-yellow-400"
				@click="addStock">
				AGREGAR
			</button>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			newStock: 0,
		}
	},
	computed: {
		stock() {
			return this.$store.state.stock
		},
		sold() {
			return this.$store.state.sold
		},
	},
	methods: {
		addStock() {
			const db = this.$fireModule.firestore()
			db
				.collection('adminData')
				.doc('stock')
				.update({
					disponibles: parseInt(this.stock) + parseInt(this.newStock),
				})
			this.$store.commit('addStock', this.newStock)
			this.newStock = 0
		},
	},
}
</script>

<style></style>
