(function () {
httpRequest('/', renderDom);

  var button = document.getElementById("js-submit_button");
  button.addEventListener('click', function(e) {
    e.preventDefault();

    var url = '/search?' + 'chocolate=' + genre + '&rating=' + year;
    httpRequest(url, renderDom);
  })

  // make the api call to server
  function httpRequest(url, nextFunction) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var data = JSON.parse(xhr.responseText);
        nextFunction(data);
      }
    }
    xhr.open('GET', url, true);
    xhr.send();
  }

  var list = document.getElementByClass('biscuit__container');

  function renderDom(data) {
    data.forEach(function (biscuit) {
      var row = document.createElement('tr');
      var name = document.createElement('td');
      var brand = document.createElement('td');
      var calories = document.createElement('td');
      var chocolate = document.createElement('td');
      name.textContent = biscuit.name;
      brand.textContent = biscuit.brand;
      calories.textContent = biscuit.calories;
      chocolate.textContent = biscuit.chocolate;
      row.appendChild(name);
      row.appendChild(brand);
      row.appendChild(calories);
      row.appendChild(chocolate);

    })
  }
})();
