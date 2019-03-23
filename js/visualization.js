

var el   = document.getElementById("d3Graph");
var el2   = document.getElementById("dashboard");
var title="DISTANCE";
var csv;
var size;
var text="m";



grafica(1,20);


function grafica(valor, tamaño)
{
    document.getElementById("d3Graph").innerHTML = "";
    var csv;
    size=tamaño;
    switch(valor)
    {
        case 1:
        {
            title = "DISTANCE";
            csv = './data/data1.csv';
            text="m";
          size=28000;
            break;
        }
        case 2:
        {
            title= "SAFETY";
            csv = './data/data2.csv';
          text=" crimes";
            break;
        }
        case 3:
        {
            title= "AFFORD";
            csv = './data/data3.csv';
            text=" units";
            size=3500;
            break;
        }
        default:
        {
            break;
        }
    }



  var rect = el.getBoundingClientRect();

  var width = 500,
    height = 500,
    radius = Math.min(width, height)/2 ,
    innerRadius = 0.5 * radius;

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.width; });

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([0, 0])
  .html(function(d) {
    return d.data.label + ": <span style='color:orangered'>" + d.data.score.toFixed(2) +text+"</span>";
  });

var arc = d3.svg.arc()
  .innerRadius(innerRadius)
  .outerRadius(function (d) {

      return (d.data.score>100 ?  ((radius - innerRadius) * (d.data.score / size) + innerRadius):
                ((radius - innerRadius) * (d.data.score / tamaño) + innerRadius));

  });



var svg = d3.select(el).append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
		.style('transform', 'translate(50%, 50%)')
    .attr("transform", "translate(" + width/2+ "," + height / 2 + ")");

svg.call(tip);

d3.csv(csv, function(error, data) {

  data.forEach(function(d) {
    d.id     =  d.id;
    d.order  = +d.order;
    d.color  =  d.color;
    d.weight = +d.weight;
    d.score  = +d.score;
    d.score  = +d.score;
    d.width  = +d.weight;
    d.label  =  d.label;
  });


  var path = svg.selectAll(".solidArc")
      .data(pie(data))
    .enter().append("path")
      .attr("fill", function(d) { return d.data.color; })
      .attr("class", "solidArc")

      .attr("stroke", "black")
      .attr("d", arc)
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);


  svg.append("svg:text")
    .attr("class", "aster-score")
    .attr("dy", ".20em")
    .attr("text-anchor", "middle")
    .text(title);

});

}
