var cpFunctions = {};
var server = {};
//server["defaults"] = "http://localhost:3000";
//server["defaults"]  = "http://staging-clicoupizza.herokuapp.com";
//server["defaults"] = "http://128.0.1.12:3000";
server["defaults"] = "http://clicoupizza.com";

signupWithSocial = {};

function formatar(src, mask){
  var i = src.value.length;
  var saida = mask.substring(0,1);
  var texto = mask.substring(i);
if (texto.substring(0,1) != saida)
  {
    src.value += texto.substring(0,1);
  }
}

cpFunctions.formatters = {
	
	currency : function (n,l){
		
		l = "br" || type;
		
		n = parseFloat(n);
		n = $.formatNumber(n, {format:"R$ #,###.00", locale: l});
		
		return n;
		
	},
	
	amount : function (n,l){
		
		l = "br" || type;
		
		n = $.formatNumber(n, {format:"0#", locale: "br"});
		
		return n;		
		
	}
	
}

/* @cpFunction.getHeader
* Pegar de forma
*/
cpFunctions.getHeader = function (url, container, target){
	
return $.get(url,
		function(data, status){
			if(status == "success")
     			$(container,target).html(data).trigger("create");    
		},"html");
	
}

cpFunctions.getFooter = function (url, container, target){
	
return $.get(url,
		function(data, status){
			if(status == "success")
     			$(container,target).html(data).trigger("create");
		},"html");
		
		
	
}

cpFunctions.mobiletabs = function(url, container, target, options){
	
	console.log(container);
	
	$.get(url,
		function(data, status){
			if(status == "success")
     			$(container,target).html(data);
     			$("#tabs",container).tabs(options);     			
		},"html");
			
}

// Prevent scrolling on this element
cpFunctions.touchMove = function(event) {
	event.preventDefault();
}

// Prevent input keyboard on mobile
cpFunctions.onclick = function(event) {
	event.preventDefault();
}

cpFunctions.addBackButton = function (page,text,href){
	
	
	if(!text)  text = "Voltar";
	
	if(!href) href = 'data-rel="back"';
	else href = 'href="'+href+'"';
	
	var btn = '<a '+href+' data-theme="a" data-direction="reverse" data-corners="false" style="text-decoration:none; color:white; position:absolute; top: 6px;" data-role="button" id="app-back-btn">'+text+'</a>';
	
	var activePage = $("div#"+page+"");
	var activeHeader = $("[data-role='header']",activePage);
	
	$("#app-back-btn",activeHeader).remove();
	$(btn).appendTo(activeHeader);
	
	$("#app-back-btn").button();
	
}

cpFunctions.openPopupTamanhoPizza = function(div, input, descr,tmplte,order_data){
	
	var itens = order_data.pizza_sizes;
		
	itens["data-object"] = "order_pizza";
	itens["data-target"] = "pizza_size_id";
	itens['label']		 = "Pedaços";
		
	var popup = {
		title: descr,
		id: div,
		itens : itens
	}
	
	if(!$("#selectPizzaTamanhos-popup").length)
		$("#"+tmplte+"").tmpl(popup).appendTo("#carrinho-pizzas");
	
	$("#"+div+"-popup","#"+div+"-screen").remove();

	$("#"+div+"").popup({ history: false});
	
	$("#"+div+"").has(".cp-popup-close-btn").length == 0 ? $("#"+div+"").prepend("<a href='#' data-rel='back' data-role='button' data-icon='delete' data-iconpos='notext' data-theme='c' class='ui-btn-right cp-popup-close-btn'>Delete</a>").trigger("create") : ""		
	
	$("#"+div+"").popup("open",
	{
		positionTo:"origin",
		x:0,
		y:0,
		overlayTheme: "g"
	});
	
	$("li a","#"+div+"").each(function(){
		$(this).click(function(){
			
			var heading = "<h1 class='ui-li-heading no-margin'>"+$(".ui-li-heading",this).html()+"</h1>";
			var description = $(".ui-li-desc",this).html() == null ? "": "<p class='ui-li-desc'>"+$(".ui-li-desc",this).html()+"</p>";			
			
			$(".ui-btn-text",input).html(heading+description);
			
		    
		    if($(this).attr("data-object") == "order_pizza")
		      order_pizza[$(this).attr("data-target")] = $(this).attr($(this).attr("data-target"));
		      
		      
		    $(order_pizza_data.pizza_sizes).each(function(index){
				if(this.id == order_pizza.pizza_size_id){
 					order_pizza_data['order_pizza_data_selected'] = order_pizza_data.pizza_sizes[index];
 					
 					if(order_pizza_data['order_pizza_data_selected'].pizza_edges.length > 0) 					
						$("#txtPizzaBordaMassa").removeClass("no-display"); 					
 					else
 						$("#txtPizzaBordaMassa").addClass("no-display");
 					
 					if(order_pizza_data.pizza_pastas.length > 0) 					
 						$("#txtPizzaTipoMassa").removeClass("no-display");
 					else
 						$("#txtPizzaTipoMassa").addClass("no-display");
 					
 					$("#txtPizzaQuantSabores").removeClass("no-display");
 				
 				} 				 				
			});
		      
			$("#"+div+"").popup("close");		      
			
		});
	});

}

cpFunctions.openPopupBebidas = function(div, input, descr,tmplte,order_data){
	
	var itens = "";
	
	if(order_drink_data.length > 0)
		$(order_drink_data).each(function(index){
			itemValue = cpFunctions.formatters.currency(this.value);
			itens+='<li data-theme="b"><a href="" data-object="order_drink" data-target="drink_id" drink_id='+this.id+'><h1 class="ui-li-heading">'+this.description+' - <span class="item_value">'+itemValue+'</span> </h1></a></li>';				
		});
	else
		itens='<li data-theme="b"><a href=""><h1 class="ui-li-heading">Sem bebidas disponíveis no momento</h1></a></li>';
	
			
	var popup = {
		title: descr,
		id: div,
		itens : ""+itens+""
	}

	/*auiq*/
	$("#"+div+"","#"+div+"-popup","#"+div+"-screen").remove();
	
	$("#"+tmplte+"").tmpl(popup).appendTo("#carrinho-bebidas");
	
	$("#"+div+"_listview").listview();
    
	$("#"+div+"").popup({ history: false});
	
	$("#"+div+"").has(".cp-popup-close-btn").length == 0 ? $("#"+div+"").prepend("<a href='#' data-rel='back' data-role='button' data-icon='delete' data-iconpos='notext' data-theme='c' class='ui-btn-right cp-popup-close-btn'>Delete</a>").trigger("create") : ""		
	
	$("#"+div+"").popup("open",
	{
		positionTo:"origin",
		x:0,
		y:0,
		overlayTheme: "g"
	});
	
	$("li a","#"+div+"").each(function(){
		$(this).click(function(){
			
			var heading = "<h1 class='ui-li-heading no-margin'>"+$(".ui-li-heading",this).html()+"</h1>";
			var description = $(".ui-li-desc",this).html() == null ? "": "<p class='ui-li-desc'>"+$(".ui-li-desc",this).html()+"</p>";			
			
			$(".ui-btn-text",input).html(heading+description);			
		    
		    if($(this).attr("data-object") == "order_drink")
		      order_drink[$(this).attr("data-target")] = $(this).attr($(this).attr("data-target"));
		      
			$("#"+div+"").popup("close");		      
			
		});
	});

}

cpFunctions.openPopupProdutos = function(div, input, descr,tmplte,order_data){
	
	var itens = "";
	
	$(order_product_data).each(function(index){
		itemValue = cpFunctions.formatters.currency(this.value);
		itens+='<li data-theme="b"><a href="" data-object="order_product" data-target="product_id" product_id='+this.id+'><h1 class="ui-li-heading">'+this.description+' - <span class="item_value">'+itemValue+'</span> </h1></a></li>';				
	});
	
	var popup = {
		title: descr,
		id: div,
		itens : ""+itens+""
	}

	/*auiq*/
	$("#"+div+"","#"+div+"-popup","#"+div+"-screen").remove();
	
	$("#"+tmplte+"").tmpl(popup).appendTo("#carrinho-produtos");
	
	$("#"+div+"_listview").listview();
    
	$("#"+div+"").popup({ history: false});
	
	$("#"+div+"").has(".cp-popup-close-btn").length == 0 ? $("#"+div+"").prepend("<a href='#' data-rel='back' data-role='button' data-icon='delete' data-iconpos='notext' data-theme='c' class='ui-btn-right cp-popup-close-btn'>Delete</a>").trigger("create") : ""		
	
	$("#"+div+"").popup("open",
	{
		positionTo:"origin",
		x:0,
		y:0,
		overlayTheme: "g"
	});
	
	$("li a","#"+div+"").each(function(){
		$(this).click(function(){
			
			var heading = "<h1 class='ui-li-heading no-margin'>"+$(".ui-li-heading",this).html()+"</h1>";
			var description = $(".ui-li-desc",this).html() == null ? "": "<p class='ui-li-desc'>"+$(".ui-li-desc",this).html()+"</p>";			
			
			$(".ui-btn-text",input).html(heading+description);			
		    
		    if($(this).attr("data-object") == "order_product")
		      order_product[$(this).attr("data-target")] = $(this).attr($(this).attr("data-target"));
		      
			$("#"+div+"").popup("close");		      
			
		});
	});

}

