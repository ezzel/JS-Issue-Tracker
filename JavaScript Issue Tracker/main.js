//An event listner for the sumbit button on the form
document.getElementById('issueInputForm').addEventListener('submit', saveIssue);
//The save function will fire once you click the add button
function saveIssue(e) {
    var issueDesc = document.getElementById('issueDescInput').value;
    var issueSeverity = document.getElementById('issueSeverityInput').value;
    var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
    var issueId = chance.guid();
    var issueStatus = 'Open';
    // issue object instantiated to hold the values of the variables assigned above
    var issue = {
        id: issueId,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status : issueStatus
    };
    //Checks the local storage/for the issue file if null create an array then push the new object to the array then set the file to the array in JSON format.
    if (localStorage.getItem('issues') === null) {
        var issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    //Else get the array of the JSON file if the file isn't null then add the new object to the array then reset the JSON file in a format!
    } else {
    var issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues',JSON.stringify(issues));
    }
    //Resets the issue input form.
    document.getElementById('issueInputForm').reset();
    //Call the fetch function.
    fetchIssues();
    e.preventDefault();
}
//Function sets the status to a issue that has been closed
function setStatusClosed(id) {
  var issues = JSON.parse(localStorage.getItem('issues'));

  for (var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues[i].status = 'Closed';
    }
  }

  localStorage.setItem('issues', JSON.stringify(issues));

  fetchIssues();
}

function deleteIssue(id) {
  var issues = JSON.parse(localStorage.getItem('issues'));

  for (var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues.splice(i, 1);
    }
  }

  localStorage.setItem('issues', JSON.stringify(issues));

  fetchIssues();
}
//Function that fetches issues from the JSON file.
function fetchIssues() {
    var issues = JSON.parse(localStorage.getItem('issues'));
    
    if( localStorage.getItem('issues') === null) {
        return;
    }
    
    var issuesList = document.getElementById('issuesList');
    
    issuesList.innerHTML= '';
    
    for (var i = 0; i < issues.length; i++){
        var id = issues[i].id;
        var descr = issues[i].description;
        var severity = issues[i].severity;
        var assignedTo = issues[i].assignedTo;
        var status = issues[i].status;
        
        issuesList.innerHTML += '<div class="well">' +
                                '<h6>Issue ID: ' + id + '</h6> ' +
                                '<p><span class="label label-info"> ' + status + '</span></p> ' +
                                '<h3>' +descr + '</h3>' +
                                '<p><span class="glyphicon glyphicon-time"></span> ' + severity +'</p> ' +
                                '<p><span class="glyphicon glyphicon-user"></span> ' + assignedTo + '</p> ' +
                                '<a href="#" onClick="setStatusClosed(\''+id+'\')" class="btn btn-warning">Close</a> ' +
                                '<a href="#" onClick="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</a> ' +
                                '</div>';
                                
    }
}
