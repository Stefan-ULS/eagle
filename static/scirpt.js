// real time notification
$(document).ready(function() {
    function updateNotifications() {
        $.getJSON('/get_notifications', function(data) {
            let $notifications = $('#notification-list');
            if (data.length > 0) {
                $notifications.empty(); // Clear old notifications
                data.forEach(function(notif) {
                    // Create notification alert div
                    let $alertDiv = $('<div></div>').addClass('alert alert-info d-flex justify-content-center').attr('data-id', notif.id);
                    
                    // Create paragraph for message
                    let $messageP = $('<p></p>').addClass('notification-message').text(notif.message);
                    $alertDiv.append($messageP);
                    
                    // Create div for action buttons
                    let $actionButtonsDiv = $('<div></div>').addClass('action-buttons');
                    
                    // Create and append the accept form
                    let $acceptForm = $('<form></form>', {
                        action: "/holiday_buttons",
                        method: "post",
                        style: "display: inline;"
                    }).append(
                        $('<input>', {type: "hidden", name: "notification_id", value: notif.id}),
                        $('<input>', {type: "hidden", name: "action", value: "accept"}),
                        $('<button></button>', {type: "submit", class: "custom-button btn btn-sm bg-success"}).text("Accept")
                    );
                    $actionButtonsDiv.append($acceptForm);
                    
                    // Create and append the decline form
                    let $declineForm = $('<form></form>', {
                        action: "/holiday_buttons",
                        method: "post",
                        style: "display: inline;"
                    }).append(
                        $('<input>', {type: "hidden", name: "notification_id", value: notif.id}),
                        $('<input>', {type: "hidden", name: "action", value: "decline"}),
                        $('<button></button>', {type: "submit", class: "custom-button btn btn-sm bg-danger"}).text("Decline")
                    );
                    $actionButtonsDiv.append($declineForm);

                    // Append action buttons div to alert div
                    $alertDiv.append($actionButtonsDiv);
                    
                    // Append the alert div to the main notifications container
                    $notifications.append($alertDiv);
                });
            }
        });
    }
    setInterval(updateNotifications, 1000); // Check for new notifications every 50 seconds
    updateNotifications(); // Initial call on page load
});
//  real time notification for manager
$(document).ready(function() {
    function updateManagerNotifications() {
        $.getJSON('/get_manager_notifications', function(data) {
            let $notifications = $('#notification-list');
            if (data.length > 0) {
                $notifications.empty(); // Clear old notifications
                data.forEach(function(notif) {
                    let $alertDiv = $('<div></div>').addClass('alert alert-info d-flex justify-content-center').attr('data-id', notif.id);
                    $alertDiv.append($('<p></p>').addClass('notification-message').text(notif.message));
                    
                    let $actionButtonsDiv = $('<div></div>').addClass('action-buttons');

                    let $acceptForm = $('<form></form>', {
                        action: "/manager_buttons",  
                        method: "post",
                        style: "display: inline;"
                    }).append(
                        $('<input>', {type: "hidden", name: "notification_id", value: notif.id}),
                        $('<input>', {type: "hidden", name: "action", value: "accept"}),
                        $('<button></button>', {type: "submit", class: "custom-button btn btn-sm bg-success"}).text("Accept")
                    );

                    $actionButtonsDiv.append($acceptForm);

                    let $declineForm = $('<form></form>', {
                        action: "/manager_buttons",  
                        method: "post",
                        style: "display: inline;"
                    }).append(
                        $('<input>', {type: "hidden", name: "notification_id", value: notif.id}),
                        $('<input>', {type: "hidden", name: "action", value: "decline"}),
                        $('<button></button>', {type: "submit", class: "custom-button btn btn-sm bg-danger"}).text("Decline")
                    );

                    $actionButtonsDiv.append($declineForm);
                    $alertDiv.append($actionButtonsDiv);
                    $notifications.append($alertDiv);
                });
            } 
        });
    }
    setInterval(updateManagerNotifications, 1000); // Check for new notifications every one minute
    updateManagerNotifications(); // Initial call on page load
});
