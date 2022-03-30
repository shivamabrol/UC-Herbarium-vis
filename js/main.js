

let maxYear = 0;
let minYear = 100;
let lat1;
let long1;
let lat2;
let leafletMap;
let long2;
d3.csv('data/worldcities.csv')
d3.csv('data/data-sample2.csv')//updted the data
  .then(data => {
    data.forEach(d => {
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
          unknown = unknown + 1;
          break;
        default:
          unknown = unknown + 1;
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
    barTimeYear.tp = "#tooltipBarChart1";
    barTimeYear.data = timeYear;
    barTimeYear.updateVis();
    barTimeYear.svg.append("text")
      .attr("text-anchor", "middle")
      .attr("x", (barTimeYear.width / 2) + 30
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
      .attr("x", barTimeYear.width / 2 + 50)
      .attr("y", 15)
      .attr("text-anchor", "middle")
      .style("font-size", "20px")
      .text('Specimins collected over the course of a year');

    keysAll = [];
    data.forEach(d => {
      keysAll.push(d.class)
    });
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }
    keys = keysAll.filter(onlyUnique);
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
          Ustilaginomycetes = Ustilaginomycetes + 1;
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
          unknown1 = unknown1 + 1;
          break;
        default:
          unknown1 = unknown1 + 1;
          break;
      }
    });
    Myxomycetes != 0 ? classs.push({ 'x': "Myxomycetes", 'y': Myxomycetes }) : Myxomycetes = Myxomycetes;
    Sordariomycetes != 0 ? classs.push({ 'x': "Sordariomycetes", 'y': Sordariomycetes }) : Sordariomycetes = Sordariomycetes;
    Agaricomycetes != 0 ? classs.push({ 'x': "Agaricomycetes", 'y': Agaricomycetes }) : Agaricomycetes = Agaricomycetes;
    Ustilaginomycetes != 0 ? classs.push({ 'x': "Ustilaginomycetes", 'y': Ustilaginomycetes }) : Ustilaginomycetes = Ustilaginomycetes;
    Tremellomycetes != 0 ? classs.push({ 'x': "Tremellomycetes", 'y': Tremellomycetes }) : Tremellomycetes = Tremellomycetes;
    Taphrinomycetes != 0 ? classs.push({ 'x': "Taphrinomycetes", 'y': Taphrinomycetes }) : Taphrinomycetes = Taphrinomycetes;
    Pucciniomycetes != 0 ? classs.push({ 'x': "Pucciniomycetes", 'y': Pucciniomycetes }) : Pucciniomycetes = Pucciniomycetes;
    Pezizomycetes != 0 ? classs.push({ 'x': "Pezizomycetes", 'y': Pezizomycetes }) : Pezizomycetes = Pezizomycetes;
    Dothideomycetes != 0 ? classs.push({ 'x': "Dothideomycetes", 'y': Dothideomycetes }) : Dothideomycetes = Dothideomycetes;
    Myxogastrea != 0 ? classs.push({ 'x': "Myxogastrea", 'y': Myxogastrea }) : Myxogastrea = Myxogastrea;
    Leotiomycetes != 0 ? classs.push({ 'x': "Leotiomycetes", 'y': Leotiomycetes }) : Leotiomycetes = Leotiomycetes;
    Chytridiomycetes != 0 ? classs.push({ 'x': "Chytridiomycetes", 'y': Chytridiomycetes }) : Chytridiomycetes = Chytridiomycetes;
    Oomycetes != 0 ? classs.push({ 'x': "Oomycetes", 'y': Oomycetes }) : Oomycetes = Oomycetes;
    Lecanoromycetes != 0 ? classs.push({ 'x': "Lecanoromycetes", 'y': Lecanoromycetes }) : Lecanoromycetes = Lecanoromycetes;
    Blastocladiomycetes != 0 ? classs.push({ 'x': "Blastocladiomycetes", 'y': Blastocladiomycetes }) : Blastocladiomycetes = Blastocladiomycetes;
    Eurotiomycetes != 0 ? classs.push({ 'x': "Eurotiomycetes", 'y': Eurotiomycetes }) : Eurotiomycetes = Eurotiomycetes;
    Orbiliomycetes != 0 ? classs.push({ 'x': "Orbiliomycetes", 'y': Orbiliomycetes }) : Orbiliomycetes = Orbiliomycetes;
    Dacrymycetes != 0 ? classs.push({ 'x': "Dacrymycetes", 'y': Dacrymycetes }) : Dacrymycetes = Dacrymycetes;
    Lichinomycetes != 0 ? classs.push({ 'x': "Lichinomycetes", 'y': Lichinomycetes }) : Lichinomycetes = Lichinomycetes;
    Exobasidiomycetes != 0 ? classs.push({ 'x': "Exobasidiomycetes", 'y': Exobasidiomycetes }) : Exobasidiomycetes = Exobasidiomycetes;
    unknown1 != 0 ? classs.push({ 'x': "unknown", 'y': unknown1 }) : unknown1 = unknown1;

    barClasss = new BarChart({
      'parentElement': '#barChart2',
      'containerHeight': 350,
      'containerWidth': 600
    }, classs);
    barClasss.tp = "#tooltipBarChart2";
    barClasss.svg.append("text")
      // .attr("class", "y 5abel")
      .attr("text-anchor", "middle")
      .attr("x", (barClasss.width / 2) + 50
      )
      .attr("y", 350)
      .text('specimens');
    barClasss.svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -(barClasss.height / 2))
      .attr("y", 15)
      .style("text-anchor", "middle")
      .text('count of specimens collected');
    barClasss.svg.append("text")
      .attr("x", barClasss.width / 2 + 50)
      .attr("y", 15)
      .attr("text-anchor", "middle")
      .style("font-size", "20px")
      .text('number of specimens in each class');

    keysAll1 = [];
    data.forEach(d => {
      keysAll1.push(d.recordedBy)
    });
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }
    keys1 = keysAll1.filter(onlyUnique);
    // Initialize chart and then show it
    let redorder = [];
    for (let i = 0; i < keys1.length; i++) {
      let count = 0;
      data.forEach(d => {

        if (keys1[i] == d.recordedBy) {
          count += 1;
        }
      });

      if (redorder.length < 10) {
        redorder.push({ 'x': keys1[i], 'y': count })

      } else {
        let miin = 100000;
        let index = 0;
        for (let k = 0; k < redorder.length; k++) {
          if (miin > redorder[k].x) {
            miin = redorder[k].x;
            index = k;
          }
        }
        if (miin < count) {
          redorder.splice(index, 1)
          redorder.push({ 'x': keys1[i], 'y': count })

        }
      }

    }

    barRecordedBy = new BarChart({
      'parentElement': '#barChart3',
      'containerHeight': 350,
      'containerWidth': 600
    }, redorder);
    barRecordedBy.tp = "#tooltipBarChart3";

    barRecordedBy.svg.append("text")
      // .attr("class", "y 5abel")
      .attr("text-anchor", "middle")
      .attr("x", (barRecordedBy.width / 2) + 50)
      .attr("y", 350)
      .text('Recorded by');
    barRecordedBy.svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -(barRecordedBy.height / 2))
      .attr("y", 15)
      .style("text-anchor", "middle")
      .text('number of specimens in each person collected');
    barRecordedBy.svg.append("text")
      .attr("x", barRecordedBy.width / 2 + 50)
      .attr("y", 15)
      .attr("text-anchor", "middle")
      .style("font-size", "20px")
      .text('top 10 recoders of evidence');

    let withCoords = [];
    let yes = 0;
    let no = 0;
    data.forEach(d => {

      if (d.decimalLatitude == "" || d.decimalLongitude == "") {
        no += 1;
      }
      else {
        yes += 1;
      }
    });
    withCoords.push({ 'key': 'Yes', 'value': yes })
    withCoords.push({ 'key': 'No', 'value': no })


    pieCoords = new PieChart({
      'parentElement': '#pieChart1',
      'containerHeight': 350,
      'containerWidth': 350
    }, withCoords);
    pieCoords.tp = "#tooltipPieChart1";

    pieCoords.svg.append("text")
      .attr("x", pieCoords.width / 2)
      .attr("y", 15)
      .attr("text-anchor", "middle")
      .style("font-size", "20px")
      .text('Do they have coordinates?');

    let withEventDate = [];
    let yes1 = 0;
    let no1 = 0;
    data.forEach(d => {

      if (d.eventDate == "") {
        no1 += 1;
      }
      else {
        yes1 += 1;
      }
    });
    withEventDate.push({ 'key': 'Yes', 'value': yes1 })
    withEventDate.push({ 'key': 'No', 'value': no1 })


    pieEvent = new PieChart({
      'parentElement': '#pieChart2',
      'containerHeight': 350,
      'containerWidth': 350
    }, withCoords);
    pieEvent.tp = "#tooltipPieChart2";
    pieEvent.svg.append("text")
      .attr("x", pieEvent.width / 2)
      .attr("y", 15)
      .attr("text-anchor", "middle")
      .style("font-size", "20px")
      .text('Do they have event dates?');




    //initial coloring by year because it's the first field in the dropdown
    //can be changed
    leafletMap = new LeafletMap({
      parentElement: '#my-map',
      colorBy: 'year'
    }, data);
    // leafletMap.bounders();
    console.log('emma')

    let focusContextVis = new FocusContextVis({ parentElement: '#chart_year', limits: '1820, 2020' }, data);
    focusContextVis.updateVis();
    let focusContextVis2 = new FocusContextVis({ parentElement: '#chart_days', limits: '0, 365' }, data);
    focusContextVis2.updateVis();
  })


  .catch(error => console.error(error));

