
export async function GET(request) {
    let lat = obtainRandomLat();
    let long = obtainRandomLong();
    const url = `https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${lat},${long}&fov=80&heading=70&radius=40000&return_error_code=true&pitch=0&key=AIzaSyB2M7-G3xNN7T2I4-iOYiJmEZpB9pU9iYc`;
    const urlObject = {
        imageString: url,
        lat: lat,
        long: long
    }
    const response = await fetch(url);
    if (!response.ok) {
        return new Response("Error: No image found", {
            status: 404,
            headers:{
                "content-type": "text/plain",
            }
        })
    }
    return new Response(JSON.stringify(urlObject), {
    status: 200,
    headers: {
      "content-type": "application/json",
    }
  })
}






const calcInterval = 15;
//this function is used to obtain a random latitude value for the api to call, based off of population density
function obtainRandomLat() {
    //used chatgpt to pull a data estimate of the population density of the world, and then used that to determine a random latitude value
    //it split it into about 15 degree intervals, then split it by "100%" really adding up to about 62.7% instead.
    let fullRand = (Math.random() * 63)
    console.log("fullRand: " + fullRand);
    let randLat = 0;
    //using fullrand, determine an accurate latitude value based off of population density
    switch (true) {
      case fullRand < 0.3:
        console.log("case 1");
        // 0.3% chance of being in 60-90 N
        randLat = (Math.random() * calcInterval);
        break;
      case 0.3 < fullRand && fullRand < 5.8:
        console.log("case 2");
        // 3.5% chance of being in 45-60 N
        randLat = (Math.random() * calcInterval) + (calcInterval);
        break;
      case 5.8 < fullRand && fullRand < 21:
        console.log("case 3");
        // 10.5% chance of being in 30-45 N
        randLat = (Math.random() * calcInterval) + (2*calcInterval);
        break;
      case 21 < fullRand && fullRand < 41.3:  
      console.log("case 4");
        // 27% chance of being in 15-30 N
        randLat = (Math.random() * calcInterval) + (3*calcInterval);
        break;
      case 41.3 < fullRand && fullRand < 50:
        console.log("case 5");
        // 16% chance of being in 0-15 N
        randLat = (Math.random() * calcInterval) + (4*calcInterval);
        break;
      case 50 < fullRand && fullRand < 55:
        console.log("case 6");
        // 4.5% chance of being in 0-15 S
        randLat = (Math.random() * calcInterval) + (5*calcInterval);
        break;
      case 55 < fullRand && fullRand < 62.4:
        console.log("case 7");
        // .6% chance of being in 15-30 S
        randLat = (Math.random() * calcInterval) + (6*calcInterval);
        break;
      case 62.4 < fullRand && fullRand < 63:
        console.log("case 8");
        // .3% chance of being in 30-60 S
        randLat = (Math.random() * (2*calcInterval)) + (7*calcInterval);
        break;
      default:
        console.log("error: " + fullRand);
        break;
    }
    
    console.log("result: " + randLat);
    if (randLat > 57.3) {
      randLat = (Math.abs(randLat - 57.3));
    } else {
      randLat = randLat - 57.3;
    }
    console.log("result2: " + randLat);
    randLat = randLat.toFixed(6)
    return randLat;
}
//this function is used to obtain a random longitude value for the api to call, based off of population density
function obtainRandomLong() {
    //used chatgpt to pull a data estimate of the population density of the world, and then used that to determine a random latitude value
    //it split it into about 15 degree intervals, then split it by "100%" really adding up to about 105% instead.
    var fullRand = (Math.random() * 155)
    var randLong = 0;
    //using fullrand, determine an accurate longitude value based off of population density
    switch (true) {
      case fullRand < 3.5:
        // 3.5% chance of being in 60-45 W  
        randLong = (Math.random() * calcInterval);
        break;
      case 3.5 < fullRand && fullRand < 5.1:
        // 1.6% chance of being in 45-30 W
        randLong = (Math.random() * calcInterval) + (calcInterval);
        break;
      case 5.1 < fullRand && fullRand < 5.2:
        // 1.1% chance of being in 30-15 W
        randLong = (Math.random() * calcInterval) + (2*calcInterval);
        break;
      case 5.2 < fullRand && fullRand < 9.7:
        // 3.5% chance of being in 15-0 W
        randLong = (Math.random() * calcInterval) + (3*calcInterval);
        break;
      case 9.7 < fullRand && fullRand < 16.4:
        // 6.7% chance of being in 0-15 E
        randLong = (Math.random() * calcInterval) + (4*calcInterval);
        break;
      case 16.4 < fullRand && fullRand < 23.7:
        // 7.3% chance of being in 15-30 E
        randLong = (Math.random() * calcInterval) + (5*calcInterval);
        break;
      case 23.7 < fullRand && fullRand < 28.3:
        // 4.6% chance of being in 30-45 E
        randLong = (Math.random() * calcInterval) + (6*calcInterval);
        break;
      case 28.3 < fullRand && fullRand < 33.3:
        // 5.0% chance of being in 45-60 E
        randLong = (Math.random() * calcInterval) + (7*calcInterval);
        break;
      case 33.3 < fullRand && fullRand < 48.8:
        // 15.5% chance of being in 60-75 E
        randLong = (Math.random() * calcInterval) + (8*calcInterval);
        break;
      case 48.8 < fullRand && fullRand < 72.3:
        // 23.5% chance of being in 75-90 E
        randLong = (Math.random() * calcInterval) + (9*calcInterval);
        break;
      case 72.3 < fullRand && fullRand < 85.8:
        // 13.5% chance of being in 90-105 E
        randLong = (Math.random() * calcInterval) + (10*calcInterval);
        break;
      case 85.8 < fullRand && fullRand < 99.8:
        // 14.0% chance of being in 105-120 E
        randLong = (Math.random() * calcInterval) + (11*calcInterval);
        break;
      case 99.8 < fullRand && fullRand < 104.3:
        // 4.5% chance of being in 120-135 E
        randLong = (Math.random() * calcInterval) + (12*calcInterval);
        break;
      case 104.3 < fullRand && fullRand < 105.5:
        // 1.2% chance of being in 135-150 E
        randLong = (Math.random() * calcInterval) + (13*calcInterval);
        break;
        //adding cases for the US
      case 105.5 < fullRand && fullRand < 108:
        // chance of being in 75-60 W cuts out ocean
        randLong = ((Math.random() * 5)+10) + (14*calcInterval);
        break;
      case 108 < fullRand && fullRand < 114:
        // chance of being in 90-75 W
        randLong = (Math.random() * calcInterval) + (15*calcInterval);
        break;
      case 114 < fullRand && fullRand < 130:
        // chance of being in 105-90 W
        randLong = (Math.random() * calcInterval) + (16*calcInterval);
        break;
      case 130 < fullRand && fullRand < 150:
        // chance of being in 120-105 W
        randLong = (Math.random() * calcInterval) + (17*calcInterval);
        break;
      case 150 < fullRand && fullRand < 155:
        // chance of being in 135-120 W
        randLong = (Math.random() * calcInterval) + (18*calcInterval);
        break;
      default:
        console.log("error: " + fullRand);
        break;
    }
    if (randLong < 105.5) {
      randLong = (Math.abs(randLong - 105.5));
    } else if (randLong < 210) {
      randLong = -(randLong - 105.5);
    } else {
      //gives us new routes
      randLong = Math.abs(randLong - 105.5);
    }
    randLong = randLong.toFixed(6)
    return randLong;
}