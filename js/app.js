/* Daniel González Herrera -Proyecto Final JavaScript-*/
var Calculadora = {
  init: function(){
    var teclas = document.getElementsByClassName('tecla'); //Guardo todas las teclas como arreglo
    var valor1;
    var valor2;
    var operacion;
    for (var i = 0; i < teclas.length; i++) {
      teclas[i].onmousedown = this.tamanio;
      teclas[i].onmouseup = this.tamanio;
      teclas[i].onclick = this.teclaPresionada;
    };
  },
  tamanio: function(eventoTecla){ //Funcion para cambiar el tamaño de la tecla cuando es presionada
		var evento = eventoTecla || window.event; //Guarda el tipo de evento (mousedown o mouseup)
    var x = event.target; //Identifica cuál fue la tecla presionada
    var id = x.id; //Obtiene el id de la tecla presionada
    if (evento.type == 'mousedown') {
      if(id=="1" || id=="2" || id=="3" || id=="0" || id=="igual" || id=="punto"){
        this.style.width = "28%";
				this.style.height = "61px";
      }else if (id=="mas") {
        this.style.width = "88%";
			  this.style.height = "98%";
      }else{
        this.style.width = "21%";
        this.style.height = "61px";
      }
    }
    else if (evento.type == 'mouseup'){
      if(id=="1" || id=="2" || id=="3" || id=="0" || id=="igual" || id=="punto"){
        this.style.width = "29%";
				this.style.height = "62.91px";
      }else if (id=="mas") {
        this.style.width = "90%";
			  this.style.height = "100%";
      }else{
        this.style.width = "22%";
        this.style.height = "62.91px";
      }
    }
	},
  teclaPresionada: function(eventoTecla){
  var evento = eventoTecla || window.event;
  var x = event.target;
  var id = x.id;
  var display = document.getElementById('display');
  var cero = document.getElementById('display').innerHTML; //Obtiene el valor actual del display
    if (id >= 0 && id <= 9) { //Entra si la tecla presionada es un número de 0 a 9
      if (cero.length <= 7) { //Entra si hay 8 numeros o menos en el display
        if (id == 0 && cero == 0) { //Si se presiona la tecla 0 pero ya hay uno en la pantalla
          console.log("Ya existe un cero");
        }else {
          if (cero == "0") { //Para borrar el 0
            cero = "";
            display.innerHTML = id;
          }else { // Para añadir la nueva tecla presionada
            display.innerHTML = cero + id;
          }
        }
      }else{
        console.log("Número máximo de valores");
      }
    }
    else if (isNaN(id)) { //Entra si la tecla presionada no fue un número
      if (id == "on") {
        Calculadora.limpiarPantalla(display);
      }
      else if (id == "punto") {
        Calculadora.colocaPunto(cero);
      }
      else if (id == "sign") {
        Calculadora.cambiaSigno(cero);
      }
      else{
        Calculadora.operaciones(id);
      }
    }
  },
  limpiarPantalla: function(display){ //Entra si la tecla presionada fue ON
    console.log("Limpiar pantalla");
    display.innerHTML = "0";
  },
  colocaPunto: function(cero){ //Entra si la tecla presionada fue el punto
    var punto = cero.toString(); //Convierte el valor que este en pantalla a caracter
    if (punto.indexOf('.') == -1) { //Busca si ya existe el punto
      display.innerHTML = punto + ".";
    }else{
      console.log("Solo puedes agregar un punto");
    }
  },
  cambiaSigno: function(cero){
    var signo = cero.toString();
    if (cero != 0) { //Verifica que lo que este en pantalla sea diferente de 0
      if (signo.indexOf('-') == -1) {
        console.log("Agrega el signo");
        display.innerHTML = "-" + cero;
      }else {
        console.log("Quita el signo");
        var elimina = signo.slice(1, 9);
        display.innerHTML = elimina;
      }
    }else{
      console.log("No se puede agregar - al número 0")
    }
  },
  operaciones: function(id){
    switch (id) {
      case "mas":
        this.valor1 = document.getElementById('display').innerHTML;
        this.operacion = "+";
        display.innerHTML = ""; //Limpia la pantalla para indicar que se hará una operación
        break;
      case "menos":
        this.valor1 = document.getElementById('display').innerHTML;
        this.operacion = "-";
        display.innerHTML = "";
        break;
      case "por":
        this.valor1 = document.getElementById('display').innerHTML;
        this.operacion = "*";
        display.innerHTML = "";
        break;
      case "dividido":
        this.valor1 = document.getElementById('display').innerHTML;
        this.operacion = "/";
        display.innerHTML = "";
        break;
      case "raiz":
        this.valor1 = document.getElementById('display').innerHTML;
        this.operacion = "raiz";
        display.innerHTML = "";
        break;
      case "igual":
        console.log("resultado");
        this.valor2 = document.getElementById('display').innerHTML;
        Calculadora.resuelve(this.operacion);
        break;
    }
  },
  resuelve: function(operacion){
    var resultado = 0;
    var cortarResultado;
    switch (operacion) {
      case "+":
        resultado = parseFloat(this.valor1) + parseFloat(this.valor2); //parseFloat para convertir a número de nuevo, ya que antes lo había convertido a string
        break;
      case "-":
        resultado = parseFloat(this.valor1) - parseFloat(this.valor2);
        break;
      case "*":
        resultado = parseFloat(this.valor1) * parseFloat(this.valor2);
        break;
      case "/":
        resultado = parseFloat(this.valor1) / parseFloat(this.valor2);
        break;
      case "raiz":
        resultado = parseFloat(Math.sqrt(this.valor1));
    }
    resultado = String(resultado); //Lo convierto a string de nuevo para poder usar la funcion slice y limitar el número de dígitos a mostrar en pantalla
    cortarResultado = resultado.slice(0, 8);
    console.log(resultado); //Muestra el resultado completo en consola
    display.innerHTML = cortarResultado;
  }
}

Calculadora.init();
