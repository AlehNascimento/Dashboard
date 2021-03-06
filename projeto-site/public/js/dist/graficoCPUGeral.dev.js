"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Função p/ plotar o gráfico
function plotarCPUGeral(leituraUsoPorc) {
  var _ref, _data;

  document.getElementById("porcentagem");
  var ctx = document.getElementById("chartCPUGeral").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "doughnut",
    data: (_data = {
      labels: []
    }, _defineProperty(_data, "labels", ['Porcentagem de Uso']), _defineProperty(_data, "datasets", [(_ref = {
      label: "% de Utilização CPU",
      data: leituraUsoPorc,
      fill: true,
      backgroundColor: ['#2084f7', '#404363'],
      borderColor: ['#2084f7', '#404363']
    }, _defineProperty(_ref, "data", leituraUsoPorc), _defineProperty(_ref, "fill", false), _ref)]), _data),
    options: {
      cutoutPercentage: 60,
      rotation: 180,
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        animationScale: true
      }
    }
  });
}

window.onload = atualizarMemoria();

function atualizarMemoria() {
  fetch("http://localhost:3000/leituras/dadoCPU", {
    cache: "no-store"
  }).then(function (response) {
    if (response.ok) {
      response.json().then(function (resposta) {
        console.log("Dados recebidos: ".concat(JSON.stringify(resposta)));
        var leitura = resposta;
        console.log(leitura); // quantidade de elementos dentro da lista

        console.log(leitura.recordsets[0].length);
        var leituraUsoPorc = [];

        for (n = leitura.recordsets[0].length - 1; n >= 0; n--) {
          leituraUsoPorc.push(leitura.recordsets[0][n].CpuPorcent);
          leituraUsoPorc.push(100 - leitura.recordsets[0][n].CpuPorcent);
        }

        console.log(leituraUsoPorc);
        plotarCPUGeral(leituraUsoPorc);
      });
    } else {
      console.error("Nenhum dado encontrado ou erro na leituras");
    }
  })["catch"](function (error) {
    console.error("Erro na obten\xE7\xE3o dos dados p/ gr\xE1fico: ".concat(error.message));
  });
}

atualizarMemoria();