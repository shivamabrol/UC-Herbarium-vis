


//d3.csv('data/worldcities.csv')
d3.csv('data/data-sample2.csv')
  .then(data => {
    data.forEach(d => {
      // console.log(d);
      if (d.decimalLatitude == "null" || d.decimalLongitude == "null" || d.year == "null") {
        d.latitude = 99999999999999;
        d.longitude = 99999999999999;
        d.year = null;
      }
      else {
        d.latitude = +d.decimalLatitude; //make sure these are not strings
        d.longitude = +d.decimalLongitude; //make sure these are not strings
        d.year = +d.year;
      }
    });

    // console.log(data);//ok, got my data!

    // Initialize chart and then show it
    leafletMap = new LeafletMap({ parentElement: '#my-map' }, data);


  })
  .catch(error => console.error(error));

function configureDropDownLists(ddl1, ddl2) {
  var years = [];
  var startDaysofYear = [];
  var classes = [];

  for (let i = 1850; i <= 2000; i++) {
    years.push(i);
  }

  d3.csv('data/data-sample2.csv')
    .then(data => {
      classes = data.filter(d => d.class != 'null')
    })
    .catch(error => console.error(error));

  console.log(classes + 'is printed')
  switch (ddl1.value) {
    case 'year':
      ddl2.options.length = 0;
      for (i = 0; i < years.length; i++) {
        createOption(ddl2, years[i], years[i]);
      }
      break;
      break;
    case 'startDayofYear':
      ddl2.options.length = 0;
      break;
    case 'class':
      ddl2.options.length = 0;
      break;
    default:
      ddl2.options.length = 0;
      break;
  }
}


function createOption(ddl, text, value) {
  var opt = document.createElement('option');
  opt.value = value;
  opt.text = text;
  ddl.options.add(opt);
}

// console.log(d);
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}