// Based on https://github.com/c3js/c3/blob/master/c3.js#L7379-L8190
//
//SVGPathSeg API polyfill
//https://github.com/progers/pathseg
//
//This is a drop-in replacement for the SVGPathSeg and SVGPathSegList APIs that were removed from
//SVG2 (https://lists.w3.org/Archives/Public/www-svg/2015Jun/0044.html), including the latest spec
//changes which were implemented in Firefox 43 and Chrome 46.
//Chrome 48 removes these APIs, so this polyfill is required.

(function (){
    if (!global.window){
        if(typeof window !== 'undefined'){
            global.window = window;
        }
        else{
            global.window = {};
        }
    }
    if (!("SVGPathSeg" in global.window)) {
         // Spec: http://www.w3.org/TR/SVG11/single-page.html#paths-InterfaceSVGPathSeg
         global.SVGPathSeg = function(type, typeAsLetter, owningPathSegList) {
             this.pathSegType = type;
             this.pathSegTypeAsLetter = typeAsLetter;
             this._owningPathSegList = owningPathSegList;
         }

         global.SVGPathSeg.PATHSEG_UNKNOWN = 0;
         global.SVGPathSeg.PATHSEG_CLOSEPATH = 1;
         global.SVGPathSeg.PATHSEG_MOVETO_ABS = 2;
         global.SVGPathSeg.PATHSEG_MOVETO_REL = 3;
         global.SVGPathSeg.PATHSEG_LINETO_ABS = 4;
         global.SVGPathSeg.PATHSEG_LINETO_REL = 5;
         global.SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS = 6;
         global.SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL = 7;
         global.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS = 8;
         global.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL = 9;
         global.SVGPathSeg.PATHSEG_ARC_ABS = 10;
         global.SVGPathSeg.PATHSEG_ARC_REL = 11;
         global.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS = 12;
         global.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL = 13;
         global.SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS = 14;
         global.SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL = 15;
         global.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS = 16;
         global.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL = 17;
         global.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS = 18;
         global.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL = 19;

         // Notify owning PathSegList on any changes so they can be synchronized back to the path element.
         global.SVGPathSeg.prototype._segmentChanged = function() {
             if (this._owningPathSegList)
                 this._owningPathSegList.segmentChanged(this);
         }

         global.SVGPathSegClosePath = function(owningPathSegList) {
             SVGPathSeg.call(this, SVGPathSeg.PATHSEG_CLOSEPATH, "z", owningPathSegList);
         }
         global.SVGPathSegClosePath.prototype = Object.create(global.SVGPathSeg.prototype);
         global.SVGPathSegClosePath.prototype.toString = function() { return "[object SVGPathSegClosePath]"; }
         global.SVGPathSegClosePath.prototype._asPathString = function() { return this.pathSegTypeAsLetter; }
         global.SVGPathSegClosePath.prototype.clone = function() { return new SVGPathSegClosePath(undefined); }

         global.SVGPathSegMovetoAbs = function(owningPathSegList, x, y) {
             SVGPathSeg.call(this, SVGPathSeg.PATHSEG_MOVETO_ABS, "M", owningPathSegList);
             this._x = x;
             this._y = y;
         }
         global.SVGPathSegMovetoAbs.prototype = Object.create(global.SVGPathSeg.prototype);
         global.SVGPathSegMovetoAbs.prototype.toString = function() { return "[object SVGPathSegMovetoAbs]"; }
         global.SVGPathSegMovetoAbs.prototype._asPathString = function() { return this.pathSegTypeAsLetter + " " + this._x + " " + this._y; }
         global.SVGPathSegMovetoAbs.prototype.clone = function() { return new SVGPathSegMovetoAbs(undefined, this._x, this._y); }
         Object.defineProperty(global.SVGPathSegMovetoAbs.prototype, "x", { get: function() { return this._x; }, set: function(x) { this._x = x; this._segmentChanged(); }, enumerable: true });
         Object.defineProperty(global.SVGPathSegMovetoAbs.prototype, "y", { get: function() { return this._y; }, set: function(y) { this._y = y; this._segmentChanged(); }, enumerable: true });

         global.SVGPathSegMovetoRel = function(owningPathSegList, x, y) {
             SVGPathSeg.call(this, SVGPathSeg.PATHSEG_MOVETO_REL, "m", owningPathSegList);
             this._x = x;
             this._y = y;
         }
         global.SVGPathSegMovetoRel.prototype = Object.create(global.SVGPathSeg.prototype);
         global.SVGPathSegMovetoRel.prototype.toString = function() { return "[object SVGPathSegMovetoRel]"; }
         global.SVGPathSegMovetoRel.prototype._asPathString = function() { return this.pathSegTypeAsLetter + " " + this._x + " " + this._y; }
         global.SVGPathSegMovetoRel.prototype.clone = function() { return new SVGPathSegMovetoRel(undefined, this._x, this._y); }
         Object.defineProperty(global.SVGPathSegMovetoRel.prototype, "x", { get: function() { return this._x; }, set: function(x) { this._x = x; this._segmentChanged(); }, enumerable: true });
         Object.defineProperty(global.SVGPathSegMovetoRel.prototype, "y", { get: function() { return this._y; }, set: function(y) { this._y = y; this._segmentChanged(); }, enumerable: true });

         global.SVGPathSegLinetoAbs = function(owningPathSegList, x, y) {
             SVGPathSeg.call(this, SVGPathSeg.PATHSEG_LINETO_ABS, "L", owningPathSegList);
             this._x = x;
             this._y = y;
         }
         global.SVGPathSegLinetoAbs.prototype = Object.create(global.SVGPathSeg.prototype);
         global.SVGPathSegLinetoAbs.prototype.toString = function() { return "[object SVGPathSegLinetoAbs]"; }
         global.SVGPathSegLinetoAbs.prototype._asPathString = function() { return this.pathSegTypeAsLetter + " " + this._x + " " + this._y; }
         global.SVGPathSegLinetoAbs.prototype.clone = function() { return new SVGPathSegLinetoAbs(undefined, this._x, this._y); }
         Object.defineProperty(global.SVGPathSegLinetoAbs.prototype, "x", { get: function() { return this._x; }, set: function(x) { this._x = x; this._segmentChanged(); }, enumerable: true });
         Object.defineProperty(global.SVGPathSegLinetoAbs.prototype, "y", { get: function() { return this._y; }, set: function(y) { this._y = y; this._segmentChanged(); }, enumerable: true });

         global.SVGPathSegLinetoRel = function(owningPathSegList, x, y) {
             SVGPathSeg.call(this, SVGPathSeg.PATHSEG_LINETO_REL, "l", owningPathSegList);
             this._x = x;
             this._y = y;
         }
         global.SVGPathSegLinetoRel.prototype = Object.create(global.SVGPathSeg.prototype);
         global.SVGPathSegLinetoRel.prototype.toString = function() { return "[object SVGPathSegLinetoRel]"; }
         global.SVGPathSegLinetoRel.prototype._asPathString = function() { return this.pathSegTypeAsLetter + " " + this._x + " " + this._y; }
         global.SVGPathSegLinetoRel.prototype.clone = function() { return new SVGPathSegLinetoRel(undefined, this._x, this._y); }
         Object.defineProperty(global.SVGPathSegLinetoRel.prototype, "x", { get: function() { return this._x; }, set: function(x) { this._x = x; this._segmentChanged(); }, enumerable: true });
         Object.defineProperty(global.SVGPathSegLinetoRel.prototype, "y", { get: function() { return this._y; }, set: function(y) { this._y = y; this._segmentChanged(); }, enumerable: true });

         global.SVGPathSegCurvetoCubicAbs = function(owningPathSegList, x, y, x1, y1, x2, y2) {
             SVGPathSeg.call(this, SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS, "C", owningPathSegList);
             this._x = x;
             this._y = y;
             this._x1 = x1;
             this._y1 = y1;
             this._x2 = x2;
             this._y2 = y2;
         }
         global.SVGPathSegCurvetoCubicAbs.prototype = Object.create(global.SVGPathSeg.prototype);
         global.SVGPathSegCurvetoCubicAbs.prototype.toString = function() { return "[object SVGPathSegCurvetoCubicAbs]"; }
         global.SVGPathSegCurvetoCubicAbs.prototype._asPathString = function() { return this.pathSegTypeAsLetter + " " + this._x1 + " " + this._y1 + " " + this._x2 + " " + this._y2 + " " + this._x + " " + this._y; }
         global.SVGPathSegCurvetoCubicAbs.prototype.clone = function() { return new SVGPathSegCurvetoCubicAbs(undefined, this._x, this._y, this._x1, this._y1, this._x2, this._y2); }
         Object.defineProperty(global.SVGPathSegCurvetoCubicAbs.prototype, "x", { get: function() { return this._x; }, set: function(x) { this._x = x; this._segmentChanged(); }, enumerable: true });
         Object.defineProperty(global.SVGPathSegCurvetoCubicAbs.prototype, "y", { get: function() { return this._y; }, set: function(y) { this._y = y; this._segmentChanged(); }, enumerable: true });
         Object.defineProperty(global.SVGPathSegCurvetoCubicAbs.prototype, "x1", { get: function() { return this._x1; }, set: function(x1) { this._x1 = x1; this._segmentChanged(); }, enumerable: true });
         Object.defineProperty(global.SVGPathSegCurvetoCubicAbs.prototype, "y1", { get: function() { return this._y1; }, set: function(y1) { this._y1 = y1; this._segmentChanged(); }, enumerable: true });
         Object.defineProperty(global.SVGPathSegCurvetoCubicAbs.prototype, "x2", { get: function() { return this._x2; }, set: function(x2) { this._x2 = x2; this._segmentChanged(); }, enumerable: true });
         Object.defineProperty(global.SVGPathSegCurvetoCubicAbs.prototype, "y2", { get: function() { return this._y2; }, set: function(y2) { this._y2 = y2; this._segmentChanged(); }, enumerable: true });

         global.SVGPathSegCurvetoCubicRel = function(owningPathSegList, x, y, x1, y1, x2, y2) {
             SVGPathSeg.call(this, SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL, "c", owningPathSegList);
             this._x = x;
             this._y = y;
             this._x1 = x1;
             this._y1 = y1;
             this._x2 = x2;
             this._y2 = y2;
         }
         global.SVGPathSegCurvetoCubicRel.prototype = Object.create(global.SVGPathSeg.prototype);
         global.SVGPathSegCurvetoCubicRel.prototype.toString = function() { return "[object SVGPathSegCurvetoCubicRel]"; }
         global.SVGPathSegCurvetoCubicRel.prototype._asPathString = function() { return this.pathSegTypeAsLetter + " " + this._x1 + " " + this._y1 + " " + this._x2 + " " + this._y2 + " " + this._x + " " + this._y; }
         global.SVGPathSegCurvetoCubicRel.prototype.clone = function() { return new SVGPathSegCurvetoCubicRel(undefined, this._x, this._y, this._x1, this._y1, this._x2, this._y2); }
         Object.defineProperty(global.SVGPathSegCurvetoCubicRel.prototype, "x", { get: function() { return this._x; }, set: function(x) { this._x = x; this._segmentChanged(); }, enumerable: true });
         Object.defineProperty(global.SVGPathSegCurvetoCubicRel.prototype, "y", { get: function() { return this._y; }, set: function(y) { this._y = y; this._segmentChanged(); }, enumerable: true });
         Object.defineProperty(global.SVGPathSegCurvetoCubicRel.prototype, "x1", { get: function() { return this._x1; }, set: function(x1) { this._x1 = x1; this._segmentChanged(); }, enumerable: true });
         Object.defineProperty(global.SVGPathSegCurvetoCubicRel.prototype, "y1", { get: function() { return this._y1; }, set: function(y1) { this._y1 = y1; this._segmentChanged(); }, enumerable: true });
         Object.defineProperty(global.SVGPathSegCurvetoCubicRel.prototype, "x2", { get: function() { return this._x2; }, set: function(x2) { this._x2 = x2; this._segmentChanged(); }, enumerable: true });
         Object.defineProperty(global.SVGPathSegCurvetoCubicRel.prototype, "y2", { get: function() { return this._y2; }, set: function(y2) { this._y2 = y2; this._segmentChanged(); }, enumerable: true });

         global.SVGPathSegCurvetoQuadraticAbs = function(owningPathSegList, x, y, x1, y1) {
             SVGPathSeg.call(this, SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS, "Q", owningPathSegList);
             this._x = x;
             this._y = y;
             this._x1 = x1;
             this._y1 = y1;
         }
         global.SVGPathSegCurvetoQuadraticAbs.prototype = Object.create(global.SVGPathSeg.prototype);
         global.SVGPathSegCurvetoQuadraticAbs.prototype.toString = function() { return "[object SVGPathSegCurvetoQuadraticAbs]"; }
         global.SVGPathSegCurvetoQuadraticAbs.prototype._asPathString = function() { return this.pathSegTypeAsLetter + " " + this._x1 + " " + this._y1 + " " + this._x + " " + this._y; }
         global.SVGPathSegCurvetoQuadraticAbs.prototype.clone = function() { return new SVGPathSegCurvetoQuadraticAbs(undefined, this._x, this._y, this._x1, this._y1); }
         Object.defineProperty(global.SVGPathSegCurvetoQuadraticAbs.prototype, "x", { get: function() { return this._x; }, set: function(x) { this._x = x; this._segmentChanged(); }, enumerable: true });
         Object.defineProperty(global.SVGPathSegCurvetoQuadraticAbs.prototype, "y", { get: function() { return this._y; }, set: function(y) { this._y = y; this._segmentChanged(); }, enumerable: true });
         Object.defineProperty(global.SVGPathSegCurvetoQuadraticAbs.prototype, "x1", { get: function() { return this._x1; }, set: function(x1) { this._x1 = x1; this._segmentChanged(); }, enumerable: true });
         Object.defineProperty(global.SVGPathSegCurvetoQuadraticAbs.prototype, "y1", { get: function() { return this._y1; }, set: function(y1) { this._y1 = y1; this._segmentChanged(); }, enumerable: true });

         global.SVGPathSegCurvetoQuadraticRel = function(owningPathSegList, x, y, x1, y1) {
             SVGPathSeg.call(this, SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL, "q", owningPathSegList);
             this._x = x;
             this._y = y;
             this._x1 = x1;
             this._y1 = y1;
         }
         global.SVGPathSegCurvetoQuadraticRel.prototype = Object.create(global.SVGPathSeg.prototype);
         global.SVGPathSegCurvetoQuadraticRel.prototype.toString = function() { return "[object SVGPathSegCurvetoQuadraticRel]"; }
         global.SVGPathSegCurvetoQuadraticRel.prototype._asPathString = function() { return this.pathSegTypeAsLetter + " " + this._x1 + " " + this._y1 + " " + this._x + " " + this._y; }
         global.SVGPathSegCurvetoQuadraticRel.prototype.clone = function() { return new SVGPathSegCurvetoQuadraticRel(undefined, this._x, this._y, this._x1, this._y1); }
         Object.defineProperty(global.SVGPathSegCurvetoQuadraticRel.prototype, "x", { get: function() { return this._x; }, set: function(x) { this._x = x; this._segmentChanged(); }, enumerable: true });
         Object.defineProperty(global.SVGPathSegCurvetoQuadraticRel.prototype, "y", { get: function() { return this._y; }, set: function(y) { this._y = y; this._segmentChanged(); }, enumerable: true });
         Object.defineProperty(global.SVGPathSegCurvetoQuadraticRel.prototype, "x1", { get: function() { return this._x1; }, set: function(x1) { this._x1 = x1; this._segmentChanged(); }, enumerable: true });
         Object.defineProperty(global.SVGPathSegCurvetoQuadraticRel.prototype, "y1", { get: function() { return this._y1; }, set: function(y1) { this._y1 = y1; this._segmentChanged(); }, enumerable: true });

         global.SVGPathSegArcAbs = function(owningPathSegList, x, y, r1, r2, angle, largeArcFlag, sweepFlag) {
             SVGPathSeg.call(this, SVGPathSeg.PATHSEG_ARC_ABS, "A", owningPathSegList);
             this._x = x;
             this._y = y;
             this._r1 = r1;
             this._r2 = r2;
             this._angle = angle;
             this._largeArcFlag = largeArcFlag;
             this._sweepFlag = sweepFlag;
         }
         global.SVGPathSegArcAbs.prototype = Object.create(global.SVGPathSeg.prototype);
         global.SVGPathSegArcAbs.prototype.toString = function() { return "[object SVGPathSegArcAbs]"; }
         global.SVGPathSegArcAbs.prototype._asPathString = function() { return this.pathSegTypeAsLetter + " " + this._r1 + " " + this._r2 + " " + this._angle + " " + (this._largeArcFlag ? "1" : "0") + " " + (this._sweepFlag ? "1" : "0") + " " + this._x + " " + this._y; }
         global.SVGPathSegArcAbs.prototype.clone = function() { return new SVGPathSegArcAbs(undefined, this._x, this._y, this._r1, this._r2, this._angle, this._largeArcFlag, this._sweepFlag); }
         Object.defineProperty(global.SVGPathSegArcAbs.prototype, "x", { get: function() { return this._x; }, set: function(x) { this._x = x; this._segmentChanged(); }, enumerable: true });
         Object.defineProperty(global.SVGPathSegArcAbs.prototype, "y", { get: function() { return this._y; }, set: function(y) { this._y = y; this._segmentChanged(); }, enumerable: true });
         Object.defineProperty(global.SVGPathSegArcAbs.prototype, "r1", { get: function() { return this._r1; }, set: function(r1) { this._r1 = r1; this._segmentChanged(); }, enumerable: true });
         Object.defineProperty(global.SVGPathSegArcAbs.prototype, "r2", { get: function() { return this._r2; }, set: function(r2) { this._r2 = r2; this._segmentChanged(); }, enumerable: true });
         Object.defineProperty(global.SVGPathSegArcAbs.prototype, "angle", { get: function() { return this._angle; }, set: function(angle) { this._angle = angle; this._segmentChanged(); }, enumerable: true });
         Object.defineProperty(global.SVGPathSegArcAbs.prototype, "largeArcFlag", { get: function() { return this._largeArcFlag; }, set: function(largeArcFlag) { this._largeArcFlag = largeArcFlag; this._segmentChanged(); }, enumerable: true });
         Object.defineProperty(global.SVGPathSegArcAbs.prototype, "sweepFlag", { get: function() { return this._sweepFlag; }, set: function(sweepFlag) { this._sweepFlag = sweepFlag; this._segmentChanged(); }, enumerable: true });

         global.SVGPathSegArcRel = function(owningPathSegList, x, y, r1, r2, angle, largeArcFlag, sweepFlag) {
             SVGPathSeg.call(this, SVGPathSeg.PATHSEG_ARC_REL, "a", owningPathSegList);
             this._x = x;
             this._y = y;
             this._r1 = r1;
             this._r2 = r2;
             this._angle = angle;
             this._largeArcFlag = largeArcFlag;
             this._sweepFlag = sweepFlag;
         }
         global.SVGPathSegArcRel.prototype = Object.create(global.SVGPathSeg.prototype);
         global.SVGPathSegArcRel.prototype.toString = function() { return "[object SVGPathSegArcRel]"; }
         global.SVGPathSegArcRel.prototype._asPathString = function() { return this.pathSegTypeAsLetter + " " + this._r1 + " " + this._r2 + " " + this._angle + " " + (this._largeArcFlag ? "1" : "0") + " " + (this._sweepFlag ? "1" : "0") + " " + this._x + " " + this._y; }
         global.SVGPathSegArcRel.prototype.clone = function() { return new SVGPathSegArcRel(undefined, this._x, this._y, this._r1, this._r2, this._angle, this._largeArcFlag, this._sweepFlag); }
         Object.defineProperty(global.SVGPathSegArcRel.prototype, "x", { get: function() { return this._x; }, set: function(x) { this._x = x; this._segmentChanged(); }, enumerable: true });
         Object.defineProperty(global.SVGPathSegArcRel.prototype, "y", { get: function() { return this._y; }, set: function(y) { this._y = y; this._segmentChanged(); }, enumerable: true });
         Object.defineProperty(global.SVGPathSegArcRel.prototype, "r1", { get: function() { return this._r1; }, set: function(r1) { this._r1 = r1; this._segmentChanged(); }, enumerable: true });
         Object.defineProperty(global.SVGPathSegArcRel.prototype, "r2", { get: function() { return this._r2; }, set: function(r2) { this._r2 = r2; this._segmentChanged(); }, enumerable: true });
         Object.defineProperty(global.SVGPathSegArcRel.prototype, "angle", { get: function() { return this._angle; }, set: function(angle) { this._angle = angle; this._segmentChanged(); }, enumerable: true });
         Object.defineProperty(global.SVGPathSegArcRel.prototype, "largeArcFlag", { get: function() { return this._largeArcFlag; }, set: function(largeArcFlag) { this._largeArcFlag = largeArcFlag; this._segmentChanged(); }, enumerable: true });
         Object.defineProperty(global.SVGPathSegArcRel.prototype, "sweepFlag", { get: function() { return this._sweepFlag; }, set: function(sweepFlag) { this._sweepFlag = sweepFlag; this._segmentChanged(); }, enumerable: true });

         global.SVGPathSegLinetoHorizontalAbs = function(owningPathSegList, x) {
             SVGPathSeg.call(this, SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS, "H", owningPathSegList);
             this._x = x;
         }
         global.SVGPathSegLinetoHorizontalAbs.prototype = Object.create(global.SVGPathSeg.prototype);
         global.SVGPathSegLinetoHorizontalAbs.prototype.toString = function() { return "[object SVGPathSegLinetoHorizontalAbs]"; }
         global.SVGPathSegLinetoHorizontalAbs.prototype._asPathString = function() { return this.pathSegTypeAsLetter + " " + this._x; }
         global.SVGPathSegLinetoHorizontalAbs.prototype.clone = function() { return new SVGPathSegLinetoHorizontalAbs(undefined, this._x); }
         Object.defineProperty(global.SVGPathSegLinetoHorizontalAbs.prototype, "x", { get: function() { return this._x; }, set: function(x) { this._x = x; this._segmentChanged(); }, enumerable: true });

         global.SVGPathSegLinetoHorizontalRel = function(owningPathSegList, x) {
             SVGPathSeg.call(this, SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL, "h", owningPathSegList);
             this._x = x;
         }
         global.SVGPathSegLinetoHorizontalRel.prototype = Object.create(global.SVGPathSeg.prototype);
         global.SVGPathSegLinetoHorizontalRel.prototype.toString = function() { return "[object SVGPathSegLinetoHorizontalRel]"; }
         global.SVGPathSegLinetoHorizontalRel.prototype._asPathString = function() { return this.pathSegTypeAsLetter + " " + this._x; }
         global.SVGPathSegLinetoHorizontalRel.prototype.clone = function() { return new SVGPathSegLinetoHorizontalRel(undefined, this._x); }
         Object.defineProperty(global.SVGPathSegLinetoHorizontalRel.prototype, "x", { get: function() { return this._x; }, set: function(x) { this._x = x; this._segmentChanged(); }, enumerable: true });

         global.SVGPathSegLinetoVerticalAbs = function(owningPathSegList, y) {
             SVGPathSeg.call(this, SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS, "V", owningPathSegList);
             this._y = y;
         }
         global.SVGPathSegLinetoVerticalAbs.prototype = Object.create(global.SVGPathSeg.prototype);
         global.SVGPathSegLinetoVerticalAbs.prototype.toString = function() { return "[object SVGPathSegLinetoVerticalAbs]"; }
         global.SVGPathSegLinetoVerticalAbs.prototype._asPathString = function() { return this.pathSegTypeAsLetter + " " + this._y; }
         global.SVGPathSegLinetoVerticalAbs.prototype.clone = function() { return new SVGPathSegLinetoVerticalAbs(undefined, this._y); }
         Object.defineProperty(global.SVGPathSegLinetoVerticalAbs.prototype, "y", { get: function() { return this._y; }, set: function(y) { this._y = y; this._segmentChanged(); }, enumerable: true });

         global.SVGPathSegLinetoVerticalRel = function(owningPathSegList, y) {
             SVGPathSeg.call(this, SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL, "v", owningPathSegList);
             this._y = y;
         }
         global.SVGPathSegLinetoVerticalRel.prototype = Object.create(global.SVGPathSeg.prototype);
         global.SVGPathSegLinetoVerticalRel.prototype.toString = function() { return "[object SVGPathSegLinetoVerticalRel]"; }
         global.SVGPathSegLinetoVerticalRel.prototype._asPathString = function() { return this.pathSegTypeAsLetter + " " + this._y; }
         global.SVGPathSegLinetoVerticalRel.prototype.clone = function() { return new SVGPathSegLinetoVerticalRel(undefined, this._y); }
         Object.defineProperty(global.SVGPathSegLinetoVerticalRel.prototype, "y", { get: function() { return this._y; }, set: function(y) { this._y = y; this._segmentChanged(); }, enumerable: true });

         global.SVGPathSegCurvetoCubicSmoothAbs = function(owningPathSegList, x, y, x2, y2) {
             SVGPathSeg.call(this, SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS, "S", owningPathSegList);
             this._x = x;
             this._y = y;
             this._x2 = x2;
             this._y2 = y2;
         }
         global.SVGPathSegCurvetoCubicSmoothAbs.prototype = Object.create(global.SVGPathSeg.prototype);
         global.SVGPathSegCurvetoCubicSmoothAbs.prototype.toString = function() { return "[object SVGPathSegCurvetoCubicSmoothAbs]"; }
         global.SVGPathSegCurvetoCubicSmoothAbs.prototype._asPathString = function() { return this.pathSegTypeAsLetter + " " + this._x2 + " " + this._y2 + " " + this._x + " " + this._y; }
         global.SVGPathSegCurvetoCubicSmoothAbs.prototype.clone = function() { return new SVGPathSegCurvetoCubicSmoothAbs(undefined, this._x, this._y, this._x2, this._y2); }
         Object.defineProperty(global.SVGPathSegCurvetoCubicSmoothAbs.prototype, "x", { get: function() { return this._x; }, set: function(x) { this._x = x; this._segmentChanged(); }, enumerable: true });
         Object.defineProperty(global.SVGPathSegCurvetoCubicSmoothAbs.prototype, "y", { get: function() { return this._y; }, set: function(y) { this._y = y; this._segmentChanged(); }, enumerable: true });
         Object.defineProperty(global.SVGPathSegCurvetoCubicSmoothAbs.prototype, "x2", { get: function() { return this._x2; }, set: function(x2) { this._x2 = x2; this._segmentChanged(); }, enumerable: true });
         Object.defineProperty(global.SVGPathSegCurvetoCubicSmoothAbs.prototype, "y2", { get: function() { return this._y2; }, set: function(y2) { this._y2 = y2; this._segmentChanged(); }, enumerable: true });

         global.SVGPathSegCurvetoCubicSmoothRel = function(owningPathSegList, x, y, x2, y2) {
             SVGPathSeg.call(this, SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL, "s", owningPathSegList);
             this._x = x;
             this._y = y;
             this._x2 = x2;
             this._y2 = y2;
         }
         global.SVGPathSegCurvetoCubicSmoothRel.prototype = Object.create(global.SVGPathSeg.prototype);
         global.SVGPathSegCurvetoCubicSmoothRel.prototype.toString = function() { return "[object SVGPathSegCurvetoCubicSmoothRel]"; }
         global.SVGPathSegCurvetoCubicSmoothRel.prototype._asPathString = function() { return this.pathSegTypeAsLetter + " " + this._x2 + " " + this._y2 + " " + this._x + " " + this._y; }
         global.SVGPathSegCurvetoCubicSmoothRel.prototype.clone = function() { return new SVGPathSegCurvetoCubicSmoothRel(undefined, this._x, this._y, this._x2, this._y2); }
         Object.defineProperty(global.SVGPathSegCurvetoCubicSmoothRel.prototype, "x", { get: function() { return this._x; }, set: function(x) { this._x = x; this._segmentChanged(); }, enumerable: true });
         Object.defineProperty(global.SVGPathSegCurvetoCubicSmoothRel.prototype, "y", { get: function() { return this._y; }, set: function(y) { this._y = y; this._segmentChanged(); }, enumerable: true });
         Object.defineProperty(global.SVGPathSegCurvetoCubicSmoothRel.prototype, "x2", { get: function() { return this._x2; }, set: function(x2) { this._x2 = x2; this._segmentChanged(); }, enumerable: true });
         Object.defineProperty(global.SVGPathSegCurvetoCubicSmoothRel.prototype, "y2", { get: function() { return this._y2; }, set: function(y2) { this._y2 = y2; this._segmentChanged(); }, enumerable: true });

         global.SVGPathSegCurvetoQuadraticSmoothAbs = function(owningPathSegList, x, y) {
             SVGPathSeg.call(this, SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS, "T", owningPathSegList);
             this._x = x;
             this._y = y;
         }
         global.SVGPathSegCurvetoQuadraticSmoothAbs.prototype = Object.create(global.SVGPathSeg.prototype);
         global.SVGPathSegCurvetoQuadraticSmoothAbs.prototype.toString = function() { return "[object SVGPathSegCurvetoQuadraticSmoothAbs]"; }
         global.SVGPathSegCurvetoQuadraticSmoothAbs.prototype._asPathString = function() { return this.pathSegTypeAsLetter + " " + this._x + " " + this._y; }
         global.SVGPathSegCurvetoQuadraticSmoothAbs.prototype.clone = function() { return new SVGPathSegCurvetoQuadraticSmoothAbs(undefined, this._x, this._y); }
         Object.defineProperty(global.SVGPathSegCurvetoQuadraticSmoothAbs.prototype, "x", { get: function() { return this._x; }, set: function(x) { this._x = x; this._segmentChanged(); }, enumerable: true });
         Object.defineProperty(global.SVGPathSegCurvetoQuadraticSmoothAbs.prototype, "y", { get: function() { return this._y; }, set: function(y) { this._y = y; this._segmentChanged(); }, enumerable: true });

         global.SVGPathSegCurvetoQuadraticSmoothRel = function(owningPathSegList, x, y) {
             SVGPathSeg.call(this, SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL, "t", owningPathSegList);
             this._x = x;
             this._y = y;
         }
         global.SVGPathSegCurvetoQuadraticSmoothRel.prototype = Object.create(global.SVGPathSeg.prototype);
         global.SVGPathSegCurvetoQuadraticSmoothRel.prototype.toString = function() { return "[object SVGPathSegCurvetoQuadraticSmoothRel]"; }
         global.SVGPathSegCurvetoQuadraticSmoothRel.prototype._asPathString = function() { return this.pathSegTypeAsLetter + " " + this._x + " " + this._y; }
         global.SVGPathSegCurvetoQuadraticSmoothRel.prototype.clone = function() { return new SVGPathSegCurvetoQuadraticSmoothRel(undefined, this._x, this._y); }
         Object.defineProperty(global.SVGPathSegCurvetoQuadraticSmoothRel.prototype, "x", { get: function() { return this._x; }, set: function(x) { this._x = x; this._segmentChanged(); }, enumerable: true });
         Object.defineProperty(global.SVGPathSegCurvetoQuadraticSmoothRel.prototype, "y", { get: function() { return this._y; }, set: function(y) { this._y = y; this._segmentChanged(); }, enumerable: true });

        // TODO: Fix whatever this is
        global.SVGPathElement = function() {}

         // Add createSVGPathSeg* functions to SVGPathElement.
         // Spec: http://www.w3.org/TR/SVG11/single-page.html#paths-InterfaceSVGPathElement.
         global.SVGPathElement.prototype.createSVGPathSegClosePath = function() { return new SVGPathSegClosePath(undefined); }
         global.SVGPathElement.prototype.createSVGPathSegMovetoAbs = function(x, y) { return new SVGPathSegMovetoAbs(undefined, x, y); }
         global.SVGPathElement.prototype.createSVGPathSegMovetoRel = function(x, y) { return new SVGPathSegMovetoRel(undefined, x, y); }
         global.SVGPathElement.prototype.createSVGPathSegLinetoAbs = function(x, y) { return new SVGPathSegLinetoAbs(undefined, x, y); }
         global.SVGPathElement.prototype.createSVGPathSegLinetoRel = function(x, y) { return new SVGPathSegLinetoRel(undefined, x, y); }
         global.SVGPathElement.prototype.createSVGPathSegCurvetoCubicAbs = function(x, y, x1, y1, x2, y2) { return new SVGPathSegCurvetoCubicAbs(undefined, x, y, x1, y1, x2, y2); }
         global.SVGPathElement.prototype.createSVGPathSegCurvetoCubicRel = function(x, y, x1, y1, x2, y2) { return new SVGPathSegCurvetoCubicRel(undefined, x, y, x1, y1, x2, y2); }
         global.SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticAbs = function(x, y, x1, y1) { return new SVGPathSegCurvetoQuadraticAbs(undefined, x, y, x1, y1); }
         global.SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticRel = function(x, y, x1, y1) { return new SVGPathSegCurvetoQuadraticRel(undefined, x, y, x1, y1); }
         global.SVGPathElement.prototype.createSVGPathSegArcAbs = function(x, y, r1, r2, angle, largeArcFlag, sweepFlag) { return new SVGPathSegArcAbs(undefined, x, y, r1, r2, angle, largeArcFlag, sweepFlag); }
         global.SVGPathElement.prototype.createSVGPathSegArcRel = function(x, y, r1, r2, angle, largeArcFlag, sweepFlag) { return new SVGPathSegArcRel(undefined, x, y, r1, r2, angle, largeArcFlag, sweepFlag); }
         global.SVGPathElement.prototype.createSVGPathSegLinetoHorizontalAbs = function(x) { return new SVGPathSegLinetoHorizontalAbs(undefined, x); }
         global.SVGPathElement.prototype.createSVGPathSegLinetoHorizontalRel = function(x) { return new SVGPathSegLinetoHorizontalRel(undefined, x); }
         global.SVGPathElement.prototype.createSVGPathSegLinetoVerticalAbs = function(y) { return new SVGPathSegLinetoVerticalAbs(undefined, y); }
         global.SVGPathElement.prototype.createSVGPathSegLinetoVerticalRel = function(y) { return new SVGPathSegLinetoVerticalRel(undefined, y); }
         global.SVGPathElement.prototype.createSVGPathSegCurvetoCubicSmoothAbs = function(x, y, x2, y2) { return new SVGPathSegCurvetoCubicSmoothAbs(undefined, x, y, x2, y2); }
         global.SVGPathElement.prototype.createSVGPathSegCurvetoCubicSmoothRel = function(x, y, x2, y2) { return new SVGPathSegCurvetoCubicSmoothRel(undefined, x, y, x2, y2); }
         global.SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticSmoothAbs = function(x, y) { return new SVGPathSegCurvetoQuadraticSmoothAbs(undefined, x, y); }
         global.SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticSmoothRel = function(x, y) { return new SVGPathSegCurvetoQuadraticSmoothRel(undefined, x, y); }
     }

     if (!("SVGPathSegList" in global.window)) {
         // Spec: http://www.w3.org/TR/SVG11/single-page.html#paths-InterfaceSVGPathSegList
         global.SVGPathSegList = function(pathElement) {
             this._pathElement = pathElement;
             this._list = this._parsePath(this._pathElement.getAttribute("d"));

             // Use a MutationObserver to catch changes to the path's "d" attribute.
             this._mutationObserverConfig = { "attributes": true, "attributeFilter": ["d"] };
             this._pathElementMutationObserver = new MutationObserver(this._updateListFromPathMutations.bind(this));
             this._pathElementMutationObserver.observe(this._pathElement, this._mutationObserverConfig);
         }

         // Process any pending mutations to the path element and update the list as needed.
         // This should be the first call of all public functions and is needed because
         // MutationObservers are not synchronous so we can have pending asynchronous mutations.
         global.SVGPathSegList.prototype._checkPathSynchronizedToList = function() {
             this._updateListFromPathMutations(this._pathElementMutationObserver.takeRecords());
         }

         global.SVGPathSegList.prototype._updateListFromPathMutations = function(mutationRecords) {
             if (!this._pathElement)
                 return;
             var hasPathMutations = false;
             mutationRecords.forEach(function(record) {
                 if (record.attributeName == "d")
                     hasPathMutations = true;
             });
             if (hasPathMutations)
                 this._list = this._parsePath(this._pathElement.getAttribute("d"));
         }

         // Serialize the list and update the path's 'd' attribute.
         global.SVGPathSegList.prototype._writeListToPath = function() {
             this._pathElementMutationObserver.disconnect();
             this._pathElement.setAttribute("d", SVGPathSegList._pathSegArrayAsString(this._list));
             this._pathElementMutationObserver.observe(this._pathElement, this._mutationObserverConfig);
         }

         // When a path segment changes the list needs to be synchronized back to the path element.
         global.SVGPathSegList.prototype.segmentChanged = function(pathSeg) {
             this._writeListToPath();
         }

         global.SVGPathSegList.prototype.clear = function() {
             this._checkPathSynchronizedToList();

             this._list.forEach(function(pathSeg) {
                 pathSeg._owningPathSegList = null;
             });
             this._list = [];
             this._writeListToPath();
         }

         global.SVGPathSegList.prototype.initialize = function(newItem) {
             this._checkPathSynchronizedToList();

             this._list = [newItem];
             newItem._owningPathSegList = this;
             this._writeListToPath();
             return newItem;
         }

         global.SVGPathSegList.prototype._checkValidIndex = function(index) {
             if (isNaN(index) || index < 0 || index >= this.numberOfItems)
                 throw "INDEX_SIZE_ERR";
         }

         global.SVGPathSegList.prototype.getItem = function(index) {
             this._checkPathSynchronizedToList();

             this._checkValidIndex(index);
             return this._list[index];
         }

         global.SVGPathSegList.prototype.insertItemBefore = function(newItem, index) {
             this._checkPathSynchronizedToList();

             // Spec: If the index is greater than or equal to numberOfItems, then the new item is appended to the end of the list.
             if (index > this.numberOfItems)
                 index = this.numberOfItems;
             if (newItem._owningPathSegList) {
                 // SVG2 spec says to make a copy.
                 newItem = newItem.clone();
             }
             this._list.splice(index, 0, newItem);
             newItem._owningPathSegList = this;
             this._writeListToPath();
             return newItem;
         }

         global.SVGPathSegList.prototype.replaceItem = function(newItem, index) {
             this._checkPathSynchronizedToList();

             if (newItem._owningPathSegList) {
                 // SVG2 spec says to make a copy.
                 newItem = newItem.clone();
             }
             this._checkValidIndex(index);
             this._list[index] = newItem;
             newItem._owningPathSegList = this;
             this._writeListToPath();
             return newItem;
         }

         global.SVGPathSegList.prototype.removeItem = function(index) {
             this._checkPathSynchronizedToList();

             this._checkValidIndex(index);
             var item = this._list[index];
             this._list.splice(index, 1);
             this._writeListToPath();
             return item;
         }

         global.SVGPathSegList.prototype.appendItem = function(newItem) {
             this._checkPathSynchronizedToList();

             if (newItem._owningPathSegList) {
                 // SVG2 spec says to make a copy.
                 newItem = newItem.clone();
             }
             this._list.push(newItem);
             newItem._owningPathSegList = this;
             // TODO: Optimize this to just append to the existing attribute.
             this._writeListToPath();
             return newItem;
         }

         SVGPathSegList._pathSegArrayAsString = function(pathSegArray) {
             var string = "";
             var first = true;
             pathSegArray.forEach(function(pathSeg) {
                 if (first) {
                     first = false;
                     string += pathSeg._asPathString();
                 } else {
                     string += " " + pathSeg._asPathString();
                 }
             });
             return string;
         }

         // This closely follows SVGPathParser::parsePath from Source/core/svg/SVGPathParser.cpp.
         global.SVGPathSegList.prototype._parsePath = function(string) {
             if (!string || string.length == 0)
                 return [];

             var owningPathSegList = this;

             var Builder = function() {
                 this.pathSegList = [];
             }

             Builder.prototype.appendSegment = function(pathSeg) {
                 this.pathSegList.push(pathSeg);
             }

             var Source = function(string) {
                 this._string = string;
                 this._currentIndex = 0;
                 this._endIndex = this._string.length;
                 this._previousCommand = SVGPathSeg.PATHSEG_UNKNOWN;

                 this._skipOptionalSpaces();
             }

             Source.prototype._isCurrentSpace = function() {
                 var character = this._string[this._currentIndex];
                 return character <= " " && (character == " " || character == "\n" || character == "\t" || character == "\r" || character == "\f");
             }

             Source.prototype._skipOptionalSpaces = function() {
                 while (this._currentIndex < this._endIndex && this._isCurrentSpace())
                     this._currentIndex++;
                 return this._currentIndex < this._endIndex;
             }

             Source.prototype._skipOptionalSpacesOrDelimiter = function() {
                 if (this._currentIndex < this._endIndex && !this._isCurrentSpace() && this._string.charAt(this._currentIndex) != ",")
                     return false;
                 if (this._skipOptionalSpaces()) {
                     if (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) == ",") {
                         this._currentIndex++;
                         this._skipOptionalSpaces();
                     }
                 }
                 return this._currentIndex < this._endIndex;
             }

             Source.prototype.hasMoreData = function() {
                 return this._currentIndex < this._endIndex;
             }

             Source.prototype.peekSegmentType = function() {
                 var lookahead = this._string[this._currentIndex];
                 return this._pathSegTypeFromChar(lookahead);
             }

             Source.prototype._pathSegTypeFromChar = function(lookahead) {
                 switch (lookahead) {
                 case "Z":
                 case "z":
                     return SVGPathSeg.PATHSEG_CLOSEPATH;
                 case "M":
                     return SVGPathSeg.PATHSEG_MOVETO_ABS;
                 case "m":
                     return SVGPathSeg.PATHSEG_MOVETO_REL;
                 case "L":
                     return SVGPathSeg.PATHSEG_LINETO_ABS;
                 case "l":
                     return SVGPathSeg.PATHSEG_LINETO_REL;
                 case "C":
                     return SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS;
                 case "c":
                     return SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL;
                 case "Q":
                     return SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS;
                 case "q":
                     return SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL;
                 case "A":
                     return SVGPathSeg.PATHSEG_ARC_ABS;
                 case "a":
                     return SVGPathSeg.PATHSEG_ARC_REL;
                 case "H":
                     return SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS;
                 case "h":
                     return SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL;
                 case "V":
                     return SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS;
                 case "v":
                     return SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL;
                 case "S":
                     return SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS;
                 case "s":
                     return SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL;
                 case "T":
                     return SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS;
                 case "t":
                     return SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL;
                 default:
                     return SVGPathSeg.PATHSEG_UNKNOWN;
                 }
             }

             Source.prototype._nextCommandHelper = function(lookahead, previousCommand) {
                 // Check for remaining coordinates in the current command.
                 if ((lookahead == "+" || lookahead == "-" || lookahead == "." || (lookahead >= "0" && lookahead <= "9")) && previousCommand != SVGPathSeg.PATHSEG_CLOSEPATH) {
                     if (previousCommand == SVGPathSeg.PATHSEG_MOVETO_ABS)
                         return SVGPathSeg.PATHSEG_LINETO_ABS;
                     if (previousCommand == SVGPathSeg.PATHSEG_MOVETO_REL)
                         return SVGPathSeg.PATHSEG_LINETO_REL;
                     return previousCommand;
                 }
                 return SVGPathSeg.PATHSEG_UNKNOWN;
             }

             Source.prototype.initialCommandIsMoveTo = function() {
                 // If the path is empty it is still valid, so return true.
                 if (!this.hasMoreData())
                     return true;
                 var command = this.peekSegmentType();
                 // Path must start with moveTo.
                 return command == SVGPathSeg.PATHSEG_MOVETO_ABS || command == SVGPathSeg.PATHSEG_MOVETO_REL;
             }

             // Parse a number from an SVG path. This very closely follows genericParseNumber(...) from Source/core/svg/SVGParserUtilities.cpp.
             // Spec: http://www.w3.org/TR/SVG11/single-page.html#paths-PathDataBNF
             Source.prototype._parseNumber = function() {
                 var exponent = 0;
                 var integer = 0;
                 var frac = 1;
                 var decimal = 0;
                 var sign = 1;
                 var expsign = 1;

                 var startIndex = this._currentIndex;

                 this._skipOptionalSpaces();

                 // Read the sign.
                 if (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) == "+")
                     this._currentIndex++;
                 else if (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) == "-") {
                     this._currentIndex++;
                     sign = -1;
                 }

                 if (this._currentIndex == this._endIndex || ((this._string.charAt(this._currentIndex) < "0" || this._string.charAt(this._currentIndex) > "9") && this._string.charAt(this._currentIndex) != "."))
                     // The first character of a number must be one of [0-9+-.].
                     return undefined;

                 // Read the integer part, build right-to-left.
                 var startIntPartIndex = this._currentIndex;
                 while (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) >= "0" && this._string.charAt(this._currentIndex) <= "9")
                     this._currentIndex++; // Advance to first non-digit.

                 if (this._currentIndex != startIntPartIndex) {
                     var scanIntPartIndex = this._currentIndex - 1;
                     var multiplier = 1;
                     while (scanIntPartIndex >= startIntPartIndex) {
                         integer += multiplier * (this._string.charAt(scanIntPartIndex--) - "0");
                         multiplier *= 10;
                     }
                 }

                 // Read the decimals.
                 if (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) == ".") {
                     this._currentIndex++;

                     // There must be a least one digit following the .
                     if (this._currentIndex >= this._endIndex || this._string.charAt(this._currentIndex) < "0" || this._string.charAt(this._currentIndex) > "9")
                         return undefined;
                     while (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) >= "0" && this._string.charAt(this._currentIndex) <= "9")
                         decimal += (this._string.charAt(this._currentIndex++) - "0") * (frac *= 0.1);
                 }

                 // Read the exponent part.
                 if (this._currentIndex != startIndex && this._currentIndex + 1 < this._endIndex && (this._string.charAt(this._currentIndex) == "e" || this._string.charAt(this._currentIndex) == "E") && (this._string.charAt(this._currentIndex + 1) != "x" && this._string.charAt(this._currentIndex + 1) != "m")) {
                     this._currentIndex++;

                     // Read the sign of the exponent.
                     if (this._string.charAt(this._currentIndex) == "+") {
                         this._currentIndex++;
                     } else if (this._string.charAt(this._currentIndex) == "-") {
                         this._currentIndex++;
                         expsign = -1;
                     }

                     // There must be an exponent.
                     if (this._currentIndex >= this._endIndex || this._string.charAt(this._currentIndex) < "0" || this._string.charAt(this._currentIndex) > "9")
                         return undefined;

                     while (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) >= "0" && this._string.charAt(this._currentIndex) <= "9") {
                         exponent *= 10;
                         exponent += (this._string.charAt(this._currentIndex) - "0");
                         this._currentIndex++;
                     }
                 }

                 var number = integer + decimal;
                 number *= sign;

                 if (exponent)
                     number *= Math.pow(10, expsign * exponent);

                 if (startIndex == this._currentIndex)
                     return undefined;

                 this._skipOptionalSpacesOrDelimiter();

                 return number;
             }

             Source.prototype._parseArcFlag = function() {
                 if (this._currentIndex >= this._endIndex)
                     return undefined;
                 var flag = false;
                 var flagChar = this._string.charAt(this._currentIndex++);
                 if (flagChar == "0")
                     flag = false;
                 else if (flagChar == "1")
                     flag = true;
                 else
                     return undefined;

                 this._skipOptionalSpacesOrDelimiter();
                 return flag;
             }

             Source.prototype.parseSegment = function() {
                 var lookahead = this._string[this._currentIndex];
                 var command = this._pathSegTypeFromChar(lookahead);
                 if (command == SVGPathSeg.PATHSEG_UNKNOWN) {
                     // Possibly an implicit command. Not allowed if this is the first command.
                     if (this._previousCommand == SVGPathSeg.PATHSEG_UNKNOWN)
                         return null;
                     command = this._nextCommandHelper(lookahead, this._previousCommand);
                     if (command == SVGPathSeg.PATHSEG_UNKNOWN)
                         return null;
                 } else {
                     this._currentIndex++;
                 }

                 this._previousCommand = command;

                 switch (command) {
                 case SVGPathSeg.PATHSEG_MOVETO_REL:
                     return new SVGPathSegMovetoRel(owningPathSegList, this._parseNumber(), this._parseNumber());
                 case SVGPathSeg.PATHSEG_MOVETO_ABS:
                     return new SVGPathSegMovetoAbs(owningPathSegList, this._parseNumber(), this._parseNumber());
                 case SVGPathSeg.PATHSEG_LINETO_REL:
                     return new SVGPathSegLinetoRel(owningPathSegList, this._parseNumber(), this._parseNumber());
                 case SVGPathSeg.PATHSEG_LINETO_ABS:
                     return new SVGPathSegLinetoAbs(owningPathSegList, this._parseNumber(), this._parseNumber());
                 case SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL:
                     return new SVGPathSegLinetoHorizontalRel(owningPathSegList, this._parseNumber());
                 case SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS:
                     return new SVGPathSegLinetoHorizontalAbs(owningPathSegList, this._parseNumber());
                 case SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL:
                     return new SVGPathSegLinetoVerticalRel(owningPathSegList, this._parseNumber());
                 case SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS:
                     return new SVGPathSegLinetoVerticalAbs(owningPathSegList, this._parseNumber());
                 case SVGPathSeg.PATHSEG_CLOSEPATH:
                     this._skipOptionalSpaces();
                     return new SVGPathSegClosePath(owningPathSegList);
                 case SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL:
                     var points = {x1: this._parseNumber(), y1: this._parseNumber(), x2: this._parseNumber(), y2: this._parseNumber(), x: this._parseNumber(), y: this._parseNumber()};
                     return new SVGPathSegCurvetoCubicRel(owningPathSegList, points.x, points.y, points.x1, points.y1, points.x2, points.y2);
                 case SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS:
                     var points = {x1: this._parseNumber(), y1: this._parseNumber(), x2: this._parseNumber(), y2: this._parseNumber(), x: this._parseNumber(), y: this._parseNumber()};
                     return new SVGPathSegCurvetoCubicAbs(owningPathSegList, points.x, points.y, points.x1, points.y1, points.x2, points.y2);
                 case SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL:
                     var points = {x2: this._parseNumber(), y2: this._parseNumber(), x: this._parseNumber(), y: this._parseNumber()};
                     return new SVGPathSegCurvetoCubicSmoothRel(owningPathSegList, points.x, points.y, points.x2, points.y2);
                 case SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS:
                     var points = {x2: this._parseNumber(), y2: this._parseNumber(), x: this._parseNumber(), y: this._parseNumber()};
                     return new SVGPathSegCurvetoCubicSmoothAbs(owningPathSegList, points.x, points.y, points.x2, points.y2);
                 case SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL:
                     var points = {x1: this._parseNumber(), y1: this._parseNumber(), x: this._parseNumber(), y: this._parseNumber()};
                     return new SVGPathSegCurvetoQuadraticRel(owningPathSegList, points.x, points.y, points.x1, points.y1);
                 case SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS:
                     var points = {x1: this._parseNumber(), y1: this._parseNumber(), x: this._parseNumber(), y: this._parseNumber()};
                     return new SVGPathSegCurvetoQuadraticAbs(owningPathSegList, points.x, points.y, points.x1, points.y1);
                 case SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL:
                     return new SVGPathSegCurvetoQuadraticSmoothRel(owningPathSegList, this._parseNumber(), this._parseNumber());
                 case SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS:
                     return new SVGPathSegCurvetoQuadraticSmoothAbs(owningPathSegList, this._parseNumber(), this._parseNumber());
                 case SVGPathSeg.PATHSEG_ARC_REL:
                     var points = {x1: this._parseNumber(), y1: this._parseNumber(), arcAngle: this._parseNumber(), arcLarge: this._parseArcFlag(), arcSweep: this._parseArcFlag(), x: this._parseNumber(), y: this._parseNumber()};
                     return new SVGPathSegArcRel(owningPathSegList, points.x, points.y, points.x1, points.y1, points.arcAngle, points.arcLarge, points.arcSweep);
                 case SVGPathSeg.PATHSEG_ARC_ABS:
                     var points = {x1: this._parseNumber(), y1: this._parseNumber(), arcAngle: this._parseNumber(), arcLarge: this._parseArcFlag(), arcSweep: this._parseArcFlag(), x: this._parseNumber(), y: this._parseNumber()};
                     return new SVGPathSegArcAbs(owningPathSegList, points.x, points.y, points.x1, points.y1, points.arcAngle, points.arcLarge, points.arcSweep);
                 default:
                     throw "Unknown path seg type."
                 }
             }

             var builder = new Builder();
             var source = new Source(string);

             if (!source.initialCommandIsMoveTo())
                 return [];
             while (source.hasMoreData()) {
                 var pathSeg = source.parseSegment();
                 if (!pathSeg)
                     return [];
                 builder.appendSegment(pathSeg);
             }

             return builder.pathSegList;
         }
     }
}());