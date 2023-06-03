const serverURL = 'http://127.0.0.1:5000';

document.addEventListener('DOMContentLoaded', function(){
    fetch(`${serverURL}/allprofiles`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => {
        // Process the retrieved data
        console.log(data);
        // Display the data on your HTML page
        // ...

        var currentYear = new Date().getFullYear();
        var totalYears = 4;

        //Name1
        var index1 = 10;
        var name1 = document.getElementById("name1");
        var stream1 = document.getElementById("stream1");
        var year1 = document.getElementById("year1");
        function incrementName1() {
            name1.textContent = data[index1][1] + " " + data[index1][2];
            stream1.textContent = data[index1][3];
            year1.textContent = "Year" + " " + (totalYears - data[index1][4] + currentYear);
            index1 = (index1 + 10) % data.length;
        }
        function decrementName1() {
            name1.textContent = data[index1][1] + " " + data[index1][2];
            stream1.textContent = data[index1][3];
            year1.textContent = "Year" + " " + (totalYears - data[index1][4] + currentYear);
            index1 = (index1 - 10) % data.length;
        }
        name1.textContent = data[0][1] + " " + data[0][2];
        stream1.textContent = data[0][3];
        year1.textContent = "Year" + " " + (totalYears - data[0][4] + currentYear);
        var nextButton = document.getElementById("nextButton");
        nextButton.addEventListener("click", incrementName1);
        var prevButton = document.getElementById("prevButton");
        prevButton.addEventListener("click", decrementName1);



        //Name2
        var index2 = 11;
        var name2 = document.getElementById("name2");
        var stream2 = document.getElementById("stream2");
        var year2 = document.getElementById("year2");
        function incrementName2() {
            name2.textContent = data[index2][1] + " " + data[index2][2];
            stream1.textContent = data[index2][3];
            year2.textContent = "Year" + " " + (totalYears - data[index2][4] + currentYear);
            index2 = (index2 + 10) % data.length;
        }
        function decrementName2() {
            name2.textContent = data[index2][1] + " " + data[index2][2];
            stream2.textContent = data[index2][3];
            year2.textContent = "Year" + " " + (totalYears - data[index2][4] + currentYear);
            index2 = (index2 - 10) % data.length;
        }
        name2.textContent = data[1][1] + " " + data[1][2];
        stream2.textContent = data[1][3];
        year2.textContent = "Year" + " " + (totalYears - data[1][4] + currentYear);
        var nextButton = document.getElementById("nextButton");
        nextButton.addEventListener("click", incrementName2);
        var prevButton = document.getElementById("prevButton");
        prevButton.addEventListener("click", decrementName2);



        //Name3
        var index3 = 12;
        var name3 = document.getElementById("name3");
        var stream3 = document.getElementById("stream3");
        var year3 = document.getElementById("year3");
        function incrementName3() {
            name3.textContent = data[index3][1] + " " + data[index3][2];
            stream3.textContent = data[index3][3];
            year3.textContent = "Year" + " " + (totalYears - data[index3][4] + currentYear);
            index3 = (index3 + 10) % data.length;
        }
        function decrementName3() {
            name3.textContent = data[index3][1] + " " + data[index3][2];
            stream3.textContent = data[index3][3];
            year3.textContent = "Year" + " " + (totalYears - data[index3][4] + currentYear);
            index3 = (index3 - 10) % data.length;
        }
        name3.textContent = data[2][1] + " " + data[2][2];
        stream3.textContent = data[2][3];
        year3.textContent = "Year" + " " + (totalYears - data[2][4] + currentYear);
        var nextButton = document.getElementById("nextButton");
        nextButton.addEventListener("click", incrementName3);
        var prevButton = document.getElementById("prevButton");
        prevButton.addEventListener("click", decrementName3);



        //Name4
        var index4 = 13;
        var name4 = document.getElementById("name4");
        var stream4 = document.getElementById("stream4");
        var year4 = document.getElementById("year4");
        function incrementName4() {
            name4.textContent = data[index4][1] + " " + data[index4][2];
            stream4.textContent = data[index4][3];
            year4.textContent = "Year" + " " + (totalYears - data[index4][4] + currentYear);
            index4 = (index4 + 10) % data.length;
        }
        function decrementName4() {
            name4.textContent = data[index4][1] + " " + data[index4][2];
            stream4.textContent = data[index4][3];
            year4.textContent = "Year" + " " + (totalYears - data[index4][4] + currentYear);
            index4 = (index4 - 10) % data.length;
        }
        name4.textContent = data[3][1] + " " + data[3][2];
        stream4.textContent = data[3][3];
        year4.textContent = "Year" + " " + (totalYears - data[3][4] + currentYear);
        var nextButton = document.getElementById("nextButton");
        nextButton.addEventListener("click", incrementName4);
        var prevButton = document.getElementById("prevButton");
        prevButton.addEventListener("click", decrementName4);
        


        //Name5
        var index5 = 14;
        var name5 = document.getElementById("name5");
        var stream5 = document.getElementById("stream5");
        var year5 = document.getElementById("year5");
        function incrementName5() {
            name5.textContent = data[index5][1] + " " + data[index5][2];
            stream5.textContent = data[index5][3];
            year5.textContent = "Year" + " " + (totalYears - data[index5][4] + currentYear);
            index5 = (index5 + 10) % data.length;
        }
        function decrementName5() {
            name5.textContent = data[index5][1] + " " + data[index5][2];
            stream5.textContent = data[index5][3];
            year5.textContent = "Year" + " " + (totalYears - data[index5][4] + currentYear);
            index5 = (index5 - 10) % data.length;
        }
        name5.textContent = data[4][1] + " " + data[4][2];
        stream5.textContent = data[4][3];
        year5.textContent = "Year" + " " + (totalYears - data[4][4] + currentYear);
        var nextButton = document.getElementById("nextButton");
        nextButton.addEventListener("click", incrementName5);
        var prevButton = document.getElementById("prevButton");
        prevButton.addEventListener("click", decrementName5);



        //Name6
        var index6 = 15;
        var name6 = document.getElementById("name6");
        var stream6 = document.getElementById("stream6");
        var year6 = document.getElementById("year6");
        function incrementName6() {
            name6.textContent = data[index6][1] + " " + data[index6][2];
            stream6.textContent = data[index6][3];
            year6.textContent = "Year" + " " + (totalYears - data[index6][4] + currentYear);
            index6 = (index6 + 10) % data.length;
        }
        function decrementName6() {
            name6.textContent = data[index6][1] + " " + data[index6][2];
            stream6.textContent = data[index6][3];
            year6.textContent = "Year" + " " + (totalYears - data[index6][4] + currentYear);
            index6 = (index6 - 10) % data.length;
        }
        name6.textContent = data[5][1] + " " + data[5][2];
        stream6.textContent = data[5][3];
        year6.textContent = "Year" + " " + (totalYears - data[5][4] + currentYear);
        var nextButton = document.getElementById("nextButton");
        nextButton.addEventListener("click", incrementName6);
        var prevButton = document.getElementById("prevButton");
        prevButton.addEventListener("click", decrementName6);



        //Name7
        var index7 = 16;
        var name7 = document.getElementById("name7");
        var stream7 = document.getElementById("stream7");
        var year7 = document.getElementById("year7");
        function incrementName7() {
            name7.textContent = data[index7][1] + " " + data[index7][2];
            stream7.textContent = data[index7][3];
            year7.textContent = "Year" + " " + (totalYears - data[index7][4] + currentYear);
            index7 = (index7 + 10) % data.length;
        }
        function decrementName7() {
            name7.textContent = data[index7][1] + " " + data[index7][2];
            stream7.textContent = data[index7][3];
            year7.textContent = "Year" + " " + (totalYears - data[index7][4] + currentYear);
            index7 = (index7 - 10) % data.length;
        }
        name7.textContent = data[6][1] + " " + data[6][2];
        stream7.textContent = data[6][3];
        year7.textContent = "Year" + " " + (totalYears - data[6][4] + currentYear);
        var nextButton = document.getElementById("nextButton");
        nextButton.addEventListener("click", incrementName7);
        var prevButton = document.getElementById("prevButton");
        prevButton.addEventListener("click", decrementName7);



        //Name8
        var index8 = 17;
        var name8 = document.getElementById("name8");
        var stream8 = document.getElementById("stream8");
        var year8 = document.getElementById("year8");
        function incrementName8() {
            name8.textContent = data[index8][1] + " " + data[index8][2];
            stream8.textContent = data[index8][3];
            year8.textContent = "Year" + " " + (totalYears - data[index8][4] + currentYear);
            index8 = (index8 + 10) % data.length;
        }
        function decrementName8() {
            name8.textContent = data[index8][1] + " " + data[index8][2];
            stream8.textContent = data[index8][3];
            year8.textContent = "Year" + " " + (totalYears - data[index8][4] + currentYear);
            index8 = (index8 - 10) % data.length;
        }
        name8.textContent = data[7][1] + " " + data[7][2];
        stream8.textContent = data[7][3];
        year8.textContent = "Year" + " " + (totalYears - data[7][4] + currentYear);
        var nextButton = document.getElementById("nextButton");
        nextButton.addEventListener("click", incrementName8);
        var prevButton = document.getElementById("prevButton");
        prevButton.addEventListener("click", decrementName8);



        //Name9
        var index9 = 18;
        var name9 = document.getElementById("name9");
        var stream9 = document.getElementById("stream9");
        var year9 = document.getElementById("year9");
        function incrementName9() {
            name9.textContent = data[index9][1] + " " + data[index9][2];
            stream9.textContent = data[index9][3];
            year9.textContent = "Year" + " " + (totalYears - data[index9][4] + currentYear);
            index9 = (index9 + 10) % data.length;
        }
        function decrementName9() {
            name9.textContent = data[index9][1] + " " + data[index9][2];
            stream9.textContent = data[index9][3];
            year9.textContent = "Year" + " " + (totalYears - data[index9][4] + currentYear);
            index9 = (index9 - 10) % data.length;
        }
        name9.textContent = data[8][1] + " " + data[8][2];
        stream9.textContent = data[8][3];
        year9.textContent = "Year" + " " + (totalYears - data[8][4] + currentYear);
        var nextButton = document.getElementById("nextButton");
        nextButton.addEventListener("click", incrementName9);
        var prevButton = document.getElementById("prevButton");
        prevButton.addEventListener("click", decrementName9);



        //Name10
        var index10 = 19;
        var name10 = document.getElementById("name10");
        var stream10 = document.getElementById("stream10");
        var year10 = document.getElementById("year10");
        function incrementName10() {
            name10.textContent = data[index10][1] + " " + data[index10][2];
            stream10.textContent = data[index10][3];
            year10.textContent = "Year" + " " + (totalYears - data[index10][4] + currentYear);
            index10 = (index10 + 10) % data.length;
        }
        function decrementName10() {
            name10.textContent = data[index10][1] + " " + data[index10][2];
            stream10.textContent = data[index10][3];
            year10.textContent = "Year" + " " + (totalYears - data[index10][4] + currentYear);
            index10 = (index10 - 10) % data.length;
        }
        name10.textContent = data[9][1] + " " + data[9][2];
        stream10.textContent = data[9][3];
        year10.textContent = "Year" + " " + (totalYears - data[9][4] + currentYear);
        var nextButton = document.getElementById("nextButton");
        nextButton.addEventListener("click", incrementName10);
        var prevButton = document.getElementById("prevButton");
        prevButton.addEventListener("click", decrementName10);
    })
    .catch(error => {
        console.error('Error:', error);
    });

})

// Get the parent div element
var dropdown = document.getElementById("clgYear");

// Get all the checkboxes within the dropdown
var checkboxes = dropdown.querySelectorAll(".dropdown-four");
console.log(checkboxes)

// Attach event listener to the checkboxes
for (var i = 0; i < checkboxes.length; i++) {
  checkboxes[i].addEventListener("change", function() {
    // Uncheck all checkboxes
    for (var j = 0; j < checkboxes.length; j++) {
      checkboxes[j].checked = false;
    }

    // Check the selected checkbox
    this.checked = true;
  });
}