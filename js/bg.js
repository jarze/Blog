(function () {
	const config = {
		particles: {
			number: {
				value: 50,
				density: {
					enable: true,
					value_area: 400,
				},
			},
			color: {
				value: '#fedb40',
			},
			shape: {
				type: 'star',
				stroke: {
					width: 1,
					color: '#fff',
				},
				polygon: {
					nb_sides: 5,
				},
			},
			opacity: {
				value: 0.8,
				random: true,
				anim: {
					enable: true,
					speed: 1,
					opacity_min: 0.1,
					sync: false,
				},
			},
			size: {
				value: 8,
				random: true,
				anim: {
					enable: true,
					speed: 4,
					size_min: 0.1,
					sync: false,
				},
			},
			line_linked: {
				enable: false,
				distance: 300,
				color: '#258fb8',
				opacity: 0.4,
				width: 2,
			},
			move: {
				enable: true,
				speed: 2,
				direction: 'top-right',
				random: true,
				straight: false,
				out_mode: 'out',
				bounce: false,
				attract: {
					enable: true,
					rotateX: 600,
					rotateY: 1200,
				},
			},
		},
		interactivity: {
			detect_on: 'canvas',
			events: {
				onhover: {
					enable: false,
					mode: 'repulse',
				},
				onclick: {
					enable: true,
					mode: 'push',
				},
				resize: true,
			},
			modes: {
				grab: {
					distance: 800,
					line_linked: {
						opacity: 1,
					},
				},
				bubble: {
					distance: 800,
					size: 80,
					duration: 2,
					opacity: 8,
					speed: 3,
				},
				repulse: {
					distance: 400,
					duration: 0.4,
				},
				push: {
					particles_nb: 4,
				},
				remove: {
					particles_nb: 2,
				},
			},
		},
		retina_detect: true,
	};

	$(document).ready(function () {
		particlesJS('particles', config);
	});
})();
