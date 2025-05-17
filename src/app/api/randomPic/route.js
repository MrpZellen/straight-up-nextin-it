







const calcInterval = 15;
//this function is used to obtain a random latitude value for the api to call, based off of population density
function obtainRandomLat() {
    //used chatgpt to pull a data estimate of the population density of the world, and then used that to determine a random latitude value
    //it split it into about 15 degree intervals, then split it by "100%" really adding up to about 62.7% instead.
    var fullRand = (Math.random() * 63 + 1).toFixed(1);
    var randLat = 0;
    //using fullrand, determine an accurate latitude value based off of population density
    switch (fullRand) {
      case fullRand < 0.3:
        // 0.3% chance of being in 60-90 N
        randLat = Math.random() * calcInterval + 1;
      case 0.3 < fullRand < 3.8:
        // 3.5% chance of being in 45-60 N
        randLat = Math.random() * calcInterval + (calcInterval+1);
      case 3.8 < fullRand < 14.3:
        // 10.5% chance of being in 30-45 N
        randLat = Math.random() * calcInterval + (2*calcInterval+1);
      case 14.3 < fullRand < 41.3:
        // 27% chance of being in 15-30 N
        randLat = Math.random() * calcInterval + (3*calcInterval+1);
      case 41.3 < fullRand < 57.3:
        // 16% chance of being in 0-15 N
        randLat = Math.random() * calcInterval + (4*calcInterval+1);
      case 57.3 < fullRand < 61.8:
        // 4.5% chance of being in 0-15 S
        randLat = Math.random() * calcInterval + (5*calcInterval+1);
      case 61.8 < fullRand < 62.4:
        // .6% chance of being in 15-30 S
        randLat = Math.random() * calcInterval + (6*calcInterval+1);
      case 62.4 < fullRand < 63:
        // .3% chance of being in 30-90 S
        randLat = Math.random() * calcInterval + (7*calcInterval+1);
    }
    if (randLat > 57.3) {
      randLat = -(Math.abs(randLat - 57.3));
    } else {
      randLat = randLat - 57.3;
    }
    randLat = randLat.toFixed(6)
    return randLat;
}
//this function is used to obtain a random longitude value for the api to call, based off of population density
function obtainRandomLong() {
    //used chatgpt to pull a data estimate of the population density of the world, and then used that to determine a random latitude value
    //it split it into about 15 degree intervals, then split it by "100%" really adding up to about 105% instead.
    var fullRand = (Math.random() * 105.5 + 1).toFixed(1);
    var randLong = 0;
    //using fullrand, determine an accurate longitude value based off of population density
    switch (fullRand) {
      case fullRand < 3.5:
        // 3.5% chance of being in 60-45 W
        randLat = Math.random() * calcInterval + 1;
      case 3.5 < fullRand < 5.1:
        // 1.6% chance of being in 45-30 W
        randLong = Math.random() * calcInterval + (calcInterval+1);
      case 5.1 < fullRand < 6.2:
        // 1.1% chance of being in 30-15 W
        randLong = Math.random() * calcInterval + (2*calcInterval+1);
      case 6.2 < fullRand < 9.7:
        // 3.5% chance of being in 15-0 W
        randLong = Math.random() * calcInterval + (3*calcInterval+1);
      case 9.7 < fullRand < 16.4:
        // 6.7% chance of being in 0-15 E
        randLong = Math.random() * calcInterval + (4*calcInterval+1);
      case 16.4 < fullRand < 23.7:
        // 7.3% chance of being in 15-30 E
        randLong = Math.random() * calcInterval + (5*calcInterval+1);
      case 23.7 < fullRand < 28.3:
        // 4.6% chance of being in 30-45 E
        randLong = Math.random() * calcInterval + (6*calcInterval+1);
      case 28.3 < fullRand < 33.3:
        // 5.0% chance of being in 45-60 E
        randLong = Math.random() * calcInterval + (7*calcInterval+1);
      case 33.3 < fullRand < 48.8:
        // 15.5% chance of being in 60-75 E
        randLong = Math.random() * calcInterval + (8*calcInterval+1);
      case 48.8 < fullRand < 72.3:
        // 23.5% chance of being in 75-90 E
        randLong = Math.random() * calcInterval + (9*calcInterval+1);
      case 72.3 < fullRand < 85.8:
        // 13.5% chance of being in 90-105 E
        randLong = Math.random() * calcInterval + (10*calcInterval+1);
      case 85.8 < fullRand < 99.8:
        // 14.0% chance of being in 105-120 E
        randLong = Math.random() * calcInterval + (11*calcInterval+1);
      case 99.8 < fullRand < 104.3:
        // 4.5% chance of being in 120-135 E
        randLong = Math.random() * calcInterval + (12*calcInterval+1);
      case 104.3 < fullRand < 105.5:
        // 1.2% chance of being in 135-150 E
        randLong = Math.random() * calcInterval + (13*calcInterval+1);
    }
    if (randLong < 60) {
      randLong = -(Math.abs(randLong - 60));
    } else {
      randLong = randLong - 60;
    }
    randLong = randLong.toFixed(6)
    return randLong;
}