function yearChange() {


  d3.csv('data/data-sample2.csv')
    .then(data => {
      let years;
      let dd = document.getElementById('colors').value

      var node = document.getElementById('values');
      //an array of the years we want to filter
      years = node.innerHTML.split(',')
      leafletMap.renderVis(years, dd);

      maxYear = years[1];
      minYear = years[0];
      minYear = +minYear;
      maxYear = +maxYear;
      if (minYear < maxYear) {
        let jan1 = 0;
        let feb1 = 0;
        let march1 = 0;
        let april1 = 0;
        let may1 = 0;
        let jun1 = 0;
        let jul1 = 0;
        let aug1 = 0;
        let sept1 = 0;
        let nov1 = 0;
        let oct1 = 0;
        let dec1 = 0;
        let unknown2 = 0;

        let timeYear1 = []
        data.filter(d => d.year < maxYear + 1).filter(d => d.year > minYear - 1).forEach(d => {
          d.year = +d.year;
          switch (d.month) {
            case '1':
              jan1 = jan1 + 1;
              break;
            case '2':
              feb1 = feb1 + 1;
              break;
            case '3':
              march1 = march1 + 1;
              break;
            case '4':
              april1 = april1 + 1;
              break;
            case '5':
              may1 = may1 + 1;
              break;
            case '6':
              jun1 = jun1 + 1;
              break;
            case '7':
              jul1 = jul1 + 1;
              break;
            case '8':
              aug1 = aug1 + 1;
              break;
            case '9':
              sept1 = sept1 + 1;
              break;
            case '10':
              oct1 = oct1 + 1;
              break;
            case '11':
              nov1 = nov1 + 1;
              break;
            case '12':
              dec1 = dec1 + 1;
              break;
            case "null":
              unknown2 = unknown2 + 1;
              break;
            default:
              unknown2 = unknown2 + 1;
              break;
          }
        })

        jan1 != 0 ? timeYear1.push({ 'x': "Jan", 'y': jan1 }) : jan1 = jan1;
        feb1 != 0 ? timeYear1.push({ 'x': "Feb", 'y': feb1 }) : feb1 = feb1;
        march1 != 0 ? timeYear1.push({ 'x': "March", 'y': march1 }) : march1 = march1;
        april1 != 0 ? timeYear1.push({ 'x': "April", 'y': april1 }) : april1 = april1;
        may1 != 0 ? timeYear1.push({ 'x': "May", 'y': may1 }) : may1 = may1;
        jun1 != 0 ? timeYear1.push({ 'x': "Jun", 'y': jun1 }) : jun1 = jun1;
        jul1 != 0 ? timeYear1.push({ 'x': "Jul", 'y': jul1 }) : jul1 = jul1;
        aug1 != 0 ? timeYear1.push({ 'x': "Aug", 'y': aug1 }) : aug1 = aug1;
        sept1 != 0 ? timeYear1.push({ 'x': "Spt", 'y': sept1 }) : sept1 = sept1;
        oct1 != 0 ? timeYear1.push({ 'x': "Oct", 'y': oct1 }) : oct1 = oct1;
        nov1 != 0 ? timeYear1.push({ 'x': "Nov", 'y': nov1 }) : nov1 = nov1;
        dec1 != 0 ? timeYear1.push({ 'x': "Dec", 'y': dec1 }) : dec1 = dec1;
        unknown2 != 0 ? timeYear1.push({ 'x': "Unk", 'y': unknown2 }) : unknown2 = unknown2;

        barTimeYear.data = timeYear1;
        barTimeYear.updateVis();

        let Myxomycetes1 = 0;
        let Sordariomycetes1 = 0;
        let Agaricomycetes1 = 0;
        let Ustilaginomycetes1 = 0;
        let Tremellomycetes1 = 0;
        let Taphrinomycetes1 = 0;
        let Pucciniomycetes1 = 0;
        let Dothideomycetes1 = 0;
        let Myxogastrea1 = 0;
        let Pezizomycetes1 = 0;
        let Leotiomycetes1 = 0;
        let Chytridiomycetes1 = 0;
        let Oomycetes1 = 0;
        let Lecanoromycetes1 = 0;
        let Blastocladiomycetes1 = 0;
        let Eurotiomycetes1 = 0;
        let Orbiliomycetes1 = 0;
        let Dacrymycetes1 = 0;
        let Lichinomycetes1 = 0;
        let Exobasidiomycetes1 = 0;
        let unknown12 = 0;

        let classs1 = [];
        data.filter(d => d.year < maxYear + 1).filter(d => d.year > minYear - 1).forEach(d => {
          switch (d.class) {
            case 'Myxomycetes':
              Myxomycetes1 = Myxomycetes1 + 1;
              break;
            case 'Sordariomycetes':
              Sordariomycetes1 = Sordariomycetes1 + 1;
              break;
            case 'Agaricomycetes':
              Agaricomycetes1 = Agaricomycetes1 + 1;
              break;
            case 'Ustilaginomycetes':
              Ustilaginomycetes1 = Ustilaginomycetes1 + 1;
              break;
            case 'Tremellomycetes':
              Tremellomycetes1 = Tremellomycetes1 + 1;
              break;
            case 'Taphrinomycetes':
              Taphrinomycetes1 = Taphrinomycetes1 + 1;
              break;
            case 'Pucciniomycetes':
              Pucciniomycetes1 = Pucciniomycetes1 + 1;
              break;
            case 'Pezizomycetes':
              Pezizomycetes1 = Pezizomycetes1 + 1;
              break;
            case 'Dothideomycetes':
              Dothideomycetes1 = Dothideomycetes1 + 1;
              break;
            case 'Myxogastrea':
              Myxogastrea1 = Myxogastrea1 + 1;
              break;
            case 'Leotiomycetes':
              Leotiomycetes1 = Leotiomycetes1 + 1;
              break;
            case 'Chytridiomycetes':
              Chytridiomycetes1 = Chytridiomycetes1 + 1;
              break;
            case 'Oomycetes':
              Oomycetes1 = Oomycetes1 + 1;
              break;
            case 'Lecanoromycetes':
              Lecanoromycetes1 = Lecanoromycetes1 + 1;
              break;
            case 'Blastocladiomycetes':
              Blastocladiomycetes1 = Blastocladiomycetes1 + 1;
              break;
            case 'Eurotiomycetes':
              Eurotiomycetes1 = Eurotiomycetes1 + 1;
              break;
            case 'Orbiliomycetes':
              Orbiliomycetes1 = Orbiliomycetes1 + 1;
              break;
            case 'Dacrymycetes':
              Dacrymycetes1 = Dacrymycetes1 + 1;
              break;
            case 'Lichinomycetes':
              Lichinomycetes1 = Lichinomycetes1 + 1;
              break;
            case 'Exobasidiomycetes':
              Exobasidiomycetes1 = Exobasidiomycetes1 + 1;
              break;
            case "":
              unknown12 = unknown12 + 1;
              break;
            default:
              unknown12 = unknown12 + 1;
              break;
          }
        });
        Myxomycetes1 != 0 ? classs1.push({ 'x': "Myxomycetes", 'y': Myxomycetes1 }) : Myxomycetes1 = Myxomycetes1;
        Sordariomycetes1 != 0 ? classs1.push({ 'x': "Sordariomycetes", 'y': Sordariomycetes1 }) : Sordariomycetes1 = Sordariomycetes1;
        Agaricomycetes1 != 0 ? classs1.push({ 'x': "Agaricomycetes", 'y': Agaricomycetes1 }) : Agaricomycetes1 = Agaricomycetes1;
        Ustilaginomycetes1 != 0 ? classs1.push({ 'x': "Ustilaginomycetes", 'y': Ustilaginomycetes1 }) : Ustilaginomycetes1 = Ustilaginomycetes1;
        Tremellomycetes1 != 0 ? classs1.push({ 'x': "Tremellomycetes", 'y': Tremellomycetes1 }) : Tremellomycetes1 = Tremellomycetes1;
        Taphrinomycetes1 != 0 ? classs1.push({ 'x': "Taphrinomycetes", 'y': Taphrinomycetes1 }) : Taphrinomycetes1 = Taphrinomycetes1;
        Pucciniomycetes1 != 0 ? classs1.push({ 'x': "Pucciniomycetes", 'y': Pucciniomycetes1 }) : Pucciniomycetes1 = Pucciniomycetes1;
        Pezizomycetes1 != 0 ? classs1.push({ 'x': "Pezizomycetes", 'y': Pezizomycetes1 }) : Pezizomycetes1 = Pezizomycetes1;
        Dothideomycetes1 != 0 ? classs1.push({ 'x': "Dothideomycetes", 'y': Dothideomycetes1 }) : Dothideomycetes1 = Dothideomycetes1;
        Myxogastrea1 != 0 ? classs1.push({ 'x': "Myxogastrea", 'y': Myxogastrea1 }) : Myxogastrea1 = Myxogastrea1;
        Leotiomycetes1 != 0 ? classs1.push({ 'x': "Leotiomycetes", 'y': Leotiomycetes1 }) : Leotiomycetes1 = Leotiomycetes1;
        Chytridiomycetes1 != 0 ? classs1.push({ 'x': "Chytridiomycetes", 'y': Chytridiomycetes1 }) : Chytridiomycetes1 = Chytridiomycetes1;
        Oomycetes1 != 0 ? classs1.push({ 'x': "Oomycetes", 'y': Oomycetes1 }) : Oomycetes1 = Oomycetes1;
        Lecanoromycetes1 != 0 ? classs1.push({ 'x': "Lecanoromycetes", 'y': Lecanoromycetes1 }) : Lecanoromycetes1 = Lecanoromycetes1;
        Blastocladiomycetes1 != 0 ? classs1.push({ 'x': "Blastocladiomycetes", 'y': Blastocladiomycetes1 }) : Blastocladiomycetes1 = Blastocladiomycetes1;
        Eurotiomycetes1 != 0 ? classs1.push({ 'x': "Eurotiomycetes", 'y': Eurotiomycetes1 }) : Eurotiomycetes1 = Eurotiomycetes1;
        Orbiliomycetes1 != 0 ? classs1.push({ 'x': "Orbiliomycetes", 'y': Orbiliomycetes1 }) : Orbiliomycetes1 = Orbiliomycetes1;
        Dacrymycetes1 != 0 ? classs1.push({ 'x': "Dacrymycetes", 'y': Dacrymycetes1 }) : Dacrymycetes1 = Dacrymycetes1;
        Lichinomycetes1 != 0 ? classs1.push({ 'x': "Lichinomycetes", 'y': Lichinomycetes1 }) : Lichinomycetes1 = Lichinomycetes1;
        Exobasidiomycetes1 != 0 ? classs1.push({ 'x': "Exobasidiomycetes", 'y': Exobasidiomycetes1 }) : Exobasidiomycetes1 = Exobasidiomycetes1;
        unknown12 != 0 ? classs1.push({ 'x': "unknown", 'y': unknown12 }) : unknown12 = unknown12;
        barClasss.data = classs1;
        barClasss.updateVis();

        keysAll12 = [];
        data.filter(d => d.year < maxYear + 1).filter(d => d.year > minYear - 1).forEach(d => {
          keysAll12.push(d.recordedBy);
        });
        function onlyUnique(value, index, self) {
          return self.indexOf(value) === index;
        }
        keys12 = keysAll12.filter(onlyUnique);
        // Initialize chart and then show it
        let redorder2 = [];
        for (let i = 0; i < keys1.length; i++) {
          let count2 = 0;
          data.filter(d => d.year < maxYear + 1).filter(d => d.year > minYear - 1).forEach(d => {
            if (keys12[i] == d.recordedBy) {
              count2 += 1;
            }
          });

          if (redorder2.length < 10) {
            redorder2.push({ 'x': keys12[i], 'y': count2 })
          } else {
            let miin2 = 100000;
            let index2 = 0;
            for (let k = 0; k < redorder2.length; k++) {
              if (miin2 > redorder2[k].x) {
                miin2 = redorder2[k].x;
                index2 = k;
              }
            }
            if (miin2 < count2) {
              redorder2.splice(index2, 1)
              redorder2.push({ 'x': keys12[i], 'y': count2 })

            }
          }
        }
        barRecordedBy.data = redorder2;
        barRecordedBy.updateVis();

        let withCoords2 = [];
        let yes2 = 0;
        let no2 = 0;
        data.filter(d => d.year < maxYear + 1).filter(d => d.year > minYear - 1).forEach(d => {

          if (d.decimalLatitude == "" || d.decimalLongitude == "") {
            no2 += 1;
          }
          else {
            yes2 += 1;
          }
        });
        yes2 != 0 ? withCoords2.push({ 'key': 'Yes', 'value': yes2 }) : yes2 = yes2;
        no2 != 0 ? withCoords2.push({ 'key': 'No', 'value': no2 }) : no2 = no2;

        pieCoords.data = withCoords2;
        pieCoords.updateVis();

        let withEventDate2 = [];
        let yes12 = 0;
        let no12 = 0;
        data.filter(d => d.year < maxYear + 1).filter(d => d.year > minYear - 1).forEach(d => {

          if (d.eventDate == "") {
            no12 += 1;
          }
          else {
            yes12 += 1;
          }
        });
        yes12 != 0 ? withEventDate2.push({ 'key': 'Yes', 'value': yes12 }) : yes12 = yes12;
        no12 != 0 ? withEventDate2.push({ 'key': 'No', 'value': no12 }) : no12 = no12;

        pieEvent.data = withEventDate2;
        pieEvent.updateVis();
      }
    });

}

function areaChange(){
  //this is changes based on brushing the map

}
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
      leafletMap.renderVis([], ddl1.value);
    })


}


function createOption(ddl, text, value) {
  var opt = document.createElement('option');
  opt.value = value;
  opt.text = text;
  ddl.options.add(opt);
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
