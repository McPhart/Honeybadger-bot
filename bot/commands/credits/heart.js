var repo = require(process.cwd()+'/repo');
var usersInfo = require(process.cwd()+'/bot/utilities/users');
var _ = require('underscore');

module.exports = function(bot, db, data) {
    if(!bot.getDJ())
        return bot.sendChat('There is no DJ playing!');

    if(data.params.length > 0){
        if(_.contains(usersInfo.usersThatHearted, data.user.id))
            return bot.sendChat('@' + data.user.username + ', you have already given a heart for this song!');

        if (data.params.length === 1) {
            if (data.params[0].substr(0, 1) === "@" && data.params[0] !== "@" + data.user.username) {
                var recipient = bot.getUserByName(data.params[0].replace("@", ""), true);
                repo.heartsUser(db, recipient, function(user){
                    usersInfo.usersThatHearted.push(data.user.id);
                    bot.sendChat('Keep up the good work @' + recipient.username + '! @' + data.user.username + ' likes your songs! ' +
                        'You now have ' + user.hearts + ' hearts! :heart: ');
                });
            } 
            else if(data.params[0].substr(0, 1) === "@" && data.params[0] === "@" + data.user.username){
                 bot.sendChat('Wow @' + data.user.username + ' ... Love yourself in private weirdo... :confounded:');
            } 
            else {
                bot.sendChat("@" + user + " you need to @[username] to hearts someone");
            }
        } else {
            bot.sendChat("@" + user + " you can give hearts to one person");
        }
    }
    else if(data.user.username !== bot.getDJ().username){
        if(_.contains(usersInfo.usersThatHearted, data.user.id))
            return bot.sendChat('@' + data.user.username + ', you have already given a heart for this song!');

        repo.heartsUser(db, bot.getDJ(), function(user){
            usersInfo.usersThatHearted.push(data.user.id);
            bot.sendChat('Keep up the good work @' + bot.getDJ().username + '! @' + data.user.username + ' likes your song! ' +
                'You now have ' + user.hearts + ' hearts!');
			bot.sendChat('http://orig05.deviantart.net/8b01/f/2013/038/9/2/8_bit_heart_pump_by_camdencc-d5u6rwr.gif');
        });
    }
    else{
        bot.sendChat('Wow @' + data.user.username + ' ... Love yourself in private weirdo... :confounded:');
    }
    
};