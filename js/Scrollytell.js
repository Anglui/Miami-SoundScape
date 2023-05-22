const body = d3.select("body");
const scrolly = body.selectAll(".scrolly");

// Functions to reset graphs to base colors
function resetColors1() {
	d3.selectAll(".overviewPoints").attr("fill", "rgba(0, 0, 0, 0.15)");
}

function resetColors2() {
    d3.selectAll(".SuburbanPoints").attr("fill", "rgba(0, 0, 0, 0.15)");
}

function resetColors3() {
    d3.selectAll(".UrbanPoints").attr("fill", "rgba(0, 0, 0, 0.15)");
}

// Graph update functions
function updateGraph1(stepID) {
	if (stepID === "SuburbanOverview") {
		svg.selectAll(".overviewPoints")
			.filter(function (d) {
				return d.Type === "Suburban";
			})
			.attr("fill", "rgba(253, 188, 52, 0.35)");

		svg.selectAll(".overviewPoints")
			.filter(function (d) {
				return d.Type !== "Suburban";
			})
			.attr("fill", "rgba(0, 0, 0, 0.025)");
	}
	else if (stepID === "UrbanOverview") {
		svg.selectAll(".overviewPoints")
			.filter(function (d) {
				return d.Type === "Urban";
			})
			.attr("fill", "rgba(80, 50, 255, 0.35)");

		svg.selectAll(".overviewPoints")
			.filter(function (d) {
				return d.Type !== "Urban";
			})
			.attr("fill", "rgba(0, 0, 0, 0.025)");	
	}
}

function updateGraph2(stepID) {
	// Create list of neighborhoods in each step
	const quietest = ["Coconut Grove", "The Roads"];
	const avgburb = ["Buena Vista", "Flagami", "Liberty City", "Little Haiti", "Little River", 
					 "MiMo", "Morningside", "Shenandoah", "Silver Bluffs"];
	const loud = ["Allapattah", "Grapeland", "Little Havana", "West Flagler"];

	// Reset points
	resetColors2();

	// Define highlight color
	let highlightGold = "rgba(253, 188, 52, 0.35)";

	// Define a variable for the array of the neighborhoods we want
	let selectedNeighborhoods = [];

	switch (stepID) {
		case "QuietestBurbs":
			selectedNeighborhoods = quietest;
			break;
		case "AverageSuburb":
			selectedNeighborhoods = avgburb;
			break;
		case "NoisyBurbs":
			selectedNeighborhoods = loud;
			break;
		default:
			break;
	}

	// If selectedNeighborhoods is not empty, apply highlights 
	if (selectedNeighborhoods.length > 0) {
        d3.selectAll(".SuburbanPoints")
            .filter((d) => selectedNeighborhoods.includes(d.Neighborhood))
            .attr("fill", highlightGold);

		d3.selectAll(".SuburbanPoints")
            .filter((d) => !selectedNeighborhoods.includes(d.Neighborhood))
            .attr("fill", "rgba(0, 0, 0, 0.01)");
    }
}

function updateGraph3(stepID) {
	// Create list of neighborhoods in each step
	const bimodal = ["Brickell", "Downtown", "Edgewater"];
	const systemic = ["Omni", "Overtown", "Park West"];

	// Reset points
	resetColors3();

	// Define highlight color
	let highlightNavy = "rgba(80, 50, 255, 0.35)";

	// Define a variable for the array of the neighborhoods we want
	let selectedNeighborhoodsUrban = [];

	switch (stepID) {
		case "BimodalBeats":
			selectedNeighborhoodsUrban = bimodal;
			break;
		case "Racism":
			selectedNeighborhoodsUrban = systemic;
			break;
		default:
			break;
	}

	// If selectedNeighborhoods is not empty, apply highlights 
	if (selectedNeighborhoodsUrban.length > 0) {
        d3.selectAll(".UrbanPoints")
            .filter((d) => selectedNeighborhoodsUrban.includes(d.Neighborhood))
            .attr("fill", highlightNavy);

		d3.selectAll(".UrbanPoints")
            .filter((d) => !selectedNeighborhoodsUrban.includes(d.Neighborhood))
            .attr("fill", "rgba(0, 0, 0, 0.01)");
    }
}

// scrollama event handlers
function handleStepEnter(response) {
	console.log(response);
	// response = { element, direction, index }
	
	const currentSection = d3.select(response.element.closest(".scrolly"));
	const currentSteps = currentSection.selectAll(".writing .step");
	const currentStepID = response.element.id;

	// reveal current step only
	currentSteps.classed("is-active", function (d, i) {
		return i === response.index;
	});

	// reset colors on all graphs
	resetColors1();
	resetColors2();
	resetColors3();

	// Update the necessary graph
	updateGraph1(currentStepID);
	updateGraph2(currentStepID);
	updateGraph3(currentStepID);

}

function init() {
	// 1. setup the scroller passing options
	// 2. bind scrollama event handlers
	scrolly.each(function (){
		const section = d3.select(this);
		const steps = section.selectAll(".writing .step");

		// create a new scrollama instance for each section
		const scroller = scrollama();

		scroller
			.setup({
				step: steps.nodes(),
				offset: 0.6,
				debug: false
			})
			.onStepEnter(handleStepEnter);
	});
}

// kick things off
init();