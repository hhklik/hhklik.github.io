// Remove Items From Cart
(function($){
	
	$('#cbox1').click(function() {
	    if (!$(this).is(':checked')) {
	      return confirm("Are you sure?");
	    }
	});

	// Just for testing, show all items
	  $('a.btn.continue').click(function(){
	    $('li.items').show(400);
	  })

	$('.continue').click(function(e){
		if($(this).data('visible') == 0){
			$(this).data('visible',1);
			$(this).parent().siblings( ".promoCode" ).show();
		}else{
			$(this).data('visible',0);
			$(this).parent().siblings( ".promoCode" ).hide();
		}
	});	
})(jQuery);
