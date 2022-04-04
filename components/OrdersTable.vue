<template>
	<div>
		<div
			class="relative overflow-x-auto shadow-md rounded-xl border-2 border-yellow-400">
			<table class="w-full text-sm text-left text-gray-500">
				<thead class="text-xs text-[#501111] uppercase bg-yellow-400">
					<tr>
						<th v-if="$route.name == 'admin'" scope="col" class="px-6 py-6">
							Cliente
						</th>
						<th scope="col" class="px-6 py-6">Pedido hecho el</th>
						<th scope="col" class="px-6 py-6">Cantidad</th>
						<th scope="col" class="px-6 py-6">USD</th>
						<th scope="col" class="px-6 py-6">Cambio BsF</th>
						<th scope="col" class="px-6 py-6">Estados</th>
						<th scope="col" class="px-6 py-6">
							<span class="sr-only">Acción</span>
						</th>
					</tr>
				</thead>
				<td v-if="pedidos.length == 0" class="p-10 bg-gray-50" colspan="7">
					No existe ningún pedido
				</td>
				<TableOrder
					v-for="(pedido, index) in pedidos"
					v-else
					:key="index"
					:pedido="pedido"/>
			</table>
		</div>
		<ul class="mt-10 ml-2">
			<li><h3>LEYENDA</h3></li>
			<li class="text-yellow-500">
				<p class="flex inline">
					Entregado
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6 ml-2"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
					</svg>
				</p>
			</li>
			<li class="text-green-500">
				<p class="flex inline">
					Pagado
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6 ml-2"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/>
					</svg>
				</p>
			</li>
			<li class="text-blue-500">
				<p class="flex inline">
					Pago confirmado
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6 ml-2"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
					</svg>
				</p>
			</li>
			<li class="text-red-500">
				<p class="flex inline">
					Cancelado
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6 ml-2"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
					</svg>
				</p>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	props: {
		pedidos: {
			type: Array,
			required: true,
		},
	},
	data() {
		return {}
	},
	computed: {
		user() {
			return { ...this.$store.state.user }
		},
	},
}
</script>

<style></style>
