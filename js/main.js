


d3.csv('data/worldcities.csv')
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


    // Initialize chart and then show it

    //initial coloring by year because it's the first field in the dropdown
    //can be changed
    leafletMap = new LeafletMap({ parentElement: '#my-map',
                                  colorBy: 'year'}, data);


  })
  .catch(error => console.error(error));



//second dropdown changes on making changes in the first one
function configureDropDownLists(ddl1, ddl2) {

  d3.csv('data/data-sample2.csv')
  .then(data => {
    colorByD = [];
    var svg = d3.select("svg.leaflet-zoom-animated");
    svg.selectAll("*").remove();
    classes = []
    data.forEach(d => {
      
      if(!classes.includes(d.class)) {
        classes.push(d.class)
      }
    });

    //all the updates are done in the renderVis function to ensure that 
    //the map is not reinitialized in initVis.
    leafletMap.renderVis(ddl1.value);


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
