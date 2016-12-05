/*
http://devjana.net/support/tau_students.json

You first task is to make an AJAX call from the client side app.js, using an
.ajax method and access the json data through the url above. When successful, i
t should bring the data back down for use. You will then need to combine that
with what you have learned about parsing objects and arrays to complete the
challenge.
Todos
* call Ajax item[*]
* push the info recieved to an array[*]

JSON/Ajax reference: https://github.com/devjanaprime/tauAjaxJsonInClass

What I would like to see on the DOM, is one person at a time represented -
the info for the first person in the json data. One the screen should also be
Prev and Next buttons, that when pressed, show the information for the
appropriate person. These should wrap - prev when on the first person should
wrap around to show the last person and vice versa.
Todos-
* make prev and next buttons [*]
* make them show for the appropriate person[*]

Also on the DOM should be a display showing the number of people and which is
being currently viewed (eg. 2/20) [*]

When a person is displayed, show their name (first & last) and their info. Only
one person should be shown at any given time.[*]

KINDA HARD MODE
Add a button for each person - appended to DOM when the json is read in.
Clicking any button will display that person. Place these between the prev and
next buttons.
Ex: [Prev] [Larry] [Moe] [Curly] [Next]

HARD MODE
Include a fade out and fade in animation in-between transitioning people.

PRO MODE
Include a timer that moves to the next person if the user is not clicking on
next or prev. If the user clicks on next or prev, the timer should be reset.
The timer should transition between people every 10 seconds.
*/

var classmatesArray = [];
var personIndex = 0;

$(document).ready(function(){
// pulling in the JSON file and adding it to an array
  var classmates = function(){
    $.ajax({
      url: 'http://devjana.net/support/tau_students.json',
      dataType: 'JSON',
        success: function( data ){
        console.log( 'success, received:', data.tau  );
        for (var i = 0; i < data.tau.length; i++) {
         classmatesArray.push( data.tau[i] );
         displayClassmates(classmatesArray);

       }// end for loop
       createPeopleButtons();
      } // end success
    }); // end ajax
  }; // end classmates
  classmates();


var outputText = '';

var displayClassmates = function(student, index) {
        outputText = '<p>' + '<strong>' + "Name:" + '</strong>' + ' ' + classmatesArray[personIndex].first_name + ' ' + classmatesArray[personIndex].last_name + '</p>' +
       '<img class="portrait" src="' + classmatesArray[personIndex].picUrl + '" />' + '<p>' + '<strong>' + "About" + ' ' + classmatesArray[personIndex].first_name + ":" + '' +
        '</strong>' + ' ' + classmatesArray[personIndex].info + '</p>' + '<p>' + 'Displaying Student:' + ' ' + (classmatesArray.indexOf(classmatesArray[personIndex]) + 1) + ' ' + 'out of' + ' ' + classmatesArray.length;
       $('#classmates').html(outputText);
}; //end displayStudents function

// next button function
$('#nextButton').on('click', function() {
    personIndex = personIndex + 1;
    personIndex = personIndex % classmatesArray.length; // if we've gone too high, start from `0` again
    //display to the dom
    displayClassmates ();
}); //end next button on click function

//previous button function
$('#prevButton').on('click', function() {
    if (personIndex === 0) { // i would become 0
        personIndex = classmatesArray.length;
    }
    personIndex = personIndex - 1; // decrease by one
    // display to the DOM
    displayClassmates ();
}); //end prev button function

function createPeopleButtons(){
  //Loop through the array of people,
  for(var i = 0; i < classmatesArray.length; i++){
    $("#classmateButtons").append("<button class='person' data-index='" + i + "'></button>");
    var el = $("#classmateButtons").children().last();
    el.text(classmatesArray[i].first_name);
  }
}

function clickSpecific(){
 personIndex = $(this).data("index");
 displayClassmates();
}

$("#classmateButtons").on("click", ".person", clickSpecific);

});// end document ready
