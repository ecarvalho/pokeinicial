const starters = [
  'Bulbasaur',
  'Charmander',
  'Pikachu',
  'Squirtle',
  'Totodile',
  'Chikorita',
  'Cyndaquil',
  'Treecko',
  'Mudkip',
  'Torchic',
  'Turtwig',
  'Chimchar',
  'Piplup',
  'Tepig',
  'Oshawott',
  'Snivy',
  'Fennekin',
  'Froakie',
  'Chespin',
  'Popplio',
  'Rowlet',
  'Litten',
  'Sobble',
  'Grookey',
  'Scorbunny'
];

window.addEventListener('load', () => {
  const formEl = document.forms.PokemonSelectorForm;
  const resultEl = document.getElementById('result');
  const resultContent = document.querySelector('#result > p');
  const resetBtn = document.getElementById('reset-btn');

  // Função que pega os valores passados na url
  // e organiza em um objeto para facilitar o acesso ao dado
  function getQueryString() {
    const qs = (function(a) {
      if (a == "") return {};
      const b = {};
      for (var i = 0; i < a.length; ++i) {
        const p=a[i].split('=', 2);
        if (p.length == 1)
          b[p[0]] = "";
        else
          b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
      }
      return b;
    })(window.location.search.substr(1).split('&'));

    return qs;
  }

  function pokemonSelector(event) {
    event.preventDefault();
    const formData = new FormData(formEl);

    const bwVal = parseInt(formData.get('bw'), 10);
    const handVal = parseInt(formData.get('hand'), 10);
    const coinVal = parseInt(formData.get('coin'), 10);
    const eoVal = parseInt(formData.get('eo'), 10);
    const dnVal = parseInt(formData.get('dn'), 10);
    const seasonVal = parseInt(formData.get('season'), 10);
    const dowVal = parseInt(formData.get('dow'), 10);
    const elementVal = parseInt(formData.get('element'), 10);

    const answersResult = 12 + bwVal + handVal + coinVal + eoVal + dnVal + seasonVal + dowVal + elementVal;

    const qs = getQueryString();
    const twitchNameVal = qs.tn ? qs.tn.toLowerCase().split('').reduce(
      (res, curr) => res + curr.charCodeAt(0),
    0) : 0;

    const calcResult = (answersResult + twitchNameVal) % 25;
    const selectedPokemon = starters[calcResult];

    console.log(selectedPokemon, twitchNameVal, answersResult, calcResult, bwVal, handVal, coinVal, eoVal, dnVal, seasonVal, dowVal, elementVal);

    resultContent.innerHTML = `<img src="/static/img/sprites/${selectedPokemon.toLowerCase()}.jpg" \
      alt="${selectedPokemon}" class="img-fluid rounded p-4 border mb-2 shadow-sm" style="max-height: 200px;" />\
      <br /><h3>${selectedPokemon}</h3>`;
    
    formEl.className = 'd-none';
    resultEl.className = 'text-center';
  }

  resetBtn.addEventListener('click', ev => {
    ev.preventDefault();
    formEl.reset();
    formEl.className = '';
    resultEl.className = 'd-none';
  });

  formEl.addEventListener('submit', pokemonSelector);
});

