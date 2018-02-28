import React, { NativeModules } from 'react-native';
const RNAdhoc = NativeModules.RNAdhoc;

export default class AdhocSDK {

  static getFlag(flagName, defaultValue, callback) {
     RNAdhoc.getFlag(flagName, defaultValue, (error, flagValue) => {
      if (error) {
        console.error(error);
      } else {
        callback(flagValue);
      }
    })
  }

  static track(key, value) {
    RNAdhoc.track(key, value)
  }

  static trackWithAttribute(key, value, attribute) {
    RNAdhoc.trackWithAttribute(key, value, attribute);
  }

  static trackPageView() {
    RNAdhoc.trackPageView();
  }

  static getCurrentExperiments(callback) {
    RNAdhoc.getCurrentExperiments((error, experiments) => {
      if (error) {
        console.error(error);
      } else {
        callback(experiments);
      }
    });
  }

  static getCurrentExperimentsAndExperimentsID(callback) {
    RNAdhoc.getCurrentExperimentsAndExperimentsID((error, experiments) => {
      if (error) {
        console.error(error);
      } else {
        callback(experiments);
      }
    });
  }
  
  static asynchronousGetFlag(flagName, defaultValue, timeout, callback) {
    RNAdhoc.asynchronousGetFlag(flagName, defaultValue, timeout, (error, value) => {
      if (error) {
        console.error(error);
      } else {
        callback({flagValue: value});
      }
    });
  }

  static handleWebViewMessage(webView, msg) {
    var isHaveAdhocMsg = msg.indexOf("adhoc");
    if (isHaveAdhocMsg == 0) { // 以 adhoc 开头
      var dataDic = JSON.parse(msg.slice(6));
      var functionName = dataDic.functionName;
      var args = dataDic.arguments;
      
      if(functionName === 'track') {
        if(args.length === 3) {
          RNAdhoc.trackWithAttribute(args[0], args[1], args[2]);
        } else {
          RNAdhoc.track(args[0], args[1]);
        }
      } else if (functionName === 'getFlag') {
        RNAdhoc.getFlag(args[0], args[1], (flagValue) => {
          var functionInfo = {
            functionName: args[2],
            arguments: flagValue
          };
          var jsonStr = JSON.stringify(functionInfo);
          webView.postMessage(jsonStr);
        });
      }
    }
  }
}