---
layout: post
title: "d3.js를 이용한 시각화: 영화의 흥행 여부와 온라인 뉴스량 간 관계"
description: ""
category: 
tags: ['d3.js','vizualization','movie','news','scatter plot']
---

<script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
<script src="http://code.jquery.com/jquery-1.8.3.min.js" type="text/javascript" charset="utf-8"></script>
<link rel="stylesheet" href="http://onehackoranother.com/projects/jquery/tipsy/stylesheets/tipsy.css" type="text/css" title="no title" charset="utf-8"/>
<script src="/assets/20151221/jquery.tipsy.js" type="text/javascript" charset="utf-8"></script>
<style>
.div.scatter-score {
    margin: 0;
    font-size: 11px;
}
.div.scatter_beforeafter {
    margin: 0;
    font-size: 11px;
}
.axis path,
.axis line {
  fill: none;
  stroke: #000;
  /*stroke: grey;*/
  stroke-width: 0.5;
  shape-rendering: crispEdges;
  /*opacity: 1;*/
}
path
{
    fill: none;
}
.axis text { font-size:10px; }

.circles { opacity: .5; }
.tipsy { font-size:11px; margin-top:-10px;}

.guide line {
  fill: none;
  stroke: #000;
  shape-rendering: crispEdges;
  opacity: 0;
}
</style>



