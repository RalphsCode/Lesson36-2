/** Change a digital time to word time */

const goBtn = document.getElementById('btn');
// Get the tag that will display the output in the HTML File
const outTag = document.getElementById('output_tag');

// Make clicking the GO button run the app
goBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const inTime = document.getElementById('time').value;
    timeWord(inTime);
});


// Function to convert the digital time to written out time
function timeWord(inTime){

        // Check for midnight or noon
        if (inTime === "12:00"){
            outTag.innerText = "noon";
            return "noon";
        } else if (inTime === "00:00") {
            outTag.innerText = "midnight";
            return "midnight";
        };

        // Define the Hours ///////////////////////////////////
        const hourDict = {
            "one":["01", "13"],
            "two":["02", "14"],
            "three":["03", "15"],
            "four":["04", "16"],
            "five":["05", "17"],
            "six":["06","18"],
            "seven":["07", "19"],
            "eight":["08","20"],
            "nine":["09", "21"],
            "ten":["10", "22"],
            "eleven":["11", "23"],
            "twelve":["12", "00"]
        };

        // Define am hours  //////////////////////////////////////
        const amHours = ["01","02","03","04","05","06","07","08","09","10","11","00"];

        // Define some specific minutes
        const specificMinutes = {
            "00":"o'clock",
            "10": "ten",
            "11": "eleven",
            "12": "twelve",
            "13": "thirteen",
            "14": "fourteen",
            "15": "fifteen",
            "16": "sixteen",
            "17": "seventeen",
            "18": "eighteen",
            "19": "nineteen"
        };

        // Define the minute 10's (excl. 10)
        const tens = {
            "0":"oh",
            "2":"twenty",
            "3":"thirty",
            "4":"forty",
            "5":"fifty"
        };

        // Define the minute 1's (excl. 0)
        const ones = {
            "1": "one",
            "2": "two",
            "3": "three",
            "4": "four",
            "5": "five",
            "6": "six",
            "7": "seven",
            "8": "eight",
            "9": "nine"
        };

        // Get the time that was entered and split it to Hrs and Mins
        const timeArr = inTime.split(':');
        const inHour = timeArr[0];
        const inMinute = timeArr[1];

        // Convert the digital hour to words
        function getHour(hourDict, inHour) {
            for (const key in hourDict) {
                const arr = hourDict[key];
                if (arr.includes(inHour)) {
                return key;
                }
        } }

        // Determine if AM/PM
        function amPM(amHours, inHour){
            if (amHours.includes(inHour)){
                return "am";
                }
            return "pm"
        }

        // Convert the digital minute to words

        /** Check if the digital minute is a specific value
         * such as 10, 11, 12, etc
         * returns undefined if no match found. */
        function getMinute(inMinute){
            for (const key in specificMinutes) {
                if (key.includes(inMinute)) {
                return specificMinutes[key];
                }
        } }

        /** Get the 10's minute value */
        function getMinuteTen(inMinuteTen){
            for (const key in tens) {
                if (key.includes(inMinuteTen)) {
                return tens[key];
                }
        }  }

        /** Get the 1's minute value */
        function getMinuteOne(inMinuteOne){
            // Check that the 1's value is not 0 
            if (inMinuteOne !== "0"){
                // Return the minute 1's in word form
                for (const key in ones) {
                    if (key.includes(inMinuteOne)) {
                    return ones[key];
                    }
                } // END for loop  
            }  // END if...
            // If the minute 1's value is 0 - don't return anything
            return false 
        };  // END getMinuteOne

        // Convert the digital minutes to words
        function outMinute() {
            const specificMinute = getMinute(inMinute);
            // Check if minutes are in Specific Minutes Dict (10, 11, 12, etc)
            if (specificMinute === undefined) {
                // Not a specific minute value
                // Split the minutes into tens and ones
                const splitInMinute = inMinute.split('');
                const inMinuteTen = splitInMinute[0];
                const inMinuteOne = splitInMinute[1];
                
                let minute;  // The digital minute in words
                const outMinuteTen = getMinuteTen(inMinuteTen);
                const outMinuteOne = getMinuteOne(inMinuteOne);
                // Ensure the minute one value was not 0
                if (outMinuteOne) {
                    minute = outMinuteTen + " " + outMinuteOne;
                } else { 
                    // The minute one value was 0 - so ignore it
                    minute = outMinuteTen }
                return minute;
            } else {
                // If the entered minute was in the specific minute dict use that
                return specificMinute;
            } };


        // Define the output word string
        let outTimeWords = '';
        // Get Hour, Minute and am/pm
        const outHour = getHour(hourDict, inHour);
        const outMinuteText = outMinute();
        const amPMText = amPM(amHours, inHour);

        // Build the output string
        outTimeWords = outHour + " " + outMinuteText + " " + amPMText;

        // // Send it to the HTML page
        outTag.innerText = outTimeWords;

        return outTimeWords

 } // END timeWord

 module.exports = timeWord ;