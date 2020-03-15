(function($){
	"use strict";

	/* Background image */
	$('[data-bg-image]').each(function(){
		$(this).css({ 'background-image': 'url('+$(this).data('bg-image')+')' });
	});

	$('[data-bg-color]').each(function(){
		$(this).css({ 'background-color': $(this).data('bg-color') });
	});
	

	/* Animsition */
	if( $(".animsition").length ){
		$(".animsition").animsition({
			inClass               :   'zoom-in-sm',
			outClass              :   'zoom-out-sm',
			inDuration            :    800,
			outDuration           :    800,
			linkElement           :   '.at-link',
			loading               :    false,
			loadingParentElement  :   'body', 
			loadingClass          :   'animsition-loading',
			unSupportCss          : [ 'animation-duration',
							  		'-webkit-animation-duration',
							  		'-o-animation-duration'
							],
			overlay               :   false,

			overlayClass          :   'animsition-overlay-slide',
			overlayParentElement  :   'body'
		});
	}



	$(document).ready(function(){

		/* Burger menu */
		$('.burger-menu').on('click', function(){
			$('#navigation').fadeIn();
		});
		
		$('#close-menu').on('click', function(){
			$('#navigation').fadeOut();
		});


		/* Main navigation */
		$('#navigation').find('.nav-wrapper ul li a').hover(
			function(){
				var $this = $(this);
				$('#navigation .nav-wrapper h4').slideUp(400, function(){
					$('#navigation .nav-wrapper h4').text( $this.find('span').text() );
					$('#navigation .nav-wrapper h4').slideDown(400);
				});
			},
			function(){
				$('#navigation .nav-wrapper h4').slideUp(400, function(){
					$('#navigation .nav-wrapper h4').text( $('#navigation .nav-wrapper ul li a.active').text() );
					$('#navigation .nav-wrapper h4').slideDown(400);
				});
			}
		);
		$('#navigation').find('.nav-wrapper ul li a').trigger('hover');


		/* Info box */
		$('.info-boxes').each(function(){
			var $box = $(this);
			$box.find('.ib-item').css({
				'width': 100/$box.find('.ib-item').length + '%'
			});
		});


		$('.icon-boxes').each(function(){
			var $box = $(this);
			$box.find('.box-item').css({
				'width': 100/$box.find('.box-item').length + '%'
			});
		});


		// Timeline
		$('.timeline-exp').each(function(){
			var $tl = $(this);

			$tl.find('.timeline-wrapper > .row').each(function(index){
				if( index %2 == 0 ){
					$(this).find('.tl-item').addClass('pull-right');
				}
			});
		});


		// Progress Line
		$('.progress-line').each(function(){
			var $line = $(this);
			
			$line.waypoint(function(direction) {
				$line.find('.current').css({
					'width': $line.find('.entry-title span').text()
				});
			},{
				triggerOnce: true,
				offset: '90%'
			});
		});


		// Pie Progress
		$('.pie_progress').each(function(){
			var $pie = $(this);

			$pie.asPieProgress({
	            namespace: 'pie_progress',
	            speed: 30,
            	easing: 'linear',
            	barsize: 5
	        });

	        $pie.waypoint(function(direction) {
				$pie.asPieProgress('start');
			},{
				triggerOnce: true,
				offset: '90%'
			});

		});


		// Accordion
		$('.accordion-container').each(function(){
			var $acc = $(this);

			$acc.find('.accordion-group').removeClass('active');
			$acc.find('.accordion-group').eq(0).addClass('active');
			$acc.find('.accordion-group .accordion-content').eq(0).slideDown('fast');

			$acc.find('.accordion-header a').on('click', function(){
				$acc.find('.accordion-group.active .accordion-content').slideUp('fast');

				$acc.find('.accordion-group').removeClass('active');
				$(this).parents('.accordion-group').addClass('active');

				$(this).parents('.accordion-group').find('.accordion-content').stop().slideDown('fast');
			});
		});
		

	});

	
	
	$(window).load(function(){

		/* Portfolio */
		$('.portfolio-posts').each(function(){
			var $folio = $(this);

			$folio.find('.folio-viewport').isotope({
				itemSelector: '.folio-item',
				masonry: {
					columnWidth: 1
				}
			});

			$folio.find('.folio-filter a').on('click', function(){
				var filter = $(this).data('filter');
				$folio.find('.folio-viewport').isotope({ filter: filter });

				$folio.find('.folio-filter a').removeClass('active');
				$(this).addClass('active');
			});

		});

		
		/* Progress bar */
		if( $('.progress-line,.pie_progress').length ){
			setTimeout(function(){
				$(window).trigger('resize');
			}, 2000);
		}
		

	});


})(jQuery);