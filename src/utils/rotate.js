export default function(cx, cy, x, y, a) {
  var r = (Math.PI / 180) * a,
      cos = Math.cos(r),
      sin = Math.sin(r),
      resx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
      resy = (cos * (y - cy)) - (sin * (x - cx)) + cy;
  return [resx, resy];
}
