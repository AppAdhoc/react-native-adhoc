package com.appadhoc.module;

/**
 * Created by dongyuangui on 2018/2/26.
 */

import com.adhoc.adhocsdk.AdhocTracker;
import com.adhoc.adhocsdk.ExperimentFlags;
import com.adhoc.adhocsdk.OnAdHocReceivedData;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.ReadableType;

import java.util.HashMap;
import java.util.Map;

public class AppadhocModule extends ReactContextBaseJavaModule {

    public AppadhocModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "RNAdhoc";
    }

    @ReactMethod
    public void getBooleanFlag(String name, boolean t, Callback callback) {
        boolean result = AdhocTracker.getFlag(name, t);
        callback.invoke(result);
    }

    @ReactMethod
    public void getNumberFlag(String name, double t, Callback callback) {
        Number result = AdhocTracker.getFlag(name, t);
        callback.invoke(result);
    }

    @ReactMethod
    public void getStringFlag(String name, String t, Callback callback) {
        String result = AdhocTracker.getFlag(name, t);
        callback.invoke(result);
    }

    @ReactMethod
    public void trackWithAttribute(String var0, double var1, ReadableMap var2) {
        HashMap map = (HashMap) convert2hashMap(var2);
        AdhocTracker.track(var0, var1, map);
    }

    @ReactMethod
    public void track(String var0, double var1) {
        AdhocTracker.track(var0, var1);
    }

   @ReactMethod
   public void addUserAttribute(String key,String value) {
       AdhocTracker.setUserAttribute(key,value);
    }

    @ReactMethod
    public void getCurrentExperiments(Callback callback) {
        callback.invoke(AdhocTracker.getCurrentExperiments().toString());
    }
    @ReactMethod
    public void isJoinedExperimentByFlagName(String key,Callback callback) {
        callback.invoke(AdhocTracker.isJoinedExperimentByFlagName(key));
    }

    @ReactMethod
    public void asynchronousGetStringFlag(final String key, final String defaultValue, final Callback callback) {
        AdhocTracker.asyncGetFlag(new OnAdHocReceivedData() {
            @Override
            public void onReceivedData(ExperimentFlags experimentFlags) {
                callback.invoke(experimentFlags.getFlag(key, defaultValue));
            }
        });
    }
    

    @ReactMethod
    public void asynchronousGetBooleanFlag(final String key, final boolean defaultValue, final Callback callback) {
        AdhocTracker.asyncGetFlag(new OnAdHocReceivedData() {
            @Override
            public void onReceivedData(ExperimentFlags experimentFlags) {
                callback.invoke(experimentFlags.getFlag(key, defaultValue));
            }
        });
    }

    @ReactMethod
    public void asynchronousGetNumberFlag(final String key, final double defaultValue, final Callback callback) {
        AdhocTracker.asyncGetFlag(new OnAdHocReceivedData() {
            @Override
            public void onReceivedData(ExperimentFlags experimentFlags) {
                callback.invoke(experimentFlags.getFlag(key, defaultValue));
            }
        });
    }

    @ReactMethod
    public void getFlagFast(final String key, final String defaultValue, final Callback callback) {
        AdhocTracker.fastGetFlag(30*1000,new OnAdHocReceivedData() {
            @Override
            public void onReceivedData(ExperimentFlags experimentFlags) {
                callback.invoke(experimentFlags.getFlag(key, defaultValue));
            }
        });
    }
    

    @ReactMethod
    public void getFlagFast(final String key, final boolean defaultValue, final Callback callback) {
        AdhocTracker.fastGetFlag(30*1000,new OnAdHocReceivedData() {
            @Override
            public void onReceivedData(ExperimentFlags experimentFlags) {
                callback.invoke(experimentFlags.getFlag(key, defaultValue));
            }
        });
    }

    @ReactMethod
    public void getFlagFast(final String key, final double defaultValue, final Callback callback) {
        AdhocTracker.fastGetFlag(30*1000,new OnAdHocReceivedData() {
            @Override
            public void onReceivedData(ExperimentFlags experimentFlags) {
                callback.invoke(experimentFlags.getFlag(key, defaultValue));
            }
        });
    }

    @ReactMethod
    public void getClientId(final Callback callback) {
        callback.invoke(AdhocTracker.getClientId());
    }

    private Map<String, Object> convert2hashMap(ReadableMap readableMap) {
        ReadableMapKeySetIterator iterator = readableMap.keySetIterator();
        Map<String, Object> deconstructedMap = new HashMap<>();
        while (iterator.hasNextKey()) {
            String key = iterator.nextKey();
            ReadableType type = readableMap.getType(key);
            switch (type) {
                case Null:
                    deconstructedMap.put(key, null);
                    break;
                case Boolean:
                    deconstructedMap.put(key, readableMap.getBoolean(key));
                    break;
                case Number:
                    deconstructedMap.put(key, readableMap.getDouble(key));
                    break;
                case String:
                    deconstructedMap.put(key, readableMap.getString(key));
                    break;
                default:
                    throw new IllegalArgumentException("Could not convert object with key: " + key + ".");
            }

        }
        return deconstructedMap;
    }
}
