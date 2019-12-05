import React, { NativeModules } from 'react-native';
const RNAdhoc = NativeModules.RNAdhoc;

export default class AdhocSDK {

  /**
   * iOS Only
   */
  static getFlag(flagName, defaultValue, callback) {
    RNAdhoc.getFlag(flagName, defaultValue, (error, flagValue) => {
     if (error) {
       console.error(error);
     } else {
       callback(flagValue);
     }
   })
 }

  /**
   * Android Only
   */
  static getNumberFlag(flagName, defaultNumber, callback) {
     RNAdhoc.getNumberFlag(flagName, defaultNumber, (flagValue) => {
      callback(flagValue);
    })
  }

  /**
   * Android Only
   */
  static getStringFlag(flagName, defaultString, callback) {
     RNAdhoc.getStringFlag(flagName, defaultString, (flagValue) => {
      callback(flagValue);
    })
  }

  /**
   * Android Only
   */
  static getBooleanFlag(flagName, defaultBooleanValue, callback) {
     RNAdhoc.getBooleanFlag(flagName, defaultBooleanValue, (flagValue) => {
      callback(flagValue);
    })
  }

  /**
   * iOS Only
   */
  static getFlagFast(flagName, defaultValue, callback) {
    RNAdhoc.getFlagFast(flagName, defaultValue, 30000, (error, flagValue) => {
     if (error) {
       console.error(error);
     } else {
       callback(flagValue);
     }
   })
 }

  /**
   * iOS only
   */
  static asynchronousGetFlag(flagName, defaultValue, callback) {
    RNAdhoc.asynchronousGetFlag(flagName, defaultValue, 30000, (error, flagValue) => {
      if (error) {
        console.error(error);
      } else {
        callback(flagValue);
      }
    });
  }

  /**
   * Android only
   */
  static fastGetNumberFlag(flagName, defaultNumberValue, callback) {
    RNAdhoc.getFlagFast(flagName, defaultNumberValue, (value) => {
        callback(value);
    });
  }
  /**
   * Android only
   */
  static fastGetBooleanFlag(flagName, defaultBooleanValue, callback) {
    RNAdhoc.getFlagFast(flagName, defaultBooleanValue, (value) => {
        callback(value);
    });
  }

  /**
   * Android only
   */
  static fastGetStringFlag(flagName, defaultStringValue, callback) {
    RNAdhoc.getFlagFast(flagName, defaultStringValue, (value) => {
        callback(value);
    });
  }


/**
   * Android only
   */
  static asynchronousGetNumberFlag(flagName, defaultNumberValue, callback) {
    RNAdhoc.asynchronousGetNumberFlag(flagName, defaultNumberValue, (value) => {
        callback(value);
    });
  }
  /**
   * Android only
   */
  static asynchronousGetBooleanFlag(flagName, defaultBooleanValue, callback) {
    RNAdhoc.asynchronousGetBooleanFlag(flagName, defaultBooleanValue, (value) => {
        callback(value);
    });
  }

  /**
   * Android only
   */
  static asynchronousGetStringFlag(flagName, defaultStringValue, callback) {
    RNAdhoc.asynchronousGetStringFlag(flagName, defaultStringValue, (value) => {
        callback(value);
    });
  }


  static track(key, value) {
    RNAdhoc.track(key, value)
  }

  static trackWithAttribute(key, value, attribute) {
    RNAdhoc.trackWithAttribute(key, value, attribute);
  }
  /**
   * Android only
   */
  static addUserAttribute(key,value) {
    RNAdhoc.addUserAttribute(key,value);
  }
  static trackWithAttributie(key, value, attribute) {
    RNAdhoc.trackWithAttribute(key, value, attribute);
  }

  static getCurrentExperiments(callback) {
    RNAdhoc.getCurrentExperiments(experiments => {
      callback(experiments);
    });
  }

  static isJoinedExperimentByFlagName(key,callback) {
    RNAdhoc.isJoinedExperimentByFlagName(key,isJoined => {
        callback(isJoined);
    });
  }


  static getClientId(callback) {
    RNAdhoc.getClientId(clientId => {
        callback(clientId);
    });
  }

/**
   * iOS only
   */
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
        RNAdhoc.getFlag(args[0], args[1], (error, flagValue) => {
          if (error) {
            console.error(error);
          } else {
            var functionInfo = {
              flagName: args[0],
              flagValue: flagValue
            };
            var jsonStr = JSON.stringify(functionInfo);
            webView.postMessage(jsonStr);
          }
        });
      }
    }
  }
}
