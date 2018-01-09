// smooth scroll to div
$('a[href*=#]:not([href=#])').click(function() {
  if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    if (target.length) {
      $('html,body').animate({
        scrollTop: target.offset().top
      }, 1000);
      return false;
    }
  }
});
$('[data-skill]').each(function(){

	var item = $(this),
		skill = item.data('skill'),
		size = item.data('skill-size'),
		border = 5,
		radius = (size / 2) - border,
		circumference = 2 * Math.PI * radius,
		progress = circumference - ((circumference / 100) * skill),
		speed = 1000;
	
	item.append('<h4>0</h4><svg><circle class="back" /><circle class="front" /></svg>');
	
	$({Counter: 0}).animate({
			Counter: skill
		}, {
			duration: speed,
			easing: 'swing',
			step: function () {
			item.find('h4').text(Math.ceil(this.Counter) + '%');
		}
	});
	
	item.find('svg').width(size).height(size);
	
	item.find('circle').attr({
		'r' : radius,
		'cy' : radius + border,
		'cx' : radius + border
	});
	
	item.find('.front').css({
		'stroke-dasharray' : circumference,
		'stroke-dashoffset' : circumference
	}).animate({
		'stroke-dashoffset' : progress
	}, speed);

});
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