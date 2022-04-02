class FocusContextVis {

  /**
   * Class constructor with basic chart configuration
   * @param {Object}
   * @param {Array}
   */
  constructor(_config, _data, _bardata = NaN) {
    this.config = {
      parentElement: _config.parentElement,
      width: 800,
      height: 240,
      contextHeight: 50,
      margin: { top: 10, right: 10, bottom: 100, left: 45 },
      contextMargin: { top: 280, right: 10, bottom: 20, left: 45 },
      limits: _config.limits
    }
    this.data = _data;
    this.bardata = _bardata;
    this.initVis();
  }

  /**
   * Initialize scales/axes and append static chart elements
   */
  initVis() {
    let vis = this;

    const containerWidth = 800;
    const containerHeight = 400;

    //position on pages
    // vis.xScaleFocus = d3.scaleLinear()
    //     .range([100, vis.config.width]);

    let lim = vis.config.limits.split(',');
    vis.xScaleContext = d3.scaleLinear()
      .domain([lim[0], lim[1]])
      .range([0, vis.config.width - 30]);

    // vis.yScaleFocus = d3.scaleLinear()
    //     .range([vis.config.height, 0])
    //     .nice();

    vis.yScaleContext = d3.scaleLinear()
      .range([vis.config.contextHeight, 0])
      .nice();

    // Initialize axes
    vis.xAxisFocus = d3.axisBottom(vis.xScaleFocus).tickSizeOuter(0);
    vis.xAxisContext = d3.axisBottom(vis.xScaleContext).tickSizeOuter(0);
    // vis.yAxisFocus = d3.axisLeft(vis.yScaleFocus);

    // Define size of SVG drawing area
    vis.svg = d3.select(vis.config.parentElement)
      .attr('width', containerWidth)
      .attr('height', containerHeight);

    // Append focus group with x- and y-axes
    vis.focus = vis.svg.append('g')
      .attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top})`);

    vis.focus.append('defs').append('clipPath')
      .attr('id', 'clip')
      .append('rect')
      .attr('width', vis.config.width)
      .attr('height', vis.config.height);

    vis.focusLinePath = vis.focus.append('path')
      .attr('class', 'chart-line');

    vis.xAxisFocusG = vis.focus.append('g')
      .attr('class', 'axis x-axis')
      .attr('transform', `translate(0,${vis.config.height})`);

    vis.yAxisFocusG = vis.focus.append('g')
      .attr('class', 'axis y-axis');

    // vis.tooltipTrackingArea = vis.focus.append('rect')
    //     .attr('width', vis.config.width)
    //     .attr('height', vis.config.height)
    //     .attr('fill', 'none')
    //     .attr('pointer-events', 'all');

    // Empty tooltip group (hidden by default)
    // vis.tooltip = vis.focus.append('g')
    //     .attr('class', 'tooltip')
    //     .style('display', 'none');

    // vis.tooltip.append('circle')
    //     .attr('r', 4);

    // vis.tooltip.append('text');


    // Append context group with x- and y-axes
    vis.context = vis.svg.append('g')
      .attr('transform', `translate(${vis.config.contextMargin.left},${vis.config.contextMargin.top})`);

    vis.contextAreaPath = vis.context.append('path')
      .attr('class', 'chart-area');

    vis.xAxisContextG = vis.context.append('g')
      .attr('class', 'axis x-axis')
      .attr('transform', `translate(0,${vis.config.contextHeight})`);

    vis.brushG = vis.context.append('g')
      .attr('class', 'brush x-brush');


    // Initialize brush component
    vis.brush = d3.brushX()
      .extent([[0, 0], [vis.config.width, vis.config.contextHeight]])
      .on('brush', function ({ selection }) {
        if (selection) vis.brushed(selection);
      })
      .on('end', function ({ selection }) {
        if (!selection) vis.brushed(null);
      });
    
    vis.chart = vis.svg.append('g')
      .attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top})`);

    vis.tp = '#tooltipBarChart1';
  }

  /**
   * Prepare the data and scales before we render it.
   */
  updateVis() {
    let vis = this;

    vis.xValue = d => d.year;
    vis.yValue = d => d.year;

    var list = [];
    for (var i = 1820; i <= 2020; i++) {
      list.push(i);
    }

    vis.xScale = d3
      .scaleBand()
      .range([0, vis.config.width])
      .domain(list)
      .paddingInner(0.2)
      .paddingOuter(0.2);
    vis.yScale = d3
      .scaleLinear()
      .range([vis.config.height, 0])
      .domain([0, 1200]);

      
    vis.chart.selectAll('.bar')
      .data([])
      .exit().remove();
    // console.log(vis.xScale.bandwidth())

    // Initialize line and area generators
    // vis.line = d3.line()
    //     .x(d => vis.xScaleFocus(vis.xValue(d)))
    //     .y(d => vis.yScaleFocus(vis.yValue(d)));

    // vis.area = d3.area()
    //     .x(d => vis.xScaleContext(vis.xValue(d)))
    //     .y1(d => vis.yScaleContext(vis.yValue(d)))
    //     .y0(vis.config.contextHeight);

    // Set the scale input domains
    // vis.xScaleFocus.domain(d3.extent(vis.data, vis.xValue));
    // vis.yScaleFocus.domain(d3.extent(vis.data, vis.yValue));
    // vis.xScaleContext.domain(vis.xScaleFocus.domain());
    // vis.yScaleContext.domain(vis.yScaleFocus.domain());

    vis.chart.selectAll('.bar')
            .data(vis.bardata)
            .enter()
            .append('rect')
            .attr("class", "bar")
            .attr('fill', d3.color('blue'))
            .attr('x', (s) => vis.xScale(s.x))
            .attr('y', (s) => vis.yScale(s.y) + 80)
            .attr('height', (s) => vis.config.height - vis.yScale(s.y))
            .attr('width', vis.xScale.bandwidth())
            .on('mouseover', function (event, d) { 
        
                //create a tool tip
                d3.select('#tooltip')
                  .style('opacity', 1)
                  .style('z-index', 1000000)
                  .html(`
                  <div class="tooltip-title">Key: ${d.x}</div>
                  <ul>
                    <li> Value: ${d.y}</li>

                  </ul>
                `);
       
              })
              .on('mousemove', (event) => {
                //position the tooltip
                d3.select('#tooltip')
                  .style('left', (event.pageX + 10) + 'px')
                  .style('top', (event.pageY + 10) + 'px');
              })

    vis.bisectDate = d3.bisector(vis.xValue).left;

    vis.renderVis();
  }

  /**
   * This function contains the D3 code for binding data to visual elements
   */
  renderVis() {
    let vis = this;

    vis.focusLinePath
      .datum(vis.data)
      .attr('d', vis.line);

    /**
     * 
     * Shivam Comment Starts
     */

    // vis.contextAreaPath
    //     .datum(vis.data)
    //     .attr('d', vis.area);

    // vis.tooltipTrackingArea
    //     .on('mouseenter', () => {
    //       vis.tooltip.style('display', 'block');
    //     })
    //     .on('mouseleave', () => {
    //       vis.tooltip.style('display', 'none');
    //     })
    //     .on('mousemove', function(event) {
    //       // Get date that corresponds to current mouse x-coordinate
    //       const xPos = d3.pointer(event, this)[0]; // First array element is x, second is y
    //       const date = vis.xScaleFocus.invert(xPos);

    //       // Find nearest data point
    //       const index = vis.bisectDate(vis.data, date, 1);
    //       const a = vis.data[index - 1];
    //       const b = vis.data[index];
    //       const d = b && (date - a.date > b.date - date) ? b : a; 

    //       // Update tooltip
    //       vis.tooltip.select('circle')
    //           .attr('transform', `translate(${vis.xScaleFocus(d.date)},${vis.yScaleFocus(d.close)})`);

    //       vis.tooltip.select('text')
    //           .attr('transform', `translate(${vis.xScaleFocus(d.date)},${(vis.yScaleFocus(d.close) - 15)})`)
    //           .text(Math.round(d.close));
    //     });


    /**
   * 
   * Shivam Comment Ends
   */

    // Update the axes
    // vis.xAxisFocusG.call(vis.xAxisFocus);
    // vis.yAxisFocusG.call(vis.yAxisFocus);
    vis.xAxisContextG.call(vis.xAxisContext);

    // Update the brush and define a default position
    const defaultBrushSelection = [vis.xScaleContext(new Date('2020-01-01')), vis.xScaleContext.range()[1]];
    // console.log('this is ' + defaultBrushSelection)
    vis.brushG
      .call(vis.brush)
      .call(vis.brush.move, defaultBrushSelection);
  }

  /**
   * React to brush events
   */
  brushed(selection) {
    let vis = this;

    // Check if the brush is still active or if it has been removed
    if (selection) {
      // Convert given pixel coordinates (range: [x0,x1]) into a time period (domain: [Date, Date])
      const selectedDomain = selection.map(vis.xScaleContext.invert, vis.xScaleContext);
      let year_values = []
      year_values.push(parseInt(selectedDomain[0]))
      year_values.push(parseInt(selectedDomain[1]))
      // console.log(year_values)

      var node = document.getElementById('years');
      var newNode = document.createElement('p');

      newNode.setAttribute("id", "values");

      node.innerHTML = ""
      newNode.appendChild(document.createTextNode(year_values));
      node.appendChild(newNode);

      node.onchange();

      // Update x-scale of the focus view accordingly
      // vis.xScaleFocus.domain(year_values);
    } else {
      // Reset x-scale of the focus view (full time period)
      // vis.xScaleFocus.domain(vis.xScaleContext.domain());
    }

    // Redraw line and update x-axis labels in focus view
    vis.focusLinePath.attr('d', vis.line);
    // vis.xAxisFocusG.call(vis.xAxisFocus);
  }

}