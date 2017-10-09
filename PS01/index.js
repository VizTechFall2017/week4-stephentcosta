var svg = d3.select('svg').append('g').attr('transform','translate(100,100)');;

//set up variables to hold two versions of the data, one for each year
var dataB;
var dataA;

//set up a tracker variable to watch the button click state
var clicked = true;

//set up scales to position circles using the data
var scaleX = d3.scaleOrdinal().domain([1950, 1960, 1970, 1980, 1980, 1990, 2000, 2010, 2015]).range([0, 75, 150, 225, 300, 375, 450, 525, 600]);
var scaleY = d3.scaleLinear().domain([0,20000]).range([400, 0]);  //remember that 0,0 is at the top of the screen! 300 is the lowest value on the y axis

// Add the x Axis
svg.append("g")
    .attr('transform','translate(0,400)')  //move the x axis from the top of the y axis to the bottom
    .call(d3.axisBottom(scaleX));

svg.append("g")
    .call(d3.axisLeft(scaleY));

//import the data from the .csv file
d3.csv('./eastdata.csv', function(dataIn){


    //save the objects from the .csv with year = 2016
    dataB = dataIn.filter(function(d){
        return d.itemName == "B";
    });

    //save the objects from the .csv with year = 2017
    dataA = dataIn.filter(function(d){
        return d.itemName == "A";
    });

    svg.append('text')
        .text('Owner VS Renter')
        .attr('transform','translate(300, -20)')
        .attr('font-family' , "Helvetica-bold")
        .style('text-anchor','middle');

    svg.append('text')
        .text('Year')
        .attr('transform','translate(260, 440)')
        .attr('font-family' , "Helvetica-bold");

    svg.append('text')
        .text('# of Units')
        .attr('transform', 'translate(-50,250)rotate(270)')
        .attr('font-family' , "Helvetica-bold");

    //bind the data to the d3 selection, but don't draw it yet
    svg.selectAll('circles')
        .data(dataB)
        .enter()
        .append('circle')
        .attr('class','dataPoints');

    //call the drawPoints function below, and hand it the data2016 variable with the 2016 object array in it
    drawPoints(dataA);

});

//this function draws the actual data points as circles. It's split from the enter() command because we want to run it many times
//without adding more circles each time.
function drawPoints(pointData){

    svg.selectAll('.dataPoints')  //select all of the circles with dataPoints class that we made using the enter() commmand above
        .data(pointData)          //re-attach them to data (necessary for when the data changes from 2016 to 2017)
        .transition()
        .ease(d3.easePolyIn)
        .duration(400)
        .attr('cx',function(d){   //look up values for all the attributes that might have changed, and draw the new circles
            return scaleX(+d.x);
        })
        .attr('cy',function(d){
            return scaleY(+d.y);
        })
        .attr('r',function(d){
            return +d.r;
        })
        .attr('fill',function(d){
            return d.fill;
        });
}

//this function runs when the HTML button is clicked.
function buttonClicked(){

    //check to see whether the tracker variable is true. If it is, use the 2017 data set
    if(clicked == true){
        drawPoints(dataA);  //call the draw function again, to redraw the circles
        clicked = false;       //reset the value of the tracker variable
    }
    else{   //if the tracker variable is not true, use the 2016 data set
        drawPoints(dataB);
        clicked = true;
    }


}

/*
window.setInterval(
    function ()
    {
        buttonClicked();

    }, 1000);
*/
