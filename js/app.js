// ide deklaráljátok a függvényeket.

// 1. feladat


function sortByCostAsc(tomb) {
  var i = tomb.length;
  while (i > 0) {
    var replace = 0;
    for (var j = 0; j < i - 1; j++) {
      if (parseInt(tomb[j].cost_in_credits, 10) > parseInt(tomb[j + 1].cost_in_credits, 10) ||
      tomb[j].cost_in_credits === null) {
        [tomb[j], tomb[j + 1]] = [tomb[j + 1], tomb[j]];
        replace = j + 1;
      }
    }
    i = replace;
  }
  return tomb;
}

/* EZ JÓ MEGOLDÁS, CSAK BUBORÉKOSSAL KELLENE
function sort(tomb) {
  for (var i = 0; i < tomb.length - 1; i++) {
    for (var j = i + 1; j < tomb.length; j++) {
      if (parseInt(tomb[i].cost_in_credits, 10) > parseInt(tomb[j].cost_in_credits, 10) || tomb[i].cost_in_credits === null) {
        [tomb[i], tomb[j]] = [tomb[j], tomb[i]];
      }
    }
  }
  return tomb;
}
*/

// 2. feladat

function deleteNullConsumables(tomb) {
  for (var i = 0; i < tomb.length; i++) {
    if (tomb[i].consumables === null) {
      tomb.splice(i, 1);
      i--;
    }
  }
  return tomb;
}

// 3. feladat

function changeNullToUnknown(tomb) {
  for (var i = 0; i < tomb.length; i++) {
    var kulcs = Object.keys(tomb[i]);
    for (var j = 0; j < kulcs.length; j++) {
      if (tomb[i][kulcs[j]] === null) {
        tomb[i][kulcs[j]] = 'unknown';
      }
    }
  }
  return tomb;
}

// 4. feladat

function showInDiv(tomb) {
  var szoveg = '';
  for (var i = 0; i < tomb.length; i++) {
    szoveg += `<div id="${i}", class="ships"`;
    var kulcs = Object.keys(tomb[i]);
    var kep = tomb[i].image;
    for (var j = 0; j < kulcs.length; j++) {
      szoveg += '<br>' + kulcs[j] + ': ' + '<br>' + tomb[i][kulcs[j]] + '<br>';
    }
    if (tomb[i].image < 'n') {
      szoveg += '<br><img src = "./img/' + kep + '" alt="Picture not found">';
    } else {
      szoveg += '<br><img src = "./img/notfound.jpg" alt="Picture not found!">';
    }
    szoveg += '<hr></div>';
  }
  var place = document.querySelector('.spaceship-list');
  place.innerHTML += szoveg;
}

// 5. feladat
// ezt nem sikerült megoldani rendesen

function showOnSide(tomb) {
  var side = document.querySelector('.one-spaceship').innerHTML;
  var ships = document.querySelectorAll('.ships');
  for (var i = 0; i < ships.length; i++) {
    // ERRE HIBÁT ÍR KI, DE MÉG NEM JÖTTEM RÁ, HOGY HOGY LEHETNE MÁSHOGY
    ships[i].addEventListener('click', function () {
      side += '<div class="clicked">' + ships[i] + '</div>';
    });
  }
}

// 6. feladat

function getStatistics(tomb) {
  var count = getOneCrewShips(tomb);
  var cargo = sortByCargo(tomb);
  var num = getAllPassengers(tomb);
  var longest = getLongestShip(tomb);
  var container = document.querySelector('.spaceship-list');
  container.innerHTML += '<p>Az egy fős legénységű hajók száma: ' + count + '</p>';
  container.innerHTML += '<p>A legnagyobb cargo capacity hajó neve: ' + cargo.model + '</p>';
  container.innerHTML += '<p>Az összes hajó utasainak összesített száma: ' + num + '</p>';
  container.innerHTML += '<p>A leghosszabb hajó képének a neve: ' + longest.image + '</p>';
}


function getOneCrewShips(tomb) {
  var count = 0;
  for (var i = 0; i < tomb.length; i++) {
    if (tomb[i].crew === '1') {
      count++;
    }
  }
  return count;
}

function sortByCargo(tomb) {
  var largest = tomb[0];
  for (var i = 1; i < tomb.length; i++) {
    if (tomb[i].cargo_capacity > largest.cargo_capacity && tomb[i].cargo_capacity !== 'unknown') {
      largest = tomb[i];
    }
  }
  return largest;
}

function getAllPassengers(tomb) {
  var num = 0;
  for (var i = 0; i < tomb.length; i++) {
    if (tomb[i].passengers !== 'unknown') {
      num += parseInt(tomb[i].passengers);
    }
  }
  return num;
}

function getLongestShip(tomb) {
  longest = tomb[0];
  for (var i = 0; i < tomb.length; i++) {
    if (tomb[i].lengthiness !== 'unknown') {
      if (tomb[i].lengthiness > longest.lengthiness) {
        longest = tomb[i];
      }
    }
  }
  return longest;
}

// 7. feladat
// ezt sem sikerült megoldani rendesen, bár itt legalább sejtem, mi lehet a hiba...

var button = document.querySelector('#search-button');

function sortByABC(tomb) {
  for (var i = 0; i < tomb.length - 1; i++) {
    for (var j = i + 1; j < tomb.length; j++) {
      if (tomb[i].model.localeCompare(tomb[j].model) === 1) {
        [tomb[i], tomb[j]] = [tomb[j], tomb[i]];
      }
    }
  }
  return tomb;
  console.log(tomb);
}

function searchByName(tomb) {
  var searched = document.querySelector('#search-text').value.toLowerCase();
  var newtomb = sortByABC(tomb);
  var result = [];
  for (var i = 0; i < newtomb.length; i++) {
    if ((newtomb[i].model.toLowerCase()).indexOf(searched) > -1) {
      result.push(newtomb[i]);
    }
  }
  if (result.length < 1) {
    console.log('Not found!');
  }
  var found = result[0];
  console.log(found);
}

function getData(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      callbackFunc(this);
    }
  };
  xhttp.open('GET', url, true);
  xhttp.send();
}

function successAjax(xhttp) {
  // Innen lesz elérhető a JSON file tartalma, tehát az adatok amikkel dolgoznod kell
  var userDatas = JSON.parse(xhttp.responseText);
  // Innen lehet hívni.
  console.log(userDatas);

  sortByCostAsc(userDatas);

  deleteNullConsumables(userDatas);

  changeNullToUnknown(userDatas);

  showInDiv(userDatas);

  showOnSide(userDatas);

  getStatistics(userDatas);

  // sortByABC(userDatas);

  button.onclick = searchByName(userDatas);
}
getData('/json/spaceships.json', successAjax);
