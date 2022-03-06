


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

  d3.csv('data/data-sample2.csv')
  .then(data => {

    
    year_null = data.filter(d => d.year != 'null')
    class_null = data.filter(d => d.class != 'null')
    startDay_null = data.filter(d => d.startDayOfYear != 'null')

    var years = [];
    var startDaysofYear = [];
    var classes = [];
    let minYear = d3.min(year_null, d => d.year),
    maxYear = d3.max(year_null, d => d.year);

    let firstStartDay = d3.min(startDay_null, d => d.startDayOfYear)
    , lastStartDay = d3.max(startDay_null, d => d.startDayOfYear)

    for (let i = minYear; i <= maxYear; i++) {
      years.push(i);
    }

    for(let j = firstStartDay; j <= lastStartDay; j++) {
      startDaysofYear.push(j);
    }

    data.forEach(d => {
      // console.log(d);
      if(!classes.includes(d.class)) {
        classes.push(d.class)

      }
    });

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
        for (i = 0; i < startDaysofYear.length; i++) {
          createOption(ddl2, startDaysofYear[i], startDaysofYear[i]);
        }
        break;
      case 'class':
        ddl2.options.length = 0;
        for (i = 0; i < classes.length; i++) {
          createOption(ddl2, classes[i], classes[i]);
        }
        break;
      default:
        ddl2.options.length = 0;
        break;
    }
  })


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