cpFunctions.openPopupQuantSabores = function(div, input, descr,tmplte,order_data){
	
	var itens = "";
	
	for(var i=1;i<=order_data['order_pizza_data_selected'].number_of_flavors;i++){
		if(i==1)
			itens+='<li data-theme="b"><a href="" data-object="order_pizza" data-target="qtd_flavor" qtd_flavor='+i+'><h1 class="ui-li-heading">'+i+' Sabor</h1></a></li>';		
		else		
			itens+='<li data-theme="b"><a href="" data-object="order_pizza" data-target="qtd_flavor" qtd_flavor='+i+'><h1 class="ui-li-heading">'+i+' Sabores</h1></a></li>';
	}
			
	var popup = {
		title: descr,
		id: div,
		itens : ""+itens+""
	}

	/*auiq*/
	$("#"+div+"","#"+div+"-popup","#"+div+"-screen").remove();
	
	$("#"+tmplte+"").tmpl(popup).appendTo("#carrinho-pizzas");
	
	$("#"+div+"_listview").listview();
    
	$("#"+div+"").popup({ history: false});
	
	$("#"+div+"").has(".cp-popup-close-btn").length == 0 ? $("#"+div+"").prepend("<a href='#' data-rel='back' data-role='button' data-icon='delete' data-iconpos='notext' data-theme='c' class='ui-btn-right cp-popup-close-btn'>Delete</a>").trigger("create") : ""		
	
	$("#"+div+"").popup("open",
	{
		positionTo:"origin",
		x:0,
		y:0,
		overlayTheme: "g"
	});
	
	$("li a","#"+div+"").each(function(){
		$(this).click(function(){
			
			var heading = "<h1 class='ui-li-heading no-margin'>"+$(".ui-li-heading",this).html()+"</h1>";
			var description = $(".ui-li-desc",this).html() == null ? "": "<p class='ui-li-desc'>"+$(".ui-li-desc",this).html()+"</p>";			
			
			$(".ui-btn-text",input).html(heading+description);			
		    
		    if($(this).attr("data-object") == "order_pizza")
		      order_pizza[$(this).attr("data-target")] = $(this).attr($(this).attr("data-target"));
		      
		      
		    $(order_pizza_data.pizza_sizes).each(function(index){
				if(this.id == order_pizza.pizza_size_id)
 				order_pizza_data['order_pizza_data_selected'] = order_pizza_data.pizza_sizes[index]; 				
			});
			
			
			
			$(".carrinho-main-fieldcontain").each(function(){
				$(this).remove();
			})
			
			
			$("#selectIngredientesAdd-screen","selectIngredientesAdd-popup","#selectIngredientesDel-screen","selectIngredientesDel-popup").remove();
			order_pizza["order_pizza_flavors_attributes"] = {};
			
			
			var sabores = {
				itens: []
			}
			
			for(var i=0;i< parseInt($(".ui-li-heading",this).text());i++){
				sabores.itens[i] = {index: i, labelidx: i+1}					
			}
 				
 			$("#carrinho-pizzas-popup-SaboresContainer-Tmpl").tmpl(sabores).insertBefore("#adicionar-pedido");
 			$(".carrinho-main-fieldcontain").trigger("create");

		      
			$("#"+div+"").popup("close");		      
			
		});
	});

}

cpFunctions.openPopupTipoMassa = function(div, input, descr,tmplte,order_data){

	
	var itens = '<li data-theme="b"><a href="" data-object="order_pizza" data-target="pizza_pasta_id" pizza_pasta_id=""><h1 class="ui-li-heading">Massa normal</h1></a></li>';
	
	$.each(order_data.pizza_pastas, function(){
		itemValue = cpFunctions.formatters.currency(this.value);
		itens+='<li data-theme="b"><a href="" data-object="order_pizza" data-target="pizza_pasta_id" pizza_pasta_id='+this.id+'><h1 class="ui-li-heading">'+this.description+' - <span class="item_value">'+itemValue+'</span> </h1></a></li>';
	});
			
	var popup = {
		title: descr,
		id: div,
		itens : ""+itens+""
	}

	/*auiq*/
	$("#"+div+"","#"+div+"-popup","#"+div+"-screen").remove();
	
	$("#"+tmplte+"").tmpl(popup).appendTo("#carrinho-pizzas");
	
	$("#"+div+"_listview").listview();
    
	$("#"+div+"").popup({ history: false});
	
	$("#"+div+"").has(".cp-popup-close-btn").length == 0 ? $("#"+div+"").prepend("<a href='#' data-rel='back' data-role='button' data-icon='delete' data-iconpos='notext' data-theme='c' class='ui-btn-right cp-popup-close-btn'>Delete</a>").trigger("create") : ""		
	
	$("#"+div+"").popup("open",
	{
		positionTo:"origin",
		x:0,
		y:0,
		overlayTheme: "g"
	});
	
	$("li a","#"+div+"").each(function(){
		$(this).click(function(){
			
			var heading = "<h1 class='ui-li-heading no-margin'>"+$(".ui-li-heading",this).html()+"</h1>";
			var description = $(".ui-li-desc",this).html() == null ? "": "<p class='ui-li-desc'>"+$(".ui-li-desc",this).html()+"</p>";			
			
			$(".ui-btn-text",input).html(heading+description);			
		    
		    if($(this).attr("data-object") == "order_pizza")
		      order_pizza[$(this).attr("data-target")] = $(this).attr($(this).attr("data-target"));
		      
		      
		    $(order_pizza_data.pizza_sizes).each(function(index){
				if(this.id == order_pizza.pizza_size_id)
 				order_pizza_data['order_pizza_data_selected'] = order_pizza_data.pizza_sizes[index]; 				
			});
		      
			$("#"+div+"").popup("close");		      
			
		});
	});

}

cpFunctions.openPopupBordaMassa = function(div, input, descr,tmplte,order_data){

	var itens = '<li data-theme="b"><a href="" data-object="order_pizza" data-target="pizza_edges" pizza_edges=""><h1 class="ui-li-heading">Sem borda</h1></a></li>';
	
	$.each(order_data.order_pizza_data_selected.pizza_edges, function(){
		itemValue = cpFunctions.formatters.currency(this.value);
		itens+='<li data-theme="b"><a href="" data-object="order_pizza" data-target="pizza_edges" pizza_edges='+this.id+'><h1 class="ui-li-heading">'+this.description+' - <span class="item_value">'+itemValue+'</span> </h1></a></li>';
	});
			
	var popup = {
		title: descr,
		id: div,
		itens : ""+itens+""
	}

	/*auiq*/
	$("#"+div+"","#"+div+"-popup","#"+div+"-screen").remove();
	
	$("#"+tmplte+"").tmpl(popup).appendTo("#carrinho-pizzas");
	
	$("#"+div+"_listview").listview();
    
	$("#"+div+"").popup({ history: false});
	
	$("#"+div+"").has(".cp-popup-close-btn").length == 0 ? $("#"+div+"").prepend("<a href='#' data-rel='back' data-role='button' data-icon='delete' data-iconpos='notext' data-theme='c' class='ui-btn-right cp-popup-close-btn'>Delete</a>").trigger("create") : ""		
	
	$("#"+div+"").popup("open",
	{
		positionTo:"origin",
		x:0,
		y:0,
		overlayTheme: "g"
	});
	
	$("li a","#"+div+"").each(function(){
		$(this).click(function(){
			
			var heading = "<h1 class='ui-li-heading no-margin'>"+$(".ui-li-heading",this).html()+"</h1>";
			var description = $(".ui-li-desc",this).html() == null ? "": "<p class='ui-li-desc'>"+$(".ui-li-desc",this).html()+"</p>";			
			
			$(".ui-btn-text",input).html(heading+description);			
		    
		    if($(this).attr("data-object") == "order_pizza")
		      order_pizza[$(this).attr("data-target")] = $(this).attr($(this).attr("data-target"));
		      
		      
		    $(order_pizza_data.pizza_sizes).each(function(index){
				if(this.id == order_pizza.pizza_size_id)
 				order_pizza_data['order_pizza_data_selected'] = order_pizza_data.pizza_sizes[index]; 				
			});
		      
			$("#"+div+"").popup("close");		      
			
		});
	});

}

//-----------------------------
order_pizza_vars = {"selected-pizza-category-id": ""};

