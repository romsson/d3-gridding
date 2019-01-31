import * as d3Array from "d3-array";
import {margin} from "../utils/margin.js";

export default function(nodes, v) {

  var _valueX, _valueXmax;

  // Create random data if no value function has been set
  if(!v.valueX) {
    _valueX = function() { return Math.random(); }
    _valueXmax = 1;
  } else if(typeof v.valueX === "function" && typeof v.valueX(nodes[0]) === "string" && v.valueX(nodes[0]).indexOf("px") === v.valueX(nodes[0]).length - 2) {
    _valueX = function(d) { return +v.valueX(d).replace("px", ""); }
    _valueXmax = v.size[0];
  } else if(typeof v.valueX === "string") {
    _valueX = function(d) { return d[v.valueX]; }
    _valueXmax = d3Array.max(nodes, _valueX);
  } else {
    _valueX = v.valueX;
    _valueXmax = d3Array.max(nodes, _valueX);
  }

  v.x.domain([0, _valueXmax]).range([margin(v, "left") + v.padding, v.size[0] - margin(v, "right") - v.padding]);

  var _valueY, _valueYmax;

  // Same as for X, create random data for vertical axis
  if(!v.valueY) {
    _valueY = function() { return Math.random(); }
    _valueYmax = 1;
  } else if(typeof v.valueY === "function" && typeof v.valueY(nodes[0]) === "string" && v.valueY(nodes[0]).indexOf("px") === v.valueY(nodes[0]).length - 2) {
    _valueY = function(d) { return +v.valueY(d).replace("px", ""); }
    _valueYmax = v.size[1] - margin(v, "left");
  } else if(typeof v.valueY === "string") {
    _valueY = function(d) { return d[v.valueY]; }
    _valueYmax = d3Array.max(nodes, _valueY)
  } else {
    _valueY = v.valueY;
    _valueYmax = d3Array.max(nodes, v.valueY);
  }

  v.y.domain([0, _valueYmax]).range([margin(v, "top") + v.padding, v.size[1] - margin(v, "bottom") - v.padding]);

  var _valueWidth;

  if(!v.valueWidth) {
    _valueWidth = function() { return 1; }
    v.width.domain([0, nodes.length]);
  } else if(typeof v.valueWidth === "function" && typeof v.valueWidth(nodes[0]) === "string" && v.valueWidth(nodes[0]).indexOf("px") === v.valueWidth(nodes[0]).length - 2) {
    _valueWidth = function(d) { return +v.valueWidth(d).replace("px", ""); }
    v.width.domain([0, _valueXmax]);
  } else if(typeof v.valueWidth === "string") {
    _valueWidth = function(d) { return d[v.valueWidth]; }
    v.width.domain([0, _valueXmax]);
  } else if(typeof v.valueWidth === "number") { // proportion
    _valueWidth = function() { return v.valueWidth; }
    v.width.domain([0, v.size[0]]);
  } else { // function
    _valueWidth = v.valueWidth;
    v.width.domain([0, _valueXmax]);
  }
  v.width.range([0, v.size[0] - margin(v, "horizontal") - 2 * v.padding]);

  var _valueHeight;

  if(!v.valueHeight) {
    _valueHeight = function() { return 1; }
    v.height.domain([0, nodes.length]).range([0, v.size[1]]);
  } else if(typeof v.valueHeight === "function" && typeof v.valueHeight(nodes[0]) === "string" && v.valueHeight(nodes[0]).indexOf("px") === v.valueHeight(nodes[0]).length - 2) {
    _valueHeight = function(d) { return +v.valueHeight(d).replace("px", ""); }
    v.height.domain([0, _valueYmax]);
  } else if(typeof v.valueWidth === "string") { // pixels
    _valueHeight = function(d) { return d[v.valueHeight]; }
    v.height.domain([0, _valueYmax]);
  } else if(typeof v.valueWidth === "number") { // proportion
    _valueHeight = function() { return v.valueHeight; }
    v.height.domain([0, v.size[0]]);
  } else { // function
    _valueHeight = v.valueHeight;
    v.height.domain([0, _valueYmax]);
  }
  v.height.range([0, v.size[1] - margin(v, "vertical") - 2 * v.padding]);

  // Preveting overflows
  // v.x.range([0, v.size[0] - v.width(_valueWidth(nodes[0]))]);
  // v.width.range([0, v.size[0] - v.width(_valueWidth(nodes[0]))]);
  // v.y.range([0, v.size[1] - v.height(_valueHeight(nodes[0]))]);
  // v.height.range([0, v.size[1] - v.height(_valueHeight(nodes[0]))]);

  nodes.forEach(function(n) {


    n[v.__x] = v.x(_valueX(n)) + v.offset[0];
    n[v.__y] = v.y(_valueY(n)) + v.offset[1];

    n[v.__width] = v.width(_valueWidth(n));
    n[v.__height] = v.height(_valueHeight(n));

    n[v.__cx] = n[v.__x] + n[v.__width] / 2;
    n[v.__cy] = n[v.__y] + n[v.__height] / 2;

  });

  return nodes;
}
