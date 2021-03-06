//Colors are represented by an HSL value
//HSL represents hue or color
//Saturation refering to distance from white (The center being grey)
//and lightness refering o distance from black
//On a cylinder model the hue is the position in degrees
//The lightness is the radius and hte lightness the height
class Color {
  constructor(hue, saturation, lightness) {
    this.hue = hue;
    this.saturation = saturation;
    this.lightness = lightness;
  }

  //Find the color complement
  findComplement() {
    //The complement lies on the other end of the circle
    //Adding 180 degrees should yield the new angle
    var complementHue = this.hue + 180;
		complementHue %= 360;
		return [new Color(complementHue, this.saturation, this.lightness)];
  }

	//Find monochromatic colors
	findMonochromatic() {
		//Monochromatic colors are the same hue with differing
		//saturation and lightness levels
		//Generated by multiplying and modding saturation and lightness by 1.2
		return [new Color(this.hue, (this.saturation * 1.2) % 100, this.lightness), new Color (this.hue, this.saturation, (this.lightness * 1.2) % 100)];
	}

  //Find a pair of analagous colors
	findAnalagous() {
		//Analagous colors lie on either side of the present color
		//Generated in this case by adding and modding 30 degrees in either direction
		return [new Color((this.hue + 30)%360, this.saturation, this.lightness), new Color(Math.abs(this.hue-30)%360, this.saturation, this.lightness)];
	}

	//Find the colors to complete the triad
	findTriadic() {
		//Triadic colors lie 120 degrees in both directions
		return [new Color((this.hue + 120)%360, this.saturation, this.lightness), new Color(Math.abs(this.hue - 120)%360, this.saturation, this.lightness)];
	}

	//Find the set of colors completing the tetradic
	findTetradic() {
		//Tetradic colors lie in 90 degree increments from the present color
		return [new Color((this.hue+90)%360, this.saturation, this.lightness), new Color((this.hue+180)%360, this.saturation, this.lightness), new Color((this.hue+270)%360, this.saturation, this.lightness)];
	}

  //Determine whether the color is warm or cool
	//Returns string
	warmOrCool() {
		if (330 > this.hue || this.hue < 150) {
			return 	'warm';
		}
		return 'cool';
	}

	//Converts the HSL color to hex
	toHex() {
		var h = this.hue;
		var s = this.saturation/100;
		var l = this.lightness/100;
		var r,g,b;
		const k = function (n) {
			return (n + (h/30))%12;
		}
		var a = s * Math.min(l, 1-l);
		r = l - a * Math.max(Math.min(k(0) - 3, 9 - k(0), 1), -1);
		g = l - a * Math.max(Math.min(k(8) - 3, 9 - k(8), 1), -1);
		b = l - a * Math.max(Math.min(k(4) - 3, 9 - k(4), 1), -1);
		return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;



	}
}

//Function t convert hex to RGB
function toRGB(hex) {
  r = hex.substring(1, 3);
  g = hex.substring(3, 5);
  b = hex.substring(5, 7);

  return ({
    r: parseInt(r, 16),
    g: parseInt(g, 16),
    b: parseInt(b, 16)
  });
}


//Function to cnvert RGB values to HSL
function toHSL(rgb) {
  r = rgb.r;
  g = rgb.g
  b = rgb.b
  r_ = (r / 255);
  g_ = (g / 255);
  b_ = (b / 255);
  max = Math.max(r_, g_, b_);
  min = Math.min(r_, g_, b_);
  delta = max - min;
  var hue, sat, lightness;
  lightness = (max + min) / 2;
  if (delta == 0) {
    sat = 0;
    hue = 0;
  } else {
    if (lightness >= 0.5) {
      sat = (max - min) / (2 - max - min)
    } else {
      sat = (max - min) / (max + min)
    }
    switch (max) {
      case r_:
        hue = (g_ - b_) / delta;
        break;
      case g_:
        hue = (b_ - r_) / delta + 2;
        break;
      case b_:
        hue = (r_ - g_) / delta + 4;
        break;
    }
  }
  hue *= 60;
  if (hue < 0) {
    hue += 360;
  }
	c = new Color(Math.round(hue), Math.round(sat * 100), Math.round(lightness * 100));
	return c;

}
