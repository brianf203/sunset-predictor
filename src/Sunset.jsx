import p10 from './10p.png';
import p20 from './20p.png';
import p25 from './25p.png';
import p30 from './30p.png';
import p35 from './35p.png';
import p40 from './40p.png';
import p50 from './50p.png';
import p55 from './55p.png';
import p70 from './70p.png';
import p75 from './75p.png';
import p80 from './80p.png';
import p85 from './85p.png';
import p90 from './90p.png';
import p95 from './95p.png';

const sunsetImages = {};

for (let i = 0; i <= 100; i++) {
    if (i <= 15) sunsetImages[i.toString()] = p10;
    else if (i <= 23) sunsetImages[i.toString()] = p20;
    else if (i <= 30) sunsetImages[i.toString()] = p25;
    else if (i <= 35) sunsetImages[i.toString()] = p30;
    else if (i <= 40) sunsetImages[i.toString()] = p35;
    else if (i <= 50) sunsetImages[i.toString()] = p40;
    else if (i <= 55) sunsetImages[i.toString()] = p50;
    else if (i <= 60) sunsetImages[i.toString()] = p55;
    else if (i <= 75) sunsetImages[i.toString()] = p70;
    else if (i <= 80) sunsetImages[i.toString()] = p75;
    else if (i <= 85) sunsetImages[i.toString()] = p80;
    else if (i <= 90) sunsetImages[i.toString()] = p85;
    else if (i <= 95) sunsetImages[i.toString()] = p90;
    else if (i <= 100) sunsetImages[i.toString()] = p95;
}

export const getSunsetImage = (sunset) => {
    return sunsetImages[sunset] || null;
};