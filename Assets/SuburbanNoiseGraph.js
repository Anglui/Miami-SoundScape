// Setting dimensions of the graph
const width2 = 934;
const height2 = 640;
const margin2 = [50, 60, 50, 60];
const svg2 = d3
    .select("#SuburbPlot")
    .append("svg")
    .attr("height", height2)
    .attr("width", width2);


// Loading data and main function    
d3.csv('SoundData/MasterSoundData.csv').then((data) => {

    // Creating suburban subset
    const suburbs = data.filter((d) => d.Type === "Suburban");

    // Selecting data for suburban neighborhoods
    const neighborhoods = ["Allapattah", "Buena Vista", "Coconut Grove", "Flagami", 
                            "Grapeland", "Liberty City", "Little Haiti", "Little Havana",
                            "Little River", "MiMo", "Morningside", "Shenandoah", "Silver Bluffs",
                            "The Roads", "West Flagler"];

    // Scaling axes
    const xScale2 = d3
        .scaleLinear()
        .domain([35, 85])
        .range([margin2[3], width2 - 3*margin2[1]]);

    const yScale2 = d3
        .scaleBand()
        .domain(neighborhoods)
        .range([height2 - margin2[2], margin2[0]])
        .paddingOuter(1);
    
    // Creating x axis
    const xAxis2 = svg2.append("g").attr("class", "BottomAxis");
    xAxis2
        .attr("transform", "translate(0," + (height2 - margin2[2]) + ")")
        .append("line")
        .attr("x1", margin2[3])
        .attr("x2", width2 - margin2[1])
        .attr("stroke", "rgba(0, 0, 0, 0.3)");
    
    // Creating horizontal reference line through middle of graph area
    /*const middleLine2 = svg2.append("g").attr("class", "middleLine");
    middleLine2
        .attr("transform", "translate(0," + (height2/2) + ")")
        .append("line")
        .attr("x1", margin2[3])
        .attr("x2", width2 - margin2[1])
        .attr("stroke", "rgba(250, 50, 50, 1)");*/

    // Creating x axis tick labels    
    const xAxisTicks2 = svg2.append("g").attr("class", "xAxisTicks")
    xScale2.ticks(6).forEach((tick) => {
        // Code below is for vertical grid lines
        /*xAxisTicks
            .append("line")
            .attr("x1", xScale(tick))
            .attr("x2", xScale(tick))
            .attr("y1", height - margin[2])
            .attr("y2", margin[0])
            .attr("stroke", "rgba(0,0,0,0.15)"); */

        xAxisTicks2
            .append("text")
            .attr("x", xScale2(tick))
            .attr("y", height2 - margin2[2] + 20)
            .attr("text-anchor", "middle")
            .text(tick);
    });

    // Creating Y Axis to display neighborhoods
    const yAxis2 = svg2.append("g").attr("class", "yAxis");

    // Creating Y axis labels    
    neighborhoods.forEach(neighborhood => {
        yAxis2
            .append("text")
            .attr("class", "yAxisLabels")
            .attr("x", (width2 - 3*margin2[3]))
            .attr("y", yScale2(neighborhood))
            .attr("text-anchor", "left")
            .text(neighborhood);
    });

    // Graph Title
    const suburbTitle = svg2.append("text").attr("class", "graphTitle")
    suburbTitle
        .attr("x", width2/2)
        .attr("y", margin2[0] - 25)
        .attr("text-anchor", "middle")
        .text("Sound in the Suburbs");
    
    // X Axis Label
    const suburbXAxisLabel = svg2.append("text").attr("class", "axisLabel")
    suburbXAxisLabel
        .attr("x", width2/2)
        .attr("y", height2)
        .attr("text-anchor", "middle")
        .text("Decibel Level");

    // Visualizing Data
    const jitterWidth2 = 7;
    svg2.selectAll("SuburbanPoints")
        .data(suburbs)
        .enter()
        .append("circle")
        .attr("class", "SuburbanPoints")
        .attr("fill", "rgba(0,0,0, 0.15)")
        .attr("r", 3)
        .attr("cx", (d) => xScale2(d["Decibel Level"]))
        .attr("cy", (d) => yScale2(d.Neighborhood) + (Math.random()-0.5)*2*jitterWidth2)
});
