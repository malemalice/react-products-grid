module.exports = {
  timeAgo: (date) => {
      if (typeof date !== 'object') {
          date = new Date(date);
        }

        var seconds = Math.floor((new Date() - date) / 1000);
        var intervalType;

        var interval = Math.floor(seconds / 604800);
        if (interval >= 1) {
          return date.toDateString();
        } else {
          interval = Math.floor(seconds / 86400);
          if (interval >= 1) {
            intervalType = 'day';
          } else {
            interval = Math.floor(seconds / 3600);
            if (interval >= 1) {
              intervalType = "hour";
            } else {
              interval = Math.floor(seconds / 60);
              if (interval >= 1) {
                intervalType = "minute";
              } else {
                interval = seconds;
                intervalType = "second";
              }
            }
          }
        }

        if (interval > 1 || interval === 0) {
          intervalType += 's';
        }

        return interval + ' ' + intervalType + ' ago';
    },
    toDollars: (cents)=>{
      var dollars = cents / 100;
      return dollars = dollars.toLocaleString("en-US", {style:"currency", currency:"USD"});
    }
}
