<template>
	<div class="p-10 h-screen overflow-hidden">
		<p class="text-2xl text-justify px-[3vw] md:px-[25vw] my-8 text-last-center">
			Bienvenido a <span class="text-yellow-400 font-main">Natupets</span> esta
			página es una prueba piloto para manejar la compra de la comida de tu
			mascota, de manera fácil y rápida
		</p>
		<div class="text-center flex flex-col md:block mb-10 md:mb-4">
			<nuxt-link to="/pedidos" class="bg-[#501111] rounded-3xl px-4 ml-4 py-2 mb-6 text-white hover:text-yellow-400">
				HACER UN PEDIDO
			</nuxt-link>
			<nuxt-link to="/perfil" class="bg-yellow-400 rounded-3xl px-4 ml-4 py-2 text-white hover:text-[#501111]">
				PERFIL
			</nuxt-link>
		</div>
		<img
			src="../static/dog.jpg"
			alt="login con google"
			class="w-[50vw] mx-[25vw] mb-8"/>
	</div>
</template>

<script></script>
