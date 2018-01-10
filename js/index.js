var cfg = {
		easing: [0.165, 0.84, 0.44, 1],
		duration: 2500,
		delay: 700,
		layerDelay: 10000,
		width: 28,
		positioning: true,
		colors: [
				'#027CA5',
				'#75B5C6',
				'#00FFD0',
				'#00B994',
				'#BEF5FE'
		]
}

$('.shape-layer').each(function(i) {
		var $this = $(this);

		setTimeout(function() {
				var $paths = $this.find('path');

				strokeSetup($paths);
				strokeOut($paths);

		}, cfg.layerDelay * i);
});

function strokeSetup($el) {
		$el.each(function(i) {
				var $this = $(this),
						pLen = Math.ceil($this.get(0).getTotalLength());

				$this.css({
						'stroke-dasharray': pLen,
						'stroke-dashoffset': pLen,
						'stroke-width': cfg.width
				});
		});
}

function strokeOut($el) {
		var pathCount = $el.length,
				iterationCount = pathCount;

		$el.each(function(i) {
				var $this = $(this),
						pLen = Math.ceil($this.get(0).getTotalLength()),
						color = cfg.colors[getRandom(0, cfg.colors.length)];

				setTimeout(function() {
						$this.css({
								'stroke': color
						});

						if (cfg.positioning) {
								var side = ['top', 'bottom', 'left', 'right'],
										cssO = {};

								$this.parent().css({
										top: 'auto',
										bottom: 'auto',
										left: 'auto',
										right: 'auto'
								});

								cssO[side[getRandom(0, 1)]] = getRandom(0, 40) + '%';

								var firstPos = cssO[Object.keys(cssO)[0]],
										sideAmount = (parseInt(firstPos) < 20) ? 100 : 20;

								cssO[side[getRandom(2, 3)]] = getRandom(0, sideAmount) + '%';

								$this.parent().css(cssO);
						}

						$this.velocity({
								'stroke-dashoffset': 0,
						}, {
								duration: cfg.duration,
								easing: cfg.easing
						});

						if (!--iterationCount) {
								strokeIn($el);
						}
				}, cfg.delay * i);
		});

}

function strokeIn($el) {
		var pathCount = $el.length,
				iterationCount = pathCount;

		$el.each(function(i) {
				var $this = $(this),
						pLen = Math.ceil($this.get(0).getTotalLength());

				setTimeout(function() {

						$this.velocity({
								'stroke-dashoffset': pLen
						}, {
								duration: cfg.duration,
								easing: cfg.easing
						});

						if (!--iterationCount) {
								strokeOut($el);
						}
				}, cfg.delay * i);
		});
}

function getRandom(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
}