cpFunctions.openPopupTipoPizza = function(div, input, descr,tmplte,order_data){
	
	var itens = "";
	var dataIdx = input.replace( /.?#txtTipoPizza_/, "" );
	
	$(order_pizza_data.pizza_categories).each(function(){
		itens+='<li data-theme="b"><a href="" data-pizza-category-id='+this.id+'><h1 class="ui-li-heading">'+this.description+'</h1></a></li>';		
	});
			
	var popup = {
		title: descr,
		id: div,
		itens : ""+itens+""
	}

	/*auiq*/
	$("#"+div+"","#"+div+"-popup","#"+div+"-screen").remove();
	
	$("#"+tmplte+"").tmpl(popup).appendTo("#carrinho-pizzas");
	
	$("#"+div+"_listview").listview();
    
	$("#"+div+"").popup({ history: false});
	
	$("#"+div+"").has(".cp-popup-close-btn").length == 0 ? $("#"+div+"").prepend("<a href='#' data-rel='back' data-role='button' data-icon='delete' data-iconpos='notext' data-theme='c' class='ui-btn-right cp-popup-close-btn'>Delete</a>").trigger("create") : ""		
	
	$("#"+div+"").popup("open",
	{
		positionTo:"origin",
		x:0,
		y:0,
		overlayTheme: "g"
	});
	
	$("li a","#"+div+"").each(function(){
		$(this).click(function(){
			
			var heading = "<h1 class='ui-li-heading no-margin'>"+$(".ui-li-heading",this).html()+"</h1>";
			var description = $(".ui-li-desc",this).html() == null ? "": "<p class='ui-li-desc'>"+$(".ui-li-desc",this).html()+"</p>";			
			var pizza_category_id = $(this).data("pizza-category-id");
			
			$(".ui-btn-text",input).html(heading+description);
			
			order_pizza_vars["selected-pizza-category-id"] = pizza_category_id; 
			
			$("#"+div+"").popup("close");		      
			
		});
	});

}
//-----------------------------

cpFunctions.openPopupSaborPizza = function(div, input, descr,tmplte,order_data){
	
	var itens = ingredientesList = extrasList = "";
	var dataIdx = input.replace( /.?#txtSaborPizza_/, "" );
	
	$.each(order_data.order_pizza_data_selected.pizza_flavors, function(){
		
		var ingredientesTag = '<p>';
		var itemValue = "";
		ingredientesList = "";
		
		var splitedIngr = this.ingredients.split(",");
		
		$.each(splitedIngr, function(i){
			
			if(i > 0)
				ingredientesTag+= ", ";
				
			ingredientesTag+= '<span class="item_description">'+this+'</span>';
			ingredientesList+='<label><input type="checkbox" data-index="'+dataIdx+'" name="ingredientes_'+dataIdx+'" id="ingredientes_'+dataIdx+'" class="custom" value="'+this+'" /><span class="item_description">'+this+'</span></label>'; 
		});
		
		ingredientesTag+= '</p>';
		
		itemValue = cpFunctions.formatters.currency(this.value);
		
		if(order_pizza_vars["selected-pizza-category-id"] == this.pizza_category_id)		
			itens+='<li data-theme="b"><a href="" data-object="order_pizza_flavors_attributes" data-pizza-category-id="'+this.pizza_category_id+'" data-target="pizza_flavor_id" data-index='+dataIdx+' pizza_flavor_id='+this.id+'><h1 class="ui-li-heading">'+this.description+' - <span class="item_value">'+itemValue+'</span>'+ingredientesTag+'</h1></a></li>';
		
		
	});
		
	$.each(order_data.order_pizza_data_selected.pizza_extras, function(i){
		itemValue = cpFunctions.formatters.currency(this.value);
		extrasList+='<label><input type="checkbox" name="ingredientes_'+dataIdx+'" id="ingredientes_'+dataIdx+'" class="custom"  value="'+this.id+'" /><span class="item_description">'+this.description+'</span> <span class="item_value"> '+itemValue+' </span></label>';	
	});
			
	var popup = {
		title: descr,
		id: div,
		itens : ""+itens+""
	}

	/*auiq*/
	$("#"+div+"","#"+div+"-popup","#"+div+"-screen").remove();
	$("#selectIngredientesAdd_"+dataIdx+",#selectIngredientesDel_"+dataIdx+"").remove();
	$("#ingredientes-edit-display_"+dataIdx+" div").empty();
	
	
	$("#"+tmplte+"").tmpl(popup).appendTo("#carrinho-pizzas");
	
	$("#"+div+"_listview").listview();
    
	$("#"+div+"").popup({ history: false});
	
	$("#"+div+"").has(".cp-popup-close-btn").length == 0 ? $("#"+div+"").prepend("<a href='#' data-rel='back' data-role='button' data-icon='delete' data-iconpos='notext' data-theme='c' class='ui-btn-right cp-popup-close-btn'>Delete</a>").trigger("create") : ""		
	
	$("#"+div+"").popup("open",
	{
		positionTo:"origin",
		x:0,
		y:0,
		overlayTheme: "g"
	});
	
	$("li a","#"+div+"").each(function(){
		$(this).click(function(e){
			
			
			order_pizza["order_pizza_flavors_attributes"][$(this).data("index")] = {};
			order_pizza["order_pizza_flavors_attributes"][$(this).data("index")]["order_pizza_ingredients_attributes"] = {};
			order_pizza.order_pizza_flavors_attributes[$(this).data("index")]["order_pizza_extras_attributes"] = {};


			var heading = "<h1 class='ui-li-heading no-margin'>"+$(".ui-li-heading",this).html()+"</h1>";
			
			$(".ui-btn-text",input).html(heading);			
		    
		    if($(this).attr("data-object") == "order_pizza_flavors_attributes"){
		      
		      var obj = $(this);
		      
		      order_pizza["order_pizza_flavors_attributes"][$(this).attr("data-index")][$(this).attr("data-target")] = $(this).attr($(this).attr("data-target"));
		      
		      ingredientesList = "";
			
			  $.each(order_pizza_data.order_pizza_data_selected.pizza_flavors, function(){
			  	if(this.id == $(obj).attr($(obj).attr("data-target"))){
					itemValue = cpFunctions.formatters.currency(this.value);
					
					var splitedIngr = this.ingredients.split(",");
		
					$.each(splitedIngr, function(i){
						ingredientesList+='<label><input type="checkbox" name="ingredientes_'+dataIdx+'" id="ingredientes_'+dataIdx+'"  value="'+this+'" class="custom" /><span class="item_description">'+this+'</span></label>';
						order_pizza.order_pizza_flavors_attributes[dataIdx].remove_ingredients = "";	
					});
			  	}
			  });

			  ingAndExtras = [ingredientesList, extrasList, {dataIdx : dataIdx} ];
			
			  $("#carrinho-pizzas-popup-SaboresIngredientes-Tmpl").tmpl(ingAndExtras).appendTo("#select_sabores_container_"+dataIdx+"");
			  $(".carrinho-main-fieldcontain").trigger("create");
		      
		     }
		      
		    $(order_pizza_data.pizza_sizes).each(function(index){
				if(this.id == order_pizza.pizza_size_id)
 				order_pizza_data['order_pizza_data_selected'] = order_pizza_data.pizza_sizes[index]; 				
			});
			
			$("#"+div+"").popup("close");		      
			
		});
	});

}

cpFunctions.addRemIngredientes = function(div, input, type){
	
	if(type == "add")	
		dataIdx = input.replace( /.?#ingredientes-edit-display-add_/, "" );
	else
		dataIdx = input.replace( /.?#ingredientes-edit-display-del_/, "" );
		
	$(div).bind({
   		popupafterclose: function(event, ui) {

   			$(input).hide().parent().hide();
   			
   			var mostra =  false;
   			
			$(input).empty(); 
			
			order_pizza.order_pizza_flavors_attributes[dataIdx].remove_ingredients = "";  			
   			
   			if($("input:checkbox:checked",div).length > 0){
	   			if(type == "add")
	   			  $(input).append('<img src="imgs/icons/icone_mais.png"/> ');
	   			else 
	   			  $(input).append('<img src="imgs/icons/icone_menos.png"/> ');	
   			}
   			
   			$("input:checkbox",div).each(function(i){
				
				if($.isEmptyObject(order_pizza.order_pizza_flavors_attributes[dataIdx]["order_pizza_extras_attributes"]))
					order_pizza.order_pizza_flavors_attributes[dataIdx]["order_pizza_extras_attributes"] = {};
					
				if($.isEmptyObject(order_pizza.order_pizza_flavors_attributes[dataIdx]["order_pizza_ingredients_attributes"]))
					order_pizza.order_pizza_flavors_attributes[dataIdx]["order_pizza_ingredients_attributes"] = {};
				
				
				if(type=="add"){
					if (this.checked == true){
						
						order_pizza.order_pizza_flavors_attributes[dataIdx].order_pizza_extras_attributes[i] = {add : 1 ,id : this.value}
						
						if(mostra) $(input).append(", ");				
						
						$(input).append($.trim($(this).parent().find(".item_description").text()));
					}
					else
						order_pizza.order_pizza_flavors_attributes[dataIdx].order_pizza_extras_attributes[i] = {add : 0 ,id : this.value}
				}
				else{
					if (this.checked == true){
						
						if(mostra) $(input).append(", ");				
						
						$(input).append($.trim($(this).parent().find(".item_description").text()));
						
						order_pizza.order_pizza_flavors_attributes[dataIdx].remove_ingredients += this.value+",";
						
					}
				}
					
				mostra = true;
   			});
   			
   			$(input).show().parent().show();

   		}
	});
	
	$(div+"-screen").removeClass("fade");

	$(div).popup("open",{positionTo:"window"});
}

cpFunctions.moreBtnUp = function (a){
	
	var value = parseInt($(a).text(),10)+1;
	
	if(value <= 9)
	 $(a).text("0"+value);
	else
	 $(a).text(value);
}

cpFunctions.moreBtnDown = function (a){
	
	var value = parseInt($(a).text(),10)-1;
	
	if(value == 0) return;
	
	if(value >= 10)
	 $(a).text(value);
	else $(a).text("0"+value);
}

cpFunctions.verifyBuying = function(){
	confirm("vc n adicionou seu pedido ao carrinho, tem certeza que deseja sair?");
}

cpFunctions.localization = {
			
			init : function(onSucess,searchBy){

				geocoder = new google.maps.Geocoder();
				address = {};
				fullLocalization = {};

			   if(searchBy.type == "cep"){
			   	
				searchBy.params = ""+searchBy.params.substring(0,5)+"-"+ searchBy.params.substring(5)+"";
			   	
			   	geocoder.geocode({ 'address': searchBy.params}, function(results, status) {
			      if (status == google.maps.GeocoderStatus.OK) {

			      	fullLocalization = results;
			      	address['latitude'] = results[0].geometry.location.lat();
			      	address['longitude'] = results[0].geometry.location.lng();
			      	address['formatted_address'] = results[0].formatted_address;
			      	
			      	if (results[0].address_components){
			      		
			      		$(results[0].address_components).each(function(){
			      			var addr_el = null;
			      			addr_el = this;
			      			$(addr_el.types).each(function(i,v){

					          switch (v){
					            case "country":
					              address['country'] =  addr_el.short_name;
					              break;
					            case "administrative_area_level_1":
					              address['state'] = addr_el.short_name
					              break;
					            case "locality":
					              address['city'] = addr_el.long_name;
					              break;
					            case "sublocality":
					              address['district'] =  addr_el.long_name;
					              break;
					            case "route":
					              address['route'] =  addr_el.long_name;
					              break;
					            case "postal_code":
					              address['postal_code'] =  addr_el.long_name;
					              break;
					         }
					       });
			      		});
			      	}
					
					if(onSucess)
					  onSucess();						
					
			      }
			      else{
			        alert("Não consegui encontrar dados para este CEP, está correto o dado informado? " + status);
			      }
    			});			   				   	
			   }
			   else if(searchBy.type == "gps"){
			   	
				    var onGetCurrentPositionSuccess = function(position) {
				      var lat = parseFloat(position.coords.latitude);
				      var lng = parseFloat(position.coords.longitude);
				                        
				      var latlng = new google.maps.LatLng(lat, lng);
				                        
				      geocoder.geocode({'latLng': latlng}, function(results, status) {
				        if (status == google.maps.GeocoderStatus.OK) {
				        
				          fullLocalization = results;
				          address['latitude'] = results[0].geometry.location.lat();
					      address['longitude'] = results[0].geometry.location.lng();
					      address['formatted_address'] = results[0].formatted_address;
					      
				          if (results[0].address_components){
					      	
				      		$(results[0].address_components).each(function(){
				      			var addr_el = null;
				      			addr_el = this;
				      			$(addr_el.types).each(function(i,v){
	
						          switch (v){
						            case "country":
						              address['country'] =  addr_el.short_name;
						              break;
						            case "administrative_area_level_1":
						              address['state'] = addr_el.short_name
						              break;
						            case "locality":
						              address['city'] = addr_el.long_name;
						              break;
						            case "sublocality":
						              address['district'] =  addr_el.long_name;
						              break;
						            case "route":
						              address['route'] =  addr_el.long_name;
						              break;
						            case "postal_code":
						              address['postal_code'] =  addr_el.long_name;
						              break;
						         }
						       });
				      		});
					      }
						  							  	
						  	if(onSucess)
								onSucess(); 
						  	
				          } else {
				            alert("Não consegui encontrar dados para este CEP, está correto o dado informado? " + status);
				          }
				      });
				    }
	  
				    var onGetCurrentPositionError = function(error) {
				      
				      if(error.code == 1)
				      	console.log('Você não ativou o GPS para o ClicouPizza, verifique os serviços de localização.', null, 'Error', 'OK');

				    }
	    
	    			navigator.geolocation.getCurrentPosition(onGetCurrentPositionSuccess, onGetCurrentPositionError);			   	
			   	
			   } 
			}			
}

// cpFunctions.getPizzariasByRegion = function(){
// 	
	// var pizzariasByRegion = {};
// 									
	// $.get(""+server['defaults']+"/regions.json",function(json,status){
		// if(status == "success")
			// $("#endereco .ui-btn-text").text(address.formatted_address);
			// $("#filtrarPizzariasByRegionTmpl").tmpl(json).appendTo("#filtrarPizzariasByRegion");								
			// $("#filtrarPizzariasByRegion li").css("clear","both");
			// $("#filtrarPizzariasByRegion").listview("refresh");	
	// },"json")
	// .error(
		// function (e){
			// console.log('Erro ao listar regiões');
			// console.log("erro ao listar regions: "+e);
		// }
	// );
// 	
	// return pizzariasByRegion;
// 									  
// }

cpFunctions.listarPizzarias = function(searchBy){


	console.log("Carregando pizzarias");
	
	establishment = {};
	establishment['order'] = searchBy.order || "distance";	
		
	if(searchBy.type!="region"){
		cpFunctions.localization.init(
					function(){
						
							// //sem net
							// address = {};
							// address["state"]="GO";
							
							$.get(""+server['defaults']+"/home.json", {address:address, establishment:establishment}, function(obj,status){
							
								if(status === "success"){
									
									$("#endereco .ui-btn-text").text(address.formatted_address);
									//console.log(obj);
									$.each(obj.data,function(key,value){
										
										if(obj.data[key].logo == "/missing/logos/img_64/missing.png"){
											obj.data[key].logo = "./imgs/missing_pizzaria.png";
											//console.log(obj.data[key].logo);
										}
										
										pizzariasData[""+obj.data[key].id+""] = obj.data[key];
									});
									
									pagesConfig = {"current_page": obj.pagination.current_page, "max_load_pages": Math.ceil(obj.pagination.total_entries/obj.pagination.per_page)};
									
									$("#listarPizzariasUL").empty();
		  								
									$("#ListaPizzariasTmpl").tmpl(obj).appendTo("#listarPizzariasUL");								
									$("#listarPizzariasUL li").css("clear","both");
									$("#listarPizzariasUL").listview("refresh");
									$.mobile.hidePageLoadingMsg();
									
									
									$.each(pizzariasData,function(key,value){
										
										$.get(""+server['defaults']+"/"+key+"/rating.json",function(data,status){
											if(status == "success")
											pizzariasData[key]["ratings"] = data;	
										},"json")
										.error(
											function (e){
												console.log('Não consegui pegar avaliações da pizzaria');
												console.log("erro ao listar ratings para a pizzaria "+key+"->"+e);
											}
										);
										  
									});
									
									$.mobile.changePage("index.html");
									if(searchBy.order == "distance" || typeof searchBy.order == "undefined")
										$("#filtroMaisProx").addClass("ui-state-persist");
									else if (searchBy.order == "vote")
										$("#filtroMaisVotados").addClass("ui-state-persist");
									
								}
								
							},"json")
							.error(
								function(e){
									console.log("erro ao listar pizzarias");
									$.mobile.hidePageLoadingMsg();
									console.log('Erro ao listar pizzarias');
									}
								);						
				},searchBy);	
	}
	
	if (searchBy.type =="region"){
						
						    
						    address = searchBy.params;
						    
						    console.log("Carregando pizzarias");
						    
							$.get(""+server['defaults']+"/home.json", {address:address}, function(obj,status){
							
								if(status === "success"){
									
									$("#endereco .ui-btn-text").text(address.city + " - "+address.state);
									console.log(obj);
									$.each(obj.data,function(key,value){
										
										if(obj.data[key].logo == "/missing/logos/img_64/missing.png"){
											obj.data[key].logo = "./imgs/missing_pizzaria.png";
											console.log(obj.data[key].logo);
										}
										
										pizzariasData[""+obj.data[key].id+""] = obj.data[key];
									});
									
									pagesConfig = {"current_page": obj.pagination.current_page, "max_load_pages": parseInt(obj.pagination.total_entries/obj.pagination.per_page)};
									
									$("#listarPizzariasUL").empty();
		  								
									$("#ListaPizzariasTmpl").tmpl(obj).appendTo("#listarPizzariasUL");								
									$("#listarPizzariasUL li").css("clear","both");
									$("#listarPizzariasUL").listview("refresh");
									$.mobile.hidePageLoadingMsg();
									
									
									$.each(pizzariasData,function(key,value){
										
										$.get(""+server['defaults']+"/"+key+"/rating.json",function(data,status){
											if(status == "success")
											pizzariasData[key]["ratings"] = data;	
										},"json")
										.error(
											function (e){
												console.log("erro ao listar ratings para a pizzaria "+key+"->"+e);
												console.log('Erro ao listar avaliações para a pizzaria');
											}
										);
										  
									});
									
									$.mobile.changePage("index.html");
									
								}
								
							},"json")
							.error(
								function(e){
									console.log("erro ao listar pizzarias "+e);
									$.mobile.hidePageLoadingMsg();
									console.log('Erro ao listar pizzarias');
									}
								);						
	}
	
}


cpFunctions.getOrderPizzas = function(){
	
	$.ajax({
		url: server['defaults']+"/"+current_pizzaria+"/order_pizza.json",
   		dataType: "json",
 		crossDomain: true,
 		xhrFields: {
 			withCredentials: true
	 	}
	 })
	 .done(function(json){
		order_pizza_data = json.data;
		order_pizza_data["authenticity_token"] = json.authenticity_token;
	})
	.error(function (e){
			console.log('Erro ao listar pizzas');
			console.log("erro ao listar pizzas: "+e);
	});
									  
}

cpFunctions.getOrderDrinks = function(id){

	$.ajax({
 		url: server['defaults']+"/"+current_pizzaria+"/order_drink.json?drink_category_id="+id+"",
   		dataType: "json",
 		crossDomain: true,
 		xhrFields: {
	 		withCredentials: true
	 	}
	 })
	 .done(function(json){
		order_drink_data = json.data;
		order_drink_data["authenticity_token"] = json.authenticity_token;
	})
	.error(function (e){
			console.log('Erro ao listar bebidas');
			console.log("erro ao listar bebidas: "+e);
	});
									  
}


cpFunctions.getOrderProducts = function(id){
	
	$.ajax({
 		url: server['defaults']+"/"+current_pizzaria+"/order_product.json?product_category_id="+id+"",
   		dataType: "json",
 		crossDomain: true,
 		xhrFields: {
	 		withCredentials: true
	 	}
	 })
	 .done(function(json){
		order_product_data = json.data;
		order_product_data["authenticity_token"] = json.authenticity_token;
	})
	.error(function (e){
			console.log('Erro ao listar produtos');
			console.log("erro ao listar produtos: "+e);
	});
	
}

cpFunctions.addPedidoPizzas = function (){
	
	
	if(typeof order_pizza.pizza_size_id == "undefined"){
		if(typeof navigator.notification != "undefined")
			console.log('Tamanho da pizza não foi escolhido');
		else
			alert('Tamanho da pizza não foi escolhido');
			
		return;
	}
	
	if(typeof order_pizza.qtd_flavor == "undefined"){
		if(typeof navigator.notification != "undefined")
			console.log('Quantidade de sabores não foi escolhido');
		else
			alert('Quantidade de sabores não foi escolhido');
			
		return;
	}
	
	if(typeof order_pizza.pizza_pasta_id == "undefined"){
		
		if(!$.isEmptyObject(order_pizza_data.pizza_pastas)){
			if(typeof navigator.notification != "undefined")
				console.log('Tipo de massa não foi escolhido');
			else
				alert('Tipo de massa não foi escolhido');
			
			return;			
		}
		
	}
	
	if(typeof order_pizza.pizza_edges == "undefined"){
		
		order_pizza["pizza_edges"]="";
	}
	
	if($.isEmptyObject(order_pizza.order_pizza_flavors_attributes)){
		if(typeof navigator.notification != "undefined")
			console.log('Sabor não foi escolhido');
		else
			alert('Sabor não foi escolhido');
			
		return;
	}
	
	//validate quant de sabores
	var countFlavors = 0;
	
	for (var i in order_pizza.order_pizza_flavors_attributes)
	  countFlavors++;
	
	if(countFlavors < order_pizza.qtd_flavor){
		if(typeof navigator.notification != "undefined")
			console.log('Você deve escolher os sabores da pizza compativel com a quantidade de sabores escolhida');
		else
			alert('Você deve escolher os sabores da pizza compativel com a quantidade de sabores escolhida');
			
		return;
	}
	
	order = {};
	order["order_pizza"] = order_pizza;
	order["authenticity_token"]  = order_pizza_data.authenticity_token;
	
	$.ajax({
			type: "POST",
 			url: server['defaults']+"/"+current_pizzaria+"/order_pizza.json",
   			data: order,
   			dataType: "json",
   			crossDomain: true,
		   	xhrFields: {
		 		withCredentials: true
		 	}
	})
	.done(function(data){
		if(typeof navigator.notification != "undefined")
			console.log('Pizza Adicionada com sucesso!');
		else	
			alert("Pizza Adicionada com sucesso!");
			
		order_pizza = {};
		$.mobile.changePage("cardapio.html?id="+current_pizzaria+"", {reverse: true});
		$(".carrinho_value").text(cpFunctions.formatters.currency(data.cart_value));
		order_cart_value = cpFunctions.formatters.currency(data.cart_value);
	})
	.error(function (e){
			if(typeof navigator.notification != "undefined")
				console.log('Erro ao postar pizzas');
			console.log("erro ao postar pizzas: ");
			console.log(e);
	});

}

cpFunctions.addPedidoBebidas = function (){
	
	
	if(typeof order_drink.drink_id == "undefined"){
		if(typeof navigator.notification != "undefined")
			console.log('Bebida não foi escolhida');
		else
			alert('Bebida não foi escolhida');
			
		return;
	}
	
	order = {};
	order["remote"] = true;
	order["order_drink"] = order_drink;
	order["authenticity_token"]  = order_drink_data.authenticity_token;
	
	$.ajax({
			type: "POST",
 			url: server['defaults']+"/"+current_pizzaria+"/order_drink.json",
   			data: order,
   			dataType: "json",
   			crossDomain: true,
		   	xhrFields: {
		 		withCredentials: true
		 	}
	})
	.done(function(data){
		if(typeof navigator.notification != "undefined")
			console.log('Bebida adicionada com sucesso!');
		else	
			alert("Bebida adicionada com sucesso!");
			
		order_pizza = {};
		$.mobile.changePage("cardapio.html?id="+current_pizzaria+"", {reverse: true});
		$(".carrinho_value").text(cpFunctions.formatters.currency(data.cart_value));
		order_cart_value = cpFunctions.formatters.currency(data.cart_value);
	})
	.error(function (e){
			if(typeof navigator.notification != "undefined")
				console.log('Erro ao postar bebidas');
			console.log("erro ao postar bebidas: "+e);
	});

}

cpFunctions.addPedidoProdutos = function (){
	
	if(typeof order_product.product_id == "undefined"){
		if(typeof navigator.notification != "undefined")
			console.log('Produto não foi escolhido');
		else
			alert('Produto não foi escolhido');
			
		return;
	}
	
	order = {};
	order["order_product"] = order_product;
	order["authenticity_token"]  = order_product_data.authenticity_token;
	
	$.ajax({
			type: "POST",
 			url: server['defaults']+"/"+current_pizzaria+"/order_product.json",
   			data: order,
   			dataType: "json",
   			crossDomain: true,
		   	xhrFields: {
		 		withCredentials: true
		 	}
	})
	.done(function(data){
		if(typeof navigator.notification != "undefined")
			console.log('Produto adicionado com sucesso!');
		else
			alert("Produto adicionado com sucesso!");
			
		order_product = {};
		$.mobile.changePage("cardapio.html?id="+current_pizzaria+"", {reverse: true});
		$(".carrinho_value").text(cpFunctions.formatters.currency(data.cart_value));
		order_cart_value = cpFunctions.formatters.currency(data.cart_value);
	})
	.error(function (e){
			if(typeof navigator.notification != "undefined")
				console.log('Erro ao postar Produto');
			
			console.log("erro ao postar Produto: "+e);
	});
	
}

cpFunctions.getOrderCart = function (pageId){
	
	console.log("getOrderCart");
	console.log("getPAGEID");
		
	$.ajax({
 		url: server['defaults']+"/"+current_pizzaria+"/order_cart.json",
   		dataType: "json",
 		crossDomain: true,
 		xhrFields: {
	 		withCredentials: true
		}
	 })
	 .done(function(json){
		console.log("getOrderCart OK");
		console.log(pageId);
		order_cart = json.data;
		order_cart["authenticity_token"] = json.authenticity_token;
		order_cart["id"] = current_pizzaria;
		$("#"+pageId+"-Tmpl").tmpl(order_cart).appendTo("#"+pageId+"");
		cpFunctions.addBackButton(pageId,"Editar");	
		$("#"+pageId).trigger('pagecreate');
	})
	.error(function (e){
			console.log('Erro ao recuperar carrinho');
			console.log("erro ao recuperar carrinho: "+e);
			history.back(-1);
	});
	
}

cpFunctions.editOrderCart = function (id, type, method, qtd){
	
	if(method == "delete"){
		$.ajax({
	 		url: server['defaults']+"/"+current_pizzaria+"/order_cart/"+id+"/edit.json?method=delete&type="+type+"",
	   		dataType: "json",
	 		crossDomain: true,
	 		xhrFields: {
				withCredentials: true
			}
		 })
		 .done(function(json){
			
			if(type == "drink")
			delete order.order_drink[id];
			
			if(type == "product")
			delete order.order_product[id];
			
			if(type == "pizza")
			delete order.order_pizza[id];
			
			order_cart = json.data;
			order_cart["authenticity_token"] = json.authenticity_token;
			order_cart["id"] = current_pizzaria;
			var tmpl = $("#carrinho-confirmar-pedido-Tmpl");
			$("#carrinho-confirmar-pedido").empty();
			$(tmpl).appendTo("#carrinho-confirmar-pedido");
			$("#carrinho-confirmar-pedido-Tmpl").tmpl(order_cart).appendTo("#carrinho-confirmar-pedido");
			$("#carrinho-confirmar-pedido").trigger('pagecreate');
			cpFunctions.addBackButton("carrinho-confirmar-pedido","Editar");
		})
		.error(function (e){
				console.log('Erro ao recuperar carrinho [editdel]');
				console.log("erro ao recuperar carrinho [editdel]: "+e);
				history.back(-1);
		});		
	}
	else if(method == "qtd"){
		$.ajax({
	 url: server['defaults']+"/"+current_pizzaria+"/order_cart/"+id+"/edit.json?method=qtd&type="+type+"&qtd="+qtd+"",
	   		dataType: "json",
	 		crossDomain: true,
	 		xhrFields: {
		 withCredentials: true
		 }
		 })
		 .done(function(json){
			order_cart = json.data;
			order_cart["authenticity_token"] = json.authenticity_token;
			order_cart["id"] = current_pizzaria;
			var tmpl = $("#carrinho-confirmar-pedido-Tmpl");
			$("#carrinho-confirmar-pedido").empty();
			$(tmpl).appendTo("#carrinho-confirmar-pedido");
			$("#carrinho-confirmar-pedido-Tmpl").tmpl(order_cart).appendTo("#carrinho-confirmar-pedido");
			$("#carrinho-confirmar-pedido").trigger('pagecreate');
			cpFunctions.addBackButton("carrinho-confirmar-pedido","Editar");
		})
		.error(function (e){
				console.log('Erro ao recuperar carrinho [editqtd]');
				console.log("erro ao recuperar carrinho [editqtd]: "+e);
				history.back(-1);
		});		
	}

}

cpFunctions.getOrderFinishCart = function (pageId){
	
	$.ajax({
   		url: server['defaults']+"/"+current_pizzaria+"/order_finish.json",
   		dataType: "json",
 		crossDomain: true,
 		xhrFields: {
	    	withCredentials: true
	   	}
	 })
	 .done(function(json){
	 	console.log("getOrderFinishCart");
		console.log(json);
		order_cart["order_finish"] = json.data;
		order_cart["authenticity_token"] = json.authenticity_token;
		order_cart["order_finish"]["post"] = {"delivery": json.data.establishment.order_delivery};
		$("#"+pageId+"-Tmpl").tmpl(order_cart).appendTo("#"+pageId+"");
		cpFunctions.addBackButton(pageId,"Editar");	
		$("#"+pageId).trigger('pagecreate');
		
	})
	.error(function (e){
		console.log("ERRORERROROEROEROEREROEREOR");
		console.log(e);
		console.log('Erro ao recuperar orderfinishCart');
		history.back(-1);
	});
}

cpFunctions.addOrderFinishCart = function (pageId){
	
	orderFinish = {};
	orderFinish["order"] = order_cart.order_finish.post;
	
	if(order_cart.order_finish.post.delivery == true){
		if(typeof order_cart.order_finish.post.payment_type_id == "undefined"){
			if(typeof navigator.notification != "undefined")
				console.log('Não selecionou a forma de pagamento');
			else
				alert('Não selecionou a forma de pagamento');
				
			return;
		}
	
		if(typeof order_cart.order_finish.post.address_id == "undefined"){
			if(typeof navigator.notification != "undefined")
				console.log('Não selecionou o endereço de entrega');
			else
				alert('Não selecionou o endereço de entrega');
			
			return;
		}
		
		if(typeof order_cart.order_finish.post.delivery_info_id == "undefined" || order_cart.order_finish.post.delivery_info_id == ""){
			if(typeof navigator.notification != "undefined")
				console.log('Não selecionou a região atendida pela pizzaria');
			else
				alert('Não selecionou a região atendida pela pizzaria');
			
			return;
		}

	}
	else {
		orderFinish["order"]["delivery_info_id"] = "";
		orderFinish["order"]["payment_type_id"] = order_cart.order_finish.payment_types[0].id;
		orderFinish["order"]["address_id"] = "";
	}
	
	orderFinish["authenticity_token"]  = order_cart.authenticity_token;
	orderFinish["order"]["payback"] = $("#payback").val() == "" ? "0,00" : $("#payback").val();
	orderFinish["order"]["discount_coupon"] = $("#discount_coupon").val();
	orderFinish["order"]["comment"] = $("#comment").val();
	orderFinish["order"]["phone"] = $("#phone","#carrinho-concluir-pedido").val();
	orderFinish["commit"] = "Concluír pedido";
	
	console.log(orderFinish);
	
	$.ajax({
   		type: "POST",
   		url: server['defaults']+"/"+current_pizzaria+"/order_finish.json",
   		data: orderFinish,
   		dataType: "json",
 		crossDomain: true,
 		xhrFields: {
	    	withCredentials: true
	   	}
	 })
	 .done(function(json){
		if(json.status == "ok"){		
			order_pizza = order_drink = order_product = order_pizza_data = order_drink_data = order_product_data = order_cart = orderFinish = {};
			delete order;			
			order_cart_value = "R$ 0,00";
			orderID = json.order_id;
			$.mobile.changePage("carrinho-pedido-concluido.html");
		}		

	})
	.error(function (e){
		console.log('Erro ao finalizar carrinho');
			console.log("erro ao finalizar carrinho: "+e);
		history.back(-1);
	});
}

cpFunctions.getOrderStatus = function (pageId){

	$.ajax({
   		url: server['defaults']+"/"+current_pizzaria+"/order_status/"+orderID+".json",
   		dataType: "json",
 		crossDomain: true,
 		xhrFields: {
	    	withCredentials: true
	   	}
	 })
	.done(function(json){
		console.log(json);		
		$("#carrinho-pedido-concluido-Tmpl").tmpl(json.data.order).appendTo("#carrinho-pedido-concluido");
		cpFunctions.addBackButton(pageId,"Pizzarias","index.html");
		$("#"+pageId).trigger('pagecreate');
	})
	.error(function (e){
		console.log('Erro ao recuperar status do pedido');
			console.log("erro ao recuperar status do pedido: ");
			console.log(e);
			history.back(-1);
			
	});
}

cpFunctions.refreshOrderStatus = function (btn){

	console.log("Atualizando status do pedido");
	$.ajax({
   		url: server['defaults']+"/"+current_pizzaria+"/order_status/"+orderID+".json?status=true",
   		dataType: "json",
 		crossDomain: true,
 		xhrFields: {
	    	withCredentials: true
	   	}
	 })
	.done(function(json){
		
		if(json.data.status == "pending")
			$("#"+btn).removeClass("pedidoBlueStatus").addClass("pedidoOrangeStatus").find(".status").text("PENDENTE");
		else
			$("#"+btn).removeClass("pedidoOrangeStatus").addClass("pedidoBlueStatus").find(".status").text("RECEBIDO");
			
		$.mobile.hidePageLoadingMsg();
		
	})
	.error(function (e){
		console.log('Erro ao recuperar refreshOrderStatus');
			console.log("erro ao recuperar refreshOrderStatus: "+e);
			
	});
}

cpFunctions.getOrderFinishUpdateTotal = function (){
	
	order['order'] = {
		"delivery":$("#tipoEntrega :selected").val(),
		"delivery_info":order_cart.order_finish.post.delivery_info_id,
		"discount_coupon":$("#discount_coupon").val()
	};


	$.ajax({
   		url: server['defaults']+"/"+current_pizzaria+"/order_finish/order_finish_update_total.json",
   		data: order,
   		dataType: "json",
 		crossDomain: true,
 		xhrFields: {
	    	withCredentials: true
	   	}
	 })
	.done(function(json){
		if(typeof json.delivery != "undefined"){
			$("#valorTaxaEntregaLbl, #valorTaxaEntregaDiv").removeClass("no-display");
			$("#valorTaxaEntregaDiv").text("("+cpFunctions.formatters.currency(json.delivery.value)+" / "+json.delivery.time+" min)");
			$("#valorTotalLbl, #valorTotalDiv").removeClass("no-display");
			$("#valorTotalDiv").text("("+cpFunctions.formatters.currency(json.total)+")");
		}
		else {
			$("#valorTaxaEntregaLbl, #valorTaxaEntregaDiv").addClass("no-display");
			$("#valorTotalLbl, #valorTotalDiv").addClass("no-display");
		}
		
		
		if(typeof json.discount != "undefined" && json.discount > 0){
			$("#valorDescontoCupomLbl, #valorDescontoCupomDiv, #valorTotalLbl,  #valorTotalDiv").removeClass("no-display");
			$("#valorDescontoCupomDiv").text("("+cpFunctions.formatters.currency(json.discount)+")");
			$("#valorTotalDiv").text("("+cpFunctions.formatters.currency(json.total)+")");
		}
		else{
			$("#valorDescontoCupomLbl, #valorDescontoCupomDiv, #valorTotalLbl,  #valorTotalDiv").addClass("no-display");
			$("#valorDescontoCupomDiv, #valorTotalDiv").empty();
		} 
		
	})
	.error(function (e){
		console.log('Erro ao recuperar carrinho total update');
			console.log("erro ao recuperar  carrinho total update: "+e);
	});

}

cpFunctions.openPopupEnderecoEntrega = function(div, input, descr,tmplte,byRegion){
	
	var itens = "";
	
	if(byRegion){
		$(order_cart.order_finish.delivery_infos).each(function(){
			var complm = this.complement == "" ? "" :  ", "+this.complement;
			itens+='<li data-theme="b"><a href="" data-object="order_cart.order_finish.post" data-target="delivery_info_id" delivery_info_id='+this.id+'><h1 class="ui-li-heading">'+this.description+'</h1></a></li>';		
		});		
	}
	else{
		$(order_cart.order_finish.addresses).each(function(){
			var complm = this.complement == "" ? "" :  ", "+this.complement;
			itens+='<li data-theme="b"><a href="" data-object="order_cart.order_finish.post" data-target="address_id" address_id='+this.id+'><h1 class="ui-li-heading">'+this.street+', '+this.number+''+complm+', '+this.district+', '+this.city+', '+this.state+', '+this.cep+'</h1></a></li>';		
		});	
	}
	
	itens+='<li data-theme="b" class="newAddressBtn"><a href="#" onclick="$.mobile.changePage(\'new_address.html\')"><h1 class="ui-li-heading">Novo endereço</h1></a></li>';
	
	var popup = {
		title: descr,
		id: div,
		itens : ""+itens+""
	}

	/*auiq*/
	$("#"+div+"","#"+div+"-popup","#"+div+"-screen").remove();
	
	$("#"+tmplte+"").tmpl(popup).appendTo("#carrinho-concluir-pedido");
	
	$("#"+div+"_listview").listview();
    
	$("#"+div+"").popup({ history: false});
	
	$("#"+div+"").has(".cp-popup-close-btn").length == 0 ? $("#"+div+"").prepend("<a href='#' data-rel='back' data-role='button' data-icon='delete' data-iconpos='notext' data-theme='c' class='ui-btn-right cp-popup-close-btn'>Delete</a>").trigger("create") : ""		
	
	$("#"+div+"").popup("open",
	{
		positionTo:"origin",
		x:0,
		y:0,
		overlayTheme: "g"
	});
	
	$("li a","#"+div+"").each(function(){
		$(this).click(function(){
			
		    if(typeof order_cart.order_finish.post["delivery_info_id"] == "undefined")
		      	order_cart.order_finish.post["delivery_info_id"] = "";
		    
		    if($(this).attr("data-object") == "order_cart.order_finish.post"){
		      order_cart.order_finish.post[$(this).attr("data-target")] = $(this).attr($(this).attr("data-target"));
		      
		      if(!byRegion){
		    
		      	  var heading = "<h1 class='ui-li-heading no-margin'>"+$(".ui-li-heading",this).html()+"</h1>";
				  var description = $(".ui-li-desc",this).html() == null ? "": "<p class='ui-li-desc'>"+$(".ui-li-desc",this).html()+"</p>";			
			
				  $(".ui-btn-text",input).html(heading+description);
				  
			      var addressId = $(this).attr($(this).attr("data-target"));
			      $(order_cart.order_finish.addresses).each(function(){
					 if(addressId == this.id){
					    for(var i in order_cart.order_finish.delivery_infos){
					    	if(this.district == order_cart.order_finish.delivery_infos[i].description){
					    		order_cart.order_finish.post["delivery_info_id"] =  order_cart.order_finish.delivery_infos[i].id;
					    		cpFunctions.getOrderFinishUpdateTotal();
					    		$("#txtEnderecoEntregaRegion").addClass("no-display");
					    		return;
					    	}
					    	else{
					    		order_cart.order_finish.post["delivery_info_id"] = "";
					    		$("#txtEnderecoEntregaRegion").removeClass("no-display");
					    	}
					    }
					    cpFunctions.getOrderFinishUpdateTotal();
					 }
				  });	
		      }
		      else{
		      	$("#txtEnderecoEntregaRegion").addClass("no-display");
		      	cpFunctions.getOrderFinishUpdateTotal();
		      } 
			 
		     }
		      
			$("#"+div+"").popup("close");		      
			
		});
	});

}

cpFunctions.openPopupFormaPagto = function(div, input, descr,tmplte){
	
	var itens = "";
	
	$(order_cart.order_finish.payment_types).each(function(){
		
		itens+='<li data-theme="b"><a href="" data-has-payback='+this.payback+' data-object="order_cart.order_finish.post" data-target="payment_type_id" payment_type_id='+this.id+'><h1 class="ui-li-heading">'+this.description+'</h1></a></li>';		
	});
			
	var popup = {
		title: descr,
		id: div,
		itens : ""+itens+""
	}

	/*auiq*/
	$("#"+div+"","#"+div+"-popup","#"+div+"-screen").remove();
	
	$("#"+tmplte+"").tmpl(popup).appendTo("#carrinho-concluir-pedido");
	
	$("#"+div+"_listview").listview();
    
	$("#"+div+"").popup({ history: false});
	
	$("#"+div+"").has(".cp-popup-close-btn").length == 0 ? $("#"+div+"").prepend("<a href='#' data-rel='back' data-role='button' data-icon='delete' data-iconpos='notext' data-theme='c' class='ui-btn-right cp-popup-close-btn'>Delete</a>").trigger("create") : ""		
	
	$("#"+div+"").popup("open",
	{
		positionTo:"origin",
		x:0,
		y:0,
		overlayTheme: "g"
	});
	
	$("li a","#"+div+"").each(function(){
		$(this).click(function(){
			
			var heading = "<h1 class='ui-li-heading no-margin'>"+$(".ui-li-heading",this).html()+"</h1>";
			var description = $(".ui-li-desc",this).html() == null ? "": "<p class='ui-li-desc'>"+$(".ui-li-desc",this).html()+"</p>";			
			
			$(".ui-btn-text",input).html(heading+description);			
		    
		    if($(this).attr("data-object") == "order_cart.order_finish.post")
		      order_cart.order_finish.post[$(this).attr("data-target")] = $(this).attr($(this).attr("data-target"));
		    
		    if($(this).attr("data-has-payback") == "true")
		    	$("#payback").show();
		    else
		    	$("#payback").hide();
		    
		      
			$("#"+div+"").popup("close");		      
			
		});
	});

}

cpFunctions.isOrderInicialized = function (){
	
	 if(typeof order == "undefined"){
	 	if(typeof navigator.notification != "undefined")
			console.log('Ainda não existem pedidos realizados');
		else	
			alert("Ainda não existem pedidos realizados");
			
			console.log("Ainda não existem pedidos realizados");
	 }
	 else $.mobile.changePage("carrinho-confirmar-pedido.html");
}

cpFunctions.authWithProvider = function (provider){
	
	switch (provider){
		
		case "tw": 
			window.plugins.childBrowser.showWebPage(server["defaults"]+"/users/auth/twitter?mobile=true");
		break;
		
		case "fb": 
			window.plugins.childBrowser.showWebPage(server["defaults"]+"/users/auth/facebook?mobile=true");
		break;
		
		case "4sq": 
			window.plugins.childBrowser.showWebPage(server["defaults"]+"/users/auth/foursquare?mobile=true");
		break;
		
		case "g+": 
			window.plugins.childBrowser.showWebPage(server["defaults"]+"/users/auth/google_oauth2?mobile=true");
		break;
		
		default: alert("Desconheço este provider");
	}
	
	
	window.plugins.childBrowser.onLocationChange = function (url){
	  
	  urlOrign = url;
	  url = unescape(url);
	  
	  url = url.substr(url.indexOf('?') + 1).substr(url.indexOf('#') + 1)
	  url = url.replace("+", ' ');
	  parameters = url.split('&');
	  signupWithSocial = {};
	  
	  for(var i = 0; i < parameters.length; i++) {
		var parameter = parameters[i].split('=');
		signupWithSocial[parameter[0]] = unescape(parameter[1]);
	  }

	  console.log("urlOrign");
	  console.log(urlOrign);
	   console.log("signupWithSocial");
	  console.log(signupWithSocial);	  
		
	  if(urlOrign.search("user_logged.json?") == 23 || urlOrign.search("sign_up?") == 34){
	  	if(signupWithSocial.mobile_user_logged == "undefined"){
	  		
	  		userLoggedIn = true; 
	  	
	  	$.mobile.loading( 'show', {
			html: '<p style="text-align: center;">Login realizado com sucesso!</p><p style="text-align: center;">Seja bem vindo ao ClicouPizza</p>',
			textVisible: true,
			textonly: true,
			theme: 'a'
		});
	  	
		window.plugins.childBrowser.onClose = function (){
					$.mobile.loading('hide');
			
					if(posLoginPage != "")
						$.mobile.changePage(posLoginPage);
		};
		
		window.plugins.childBrowser.close();
		}
		else{
			$.mobile.changePage("signup.html");
			window.plugins.childBrowser.onClose = null;
			window.plugins.childBrowser.close();
		}	
	  }
	  else if(urlOrign == server["defaults"]+"/"){
	  	
	  	console.log("JA LOGADO COOKIE");
	  	
	  	cpFunctions.userLoggedIn(
	  		function(){
				if(posLoginPage != "")
					$.mobile.changePage(posLoginPage);
					
				window.plugins.childBrowser.onClose = null;
				window.plugins.childBrowser.close();	  			
	  		});
	  }
	  
	};
}

cpFunctions.authWithUser = function (){

	if($("#signInPass").val() == "" || $("#signInLogin").val() == "")
	{
		if(typeof navigator.notification != "undefined")
			console.log('Email e senha não podem estar em branco');
		else
			alert('Email e senha não podem estar em branco');
		
		return;
	}
	
	$.ajax({
   		type: "GET",
   		url: server['defaults']+"/user/users/sign_in.json",
   		dataType: "json",
 		crossDomain: true,
 		xhrFields: {
	    	withCredentials: true
	   	}
	 })
	 .done(function(json){
	 	
		 	$.ajax({
	   		type: "POST",
	   		url: server['defaults']+"/user/users/sign_in.json",
	   		data: {
	   			authenticity_token: json.authenticity_token,
	   			user: {
	   					remember_me: 1,
	   					password: $("#signInPass").val(),
	   					email: $("#signInLogin").val()
	   				}   			
	   		},
	   		dataType: "json",
	 		crossDomain: true,
	 		xhrFields: {
		    	withCredentials: true
		   	}
		 })
		.done(function(json){
			userLoggedIn = json;
			
			$.mobile.loading( 'show', {
				html: '<p style="text-align: center;">Login realizado com sucesso!</p><p style="text-align: center;">Seja bem vindo ao ClicouPizza</p>',
				textVisible: true,
				textonly: true,
				theme: 'a'
			});
	
			setTimeout(function(){
				$.mobile.loading('hide');
				
				if(posLoginPage != "")
					$.mobile.changePage(posLoginPage);
				
			},2000);
		})
		.error(function (e){
			console.log("ERROR");
			console.log(e);
			
			
			if(e.isRejected()){
				console.log("Email ou senha errados");
				if(typeof navigator.notification != "undefined")
					console.log('Email ou senha errados');
				else
					alert('Email ou senha errados');
			}
			
		});
	 	
	 	
	 });

	
}



cpFunctions.alterAddressSignup = function(searchBy){
	cpFunctions.localization.init(
		
		function(){
			$.mobile.changePage("signup.html");
		},searchBy);
}

cpFunctions.alterAddressNew = function(searchBy){
	cpFunctions.localization.init(
		
		function(){
			$.mobile.changePage("new_address.html");
		},searchBy);
}

checkMandatories = function (form){
	
	var haveMandatories = 0;
	
	$("[rel*='mandatory']",form).each(function(){
		if(this.value == ""){ 
			$(this).addClass("mandatory");
			haveMandatories++;
		}
		else{
			$(this).removeClass("mandatory");
		}
	});
	
		
	if(haveMandatories > 0){
		if(typeof navigator.notification != "undefined")
			console.log('Campos obrigatórios não podem estar em branco');
		else
			alert('Campos obrigatórios não podem estar em branco');
					
		return true;
	}
	
	return false; 	
}

cpFunctions.signUpFormSubmit = function(){
	
	console.log("Enviando dados");
	
	if(checkMandatories("#signupForm")){
		$.mobile.hidePageLoadingMsg();
		return;
	} 
	
	$.ajax({
   		type: "GET",
   		url: server['defaults']+"/user/users/sign_up.json",
   		dataType: "json",
 		crossDomain: true,
 		xhrFields: {
	    	withCredentials: true
	   	}
	 })
	 .done(function(json){
	 	console.log("PEGANDO TOKEN ANTES DE SUBMIT ->"+json.authenticity_token);
	 	$.ajax({
	   		type: "POST",
	   		url: server['defaults']+"/user/users.json",
	   		data: $("#signupForm").serialize()+"&authenticity_token="+json.authenticity_token,
	   		dataType: "json",
	 		crossDomain: true,
	 		xhrFields: {
		    	withCredentials: true
		   	}
	 	})
		 .done(function(json){
		 	console.log("submitando depois de pegar o token");
			if(json.errors)
				alert("Campos obrigatórios não podem ficar em branco");
			else
				console.log('Usuário cadastrado com sucesso');
				
			userLoggedIn = json;
			
			$.mobile.hidePageLoadingMsg();
			
			setTimeout(function(){
					$.mobile.loading('hide');
					
					console.log('posLoginPage');
					console.log(posLoginPage);
					
					if(posLoginPage != "")
						$.mobile.changePage(posLoginPage);
					
				},2000);	
		})
		.error(function (e){
			
			var response = e;

			if(JSON.parse(response.responseText).errors.email)		
				console.log("Email "+JSON.parse(response.responseText).errors.email.toString());
			else if(JSON.parse(response.responseText).errors.password)
				console.log("Senhas "+JSON.parse(response.responseText).errors.password.toString());
			else 
				console.log('Erro ao cadastrar usuário');		
			
			console.log(e);
			$.mobile.hidePageLoadingMsg();
		});
	 	
	 });
	
}


cpFunctions.logout = function (){
	$.ajax({
	   		url: server["defaults"]+"/user/users/sign_out.json",
	   		dataType: "json",
	   		type: "POST",
	   		data: {
	   		  "_method": "delete"
	   		},
	 		crossDomain: true,
	 		xhrFields: {
		    	withCredentials: true
		   	}
	})
	.done(function (){
	 	console.log('Logout realizado com sucesso.');	
	})
	.error(function (e){
		console.log('Erro ao realizar logout.');	
	});
}


cpFunctions.sendContact = function (){
	
	if(checkMandatories("#formContact")) return;
	
	var contact_message = {};

	$.each($("#formContact").serializeArray(),function(index,value){
	
	 contact_message[value.name] = value.value;
	
	});

	var postContact = {
		commit:"Salvar",
		contact_message: contact_message,
		remote:true
	}
	
	$.ajax({
	   		url: server["defaults"]+"/contact_message.json ",
	   		dataType: "json",
	   		type: "POST",
	   		data: postContact,
	 		crossDomain: true,
	 		xhrFields: {
		    	withCredentials: true
		   	}
	})
	.done(function (json){
		if(json.status == "ok")
	 	console.log('Sua mensagem foi enviada com sucesso.');	
	})
	.error(function (e){
		console.log('Erro ao enviar mensagem.');	
	});
	
}

cpFunctions.userShare = function (params){
	
	
	if(userLoggedIn){
		
		$.ajax({
		   		url: server["defaults"]+"/user/user_share.json ",
		   		dataType: "json",
		 		crossDomain: true,
		 		xhrFields: {
			    	withCredentials: true
			   	}
		})
		.done(function (json){
		
		var postIndi = {
	    authenticity_token: json.authenticity_token,
	    commit:	"Enviar",
	    invite: params
	    };
	
		$.ajax({
		   		url: server["defaults"]+"/user/user_share.json ",
		   		dataType: "json",
		   		type: "POST",
		   		data: postIndi,
		 		crossDomain: true,
		 		xhrFields: {
			    	withCredentials: true
			   	}
		})
		.done(function (json){
			if(json.status == "ok")
		 	console.log('Sua mensagem foi enviada com sucesso.');	
		})
		.error(function (e){
			console.log('Erro ao enviar mensagem.');	
		});
		})
		.error(function (e){
			console.log('Erro ao enviar mensagem.');	
		});
			
	}
	
}

cpFunctions.userIndicateApp = function (params){
	
	
		$.ajax({
		   		url: server["defaults"]+"/mobile_share.json ",
		   		dataType: "json",
		 		crossDomain: true,
		 		xhrFields: {
			    	withCredentials: true
			   	}
		})
		.done(function (json){
		
		var postIndi = {
	    authenticity_token: json.authenticity_token,
	    commit:	"Enviar",
	    invite: params
	    };
	
		$.ajax({
		   		url: server["defaults"]+"/mobile_share.json ",
		   		dataType: "json",
		   		type: "POST",
		   		data: postIndi,
		 		crossDomain: true,
		 		xhrFields: {
			    	withCredentials: true
			   	}
		})
		.done(function (json){
			if(json.status == "ok")
		 	console.log('Sua mensagem foi enviada com sucesso.');	
		})
		.error(function (e){
			console.log('Erro ao enviar mensagem.');	
		});
		})
		.error(function (e){
			console.log('Erro ao enviar mensagem.');	
		});
			
}

cpFunctions.userLoggedIn = function(onSuccess){
	
	userLoggedIn = false;
	
	$.ajax({
		url: server["defaults"]+"/user_logged.json",
   		dataType: "json",
 		crossDomain: true,
		xhrFields: {
		   	withCredentials: true
		}
	})
	.done (function (json){
		console.log(json);
		userLoggedIn = json;
		
		if(onSuccess)
			onSuccess();
		
	})
	.error (function (e){
		console.log(e);
	})
}

flash = function (str, type){

	console.log(type);
	
	if(typeof type == "undefined" || type == "warning"){
	
		if(typeof navigator.notification != "undefined")
			console.log(str);
		else alert(str);
		
	}
	else if(type == "ok"){
	
		if(typeof navigator.notification != "undefined")
			console.log(str, null, 'Sucesso', 'OK');
		else alert(str);
		
	}
	else if(type == "error"){
	
		if(typeof navigator.notification != "undefined")
			console.log(str);
		else alert(str);
		
	}

}

cpFunctions.pizzariaClosed = function(){
	flash("Esta pizzaria encontra-se fechada, volte mais tarde");
}

cpFunctions.loadMorePizzarias = function (){

if(typeof pagesConfig != "undefined"){

if(pagesConfig.max_load_pages <= pagesConfig.current_page){
	 return;
}

$.mobile.loading("show");
						    
$.getJSON(""+server['defaults']+"/home.json", {page: ++pagesConfig.current_page, address:address, establishment:establishment}, function(obj,status){

	if(status === "success"){
		
		$.each(obj.data,function(key,value){
			if(obj.data[key].logo == "/missing/logos/img_64/missing.png"){
											obj.data[key].logo = "./imgs/missing_pizzaria.png";
											console.log(obj.data[key].logo);
										}
			
			pizzariasData[""+obj.data[key].id+""] = obj.data[key];
			
			
		});
		
		$("#ListaPizzariasTmpl").tmpl(obj).appendTo("#listarPizzariasUL");								
		$("#listarPizzariasUL li").css("clear","both");
		$("#listarPizzariasUL").listview("refresh");
		
		$.each(pizzariasData,function(key,value){
			
			if(typeof pizzariasData[key].ratings == "undefined"){
				
				$.getJSON(""+server['defaults']+"/"+key+"/rating.json",function(data,status){
				if(status == "success")
				pizzariasData[key]["ratings"] = data;	
			},"json")
			.error(
				function (e){
					console.log('Não consegui pegar avaliações da pizzaria');
					console.log("erro ao listar ratings para a pizzaria "+key+"->"+e);
				}
			);
				
			}
			  
		});
	$.mobile.loading("hide");	
	}
});	
	
}


}

cpFunctions.newAddressFormSubmit = function (pageId){
	
	console.log("Enviando dados...");
	
	if(checkMandatories("#newAddressForm")){
		$.mobile.hidePageLoadingMsg();
		return;
	}
	
	$.ajax({
   		url: ""+server['defaults']+"/user/user_addresses/new.json",
   		dataType: "json",
 		crossDomain: true,
 		xhrFields: {
	    	withCredentials: true
	   	}
	 })
	 .done(function(json){
		$.ajax({
		   		url: ""+server['defaults']+"/user/user_addresses.json",
		   		dataType: "json",
		   		type: "POST",
		   		data: "authenticity_token="+json.authenticity_token+"&"+$("#newAddressForm").serialize(),
		 		crossDomain: true,
		 		xhrFields: {
			    	withCredentials: true
			   	}
		})
		.done(function (json){
			console.log(json);
			order_cart.order_finish.addresses.push(json.address);
			$.mobile.hidePageLoadingMsg();
			$.mobile.changePage("carrinho-concluir-pedido.html");
			console.log('Cadastrado com sucesso');
		})
		.error(function (e){
			console.log(json);
			$.mobile.hidePageLoadingMsg();
			console.log('Erro ao cadastrar o endereço', null, 'Error', 'OK');
		});        
	});
}