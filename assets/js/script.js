function getStreamInfo() {

  const users = [
                  'freecodecamp',
                  'ESL_SC2',
                  'imaqtpie',
                  'Fate_Twisted_NA',
                  'brtt',
                  'MOONMOON_OW',
                  'A_Seagull',
                  'Shiphtur'
                ];

  users.forEach (function (user) {
    const callback = '/?client_id=7ovzb35ek17m0n3ycf1kcghjw2t4ooe&callback=?',
          twitchChannel = 'https://api.twitch.tv/kraken/channels/' + user + callback,
          twitchStream = 'https://api.twitch.tv/kraken/streams/' + user + callback,
          offlineLogo = '../img/biblethump.jpg';

    $.getJSON(twitchChannel, function(channel) {
      // if account doesn't exist
      if (channel.status === 404) {
        return postStreamInfo('#', 'closed', offlineLogo, user, channel.message);
        // if account is offline (stream === null)
      } else {
        $.getJSON(twitchStream, function (stream) {
          if (!stream.stream) { // process offline accounts
            return postStreamInfo(channel.url, 'offline', channel.logo, channel.display_name, 'offline');
          } else { // process online accountss
            postStreamInfo(channel.url, 'online', channel.logo, channel.display_name, channel.status);
          } // end else statement
        }); // end getJSON(twitchStream)
      } //  end else statement
    }); // end getJSON(twithChannel)
  }); // end function(users)
} // end getStreamInfo()

/*-- If streamer streamer online, appends stream details to html page --*/
function postStreamInfo(userUrl, userStatus, userLogo, displayName, streamTitle) {

  $('#' + userStatus).append(
    '<div id="' + displayName.toLowerCase() + '" class="users">' +
      '<div class="col s12 m6 l4">' +
        '<div class="card large hoverable">' +
          '<div class="user-logo card-image waves-effect waves-block waves-light">' +
            '<img class="activator" src="' + userLogo +'">' +
          '</div>' +
          '<div class="card-content">' +
            '<span class="display-name card-title activator grey-text text-darken-4">' + displayName + '<i class="vert-icon material-icons right">more_vert</i>' +
          '<p>' +
            '<div class="stream-button right-align">' +
              '<a class="stream-link waves-effect waves-light btn btn-large" href="' + userUrl + '" target="_blank">Stream</a>' +
            '</div>' +
          '</div>' +
          '</p>' +
          '<div class="card-reveal">' +
            '<span class="display-name card-title grey-text text-darken-4">' + displayName + '<i class="vert-icon material-icons right">more_vert</i></span>' +
            '<p id="stream-title">' + streamTitle + '</p>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>'
  );
}

// All / Online /  Offline Filtering
$('#filter-offline').click(e => {
  $('#online').hide();
  $('#closed').hide();
  $('#offline').show();

});

$('#filter-online').click(e => {
  $('#online').show();
  $('#closed').hide();
  $('#offline').hide();
});

$('#filter-all').click(e => {
  $('#online').show();
  $('#closed').show();
  $('#offline').show();
});

$('#search-input').click(e => {
  $(e.currentTarget).val('');
  $('.users').show();
});
$('#search-input').on('change keyup paste', e => {
  const key = e.keyCode || e.which;
  if (key === 13) $(e.currentTarget).blur();  // hides mobile keyboard on enter/return

  $('.users').show();
  $('.users').not('[id*=' + $('#search-input').val().toLowerCase() + ']').hide();
  $('.users [id*=' + $('#search-input').val().toLowerCase() + ']');
});

$(document).ready(getStreamInfo);
