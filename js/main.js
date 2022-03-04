


//d3.csv('data/worldcities.csv')
d3.csv('data/data-sample2.csv')
.then(data => {
    data.forEach(d => {
      console.log(d);
      if(d.decimalLatitude == "null" || d.decimalLongitude == "null"||d.year =="null")
      {
        d.latitude = 99999999999999;
        d.longitude = 99999999999999;
        d.year = null;
      }
      else{
      d.latitude = +d.decimalLatitude; //make sure these are not strings
      d.longitude = +d.decimalLongitude; //make sure these are not strings
      d.year = +d.year;
      }
    });

    console.log(data);//ok, got my data!

    // Initialize chart and then show it
    leafletMap = new LeafletMap({ parentElement: '#my-map'}, data);


  })
  .catch(error => console.error(error));
