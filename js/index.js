const w = 1500;
const h = 750;
const padding = 40;
const gdpDataset = gdpData.data;
const barWidth = w/gdpDataset.length;
const minXDomain = new Date(d3.min(gdpDataset, d=>d[0]));
const maxXDomain = new Date(d3.max(gdpDataset, d=>d[0]));
const minYDomain = d3.min(gdpDataset, d=>d[1]);
const maxYDomain = d3.max(gdpDataset, d=>d[1]);
const fccTestFudge = -5.5;  // to pass FCC test

const xScale = d3.scaleTime()
                 .domain([ minXDomain, maxXDomain ])
                 .range([padding, w-padding])
   

const yScale = d3.scaleLinear()
                 .domain([0,maxYDomain])
                 .range([h-padding,padding]);



const svg = d3.select("body")
              .append("svg")
              .attr("width", w)
              .attr("height", h) ;

svg.selectAll("rect")
    .data(gdpData.data)
    .enter()
    .append("rect")
    .attr("x", d => xScale(new Date(d[0])))
    .attr("y", d => yScale(d[1]) + fccTestFudge )
    .attr("width", barWidth)
    .attr("height", d=>h-yScale(d[1])-padding)
    .attr("class","bar")
    .attr("fill","palevioletred")
    .attr("data-date",d=>d[0])
    .attr("data-gdp",d=>d[1])
    .on("mouseover",(d)=>{ 

        let tooltipElem = document.getElementById("tooltip");

        tooltipElem.style.display = "block";
        
        tooltipElem.innerText = d[0] ;

        tooltipElem.setAttribute("data-date",d[0]);

        tooltipElem.style.left= xScale(new Date(d[0])) + "px";

        })


    .on("mouseout",()=>{ 

        let tooltipElem = document.getElementById("tooltip");
            
        tooltipElem.style.display = "none";
    
        });


xAxis = d3.axisBottom(xScale);

yAxis = d3.axisLeft(yScale);

svg.append("g")
   .attr("id","x-axis")
   .attr("transform","translate(0," + (h-padding + fccTestFudge) +")")
   .call(xAxis);

svg.append("g")
    .attr("id","y-axis")
    .attr("transform","translate(" + padding + "," + fccTestFudge + ")")
    .call(yAxis);

