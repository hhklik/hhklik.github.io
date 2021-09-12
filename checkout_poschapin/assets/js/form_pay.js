
(function($){
	var __front_to_back = true;
	var ___pasteCard = false;
	var selected_card = -1;

		var nodo = {
		    nonce_ajax: false,
		    amount_variable: false,
		    time: false,
		    hash: false,
		    redirect: false,
		    orderid : false,
		    key_public: false,
		    wallet_key_public: false,
		    amount: false,
		    moneda: false,
		    page:false,
		    content_url:false,
		    mixed_data : false,
		    local_step_num:false,
		    descripcion:false,
		    currency:false
		}

	    var cards = {
	    "mastercard" : {
	        nome: "mastercard",
	        colore: "#0061A8",
	        src: "https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" ,
	        cvv : 3
	    },
	    "visa" : {
	        nome: "visa",
	        colore: "#E2CB38",
	        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2000px-Visa_Inc._logo.svg.png",
	        cvv : 3
	    },
	    "americanExpress" : {
	        nome: "americanExpress",
	        colore: "#108168",
	        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/American_Express_logo.svg/600px-American_Express_logo.svg.png",
	        cvv : 4
	    },
	    "dinersclub" : {
	        nome: "dinersclub",
	        colore: "#888",
	        src: nodo.content_url + "/assets/img/tipos de tarjeta/Diners-Club-350-350x200.png",
	        cvv : 4
	    },
	    "discover" : {
	        nome: "discover",
	        colore: "#86B8CF",
	        src: "https://lendedu.com/wp-content/uploads/2016/03/discover-it-for-students-credit-card.jpg",
	        cvv : 3
	    },
	    "dankort" : {
	        nome: "dankort",
	        colore: "#0061A8",
	        src: "https://upload.wikimedia.org/wikipedia/commons/5/51/Dankort_logo.png",
	        cvv : 3
	    }
	}

	$('.amount').mask("#,##0.00", {reverse: true});

	$('#card-mount').keyup(function(){
		$('.amount').html(($(this).val()));
	}).mask("#,##0.00", {reverse: true});



	//---------------------------------
	$("#card-number").keyup(function(event){
	    $(".card_number").text($(this).val());
	    number = $(this).val();
	
	    var validarCC = validateCreditcard_number(number);
	   	
	    if(validarCC['status'] == false){
	        selected_card = -1; 
	    
	    }else{
	        selected_card = validarCC['card_code'];
	    }
		
	    if(selected_card != -1){
	        if(selected_card == cards.americanExpress){
	            __front_to_back = false;
	            $('.front .ccv div').show().html("&#x25CF;&#x25CF;&#x25CF;&#x25CF;");
	            $('.back .ccv').hide();
	            $('.ccv').prop('maxLength', 4).val('');
	        }else{
	        	__front_to_back = true;
	           $('.back .ccv div').html("&#x25CF;&#x25CF;&#x25CF;");
	           $('.front .ccv').hide();
	           $('.back .ccv').show();
	           $('.ccv').prop('maxLength', 3).val('');
	        }
	        //html.setAttribute("style", "--card-color: " + selected_card.colore);  
	        console.log(selected_card.src);
	        $(".bankid").prop("src", selected_card.src).show();
	    }else{
	        //html.setAttribute("style", "--card-color: #cecece");
	        $(".bankid").attr("src", "").hide();
	        $('.front .seccode').hide();
	        $('.ccv').prop('maxLength', 3);
	        //html.setAttribute("style", "--card-color: " + "red");  
	        //$(".bankid").attr("src", cards[6].src).show();
	    }
	    if($(".front .number").html().length === 1){
	        //html.setAttribute("style", "--card-color: #cecece");
	       	$(".bankid").attr("src", "").hide();
	        $(".front .number").html("&#x25CF;&#x25CF;&#x25CF;&#x25CF; &#x25CF;&#x25CF;&#x25CF;&#x25CF; &#x25CF;&#x25CF;&#x25CF;&#x25CF; &#x25CF;&#x25CF;&#x25CF;&#x25CF;");
	    }

	}).focus(function(){
	    $(this).css('border','none');
	    $(".card_number").css("color", "white");
	}).on('keydown input',function(){
	    switch(event.type){
	        case 'keydown':

	        break;
	        case 'input':
	            if(event.data){
	                var keyCode = event.data.charCodeAt(0);
	                var key = String.fromCharCode(keyCode);
	                event.key = key;
	                event.keyCode;
	            }
	        break;
	    }

	    $(".card_number").text($(this).val());
	    
	    if((event.key >= 0 && event.key <= 9) || event.keyCode == 45){
	        action_number = true;
	        if(parseInt($(this).val().substring(0, 1)) == 3){
	            $(this).prop('maxlength',17);
	            if($(this).val().length === 4 || $(this).val().length === 11){
	                $(this).val($(this).val() +  "-");
	            }
	        }else{
	            if($(this).val().length === 4 || $(this).val().length === 9 || $(this).val().length === 14){
	                $(this).prop('maxlength',19);
	                $(this).val($(this).val() +  "-");
	            }
	        }
	       
	    }

	    if($(this).val().length === 0){
	        $(this).prop('maxlength',19);
	    }

	    if(___pasteCard){
	        ___pasteCard = false;
	        var card_numero = $(this).val().replace(/[ /_\*@]/g, "-").trim();
	        $(this).val(card_numero);

	        switch(card_numero.length){
	            case 16:
	                $(this).prop('maxlength',19);
	                $(this).val(card_numero.substring(0, 4) + "-" + card_numero.substring(4, 8) + "-" + card_numero.substring(8, 12) + "-" + card_numero.substring(12, 16));
	            break;
	            case 15:
	                $(this).prop('maxlength',17);
	                $(this).val(card_numero.substring(0, 4) + "-" + card_numero.substring(4, 10) + "-" + card_numero.substring(10, 16));
	            break;
	            case 14:
	                $(this).prop('maxlength',16);
	                $(this).val(card_numero.substring(0, 4) + "-" + card_numero.substring(4, 10) + "-" + card_numero.substring(10, 15));
	            break;
	        }
	    }
	}).bind('paste', function() {
	 ___pasteCard = true;
	}).bind('copy',function(){
	    alert('No se puede copiar la informacion de tarjeta');
	    return false;
	}).bind('cut',function(){
	    alert('No se puede cortar la informacion de tarjeta');
	    return false;
	});

	//-----------------------------------------------------------------


//-- ------------------ FUNCIONES -------------------------
function validateCreditcard_number(cc_num){
        let credit_card_number = sanitize(cc_num);
        // Get the first digit
        let data = new Array();
        let firstnumber = parseInt(credit_card_number.substring(0, 1))
        let secondnumber = parseInt(credit_card_number.substring(1, 2))
        // Make sure it is the correct amount of digits. Account for dashes being present.
        let re = undefined;
        switch (firstnumber){
            case 3:
                switch(secondnumber){
                    case 4:
                    case 7:
                        data['card_type'] ="American Express";
                        data['card_code'] = cards.americanExpress;
                        re = /^3(4|7)\d{2}[ \-]?\d{6}[ \-]?\d{5}/
                        if (!re.test(credit_card_number))
                        {
                            //return 'This is not a valid American Express card number';
                            data['status']=false; 
                            data['card_code'] = -1;
                            return data;
                        }
                        break;
                    case 6:
                    case 8:
                    case 9:
                    case 0:
                        data['card_type'] ="DinersClub";
                        data['card_code'] = cards.dinersclub;
                        re = /^3(6|8|9|0)\d{2}[ \-]?\d{6}[ \-]?\d{4}[\d{1}]?/
                        if (!re.test(credit_card_number))
                        {
                            //return 'This is not a valid American Express card number';
                            data['status']=false; 
                            data['card_code'] = -1;
                            return data;
                        }
                        break;
                    default:
                        data['status']=false; 
                        data['card_code'] = -1;
                        return data;
                        break;
                }
                break;
            case 4:
                data['card_type'] ="Visa";
                data['card_code'] = cards.visa;
                re = /^4\d{3}[ \-]?\d{4}[ \-]?\d{4}[ \-]?\d{4}/
                if (!re.test(credit_card_number))
                {
                    //return 'This is not a valid Visa card number';
                    data['status']=false; 
                    data['card_code'] = -1;
                    return data;
                }
                break;
            case 5:
                data['card_type'] ="MasterCard";
                data['card_code'] = cards.mastercard;
                re = /^5\d{3}[ \-]?\d{4}[ \-]?\d{4}[ \-]?\d{4}/
                if (!re.test(credit_card_number))
                {
                    //return 'This is not a valid MasterCard card number';
                    data['status']=false; 
                    data['card_code'] = -1;
                    return data;
                }
                break;
            case 6:
                data['card_type'] ="Discover";
                data['card_code'] = cards.discover;
                re = /^6011[ \-]?\d{4}[ \-]?\d{4}[ \-]?\d{4}/
                if (!re.test(credit_card_number))
                {
                    //return 'This is not a valid Discover card number';
                    data['status']=false; 
                    data['card_code'] = -1;
                    return data;
                }
                break;
            default:
                //return 'This is not a valid credit card number';
                data['card_type'] ="Invalid";
                data['card_code'] = -1;
                data['status']=false; 
                return data;
                break;
        }
        // Here's where we use the Luhn Algorithm
        //credit_card_number = str_replace('-', '', credit_card_number);
        credit_card_number = credit_card_number.replace(/-/ig, '').replace(/ /ig, '');
        let credit_card_numberArray = credit_card_number.split('');
      
        let map = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,0, 2, 4, 6, 8, 1, 3, 5, 7, 9];
        let sum = 0;
        let last = credit_card_number.length - 1;
        for (let i = 0; i <= last; i++)
        {
            sum += map[parseInt(credit_card_numberArray[last - i]) + (i & 1) * 10];
        }

        if (sum % 10 != 0)
        {
            //return 'This is not a valid credit card number';
            data['status']=false; 
            data['card_code'] = -1;
            return data;
        }
        // If we made it this far the credit card number is in a valid format
        data['status']=true; 
        return data;
    }

    function sanitize(value){
        const regex = /(<([^>]+)>)/ig;
        const result = value.replace(regex, '');
        return result.trim();
    }

    function validateCVV(cc_num, cc_cvv){
        let cardNumber = sanitize(cc_num);
        let cvv = sanitize(cc_cvv);
        // Get the first number of the credit card so we know how many digits to look for
        let firstnumber = parseInt(cardNumber.substring(0, 1))
        let secondnumber = parseInt(cardNumber.substring(1, 2))
        let reFour = /^\d{4}$/;
        let reTree = /^\d{3}$/;
        if (firstnumber === 3)
        {
            switch(secondnumber){
                case 6:
                case 8:
                case 9:
                case 0:
                    if (!reTree.test(cvv))
                    {
                        // The credit card is an Dinner club card but does not have a tree digit CVV code
                        return false;
                    }
                    break;
                default:
                    if (!reFour.test(cvv))
                    {
                        // The credit card is an American Express card but does not have a four digit CVV code
                        return false;
                    }    
                    break; 
            }
           
        }
        else if (!reTree.test(cvv))
        {
            // The credit card is a Visa, MasterCard, or Discover Card card but does not have a three digit CVV code
            return false;
        }
        return true;
    }

    function validateCreditCardExpirationDate(data){
        let expire = data.split('/');
        mon = expire[0];
        yr = expire[1];

        if(mon && yr){
            let month = sanitize(mon);
            let monthFix = parseInt(month);
            let year = sanitize(yr);
            let reMonth = /^\d{1,2}$/;
            let reYear = /^\d{2,4}$/;
            let dateCurrent = new Date();
            if(year.length == 2){
                year = dateCurrent.getFullYear().toString().substr(0,2) + year;
            }
            if (!reMonth.test(month))
            {
                return false; // The month isn't a one or two digit number
            }
            else if (!reYear.test(year))
            {
                return false; // The year isn't four digits long
            }
            else if (year < dateCurrent.getFullYear())
            {
                return false; // The card is already expired
            }
            else if (monthFix < (parseInt(dateCurrent.getMonth()) + 1 ) && year == dateCurrent.getFullYear())
            {
                
                return false; // The card is already expired
            }
            return true;
        }else{
            return false;
        }
    }

    var hash = () =>{
        var formData = new FormData();
        var amount_monto = $('#amount_monto').val().replace(/,/ig, '');
        formData.append('amount',amount_monto);
        formData.append('key_public',nodo.key_public);
        formData.append('action','hash');
        formData.append('nonce',nodo.nonce_ajax);
        $.ajax({
            url: nodo.page,
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            dataType : 'json',
            success: function(respuesta)
            {
                switch(respuesta.res){
                    case 1:
                        $('#amount_monto').val($('#amount_monto').val().replace( /,/ig, ''));
                        $('#time').val(respuesta.time);
                        $('#hash').val(respuesta.hash);

                        sendForm = true;
                        $('#form').submit();
                    break;
                    case 0:
                        $('.buy').prop('disabled', false);
                    break;
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                $('.buy').prop('disabled', false);
            }
        });
    }

    var isEmpty = ( el ) =>{
        return !$.trim(el.val())
    }
//-- ------------------ FUNCIONES -------------------------
//
//
//------------------------- MAIN -------------------------
$('document').ready(function(){
	var current_year = new Date().getFullYear();
	var html_data = '<option></option>'
	for (var i = current_year; i < current_year + 15; i++) {
		html_data += '<option>'+i+'</option>';
	}
	$('#card-expiration-year').html(html_data);
})
$('form button[type="button"]').click(function(){
  	let step = $(this).attr('data-step');
  	if(step != ''){
  		$('.step').removeClass('visible');
  		$(step).addClass('visible')
	}
})
$('form').submit(function(e){
  e.preventDefault();
  $('.step').removeClass('visible');
  $('#stepThree').addClass('visible')
})


$('.input-cart-number').on('keyup change', function(){
    $t = $(this);
    
    if ($t.val().length > 3) {
      $t.next().focus();
    }
    
    var card_number = '';
    $('.input-cart-number').each(function(){
      card_number += $(this).val() + ' ';
      if ($(this).val().length == 4) {
        $(this).next().focus();
      }
    })
    
    $('.credit-card-box .number').html(card_number);
  });
  
  $('#card-holder').on('keyup change', function(){
    $t = $(this);
    $('.credit-card-box .card-holder div').html($t.val());
  });
  
  $('#card-holder').on('keyup change', function(){
    $t = $(this);
    $('.credit-card-box .card-holder div').html($t.val());
  });
  
  $('#card-expiration-month, #card-expiration-year').change(function(){
    m = $('#card-expiration-month option').index($('#card-expiration-month option:selected'));
    m = (m < 10) ? '0' + m : m;
    y = $('#card-expiration-year').val().substr(2,2);
    $('.card-expiration-date div').html(m + '/' + y);
    $('#ccexp').val(m + '/' + y);
  })
  
  $('#card-ccv').on('focus', function(){
    if(__front_to_back)
      $('.credit-card-box').addClass('hover');
  }).on('blur', function(){
    $('.credit-card-box').removeClass('hover');
  }).on('keyup change', function(){
    if(__front_to_back){
      $('.back .ccv div').html($(this).val());  
    }else{
      $('.front .ccv div').html($(this).val());  
    }
    
  });
  
  setTimeout(function(){
    $('#card-ccv').focus().delay(1000).queue(function(){
      $(this).blur().dequeue();
    });
  }, 500);

  $('#btn_pdf').click(function(){
  	CreatePDFfromHTML();
  })

  function CreatePDFfromHTML() {
     var divContents = $(".voucher").html();//div which have to print
     var printWindow = window.open('', '_blank', 'height=500,width=900');
     printWindow.document.write('<html><head><title>voucher poschapin</title>');
     //printWindow.document.write('<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.0/css/bootstrap.min.css" >');//external styles
     //printWindow.document.write('<link rel="stylesheet" href="/css/custom.css" type="text/css"/>');
     printWindow.document.write('<link rel="stylesheet" href="./assets/css/voucher.css?v1.3.2" type="text/css"/>');
     printWindow.document.write('</head><body>');
     printWindow.document.write(divContents);
     printWindow.document.write('</body></html>');
     printWindow.document.close();

     printWindow.onload=function(){
     printWindow.focus();                                         
     printWindow.print();
     printWindow.close();
     }
      /*var HTML_Width = $(".printer-ticket").width();
      var HTML_Height = $(".printer-ticket").height();
      var top_left_margin = 15;
      var PDF_Width = HTML_Width + (top_left_margin * 2);
      var PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
      var canvas_image_width = HTML_Width;
      var canvas_image_height = HTML_Height;

      var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;

      html2canvas($(".printer-ticket")[0]).then(function (canvas) {
          var imgData = canvas.toDataURL("image/jpeg", 1.0);
          var pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
          pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
          for (var i = 1; i <= totalPDFPages; i++) { 
              pdf.addPage(PDF_Width, PDF_Height);
              pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
          }
          pdf.addHTML(document.footer,function() {
              pdf.save("Your_PDF_Name.pdf");
          });
          
          $(".printer-ticket").hide();
      });*/
  }
//------------------------- MAIN -------------------------
})(jQuery);