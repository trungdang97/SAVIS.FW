
/**
 * SAVIS VIETNAM CORPORATION
 *
 * REDACTOR QUOTE PLUGINS
 * AUTHOR : TRUONGND
 *
 */

if (!RedactorPlugins) var RedactorPlugins = {};
 
RedactorPlugins.quote = function()
{   
    var fillZero = function(item, length) {
        if (item.length < length) {
            item = "0" + item;
        }

        return item;
    };

    return {
        init: function()
        {
            var button = this.button.add('quote', 'Quote');

 			if (!this.opts.quoteUserName) return;
 			if (!this.opts.quoteUserId) return;

            // alert('aa');

            // make your added button as Font Awesome's icon
            // this.button.setAwesome('quote', 'fa-folder');
 
            this.button.addCallback(button, this.quote.addQuote);
        },
        addQuote: function(buttonName)
        {

        	var dateObj = new Date();
			var month = dateObj.getMonth() + 1; //months from 1-12
			var day = dateObj.getDate();
			var year = dateObj.getFullYear();
			var hour = dateObj.getHours();
			var minutes = dateObj.getMinutes();
			var newdate = fillZero(hour, 2) + ":" + fillZero(minutes, 2) + " " + fillZero(day, 2) + "/" + fillZero(month, 2) + "/" + year;

        	var node = 
        	"&nbsp;<span class='quote-inline' style='background-color:yellow;color:#000'>{ " + newdate + " </span>" + 
        	"<span class='quote-inline' style='background-color:yellow;color:#000'><a href='#/userprofile/" + this.opts.quoteUserId + "'>" + this.opts.quoteUserName + "</a></span>" + 
        	"<span class='quote-inline' style='background-color:yellow;color:#000'> :  }</span>" +
            "<span>&nbsp;</span>";


            this.insert.html(node, false);
            var afterValue = this.caret.getOffset();
            this.caret.setOffset(afterValue - 2);

        }
    };
};