class LeafletMap {

  /**
   * Class constructor with basic configuration
   * @param {Object}
   * @param {Array}
   */
  constructor(_config, _data) {
    this.config = {
      parentElement: _config.parentElement,
      colorBy: _config.colorBy
    }
    this.data = _data;
    this.initVis();
  }

  /**
   * We initialize scales/axes and append static elements, such as axis titles.
   */
  initVis() {
    let vis = this;


    //ESRI
    vis.esriUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    vis.esriAttr = 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';

    //TOPO
    vis.topoUrl = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
    vis.topoAttr = 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'

    //Thunderforest Outdoors- requires key... so meh... 
    vis.thOutUrl = 'https://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey={apikey}';
    vis.thOutAttr = '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

    //Stamen Terrain
    vis.stUrl = 'https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}';
    vis.stAttr = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

    //this is the base map layer, where we are showing the map background
    vis.base_layer = L.tileLayer(vis.esriUrl, {
      id: 'esri-image',
      attribution: vis.esriAttr,
      ext: 'png'
    });

    vis.theMap = L.map('my-map', {
      center: [30, 0],
      zoom: 2,
      selectArea: true,
      layers: [vis.base_layer]
    });
    vis.colorScale = d3.scaleSequential()
      .interpolator(d3.interpolateViridis);

    vis.theMap.on('areaselected', (e) => {
      console.log(e.bounds.toBBoxString()); // lon, lat, lon, lat
      var node = document.getElementById('box_dims');
      var newNode = document.createElement('p');

      newNode.setAttribute("id", "box_vals");

      node.innerHTML = ""
      newNode.appendChild(document.createTextNode(e.bounds.toBBoxString()));
      node.appendChild(newNode);

      node.onchange();
    });

    // You can restrict selection area like this:
    const bounds = vis.theMap.getBounds().pad(-0.25); // save current map bounds as restriction area
    // check restricted area on start and move
    vis.theMap.selectArea.setValidate((layerPoint) => {
      return bounds.contains(
        this._map.layerPointToLatLng(layerPoint)
      );
    });

    // now switch it off
    vis.theMap.selectArea.setValidate();


    // dragging will be enabled and you can
    // start selecting with Ctrl key pressed
    // vis.theMap.selectArea.setCtrlKey(true);

    // box-zoom will be disabled and you can
    // start selecting with Shift key pressed
    // vis.theMap.selectArea.setCtrlKey(true);





    let year_null = vis.data.filter(d => d.year != 'null'),
      startDay_null = vis.data.filter(d => d.startDayOfYear != 'null');
    switch (vis.config.colorBy) {
      case 'year':
        vis.colorScale = d3.scaleSequential()
          .interpolator(d3.interpolateViridis);
        let minYear = d3.min(year_null, d => d.year),
          maxYear = d3.max(year_null, d => d.year);
        vis.colorScale.domain([1850, 2017]);
        break;
      case 'startDayofYear':
        vis.colorScale = d3.scaleSequential()
          .interpolator(d3.interpolateViridis);
        let firstStartDay = d3.min(startDay_null, d => parseInt(d.startDayOfYear))
          , lastStartDay = d3.max(startDay_null, d => parseInt(d.startDayOfYear))
        vis.colorScale.domain([1, 365]);
        break;
      case 'class':
        vis.colorScale = d3.scaleOrdinal(d3.schemeTableau10);
        vis.colorScale.domain(['Myxomycetes', 'Sordariomycetes', 'Dothideomycetes', 'Myxogastrea', 'Leotiomycetes', 'Pucciniomycetes', 'Chytridiomycetes', 'Agaricomycetes', 'Oomycetes', 'Lecanoromycetes', 'Blastocladiomycetes', 'Eurotiomycetes', 'Pezizomycetes', 'Orbiliomycetes', 'Taphrinomycetes', 'Tremellomycetes', 'Dacrymycetes', 'Lichinomycetes', 'Exobasidiomycetes', 'Ustilaginomycetes'])
        break;
      default:
        break;
    }


    //if you stopped here, you would just have a map

    //initialize svg for d3 to add to map
    L.svg({ clickable: true }).addTo(vis.theMap)// we have to make the svg layer clickable
    vis.overlay = d3.select(vis.theMap.getPanes().overlayPane)
    vis.svg = vis.overlay.select('svg').attr("pointer-events", "auto")

    //these are the city locations, displayed as a set of dots 
    vis.Dots = vis.svg.selectAll('circle')
      .data(vis.data)
      .join('circle')
      .attr("fill", d => vis.colorScale(d.year))
      .attr("stroke", "black")
      //Leaflet has to take control of projecting points. Here we are feeding the latitude and longitude coordinates to
      //leaflet so that it can project them on the coordinates of the view. Notice, we have to reverse lat and lon.
      //Finally, the returned conversion produces an x and y point. We have to select the the desired one using .x or .y
      .attr("cx", d => vis.theMap.latLngToLayerPoint([d.latitude, d.longitude]).x)
      .attr("cy", d => vis.theMap.latLngToLayerPoint([d.latitude, d.longitude]).y)
      .attr("r", 6)
      .on('mouseover', function (event, d) { //function to add mouseover event
        d3.select(this).transition() //D3 selects the object we have moused over in order to perform operations on it
          .duration('150') //how long we are transitioning between the two states (works like keyframes)
          .attr("fill", "red") //change the fill
          .attr('r', 4); //change radius

        //create a tool tip
        d3.select('#tooltip')
          .style('opacity', 1)
          .style('z-index', 1000000)
          // Format number with million and thousand separator
          .html(`<div class="tooltip-label">Name: ${d.scientificName},  ${d.county}</div>`);

      })
      .on('mousemove', (event) => {
        //position the tooltip
        d3.select('#tooltip')
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY + 10) + 'px');
      })
      .on('mouseleave', function () { //function to add mouseover event
        d3.select(this).transition() //D3 selects the object we have moused over in order to perform operations on it
          .duration('150') //how long we are transitioning between the two states (works like keyframes)
          .attr("fill", "steelblue") //change the fill
          .attr('r', 3) //change radius

        d3.select('#tooltip').style('opacity', 0);//turn off the tooltip

      })
      .on('click', (event, d) => { //experimental feature I was trying- click on point and then fly to it
        // vis.newZoom = vis.theMap.getZoom()+2;
        // if( vis.newZoom > 18)
        //  vis.newZoom = 18; 
        // vis.theMap.flyTo([d.latitude, d.longitude], vis.newZoom);
      });

    //handler here for updating the map, as you zoom in and out  

    vis.theMap.on("zoomend", function () {
      vis.updateVis();
    });

  }

  updateVis() {
    let vis = this;

    //want to see how zoomed in you are? 
    // console.log(vis.map.getZoom()); //how zoomed am I

    //want to control the size of the radius to be a certain number of meters? 
    vis.radiusSize = 3;
    // if( vis.theMap.getZoom > 15 ){
    //   metresPerPixel = 40075016.686 * Math.abs(Math.cos(map.getCenter().lat * Math.PI/180)) / Math.pow(2, map.getZoom()+8);
    //   desiredMetersForPoint = 100; //or the uncertainty measure... =) 
    //   radiusSize = desiredMetersForPoint / metresPerPixel;
    // }

    //redraw based on new zoom- need to recalculate on-screen position

    let color = document.getElementById('colors').value

    vis.Dots
      .attr("cx", d => vis.theMap.latLngToLayerPoint([d.latitude, d.longitude]).x)
      .attr("cy", d => vis.theMap.latLngToLayerPoint([d.latitude, d.longitude]).y)
      .attr("fill", function (d) {
        if (color == 'year') {

          return vis.colorScale(d.year);
        }
        if (color == 'startDayofYear') {
          return vis.colorScale(d.startDayOfYear)
        }
        if (color == 'class') {
          return vis.colorScale(d.class)
        }
      })
      .attr("r", vis.radiusSize);

  }


  renderVis(param, color) {
    let vis = this;

    let data = vis.data;
    var svg = d3.select("svg.leaflet-zoom-animated");
    svg.selectAll("*").remove();
    // vis.data =  vis.data.filter(d => d.year != 'null');

    // class_null = vis.data.filter(d => d.class != 'null'),
    // startDay_null = vis.data.filter(d => d.startDayOfYear != 'null');

    vis.colorScale = d3.scaleSequential()
      .interpolator(d3.interpolateViridis);

    if (param.length > 0 && param[0] < param[1]) {
      data = data.filter(d => d.year >= param[0]);
      data = data.filter(d => d.year <= param[1]);
    }
    switch (color) {
      case 'year':
        vis.colorScale = d3.scaleSequential()
          .interpolator(d3.interpolateViridis);
        // let minYear = d3.min(year_null, d => d.year),
        // maxYear = d3.max(year_null, d => d.year);
        //years are lexicographically increasing so no need to hardcode
        vis.colorScale.domain([1850, 2017]);
        break;
      case 'startDayofYear':
        vis.colorScale = d3.scaleSequential()
          .interpolator(d3.interpolateViridis);
        // let firstStartDay = d3.min(startDay_null, d => d.startDayOfYear)
        // , lastStartDay = d3.max(startDay_null, d => d.startDayOfYear)
        // 364 string is less than 99 so hardcoded these
        vis.colorScale.domain([1, 365]);
        break;
      case 'class':
        vis.colorScale = d3.scaleOrdinal(d3.schemeTableau10);
        vis.colorScale.domain(['Myxomycetes', 'Sordariomycetes', 'Dothideomycetes', 'Myxogastrea', 'Leotiomycetes', 'Pucciniomycetes', 'Chytridiomycetes', 'Agaricomycetes', 'Oomycetes', 'Lecanoromycetes', 'Blastocladiomycetes', 'Eurotiomycetes', 'Pezizomycetes', 'Orbiliomycetes', 'Taphrinomycetes', 'Tremellomycetes', 'Dacrymycetes', 'Lichinomycetes', 'Exobasidiomycetes', 'Ustilaginomycetes'])
        break;
      default:
        break;
    }

    //if you stopped here, you would just have a map


    //these are the city locations, displayed as a set of dots 
    vis.Dots = vis.svg.selectAll('circle')
      .data(data)
      .join('circle')
      .attr("fill", function (d) {
        if (color == 'year') {

          return vis.colorScale(d.year);
        }
        if (color == 'startDayofYear') {
          return vis.colorScale(d.startDayOfYear)
        }
        if (color == 'class') {
          return vis.colorScale(d.class)
        }
      })
      .attr("stroke", "black")
      //Leaflet has to take control of projecting points. Here we are feeding the latitude and longitude coordinates to
      //leaflet so that it can project them on the coordinates of the view. Notice, we have to reverse lat and lon.
      //Finally, the returned conversion produces an x and y point. We have to select the the desired one using .x or .y
      .attr("cx", d => vis.theMap.latLngToLayerPoint([d.latitude, d.longitude]).x)
      .attr("cy", d => vis.theMap.latLngToLayerPoint([d.latitude, d.longitude]).y)
      .attr("r", 6)
      .on('mouseover', function (event, d) { //function to add mouseover event
        d3.select(this).transition() //D3 selects the object we have moused over in order to perform operations on it
          .duration('150') //how long we are transitioning between the two states (works like keyframes)
          .attr("fill", "red") //change the fill
          .attr('r', 4); //change radius

        //create a tool tip
        d3.select('#tooltip')
          .style('opacity', 1)
          .style('z-index', 1000000)
          // Format number with million and thousand separator
          .html(`<div class="tooltip-label">Name: ${d.scientificName},  ${d.county}</div>`);

      })
      .on('mousemove', (event) => {
        //position the tooltip
        d3.select('#tooltip')
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY + 10) + 'px');
      })
      .on('mouseleave', function () { //function to add mouseover event
        d3.select(this).transition() //D3 selects the object we have moused over in order to perform operations on it
          .duration('150') //how long we are transitioning between the two states (works like keyframes)
          .attr("fill", function (d) {
            if (color == 'year') {

              return vis.colorScale(d.year);
            }
            if (color == 'startDayofYear') {
              return vis.colorScale(d.startDayOfYear)
            }
            if (color == 'class') {
              return vis.colorScale(d.class)
            }
          })
          .attr('r', 8) //change radius

        d3.select('#tooltip').style('opacity', 0);//turn off the tooltip

      })
      .on('click', (event, d) => { //experimental feature I was trying- click on point and then fly to it
        // vis.newZoom = vis.theMap.getZoom()+2;
        // if( vis.newZoom > 18)
        //  vis.newZoom = 18; 
        // vis.theMap.flyTo([d.latitude, d.longitude], vis.newZoom);
      });

  }
}