이번 학기에 Information visualization 강의를 수강하면서 d3.js라는 자바스크립트 라이브러리를 접했다. d3.js에 대한 소개는 공식 홈페이지([http://d3js.org](http://d3js.org))에서 가져왔다.

> D3.js is a JavaScript library for manipulating documents based on data. D3 helps you bring data to life using HTML, SVG, and CSS. D3’s emphasis on web standards gives you the full capabilities of modern browsers without tying yourself to a proprietary framework, combining powerful visualization components and a data-driven approach to DOM manipulation.

간단히 말하면, 데이터 기반으로 웹페이지 내에 차트나 그래프 등의 데이터 시각화 결과물을 삽입할 수 있도록 도와주는 툴이다. SVG(Scalable Vector Graphics) 오브젝트를 이용하여 웹페이지가 확대되거나 축소되더라도 도형들이 깨지지 않고 깔끔하게 보이는 장점이 있으며, 무엇보다도 시각화 결과가 예쁘다. 또한 사용자와의 상호작용이 가능하기 때문에 사용자가 좀 더 능동적으로 시각화 결과물을 이해할 수 있다. 뉴욕타임즈와 같은 언론사에서는 d3.js를 이용한 데이터 기반 시각화 결과를 기사와 함께 보여주기도 한다. 시각화 예시들은 공식 홈페이지에서 확인 가능하다. 

---

학기말 프로젝트를 위해 **영화의 흥행 여부와 온라인 뉴스량 간 관계 탐색**이란 주제를 정하고 d3.js에 파묻혔던, 밤낮없는 3일을 보냈다. 성실한 조원들 덕분에, 단기간에 재미있는 결과들을 낼 수 있었던 즐거운 시간을 보냈다. 포스트는 그 중 내가 주로 했던 내용들을 위주로 게시하려 한다. 확인하고 싶었던 내용은 크게 두 가지였다.

1. 영화의 흥행여부는 개봉 1주차에 거의 판가름난다.
2. 온라인 뉴스량은 영화의 흥행 정도와 양의 상관관계가 있다.

데이터 시각화 및 분석을 위해 2014년 한국에서 상영되었던 영화들의 메타데이터(2014년 기준, [영화진흥위원회](http://www.kofic.or.kr/))와 네이버 뉴스 검색 결과(영화제목 기준) 데이터가 사용되었다.

# Q. 영화의 흥행여부는 개봉 1주차에 거의 판가름 날까?

이를 확인하기 위해 국내에서 2014년에 상영된 영화의 개봉 1주차 관객수와 개봉 2주차 이후 관객수를 scatter plot을 사용하여 비교하였다. 만약 이 둘이 선형적 관계를 보인다면, 개봉 1주차 성적을 통해 영화의 흥행여부를 판단할 수 있으리라. 


## 개봉 1주차 관객수 vs. 개봉 2주차 관객수 (Circle size: 총 관객수)

<div id="scatter1"></div>

<script>
// set the stage
var margin = {t:30, r:50, b:0, l:60 },
    w = 600 - margin.l - margin.r,
    h = 500 - margin.t - margin.b,
    x = d3.scale.linear().range([0, w]),
    y = d3.scale.linear().range([h - 60, 0]),
    //colors that will reflect geographical regions
    color = d3.scale.category10();

var scale = function (x) { return x/700000; };

var svg = d3.select("div#scatter1").append("svg")
    .attr("width", w + margin.l + margin.r)
    .attr("height", h + margin.t + margin.b);

// set axes, as well as details on their ticks
var xAxis = d3.svg.axis()
    .scale(x)
    .ticks(5)
    .tickSubdivide(true)
    .tickSize(6, 3, 0)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .ticks(5)
    .tickSubdivide(true)
    .tickSize(6, 3, 0)
    .orient("left");

// group that will contain all of the plots
var groups = svg.append("g").attr("transform", "translate(" + margin.l + "," + margin.t + ")");

// bring in the data, and do everything that is data-driven
d3.tsv("/assets/20151221/2_scatter_linear.tsv", function(dataset) {

    x.domain([0, 10000+d3.max(dataset, function(d) { return +d.att1 })])
    y.domain([0, 10000+d3.max(dataset, function(d) { return +d.att2 })])

// what to do when we mouse over a bubble
    var mouseOn = function() { 
        var circle = d3.select(this);
        // transition to increase size/opacity of bubble
        circle.transition()
        .duration(800).style("opacity", 1)
        .attr("r", 23).ease("elastic");

        // append lines to bubbles that will be used to show the precise data points.
        // translate their location based on margins
        svg.append("g")
            .attr("class", "guide")
        .append("line")
            .attr("x1", circle.attr("cx")+margin.l-20)
            .attr("x2", circle.attr("cx")+margin.l-20)
            .attr("y1", +circle.attr("cy") + 26)
            .attr("y2", h - margin.t - margin.b - 20)
            .attr("transform", "translate(80,20)")
            .style("stroke", circle.style("fill"))
            .transition().delay(200).duration(400).styleTween("opacity", 
                        function() { return d3.interpolate(0, .5); })

        svg.append("g")
            .attr("class", "guide")
        .append("line")
            .attr("x1", +circle.attr("cx") - 36)
            .attr("x2", -20)
            .attr("y1", circle.attr("cy"))
            .attr("y2", circle.attr("cy"))
            .attr("transform", "translate(80,30)")
            .style("stroke", circle.style("fill"))
            .transition().delay(200).duration(400).styleTween("opacity", 
                        function() { return d3.interpolate(0, .5); });

    // function to move mouseover item to front of SVG stage, in case
    // another bubble overlaps it
        d3.selection.prototype.moveToFront = function() { 
          return this.each(function() { 
            this.parentNode.appendChild(this); 
          }); 
        };

    // skip this functionality for IE9, which doesn't like it
        if (!$.browser.msie) {
            circle.moveToFront();   
            }
    };

    // what happens when we leave a bubble?
    var mouseOff = function() {
        var circle = d3.select(this);

        // go back to original size and opacity
        circle.transition()
        .duration(800).style("opacity", .5)
        .attr("r", function(d) { return scale(d.total); }).ease("elastic");

        // fade out guide lines, then remove them
        d3.selectAll(".guide").transition().duration(100).styleTween("opacity", 
                        function() { return d3.interpolate(.5, 0); })
            .remove()
    };

    // style the circles, set their locations based on data
    var circles =
    groups.selectAll("circle")
        .data(dataset)
      .enter().append("circle")
      .attr("class", "circles")
      .attr({
        cx: function(d) { return x(+d.att1); },
        cy: function(d) { return y(+d.att2); },
        r: function(d) { return scale(d.total); },
        id: function(d) { return d.country; }
      })
        .style("fill", "green");

    // run the mouseon/out functions
    circles.on("mouseover", mouseOn);
    circles.on("mouseout", mouseOff);

    // tooltips (using jQuery plugin tipsy)
    circles.append("title")
            .text(function(d) { return d.country; })

    $(".circles").tipsy({ gravity: 's', });

    // draw axes and axis labels
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(" + margin.l + "," + (h - 60 + margin.t) + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + margin.l + "," + margin.t + ")")
        .call(yAxis);

    var xtext = svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", w + 50)
        .attr("y", h - margin.t - 5)
        .style("font-size","11px")
        
    var ytext = svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("x", -30)
        .attr("y", 75)
        .attr("transform", "rotate(-90)")
        .style("font-size","11px")

    xtext.text("관객수(개봉1주차)");
    ytext.text("관객수(개봉2주차~)");

});
</script>

대다수의 영화가 좌하귀쪽에 위치하고 있으며, 양의 상관관계를 보이고 있다. 즉, 개봉 1주차의 성적이 그 이후의 성적과 비례한다. 이들은 대체로 총 관객수가 크지 않다 (circle 크기가 작음). 

선형 관계를 가지는 좌하귀 영역에서 벗어나는 영화들에 집중해보자. 이들은 대부분 상업적 영화이며, 모두 인지도가 높으며 흥행했던 영화들이다. 또한, 외국 영화보다는 한국 영화가 2배 많다. 이를 크게 3가지 케이스로 나눌 수 있다.

1. 개봉 1주차에 비해 이후 성적이 좋음
    * 국제시장, 변호인, 인터스텔라, 수상한 그녀, 해적: 바다로 간 산적
    * (개봉 1주차 관객수가 현저히 적은 경우) 님아, 그 강을 건너지 마오, 비긴 어게인
2. 개봉 1주차에 비해 이후 성적이 좋지 않음
    * 역린, 트랜스포머: 사라진 시대, 군도: 민란의 시대
3. 개봉 1주차 성적도, 그 이후에도 성적이 꾸준히 좋음
    * 명량

상업적 영화는 흥행을 목표로 제작이 되며, 배급사를 통한 마케팅이 필수이다. 개봉 1주차에 흥행 성적이 좋다는 것은, 영화의 개봉 전 마케팅이 성공적이었으며, 사람들이 영화 개봉 전부터 해당 영화에 대한 흥미를 가지고 있었으며 개봉하자마자 영화를 관람했다는 의미이다. 이들은 개봉 전에 TV, 광고, 뉴스 등을 통해 활발한 마케팅이 이루어졌을 것이며, 그 결과는 성공적이었다. 다만, '님아, 그 강을 건너지 마오', '비긴 어게인'의 경우는 개봉 전 마케팅이 거의 없어 사람들의 인지도가 낮았으나, 이후 입소문이 퍼지며 관객몰이를 했던 영화들이다. 

그렇다면 개봉 1주차 이후 성적이 좋다는 것은 무슨 의미일까. 이는 개봉 전 마케팅으로만은 설명되기 어렵다. 실질적인 영화 콘텐츠가 관객들에게 호응을 받으며 관객들의 온라인 리뷰, 입소문, TV, 뉴스 등을 통해 또 다른 관객을 이끌었다고 봐야할 것이다. 이 때, 개봉 1주차의 흥행 성적을 이용한 배급사의 추가적인 마케팅이 있을 수도 있으며, 관객들의 호응이 계속되는 한 롱런한다. 반대로, 개봉 1주차 이후 성적이 비교적 좋지 못한 것은, 초기 마케팅에 의한 잠재 관객의 관심도는 높았으나, 막상 개봉 후 영화 컨텐츠가 관객들에게 외면당한 경우로 볼 수 있을 것이다. '트랜스포머: 사라진 시대'는 초반 관심도는 높았지만 막상 개봉 후에는 흥행했던 전편들에 비해 지루한 속편 영화로 전락하고 말았다.



# Q. 영화의 온라인 뉴스량과 관객수 간 관계는 어떠할까?

이 둘을 비교하고 싶었던 이유는 영화의 마케팅 채널 중 하나인 온라인 뉴스량이 개봉 초반 관객수에 영향을 미칠 것이라는 강한 믿음 때문이었다. 또한, 개봉 전 뉴스량이 많다는 것은 영화에 대한 기대와 관심이 높다는 것을 의미하며 개봉 초반 관객수의 선행지표로 해석될 수도 있을 것이다. 반면, 개봉 이후의 뉴스량은 개봉 후 영화의 흥행여부에 따라 영향을 받을 수 있으므로, 뉴스량이 관객수에 선행할 수도 있고 후행할 수도 있어 단순한 비교가 어려워진다. 다만, 관계가 어떤지는 궁금하였다. 

뉴스량과 관객수 간 관계를 알아보기 위해 추가적으로, 영화 제목 문자열을 포함하고 있는 네이버 뉴스를 개봉 한 달 전부터 종영까지의 기간 기준으로 크롤링(crawling)하였다. (시간이 없어 막막하였으나, 연구실 선배의 jsoup 기반 자바코드가 매우 큰 도움이 되었다.) 이를 (1) 개봉 전부터 개봉 1주차, (2) 개봉 2주차부터 종영까지의 두 기간으로 나누어 뉴스량과 관객수 간 scatter plot을 그려보았다. 

<h2><div id="scatter_title"></div></h2>
<button id="change" style="display: block;position: absolute;">기간 기준 변경</button>
<div id="scatter_beforeafter"></div>

<script>
    // set the stage
    var x2 = d3.scale.linear().range([0, w]),
        y2 = d3.scale.linear().range([h - 60, 0]);

    var svg2 = d3.select("div#scatter_beforeafter").append("svg")
        .attr("width", w + margin.l + margin.r)
        .attr("height", h + margin.t + margin.b);

    // set axes, as well as details on their ticks
    var xAxis2 = d3.svg.axis()
        .scale(x2)
        .ticks(5)
        .tickSubdivide(true)
        .tickSize(6, 3, 0)
        .orient("bottom");

    var yAxis2 = d3.svg.axis()
        .scale(y2)
        .ticks(5)
        .tickSubdivide(true)
        .tickSize(6, 3, 0)
        .orient("left");

    var data_status = false;

    // group that will contain all of the plots
    var groups2 = svg2.append("g").attr("transform", "translate(" + margin.l + "," + margin.t + ")");

    // array of the regions, used for the legend
    var regions = ["한국", "외국"]

    // the legend color guide
    var legend = svg2.selectAll("rect")
            .data(regions)
        .enter().append("rect")
        .attr({
          // x: function(d, i) { return (w - 25 + i*50); },
          x: margin.l+50,
          // y: margin.t-30,
          y: function(d, i) { return (margin.t*3 -10 + (i-1)*18); },
          width: 20,
          height: 12
        })
        .style("fill", function(d) { return color(d); });


    // legend labels    
        svg2.selectAll("text")
            .data(regions)
        .enter().append("text")
        .attr({
            // x: function(d, i) { return (w + i*50); },
            x: margin.l+80,
            // y: margin.t-20,
            y: function(d, i) { return (margin.t*3 + (i-1)*18); }
        })
        .text(function(d) { return d; })
        .style("font-size", '11px');


    // bring in the data, and do everything that is data-driven
    d3.tsv("/assets/20151221/3_scatter_beforeafter.tsv", function(dataset) {

        x2.domain([0, 10+d3.max(dataset, function(d) { return +d.news1 })])
        y2.domain([0, 10000+d3.max(dataset, function(d) { return +d.att1 })])



        // style the circles, set their locations based on data
        var circles2 =
        groups2.selectAll("circle")
            .data(dataset)
          .enter().append("circle")
          .attr("class", "circles")
          .attr({
            cx: function(d) { return x2(+d.news1); },
            cy: function(d) { return y2(+d.att1); },
            r: function(d) { return scale(d.total); },
            id: function(d) { return d.country; }
          })
            .style("fill", function(d) { return color(d.region); });


    // what to do when we mouse over a bubble
    var mouseOn = function() { 
        var circle = d3.select(this);

    // transition to increase size/opacity of bubble
        circle.transition()
        .duration(800).style("opacity", 1)
        .attr("r", 20).ease("elastic");

        // append lines to bubbles that will be used to show the precise data points.
        // translate their location based on margins
        svg2.append("g")
            .attr("class", "guide")
        .append("line")
            .attr("x1", circle.attr("cx")+margin.l-20)
            .attr("x2", circle.attr("cx")+margin.l-20)
            .attr("y1", +circle.attr("cy") + 26)
            .attr("y2", h - margin.t - margin.b - 20)
            .attr("transform", "translate(80,20)")
            .style("stroke", circle.style("fill"))
            .transition().delay(200).duration(400).styleTween("opacity", 
                        function() { return d3.interpolate(0, .5); })

        svg2.append("g")
            .attr("class", "guide")
        .append("line")
            .attr("x1", +circle.attr("cx") - 36)
            .attr("x2", -20)
            .attr("y1", circle.attr("cy"))
            .attr("y2", circle.attr("cy"))
            .attr("transform", "translate(80,30)")
            .style("stroke", circle.style("fill"))
            .transition().delay(200).duration(400).styleTween("opacity", 
                        function() { return d3.interpolate(0, .5); });

    // function to move mouseover item to front of SVG stage, in case
    // another bubble overlaps it
        d3.selection.prototype.moveToFront = function() { 
          return this.each(function() { 
            this.parentNode.appendChild(this); 
          }); 
        };

    // skip this functionality for IE9, which doesn't like it
        if (!$.browser.msie) {
            circle.moveToFront();   
            }
    };
    // what happens when we leave a bubble?
    var mouseOff = function() {
        var circle = d3.select(this);

        // go back to original size and opacity
        circle.transition()
        .duration(800).style("opacity", .5)
        .attr("r", function(d) { return scale(d.total); }).ease("elastic");

        // fade out guide lines, then remove them
        d3.selectAll(".guide").transition().duration(100).styleTween("opacity", 
                        function() { return d3.interpolate(.5, 0); })
            .remove()
    };



    // run the mouseon/out functions
    circles2.on("mouseover", mouseOn);
    circles2.on("mouseout", mouseOff);

    // tooltips (using jQuery plugin tipsy)
    circles2.append("title")
            .text(function(d) { return d.country; })

    $(".circles").tipsy({ gravity: 's', });


        // draw axes and axis labels
        svg2.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(" + margin.l + "," + (h - 60 + margin.t) + ")")
            .call(xAxis2);

        svg2.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + margin.l + "," + margin.t + ")")
            .call(yAxis2);

        var xtext2 = svg2.append("text")
            .attr("class", "x label")
            .attr("text-anchor", "end")
            .attr("x", w + 80)
            .attr("y", h - margin.t - 5)
            .style("font-size","11px")
            
        var ytext2 = svg2.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("x", -30)
            .attr("y", 75)
            .attr("transform", "rotate(-90)")
            .style("font-size","11px")
        
            xtext2.text("뉴스(개봉전~개봉1주차)");
            ytext2.text("관객수(개봉1주차)");

        var title = d3.select("div#scatter_title").append("svg")
                    .attr("width", w+margin.l+margin.r)
                    .attr("height", margin.t)
            .append("text")
            .attr("class","title")
            .attr("x", 10)
            .attr("y", 15);

        title.text("개봉전~개봉1주차 뉴스량 vs. 개봉1주차 관객수 (Circle size: 총 관객수)");

// On click, update with new data
        d3.select("#change").on("click", function() {
            data_status = !data_status
            x2.domain([0, 10+d3.max(dataset, function(d) { if (data_status) {return +d.news2;} else {return +d.news1} })])
            y2.domain([0, 10000+d3.max(dataset, function(d) { if (data_status) {return +d.att2;} else {return +d.att1} })])

            // Update circles
            groups2.selectAll("circle")
                .transition()  // Transition from old to new
                .duration(1000)  // Length of animation
                .each("start", function() {  // Start animation
                    d3.select(this)  // 'this' means the current element
                      .attr({
                        r: function(d) { return scale(d.total); },
                        id: function(d) { return d.country; }
                      })
                })
                .delay(function(d, i) {
                    return i / dataset.length * 500;  // Dynamic delay (i.e. each item delays a little longer)
                })
                //.ease("linear")  // Transition easing - default 'variable' (i.e. has acceleration), also: 'circle', 'elastic', 'bounce', 'linear'
                .attr("cx", function(d) {
                    if (data_status) {
                        return x2(+d.news2);
                    } else {
                        return x2(+d.news1);
                    }
                })
                .attr("cy", function(d) {
                    if (data_status) {
                        return y2(+d.att2);
                    } else {
                        return y2(+d.att1);
                    }
                })
                .each("end", function() {  // End animation
                    d3.select(this)  // 'this' means the current element
                        .transition()
                        .duration(1000)
                        // .attr("fill", function(d) { return color(d.region); })  // Change color
                });
                // Update X Axis
                svg2.select(".x.axis")
                    .transition()
                    .duration(1000)
                    .call(xAxis2);

                // Update Y Axis
                svg2.select(".y.axis")
                    .transition()
                    .duration(100)
                    .call(yAxis2);

              if(data_status) {
                xtext2.text("뉴스(개봉2주차~종영)");
                ytext2.text("관객수(개봉2주차~종영)");
                title.text("개봉 2주차 이후 뉴스량 vs. 개봉 2주차 이후 관객수 (Circle size: 총 관객수)");
            } else {
                xtext2.text("뉴스(개봉전~개봉1주차)");
                ytext2.text("관객수(개봉1주차)");
                title.text("개봉전~개봉1주차 뉴스량 vs. 개봉1주차 관객수 (Circle size: 총 관객수)");
            }

        });

    });
</script>

## (1) 개봉 전부터 개봉 1주차까지의 기간

국내와 해외로 나누었을 때, 각자 뉴스량과 관객수 간 양의 상관관계가 있음을 알 수 있다. 해외의 경우 매우 뚜렷한 선형관계가 드러나며 뉴스량. 국내의 경우 양의 상관관계가 보이긴 하나 산포도가 매우 크다. 왜 그럴까? (배급사나 출연 배우에 따른 차이가 있으려나?)

신기한 것은, 국내 영화와 해외 영화 간 개봉 전부터 개봉1주까지의 뉴스량이 현저히 차이난다는 것이다. 국내영화들의 뉴스량이 압도적으로 많다. 이는, 국내 영화에 대한 언론의 관심이 높다는 것을 내포할 수도 있지만, 국내 영화에 대한 배급사의 마케팅이 활발하다는 것을 의미하는 것이기도 하다. 그럼에도 불구하고, 명량을 제외하면 국내영화와 해외 영회의 개봉 첫 주 관객수는 비슷한 수준이다. 즉, 해외 영화는 개봉 전 마케팅과 언론의 관심이 비교적 낮음에도 불구하고, 비슷한 수준의 흥행 수준을 보여준다. 이는 (1) 세계적으로 유명한 감독이나 배우, 제작사의 영화, (2) 이미 흥행했던 영화의 속편 (3) 자국에서 흥행에 성공한 뒤 한국에 수입되어 개봉하는 경우 등 흥행력이 검증된 해외 영화만 국내에 배급되기 때문인 것으로 짐작된다. (그럼에도 불구하고 '루시'나 '퓨리'처럼 뉴스량이 많음에도 불구하고 흥행실패한 영화들은.. 마케팅 전략이 잘못되었거나.. 영화가 재미 없었거나..)

## (2) 개봉 2주차부터 종영까지의 기간

여기서도 크게 두 개의 군집이 서로 다른 선형 관계를 보인다. 첫 번째 군집은 위쪽에 위치한 선형 관계로, 일정 수준 이상 흥행 했던(circle 크기가 큰) 영화들로 구성되어 있다. 두 번째 군집은 아래쪽에 위치한 선형관계로, 비교적 낮은 흥행 수준의 (circle 크기가 작은) 영화들로 구성되어 있다. 여기서는 뉴스량과 관객수의 기준 기간이 동일하기 때문에 뉴스의 많고 적음이 관객수에 선행하면서도 후행한다는 식으로 함부로 해석할 수 없다. 그럼에도 불구하고, 뉴스량을 아래와 같은 세 가지 요소로 나누어 해석을 시도해보자.

$$
뉴스량 = (마케팅\,목적의\,뉴스) + (언론의\,관심에\,의한\,뉴스) + (기타)
$$

여기서 언론의 관심에 의한 뉴스는 개봉 후 영화의 흥행 성적이나 관객들의 평가 등을 보도하는 목적으로, 기자의 관심에 의한 뉴스를 의미한다. 기타는 출연 배우의 외부 활동과 함께 영화에 대해 언급하는 뉴스 등이 이에 해당한다. 이 때, 같은 뉴스량에도 불구하고 수직적 갭(gap)이 있는, 즉, 관객수에서 차이가 나는 두 영화는 뉴스의 내용에서 차이가 있을 것이다. 관객수가 많은 영화는 마케팅 목적의 뉴스보다는 언론에 관심에 의한 뉴스가 많을 것이고, 관객수가 적은 영화는 그 반대일 것이다. 뉴스 내용을 분석하여 이를 확인할 수도 있겠지만, 시간 관계상 진행하지 않았다.

배급사 별로 분석을 한 내용도 있지만, 귀차니즘으로 여기서 그만. the end.

마지막으로..

# 주요 영화의 관객수와 뉴스량 추이

<button data-src="/assets/20151221/data.tsv">명량</button>
<button data-src="/assets/20151221/data2.tsv">국제시장</button>
<button data-src="/assets/20151221/data3.tsv">변호인</button>
<button data-src="/assets/20151221/data4.tsv">해적: 바다로 간 산적</button>
<button data-src="/assets/20151221/data5.tsv">수상한 그녀</button>
<button data-src="/assets/20151221/data6.tsv">겨울왕국</button>
<button data-src="/assets/20151221/data7.tsv">인터스텔라</button>
<button data-src="/assets/20151221/data9.tsv">비긴 어게인</button>
<button data-src="/assets/20151221/data8.tsv">님아, 그 강을 건너지 마오</button>
<button data-src="/assets/20151221/data10.tsv">어바웃 타임</button>
<button data-src="/assets/20151221/data11.tsv">끝까지 간다</button>
<button data-src="/assets/20151221/data12.tsv">트랜스포머: 사라진 시대</button>
<button data-src="/assets/20151221/data13.tsv">군도: 민란의 시대</button>
<button data-src="/assets/20151221/data14.tsv">역린</button>
<div id="biv_line"></div>

<script>
var margin0 = {t: 30, r: 80, b: 60, l: 60},
    w0 = 600 - margin0.l - margin0.r,
    h0 = 400 - margin0.t - margin0.b;

drawLine("/assets/20151221/data.tsv")

d3.selectAll("button").on("click", function() { 
  d3.select("div#biv_line").selectAll("*").remove()
  drawLine(this.getAttribute("data-src"))
});

function drawLine(tsvFile) {

    var x0 = d3.scale.linear().range([0, w0]);
    var y0 = d3.scale.linear().range([h0, 0]);
    var y1 = d3.scale.linear().range([h0, 0]);

    var xAxis0 = d3.svg.axis().scale(x0)
        .orient("bottom").ticks(20);

    var yAxisLeft = d3.svg.axis().scale(y0)
        .orient("left").ticks(7);

    var yAxisRight = d3.svg.axis().scale(y1)
        .orient("right").ticks(7); 

    var valueline = d3.svg.line()
        .x(function(d) { return x0(d.weekorder); })
        .y(function(d) { return y0(d.att); })
        .interpolate('basis');
        
    var valueline2 = d3.svg.line()
        .x(function(d) { return x0(d.weekorder); })
        .y(function(d) { return y1(d.news); })
        .interpolate('basis');
      
    var svg0 = d3.select("#biv_line")
        .append("svg")
            .attr("width", w0 + margin0.l + margin0.r)
            .attr("height", h0 + margin0.t + margin0.b)
        .append("g")
            .attr("transform", 
                  "translate(" + margin0.l + "," + margin0.t + ")");

    var regions0 = ["관객수", "뉴스수"];
    var colors0 = ["RoyalBlue   ","PaleVioletRed "];

    // the legend color guide
    var legend0 = svg0.selectAll("rect")
            .data(regions0)
        .enter().append("rect")
        .attr({
          x: function(d, i) { return (w0 - margin0.r - 150 + i*80); },
          y: margin0.t,
          width: 25,
          height: 12
        })
        .style("fill", function(d,i) { return colors0[i]; });


    // legend labels    
    svg0.selectAll("text")
        .data(regions0)
    .enter().append("text")
    .attr({
        x: function(d, i) { return (w0 - margin0.r - 120 + i*80); },
        y: margin0.t + 10,
    })
    .text(function(d) { return d; })
    .style("font-size", "11px");

    var x0text = svg0.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", w0/2 + margin0.l/2)
        .attr("y", h0 + margin0.t + 5)
        
    var y1text = svg0.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("x", -5)
        .attr("y", 15)
        .attr("transform", "rotate(-90)")
    
    var y2text = svg0.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("x", 45)
        .attr("y", -w0 +15)
        .attr("transform", "rotate(90)")

    x0text.text("개봉기준 주차").style("font-size", "11px");
    // y1text.text("관객수"); 
    // y2text.text("뉴스수"); 


// Get the data
d3.tsv(tsvFile, function(error, data) {
    data.forEach(function(d) {
        d.weekorder = +d.weekorder;
        d.att = +d.att;
        d.news = +d.news;
    });

    // Scale the range of the data
    x0.domain(d3.extent(data, function(d) { return d.weekorder; }));
    y0.domain([0, d3.max(data, function(d) {
        return Math.max(d.att); })]); 
    y1.domain([0, d3.max(data, function(d) { 
        return Math.max(d.news); })]);

    svg0.append("path")        // Add the valueline path.
        .style("stroke", colors0[0])
        .attr("d", valueline(data));

    svg0.append("path")        // Add the valueline2 path.
        .style("stroke", colors0[1])
        .attr("d", valueline2(data));

    svg0.append("g")            // Add the X Axis
        .attr("class", "x axis")
        .attr("transform", "translate(0," + h0 + ")")
        .call(xAxis0);

    svg0.append("g")
        .attr("class", "y axis")
        .style("fill", colors0[0])
        .call(yAxisLeft);   

    svg0.append("g")             
        .attr("class", "y axis")    
        .attr("transform", "translate(" + w0 + " ,0)")   
        .style("fill", colors0[1])       
        .call(yAxisRight);

    });
}
</script>




---

별개로, 데이터 시각화를 통한 웹에서의 스토리텔링이 필요하지 않다면 [Spotfire](http://spotfire.tipco.com)라는 매우 편리한 프로그램을 사용하는 것을 강추하는 바이다. 스팟파이어를 사용하면 비슷한 시각화 결과물을 몇 번의 클릭으로 만들어낼 수 있다. (그러나, 매우 비싸다.)




