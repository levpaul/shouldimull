var buttonHit = false;

var AT_LEAST = "At least";
var EXACTLY = "Exactly";
var choice = "";

var UpdateStats = function() {
  grabVariables();
  var result = calcResult();
  updateResultsSection(result);
  unhideResults();
};

var calcResult = function() {
  var result;
  if (choice == EXACTLY) {
    result = calcHypergeometricFormula(x,N,n,k);
  } else if (choice == AT_LEAST) {
    result = 0.0;

    for (var i = x; i <= k; i++) {
      r = calcHypergeometricFormula(i,N,n,k);
      result += r;
    }
  }
  return result;
};

var calcHypergeometricFormula = function(x,N,n,k){
  var a, b, c;
  a = combi(k,x);
  b = combi((N-k),(n-x));
  c = combi(N,n);
  rawResult = (a * b) / c;
  return rawResult;
};

var combi = function(n,r) {
  return fact(n) / (fact(r) * fact(n-r));
};

var fact = function(num){
    var rval=1.0;
    for (var i = 2.0; i <= num; i++)
        rval = rval * i;
    return rval;
};

var updateResultsSection = function(r){
  niceResult = parseFloat(Math.round(r * 10000) / 100).toFixed(2);
  minMaxedResult = Math.min(Math.max(0,niceResult), 100);
  $("#resultantChance").text(minMaxedResult);
};

var grabVariables = function() {
  N = $("#cardsInDeck").val();
  if (N === "") {
    N = $("#cardsInDeck").attr("placeholder");
    $("#cardsInDeck").val(N);
  }

  k = $("#cardsYouWant").val();
  if (k === "") {
    k = $("#cardsYouWant").attr("placeholder");
    $("#cardsYouWant").val(k);
  }

  n = $("#cardDraws").val();
  if (n === "") {
    n = $("#cardDraws").attr("placeholder");
    $("#cardDraws").val(n);
  }

  x = $("#numYouWant").val();
  if (x === "") {
    x = $("#numYouWant").attr("placeholder");
    $("#numYouWant").val(x);
  }

  choice = $("#hyperChoice").val();
};

var unhideResults = function(){
  if (buttonHit === false) {
    $(function(){
      $("#resetButton").removeClass("hide");
      $("#resultsSection").removeClass("hide");
    });
    buttonHit = true;
  }
};

var resetPage = function(){
  hideResults();
  // Basically just reset the fields back to placeholder values - tut
  N = $("#cardsInDeck").attr("placeholder");
  $("#cardsInDeck").val(N);
  k = $("#cardsYouWant").attr("placeholder");
  $("#cardsYouWant").val(k);
  n = $("#cardDraws").attr("placeholder");
  $("#cardDraws").val(n);
  x = $("#numYouWant").attr("placeholder");
  $("#numYouWant").val(x);
  $("#hyperChoice").val("At least")
};

var hideResults = function(){
  $(function(){
    $("#resetButton").addClass("hide");
    $("#resultsSection").addClass("hide");
  });
  buttonHit = false;
};
