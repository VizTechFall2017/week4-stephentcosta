var svg = d3.select('svg');

/* Your code goes here */

d3.csv ('./data.csv', function(dataIn) {

  console.log('dataIn');

  svg.selectAll('circle')
})

/*function buttonClicked(){
    //do something
    console.log('here');
}*/
