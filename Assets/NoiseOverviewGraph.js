// Setting dimensions of the graph
let width = 934;
let height = 640;
let margin = [50, 60, 50, 60];
let svg = d3
    .select("#OverviewPlot")
    .append("svg")
    .attr("height", height)
    .attr("width", width);


// Loading data and main function    
d3.csv('SoundData/MasterSoundData.csv').then((data) => {

    // Selecting data for municipality of Miami
    let municipality = ["Miami"];

    // Scaling axes
    let xScale = d3
        .scaleLinear()
        .domain([35, 85])
        .range([margin[3], width - margin[1]]);

    let yScale = d3
        .scaleBand()
        .domain(municipality)
        .range([height - margin[2], margin[0]])
        .align(0.5)
        .paddingOuter(5000);
    
    // Creating x axis
    let xAxis = svg.append("g").attr("class", "BottomAxis");
    xAxis
        .attr("transform", "translate(0," + (height - margin[2]) + ")")
        .append("line")
        .attr("x1", margin[3])
        .attr("x2", width - margin[1])
        .attr("stroke", "rgba(0, 0, 0, 0.3)");
    
    // Creating horizontal reference line through middle of graph area
    /*let middleLine = svg.append("g").attr("class", "middleLine");
    middleLine
        .attr("transform", "translate(0," + (height/2) + ")")
        .append("line")
        .attr("x1", margin[3])
        .attr("x2", width - margin[1])
        .attr("stroke", "rgba(250, 50, 50, 1)");*/

    // Creating tick labels    
    let xAxisTicks = svg.append("g").attr("class", "xAxisTicks")
    xScale.ticks(6).forEach((tick) => {
        // Code below is for vertical grid lines
        /*xAxisTicks
            .append("line")
            .attr("x1", xScale(tick))
            .attr("x2", xScale(tick))
            .attr("y1", height - margin[2])
            .attr("y2", margin[0])
            .attr("stroke", "rgba(0,0,0,0.15)"); */

        xAxisTicks
            .append("text")
            .attr("x", xScale(tick))
            .attr("y", height - margin[2] + 20)
            .attr("text-anchor", "middle")
            .text(tick);
    });

    // Graph Title
    let overviewTitle = svg.append("text").attr("class", "graphTitle")
    overviewTitle
        .attr("x", width/2)
        .attr("y", margin[0] - 25)
        .attr("text-anchor", "middle")
        .text("Miami's Sound Cloud");
    
    // X Axis Label
    const xAxisLabel = svg.append("text").attr("class", "axisLabel")
    xAxisLabel
        .attr("x", width/2)
        .attr("y", height)
        .attr("text-anchor", "middle")
        .text("Decibel Level");
    
    // Visualizing Data
    let jitterWidth = 100;
    svg.selectAll("overviewPoints")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "overviewPoints")
        .attr("fill", "rgba(0, 0, 0, 0.15)")
        .attr("r", 3)
        .attr("cx", (d) => xScale(d["Decibel Level"]))
        .attr("cy", (d) => yScale(d.Municipality) + (Math.random()-0.5)*2*jitterWidth)
});
