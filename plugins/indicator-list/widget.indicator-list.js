freeboard.addStyle('.indicator-light', "border-radius:50%;width:22px;height:22px;border:2px solid #3d3d3d;margin-top:5px;float:left;background-color:#222;margin-right:10px;");
freeboard.addStyle('.indicator-light.green', "background-color:#009900;box-shadow: 0px 0px 15px #009900;border-color:#FDF1DF;");
freeboard.addStyle('.indicator-light.red', "background-color:#aa0000;box-shadow: 0px 0px 15px #aa0000;border-color:#FDF1DF;");
freeboard.addStyle('.indicator-text', "margin-top:10px;padding-top:10px;");
//freeboard.addStyle('.indicator-list','float:none');

var indicatorListWidget = function (settings) {
    var self = this;
    var titleElement = $('<h2 class="section-title"></h2>');
    var stateElement = $('<div class="indicator-text"></div>');
    var indicatorElement = $('<div class="indicator-light"></div>');
    var displayElement = $('<div class="indicator-list"></div>');
    var currentSettings = settings;
    var stateObject = {};

    function updateState() {
        displayElement.empty();

        //go through the list
        if(stateObject.value)
        {
            try{
              for(var i = 0; i < stateObject.value.length; i ++)
              {
                var obj = stateObject.value[i];
                var wrapper = $('<div></div>');
                var light = indicatorElement.clone();
                var text = stateElement.clone();

                if(obj['status'] == currentSettings.green_text)
                {
                  light.addClass('green');
                }
                else if(obj['status'] == currentSettings.red_text)
                {
                  light.addClass('red');
                }

                text.text(obj['description']);

                wrapper.append(light);
                wrapper.append(text);
                wrapper.append($('<div style="clear:left"></div>'));
                displayElement.append(wrapper);
              }
            }
            catch(e){
              console.log(e)
            }
        }

    }

    this.render = function (element) {
        $(element).append(titleElement).append(displayElement);
    }

    this.onSettingsChanged = function (newSettings) {
        currentSettings = newSettings;
        titleElement.html((_.isUndefined(newSettings.title) ? "" : newSettings.title));
        updateState();
    }

    this.onCalculatedValueChanged = function (settingName, newValue) {
        //only calulcated value is the "value" setting (json)
        stateObject[settingName] = newValue;

        updateState();
    }

    this.onDispose = function () {
    }

    this.getHeight = function () {
        return 3;
    }

    this.onSettingsChanged(settings);
};

freeboard.loadWidgetPlugin({
    type_name: "indicator_list",
    display_name: "Indicator List",
    settings: [
      {
          name: "title",
          display_name: "Title",
          type: "text"
      },
      {
          name: "value",
          display_name: "Value",
          type: "calculated"
      },
      {
          name: "green_text",
          display_name: "Green Text",
          description: "Status matching this text will be green",
          type: "text"
      },
      {
          name: "red_text",
          display_name: "Red Text",
          description: "Status matching this text will be red",
          type: "text"
      }
    ],
    newInstance: function (settings, newInstanceCallback) {
        newInstanceCallback(new indicatorListWidget(settings));
    }
});
