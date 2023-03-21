  let x = $(document);
  let intervalo = null;
  x.ready(obtenerMonedas);
  // intervalo = setInterval(obtenerMonedas, 60000);
  //Variables inutiles
  let intervalo_sistema = null;
  var contador = 0;

  iniciandoSistema();
  setTimeout(validandoSistema, 1000);
  function iniciandoSistema() {
    console.log('Iniciando sistema');
  }

  function validandoSistema() {
    console.log('Validando sistema');
    intervalo_sistema =  setInterval(esperandoSistema, 1000);
  }

  function esperandoSistema() {
    if (contador <= 5) {
      console.log(contador + 's')
      contador++;
    } else {
      clearInterval(intervalo_sistema);
      console.log('Sistema listo...');
      setTimeout(noHagasMamadas, 1000);
    }
  }

  function noHagasMamadas() {
    console.log('No Hagas Mamadas');
  }

  /*-----------------------------------------------------------------------------*/


  function obtenerMonedas(nombre) {
    /*Busca todos los elementos que sean de clase card y los borra*/
    let buscar_cards = document.querySelectorAll('.card');
    buscar_cards.forEach((matarcartas) => {
      matarcartas.remove();
    });
    /*Busca en la API*/
    $.ajax({
      type: "GET",
      url: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=mxn&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=24h",
      dataType: "json",
      success: function (data){
        $.each(data, function(i, item){
          let card = `
          <div class="card">
            <div class="item">
              <div class="coin-image" styles="background-image:url(${item.image});">
                <div class="cap-rank">
                  <p>${item.market_cap_rank}</p>
                </div>
                <img src=${item.image} alt="${item.name}">
              </div>
              <div class="coin-content">
              <p class="coin-name">${item.name}</p>
              <p class="coin-symbol">${item.symbol}</p>
              <p class="price-in-mxn">MX$ ${item.current_price}</p>
              <p class="price-range-24h"><span>24h: </span>MX$${item.price_change_24h}</p>
              <p class="total-volume"><span>Total volume: </span>MX$${item.total_volume}</p>
              <p class="market-cap"><span>Market cap: </span>MX$${item.market_cap}</p>
              </div>
              </div>
            </div>`;
          $('#contains-cards').append(card);
        });
      },
    });
  }

  document.querySelector("#buscador").addEventListener('keyup', () => {
      buscarMonedas(document.querySelector("#buscador").value)
  })
  function buscarMonedas(nombre) {

    /*Busca todos los elementos que sean de clase card y los borra*/
    let buscar_cards = document.querySelectorAll('.card');
    buscar_cards.forEach((matarcartas) => {
      matarcartas.remove();
    });
    /*Busca en la API*/
    $.ajax({
      type: "GET",
      url: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=mxn&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=24h",
      dataType: "json",
      fail: function (){
        alert('ERROR');
      },
      success: function (data){
        $.each(data, function(i, item){
          if (item.id.startsWith(nombre)) {
            card = `
            <div class="card">
              <div class="item">
                <div class="coin-image" styles="background-image:url(${item.image});">
                  <div class="cap-rank">
                    <p>${item.market_cap_rank}</p>
                  </div>
                  <img src=${item.image} alt="${item.name}">
                </div>
                <div class="coin-content">
                <p class="coin-name">${item.name}</p>
                <p class="coin-symbol">${item.symbol}</p>
                <p class="price-in-mxn">MX$ ${item.current_price}</p>
                <p class="price-range-24h"><span>24h: </span>MX$${item.price_change_24h}</p>
                <p class="total-volume"><span>Total volume: </span>MX$${item.total_volume}</p>
                <p class="market-cap"><span>Market cap: </span>MX$${item.market_cap}</p>
                </div>
                </div>
              </div>`;
            $('#contains-cards').append(card);
          }
        });
      },
    }).fail( function( jqXHR, textStatus, errorThrown ) {
        console.log('ERROR');
    });
  }
