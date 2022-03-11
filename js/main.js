


d3.csv('data/worldcities.csv')
d3.csv('data/data-sample2.csv')
  .then(data => {
    data.forEach(d => {
      // console.log(d);
      if (d.month == "null") {
        d.month = 0;
      }
      d.month = +d.month;
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
    let jan = 0;
    let feb = 0;
    let march = 0;
    let april = 0;
    let may = 0;
    let jun = 0;
    let jul = 0;
    let aug = 0;
    let sept = 0;
    let nov = 0;
    let oct = 0;
    let dec = 0;
    let unkown = 0;

    let timeYear = []
    data.forEach(d => {
      switch (d.month) {
        case 1:
          jan = jan + 1;
          break;
        case 2:
          feb = feb + 1;
          break;
        case 3:
          march = march + 1;
          break;
        case 4:
          april = april + 1;
          break;
        case 5:
          may = may + 1;
          break;
        case 6:
          jun = jun + 1;
          break;
        case 7:
          jul = jul + 1;
          break;
        case 8:
          aug = aug + 1;
          break;
        case 9:
          sept = sept + 1;
          break;
        case 10:
          oct = oct + 1;
          break;
        case 11:
          nov = nov + 1;
          break;
        case 12:
          dec = dec + 1;
          break;
        default:
          unknown = unkown + 1;
          break;
      }
    })

    timeYear.push({ 'x': "Jan", 'y': jan });
    timeYear.push({ 'x': "Feb", 'y': feb });
    timeYear.push({ 'x': "Mar", 'y': march });
    timeYear.push({ 'x': "Apr", 'y': april });
    timeYear.push({ 'x': "May", 'y': may });
    timeYear.push({ 'x': "Jun", 'y': jun });
    timeYear.push({ 'x': "Jul", 'y': jul });
    timeYear.push({ 'x': "Aug", 'y': aug });
    timeYear.push({ 'x': "Sep", 'y': sept });
    timeYear.push({ 'x': "Oct", 'y': oct });
    timeYear.push({ 'x': "Nov", 'y': nov });
    timeYear.push({ 'x': "Dec", 'y': dec });
    timeYear.push({ 'x': "Unk", 'y': unknown });

    barTimeYear = new BarChart({
      'parentElement': '#barChart1',
      'containerHeight': 350,
      'containerWidth': 600
    }, timeYear);
    // Initialize chart and then show it

    //initial coloring by year because it's the first field in the dropdown
    //can be changed
    leafletMap = new LeafletMap({
      parentElement: '#my-map',
      colorBy: 'year'
    }, data);


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

        if (!classes.includes(d.class)) {
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
