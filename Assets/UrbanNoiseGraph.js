// Setting dimensions of the graph
const width3 = 934;
const height3 = 640;
const margin3 = [50, 60, 50, 60];
const svg3 = d3
    .select("#UrbanPlot")
    .append("svg")
    .attr("height", height3)
    .attr("width", width3);


// Loading data and main function    
d3.csv('SoundData/MasterSoundData.csv').then((data) => {

    // Creating urban subset
    const urban = data.filter((d) => d.Type === "Urban");

    // Selecting data for urban neighborhoods
    const urbanNeighborhoods = ["Brickell", "Downtown", "Edgewater", "Midtown",
                                "Omni", "Overtown", "Park West", "Wynwood"];

    // Scaling axes
    const xScale3 = d3
        .scaleLinear()
        .domain([35, 85])
        .range([margin3[3], width3 - 3*margin3[1]]);

    const yScale3 = d3
        .scaleBand()
        .domain(urbanNeighborhoods)
        .range([height3 - margin3[2], margin3[0]])
        .paddingOuter(1);
    
    // Creating x axis
    const xAxis3 = svg3.append("g").attr("class", "BottomAxis");
    xAxis3
        .attr("transform", "translate(0," + (height3 - margin3[2]) + ")")
        .append("line")
        .attr("x1", margin3[3])
        .attr("x2", width3 - margin3[1])
        .attr("stroke", "rgba(0, 0, 0, 0.3)");
    
    // Creating horizontal reference line through middle of graph area
    /*const middleLine3 = svg3.append("g").attr("class", "middleLine");
    middleLine3
        .attr("transform", "translate(0," + (height3/2) + ")")
        .append("line")
        .attr("x1", margin3[3])
        .attr("x2", width3 - margin3[1])
        .attr("stroke", "rgba(250, 50, 50, 1)");*/

    // Creating tick labels    
    const xAxisTicks3 = svg3.append("g").attr("class", "xAxisTicks")
    xScale3.ticks(6).forEach((tick) => {
        // Code below is for vertical grid lines
        /*xAxisTicks
            .append("line")
            .attr("x1", xScale(tick))
            .attr("x2", xScale(tick))
            .attr("y1", height - margin[2])
            .attr("y2", margin[0])
            .attr("stroke", "rgba(0,0,0,0.15)"); */

        xAxisTicks3
            .append("text")
            .attr("x", xScale3(tick))
            .attr("y", height3 - margin3[2] + 20)
            .attr("text-anchor", "middle")
            .text(tick);
    });

    // Creating Y Axis to display neighborhoods
    const yAxis3 = svg3.append("g").attr("class", "yAxis");

    // Creating Y axis labels    
    urbanNeighborhoods.forEach(neighborhood => {
        yAxis3
            .append("text")
            .attr("class", "yAxisLabels")
            .attr("x", (width3 - 3*margin2[3]))
            .attr("y", yScale3(neighborhood))
            .attr("text-anchor", "left")
            .text(neighborhood);
    });

    // Graph Title
    const urbanTitle = svg3.append("text").attr("class", "graphTitle")
    urbanTitle
        .attr("x", width3/2)
        .attr("y", margin3[0] - 25)
        .attr("text-anchor", "middle")
        .text("Urban Beat");

    // X Axis Label
    const urbanXAxisLabel = svg3.append("text").attr("class", "axisLabel")
    urbanXAxisLabel
        .attr("x", width3/2)
        .attr("y", height3)
        .attr("text-anchor", "middle")
        .text("Decibel Level");
    
    // Visualizing Data
    const jitterWidth3 = 7;
    svg3.selectAll("UrbanPoints")
        .data(urban)
        .enter()
        .append("circle")
        .attr("class", "UrbanPoints")
        .attr("fill", "rgba(0,0,0, 0.15)")
        .attr("r", 3)
        .attr("cx", (d) => xScale3(d["Decibel Level"]))
        .attr("cy", (d) => yScale3(d.Neighborhood) + (Math.random()-0.5)*2*jitterWidth3)
});
