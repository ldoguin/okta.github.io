(function($)  {
	
	$.fn.extend({
		
		pacNav: function(_options) {
			
			var options = $.extend({
				childSelector: "> *",
				direction: "ltr",
				minVisible: 2,
				offsetWidth: 0
			}, _options);
			
			this.each(function() {
				
				var isMobileNavOpen		= false;
				var navItems			= [];
				
				var $pacNav				= $(this);
				var $window				= $(window);
				var $navItems			= $(options.childSelector, $pacNav);
				var $navToggle			= $("<div>").addClass("pac-nav--toggle");
				var $desktopNav			= $("<div>").addClass("pac-nav--desktop");
				var $mobileNav			= $("<div>").addClass("pac-nav--mobile").addClass("pac-nav--hidden");
				var $desktopNavItems	= $navItems.clone();
				var $mobileNavItems		= $navItems.clone();
				
				var closeMobileNav = function()
				{
					if (isMobileNavOpen)
					{
						 toggleMobileNav();
					}
				}
				
				var eatPellets = function()
				{
					var visibleItems = 0;
					var calculatedWidth = 0;
					var desktopWidth = $desktopNav.innerWidth() - options.offsetWidth;
					
					for (var i = 0; i < $desktopNavItems.length; i++)
					{
						calculatedWidth += navItems[i].width;
						
						if (calculatedWidth > desktopWidth)
						{
							$desktopNavItems.eq(i)
								.removeClass("pac-nav--visible")
								.addClass("pac-nav--hidden");
								
							$mobileNavItems.eq(i)
								.removeClass("pac-nav--hidden")
								.addClass("pac-nav--visible");
						}
						else
						{
							$desktopNavItems.eq(i)
								.removeClass("pac-nav--hidden")
								.addClass("pac-nav--visible");
								
							$mobileNavItems.eq(i)
								.removeClass("pac-nav--visible")
								.addClass("pac-nav--hidden");
								
							visibleItems++;
						}
					}
					
					if (visibleItems < options.minVisible)
					{
						$desktopNavItems
							.removeClass("pac-nav--visible")
							.addClass("pac-nav--hidden");
							
						$mobileNavItems
							.removeClass("pac-nav--hidden")
							.addClass("pac-nav--visible");
							
						$pacNav
							.removeClass("pac-nav--is-desktop")
							.removeClass("pac-nav--is-intermediary")
							.addClass("pac-nav--is-mobile");
					}
					else if (visibleItems == navItems.length)
					{
						$pacNav
							.removeClass("pac-nav--is-intermediary")
							.removeClass("pac-nav--is-mobile")
							.addClass("pac-nav--is-desktop");
					}
					else
					{
						$pacNav
							.removeClass("pac-nav--is-desktop")
							.removeClass("pac-nav--is-mobile")
							.addClass("pac-nav--is-intermediary");
					}
				};
				
				var init = function()
				{
					$window
						.load(startingCalculations)
						.load(instantiateDom)
						.load(eatPellets)
						.resize(eatPellets)
						.click(closeMobileNav);
						
					$navToggle.click(toggleMobileNav);
				};
				
				var instantiateDom = function()
				{
					$pacNav
						.empty()
						.append($desktopNav.append($desktopNavItems))
						.append($navToggle)
						.append($mobileNav.append($mobileNavItems));
				};
				
				var startingCalculations = function()
				{
					$navItems.each(function() {
						
						navItems.push({
							width: $(this).outerWidth(true)
						});
						
					});
				};
				
				var toggleMobileNav = function(e)
				{
					if (e)
					{
						e.preventDefault();
						e.stopPropagation();
					}
					
					isMobileNavOpen = !isMobileNavOpen;
					
					if (isMobileNavOpen)
					{
						$mobileNav.addClass("pac-nav--visible");
						$mobileNav.removeClass("pac-nav--hidden");
					}
					else
					{
						$mobileNav.addClass("pac-nav--hidden");
						$mobileNav.removeClass("pac-nav--visible");
					}
				};
				
				init();
				
			});
		
		}
		
	});
	
})(jQuery);