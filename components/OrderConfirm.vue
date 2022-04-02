<template>
	<div class="md:w-[30vw] sm:w-[80vw] sm:mx-auto">
		<div
			class="border-2 rounded-2xl border-[#501111] text-left p-4 overflow-hidden mb-10">
			<div class="-mt-4 bg-[#501111] -mx-4 text-white pl-4 py-2">
				<h4 class="font-main text-2xl">
					{{ user.nombre }}
				</h4>
				<p>
					{{ user.telefono }}
				</p>
			</div>
			<h4 class="text-xl mt-4">{{ pedido.cantidad }} Comidas</h4>
			<h4 class="text-md mt-4">
				{{ pedido.dolares }} USD - {{ pedido.bolivares }} BsF
			</h4>
			<p class="mb-4">Pedido hecho el {{ getFormattedDate(pedido.fecha) }}</p>
			<div
				v-show="pedido.pickup"
				class="mt-2 -mb-4 bg-[#501111] -mx-4 font-main text-white pl-4 py-2">
				<h4 class="flex row">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5 mr-2"
						viewBox="0 0 20 20"
						fill="currentColor">
						<path
							fill-rule="evenodd"
							d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
							clip-rule="evenodd"/>
					</svg>
					Pickup
				</h4>
				<p class="text-left text-sm mt-2">
					Nos pondremos en contacto con usted cuando su pedido este listo para hacer
					pickup
				</p>
			</div>
			<div
				v-show="!pedido.pickup"
				class="mt-2 -mb-4 bg-[#501111] -mx-4 font-main text-white px-4 py-2">
				<h4 class="flex row">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6 mr-2"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2">
						<path
							d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"/>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"/>
					</svg>
					Delivery
				</h4>
				<p class="text-xs">
					{{ user.direccion }}
				</p>
				<p class="text-left text-sm mt-2">
					Nos pondremos en contacto con usted cuando su pedido este listo para ser
					enviado a su dirección
				</p>
			</div>
		</div>
		<p class="text-justify text-last-center mt-4">
			Si alguna de la información proporcionada es incorrecta ingrese a su perfil y
			haga click en cancelar pedido, corrija la información y vuelva a intentar
		</p>
	</div>
</template>

<script>
export default {
	props: {
		pedido: {
			type: Object,
			required: true,
		},
	},
	computed: {
		user() {
			return { ...this.$store.state.user }
		},
	},
	methods: {
		getFormattedDate(date) {
			const year = date.getFullYear()

			let month = (1 + date.getMonth()).toString()
			month = month.length > 1 ? month : '0' + month

			let day = date.getDate().toString()
			day = day.length > 1 ? day : '0' + day

			return (
				day +
				'/' +
				month +
				'/' +
				year +
				' - ' +
				date.getHours() +
				':' +
				date.getMinutes()
			)
		},
	},
}
</script>

<style></style>
