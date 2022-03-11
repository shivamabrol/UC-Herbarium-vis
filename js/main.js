


d3.csv('data/worldcities.csv')
d3.csv('data/data-sample2.csv')//updted the data
  .then(data => {
    data.forEach(d => {
      // console.log(d);
      // if (d.month == "null") {
      //   d.month = '0';
      // }
     // d.month = +d.month;
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
    let unknown = 0;

    let timeYear = []
    data.forEach(d => {
      switch (d.month) {
        case '1':
          jan = jan + 1;
          break;
        case '2':
          feb = feb + 1;
          break;
        case '3':
          march = march + 1;
          break;
        case '4':
          april = april + 1;
          break;
        case '5':
          may = may + 1;
          break;
        case '6':
          jun = jun + 1;
          break;
        case '7':
          jul = jul + 1;
          break;
        case '8':
          aug = aug + 1;
          break;
        case '9':
          sept = sept + 1;
          break;
        case '10':
          oct = oct + 1;
          break;
        case '11':
          nov = nov + 1;
          break;
        case '12':
          dec = dec + 1;
          break;
        case "null":
          //console.log(d.month);
          unknown = unknown + 1;
          break;
        default:
          //console.log(d.month);
          unknown = unknown + 1;
          break;
      }
    })
    //console.log(unk)

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
    barTimeYear.svg.append("text")
     // .attr("class", "y label")
      .attr("text-anchor", "middle")
      .attr("x", (barTimeYear.width / 2)+30
      )
      .attr("y", 350)
      .text('months');
    barTimeYear.svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -(barTimeYear.height / 2))
      .attr("y", 15)
      .style("text-anchor", "middle")
      .text('count of speciminse collected');
    barTimeYear.svg.append("text")
      .attr("x", barTimeYear.width / 2+50)
      .attr("y", 15)
      .attr("text-anchor", "middle")
      .style("font-size", "20px")
      .text('Specimins collected over the course of a year');

      keysAll = [];
      data.forEach(d => {
          //console.log(d);
          keysAll.push(d.class)});
      function onlyUnique(value, index, self) {
          return self.indexOf(value) === index;
      }
      keys = keysAll.filter(onlyUnique);
console.log(keys);
    let Myxomycetes = 0;
    let Sordariomycetes = 0;
    let Agaricomycetes = 0;
    let Ustilaginomycetes = 0;
    let Tremellomycetes = 0;
    let Taphrinomycetes = 0;
    let Pucciniomycetes = 0;
    let Dothideomycetes = 0;
    let Myxogastrea = 0;
     let Pezizomycetes = 0;
     let Leotiomycetes = 0;
     let Chytridiomycetes = 0;
     let Oomycetes = 0;
    let Lecanoromycetes = 0;
     let Blastocladiomycetes = 0;
     let Eurotiomycetes = 0;
     let Orbiliomycetes = 0;
     let Dacrymycetes = 0;
     let Lichinomycetes = 0;
    let Exobasidiomycetes = 0;
    let unknown1 = 0;

    let classs = [];
    data.forEach(d => {
      switch (d.class) {
        case 'Myxomycetes':
          Myxomycetes = Myxomycetes + 1;
          break;
        case 'Sordariomycetes':
          Sordariomycetes = Sordariomycetes + 1;
          break;
        case 'Agaricomycetes':
          Agaricomycetes = Agaricomycetes + 1;
          break;
        case 'Ustilaginomycetes':
          april = april + 1;
          break;
        case 'Tremellomycetes':
          Tremellomycetes = Tremellomycetes + 1;
          break;
        case 'Taphrinomycetes':
          Taphrinomycetes = Taphrinomycetes + 1;
          break;
        case 'Pucciniomycetes':
          Pucciniomycetes = Pucciniomycetes + 1;
          break;
        case 'Pezizomycetes':
          Pezizomycetes = Pezizomycetes + 1;
          break;
          case 'Dothideomycetes':
            Dothideomycetes = Dothideomycetes + 1;
            break;
            case 'Myxogastrea':
              Myxogastrea = Myxogastrea + 1;
          break;
          case 'Leotiomycetes':
            Leotiomycetes = Leotiomycetes + 1;
          break;
          case 'Chytridiomycetes':
            Chytridiomycetes = Chytridiomycetes + 1;
          break;
          case 'Oomycetes':
            Oomycetes = Oomycetes + 1;
          break;
          case 'Lecanoromycetes':
            Lecanoromycetes = Lecanoromycetes + 1;
          break;
          case 'Blastocladiomycetes':
            Blastocladiomycetes = Blastocladiomycetes + 1;
          break;
          case 'Eurotiomycetes':
            Eurotiomycetes = Eurotiomycetes + 1;
          break;
          case 'Orbiliomycetes':
            Orbiliomycetes = Orbiliomycetes + 1;
          break;
          case 'Dacrymycetes':
            Dacrymycetes = Dacrymycetes + 1;
          break;
          case 'Lichinomycetes':
            Lichinomycetes = Lichinomycetes + 1;
          break;
          case 'Exobasidiomycetes':
            Exobasidiomycetes = Exobasidiomycetes + 1;
          break;
        case "":
          //console.log(d.month);
          unknown1 = unknown1 + 1;
          break;
        default:
          //console.log(d.month);
          unknown1 = unknown1 + 1;
          break;
      }
    });
    //console.log(unk)
    Myxomycetes!=0 ? classs.push({ 'x': "Myxomycetes", 'y': Myxomycetes }): Myxomycetes=Myxomycetes;
    Sordariomycetes!=0 ? classs.push({ 'x': "Sordariomycetes", 'y': Sordariomycetes }): Sordariomycetes=Sordariomycetes;
    Agaricomycetes!=0 ? classs.push({ 'x': "Agaricomycetes", 'y': Agaricomycetes }): Agaricomycetes=Agaricomycetes;
    Ustilaginomycetes!=0 ? classs.push({ 'x': "Ustilaginomycetes", 'y': Ustilaginomycetes }): Ustilaginomycetes=Ustilaginomycetes;
    Tremellomycetes!=0 ? classs.push({ 'x': "Tremellomycetes", 'y': Tremellomycetes }): Tremellomycetes=Tremellomycetes;
    Taphrinomycetes!=0 ? classs.push({ 'x': "Taphrinomycetes", 'y': Taphrinomycetes }): Taphrinomycetes=Taphrinomycetes;
    Pucciniomycetes!=0 ? classs.push({ 'x': "Pucciniomycetes", 'y': Pucciniomycetes }): Pucciniomycetes=Pucciniomycetes;
    Pezizomycetes!=0 ? classs.push({ 'x': "Pezizomycetes", 'y': Pezizomycetes }): Pezizomycetes=Pezizomycetes;
    Dothideomycetes!=0 ? classs.push({ 'x': "Dothideomycetes", 'y': Dothideomycetes }): Dothideomycetes=Dothideomycetes;
    Myxogastrea!=0 ? classs.push({ 'x': "Myxogastrea", 'y': Myxogastrea }): Myxogastrea=Myxogastrea;
    Leotiomycetes!=0 ? classs.push({ 'x': "Leotiomycetes", 'y': Leotiomycetes }): Leotiomycetes=Leotiomycetes;
    Chytridiomycetes!=0 ? classs.push({ 'x': "Chytridiomycetes", 'y': Chytridiomycetes }): Chytridiomycetes=Chytridiomycetes;
    Oomycetes!=0 ? classs.push({ 'x': "Oomycetes", 'y': Oomycetes }): Oomycetes=Oomycetes;
    Lecanoromycetes!=0 ? classs.push({ 'x': "Lecanoromycetes", 'y': Lecanoromycetes }): Lecanoromycetes=Lecanoromycetes;
    Blastocladiomycetes!=0 ? classs.push({ 'x': "Blastocladiomycetes", 'y': Blastocladiomycetes }): Blastocladiomycetes=Blastocladiomycetes;
    Eurotiomycetes!=0 ? classs.push({ 'x': "Eurotiomycetes", 'y': Eurotiomycetes }): Eurotiomycetes=Eurotiomycetes;
    Orbiliomycetes!=0 ? classs.push({ 'x': "Orbiliomycetes", 'y': Orbiliomycetes }): Orbiliomycetes=Orbiliomycetes;
    Dacrymycetes!=0 ? classs.push({ 'x': "Dacrymycetes", 'y': Dacrymycetes }): Dacrymycetes=Dacrymycetes;
    Lichinomycetes!=0 ? classs.push({ 'x': "Lichinomycetes", 'y': Lichinomycetes }): Lichinomycetes=Lichinomycetes;
    Exobasidiomycetes!=0 ? classs.push({ 'x': "Exobasidiomycetes", 'y': Exobasidiomycetes }): Exobasidiomycetes=Exobasidiomycetes;
    unknown1!=0 ? classs.push({ 'x': "unknown", 'y': unknown1 }): unknown1=unknown1;

    barClasss= new BarChart({
      'parentElement': '#barChart2',
      'containerHeight': 350,
      'containerWidth': 600
    }, classs);
    barClasss.svg.append("text")
     // .attr("class", "y 5abel")
      .attr("text-anchor", "middle")
      .attr("x", (barClasss.width / 2)+100
      )
      .attr("y", 300)
      .text('specimens');
      barClasss.svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -(barClasss.height / 2))
      .attr("y", 15)
      .style("text-anchor", "middle")
      .text('count of specimens collected');
      barClasss.svg.append("text")
      .attr("x", barClasss.width / 2+50)
      .attr("y", 15)
      .attr("text-anchor", "middle")
      .style("font-size", "20px")
      .text('number of specimens in each class');
      
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
