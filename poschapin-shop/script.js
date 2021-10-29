// Remove Items From Cart
$('a.remove').click(function(){
  event.preventDefault();
  $( this ).parent().parent().parent().hide( 400 );
 
})

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
})