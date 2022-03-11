class BarChart {
    constructor(_config, _data) {
        this.config = {
            parentElement: _config.parentElement,
            containerWidth: _config.containerWidth || 500,
            containerHeight: _config.containerHeight || 200,
            margin: { top: 10, bottom: 30, right: 50, left: 50 }
        }
        this.data = _data;
        console.log(this.data);
        //console.log(this.data2);
        // Call a class function
        this.ylabel;
        this.title;
        this.initVis();
    }
    initVis() {
        let vis = this;
        console.log(vis.data);
        vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
        vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;

        vis.xValue = d => d.x;
        vis.yValue = d => d.y;
        vis.tp = '#tooltip';

        vis.xScale = d3
            .scaleBand()
            .range([0, vis.width])
            .domain(vis.data.map(function(d) { return d.x; }))
            .paddingInner(0.2)
            .paddingOuter(0.2);
        // vis.yScale = d3.scaleLinear()
        //     .domain([0, d3.max(vis.data, vis.yValue)])
        //     .range([vis.height, 0])
        //     .nice();
        //     console.log(vis.yScale);
        vis.yScale = d3.scaleLinear().range([vis.height, 0])
            .domain([0, d3.max(vis.data, function (d) { return d.y; })]);


        vis.xAxis = d3.axisBottom(vis.xScale);
        vis.yAxis = d3.axisLeft(vis.yScale);
        vis.svg = d3.select(vis.config.parentElement)
            .attr('width', vis.config.containerWidth)
            .attr('height', vis.config.containerHeight);

        vis.chart = vis.svg.append('g')
            .attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top})`);
        vis.yAxisG = vis.chart.append('g')
            .attr('class', 'axis y-axis')
            .call(vis.yAxis);

        vis.xAxisG = vis.chart.append('g')
            .attr('class', 'axis x-axis')
            .attr('transform', `translate(0,${vis.height})`)
            .call(vis.xAxis);

        vis.updateVis();
    }

    updateVis() {

        let vis = this
        vis.chart.selectAll('.bar')
            .data(vis.data)
            .enter()
            .append('rect')
            //.attr('fill', d3.color('blue'))
           .attr("class", "bar")
            .attr('fill', d3.color('blue'))
            .attr('x', (s) => vis.xScale(s.x))
            .attr('y', (s) => vis.yScale(s.y))
            //.attr('height', 200)
            .attr('height', (s) =>  vis.height - vis.yScale(s.y) )
            .attr('width', vis.xScale.bandwidth());
    }

}
