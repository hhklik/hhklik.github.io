// Remove Items From Cart
(function($){
	$('#cbox1').data('cantidad',0);
	$('#cbox2').data('cantidad',0);
	//$('#cantidad1').prop('disabled', true);
	//$('#cantidad2').prop('disabled', true);

	$('#eliminarSeleccion1').click(function(){
    	if($('#cbox1').data('valor') != 0){
	    	$('#cbox1').data('cantidad',0);
	    	$('#cantidad1').val('');
	    	var total = parseFloat($('#total').html());
	    	var valor = parseFloat($('#cbox1').data('valor'));
	    	if(valor != 0){
	    		$('#cbox1').data('valor',0);
	    		var resultado = total - valor;
	    		$('#total').html(resultado.toFixed(2));
	    	}
	    }
	})

	/*$('#cbox1').click(function() {
	    if ($(this).is(':checked')) {
	     	 $('#cbox1').data('cantidad',$('#cbox1').data('cantidad'));
	     	 $('#cantidad1').prop('disabled', false);
	    }else{
	    	$('#cantidad1').prop('disabled', true);
	    	if($('#cbox1').data('valor') != 0){
		    	$('#cbox1').data('cantidad',0);
		    	$('#cantidad1').val('');
		    	var total = parseFloat($('#total').html());
		    	var valor = parseFloat($('#cbox1').data('valor'));
		    	if(valor != 0){
		    		$('#cbox1').data('valor',0);
		    		var resultado = total - valor;
		    		$('#total').html(resultado.toFixed(2));
		    	}
		    }
	    }
	});*/

	$('#cantidad1').change(function(e){
		
		if ($('#cbox1').is(':checked')) {

			if($('#cbox1').data('cantidad') != 0){
				if($('#cantidad1').val() < $('#cbox1').data('cantidad')){
					var total = parseFloat($('#total').html());
					var cantidad = parseInt($('#cbox1').data('cantidad')) - parseInt($('#cantidad1').val());
					var valor_restado = (cantidad * parseFloat($('#evento1').html()));
					var valor = parseFloat($('#cbox1').data('valor')) - valor_restado;
					$('#cbox1').data('valor',valor);
					var resultado = total - valor_restado;
					$('#total').html(resultado.toFixed(2));
				}else{
					
					var total = parseFloat($('#total').html());
					var cantidad = parseInt($('#cantidad1').val()) - parseInt($('#cbox1').data('cantidad'));
					var valor_restado = (cantidad * parseFloat($('#evento1').html()));
					var valor = parseFloat($('#cbox1').data('valor')) + valor_restado;
					$('#cbox1').data('valor',valor);
					var resultado = total + valor_restado;
					$('#total').html(resultado.toFixed(2));
				}
				$('#cbox1').data('cantidad',$('#cantidad1').val());
			}else{
				$('#cbox1').data('cantidad',parseInt($('#cantidad1').val()));
				var total = parseFloat($('#total').html());
				var cantidad_precio = 0;
				if($('#cantidad1').val() != ''){
					cantidad_precio = parseInt($('#cantidad1').val()) *  parseFloat($('#evento1').html());
				}else{
					cantidad_precio = parseFloat($('#evento1').html());
				}
				$('#cbox1').data('valor',cantidad_precio);
				var resultado = total + cantidad_precio;
				$('#total').html(resultado.toFixed(2));
			}

			
		}else{

		}
	}).keydown(function(e)
        {

            var key = e.charCode || e.keyCode || 0;
            console.log(key);
            // allow backspace, tab, delete, enter, arrows, numbers and keypad numbers ONLY
            // home, end, period, and numpad decimal
            return (
                key == 8 || 
                key == 9 ||
                key == 13 ||
                key == 46 ||
                key == 110 ||
                key == 190 ||
                (key >= 35 && key <= 40) ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105));
        });

	$('#eliminarSeleccion2').click(function(){
    	if($('#cbox2').data('valor') != 0){
	    	$('#cbox2').data('cantidad',0);
	    	$('#cantidad2').val('');
	    	var total = parseFloat($('#total').html());
	    	var valor = parseFloat($('#cbox2').data('valor'));
	    	if(valor != 0){
	    		$('#cbox2').data('valor',0);
	    		var resultado = total - valor;
	    		$('#total').html(resultado.toFixed(2));
	    	}
	    }
	});

	/*$('#cbox2').click(function() {
	    if ($(this).is(':checked')) {
	     	 $('#cbox2').data('cantidad',$('#cbox2').data('cantidad'));
	     	 $('#cantidad2').prop('disabled', false);
	    }else{
	    	$('#cantidad2').prop('disabled', true);
	    	if($('#cbox2').data('valor') != 0){
		    	$('#cbox2').data('cantidad',0);
		    	$('#cantidad2').val('');
		    	var total = parseFloat($('#total').html());
		    	var valor = parseFloat($('#cbox2').data('valor'));
		    	if(valor != 0){
		    		$('#cbox2').data('valor',0);
		    		var resultado = total - valor;
		    		$('#total').html(resultado.toFixed(2));
		    	}
		    }
	    }
	});*/

	$('#cantidad2').change(function(){
		

		if ($('#cbox2').is(':checked')) {

			if($('#cbox2').data('cantidad') != 0){
				if($('#cantidad2').val() < $('#cbox2').data('cantidad')){
					var total = parseFloat($('#total').html());
					var cantidad = parseInt($('#cbox2').data('cantidad')) - parseInt($('#cantidad2').val());
					var valor_restado = (cantidad * parseFloat($('#evento2').html()));
					var valor = parseFloat($('#cbox2').data('valor')) - valor_restado;
					$('#cbox2').data('valor',valor);
					var resultado = total - valor_restado;
					$('#total').html(resultado.toFixed(2));
				}else{
					
					var total = parseFloat($('#total').html());
					var cantidad = parseInt($('#cantidad2').val()) - parseInt($('#cbox2').data('cantidad'));
					var valor_restado = (cantidad * parseFloat($('#evento2').html()));
					var valor = parseFloat($('#cbox2').data('valor')) + valor_restado;
					$('#cbox2').data('valor',valor);
					var resultado = total + valor_restado;
					$('#total').html(resultado.toFixed(2));
				}
				$('#cbox2').data('cantidad',$('#cantidad2').val());
			}else{
				$('#cbox2').data('cantidad',parseInt($('#cantidad2').val()));
				var total = parseFloat($('#total').html());
				var cantidad_precio = 0;
				if($('#cantidad2').val() != ''){
					cantidad_precio = parseInt($('#cantidad2').val()) *  parseFloat($('#evento2').html());
				}else{
					cantidad_precio = parseFloat($('#evento2').html());
				}
				$('#cbox2').data('valor',cantidad_precio);
				var resultado = total + cantidad_precio;
				$('#total').html(resultado.toFixed(2));
	
			}

		}
	}).keydown(function(e)
        {

            var key = e.charCode || e.keyCode || 0;
            console.log(key);
            // allow backspace, tab, delete, enter, arrows, numbers and keypad numbers ONLY
            // home, end, period, and numpad decimal
            return (
                key == 8 || 
                key == 9 ||
                key == 13 ||
                key == 46 ||
                key == 110 ||
                key == 190 ||
                (key >= 35 && key <= 40) ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105));
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
