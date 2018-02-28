package com.appadhoc.module;

/**
 * Created by dongyuangui on 2018/2/26.
 */

import android.telecom.Call;

import com.adhoc.adhocsdk.AdhocTracker;
import com.adhoc.adhocsdk.ExperimentFlags;
import com.adhoc.adhocsdk.OnAdHocReceivedData;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.JavaOnlyMap;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.ReadableType;
import com.facebook.react.bridge.WritableMap;

import java.util.HashMap;
import java.util.Map;

public class AppadhocModule extends ReactContextBaseJavaModule {


    public AppadhocModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "AdhocAndroid";
    }

    @ReactMethod
    public void getFlag(String name, boolean t, Promise promise) {
        WritableMap map = Arguments.createMap();
        boolean result = AdhocTracker.getFlag(name, t);
        map.putBoolean(name, result);
        promise.resolve(map);
    }

    @ReactMethod
    public void getFlag(String name, double t, Promise promise) {
        WritableMap map = Arguments.createMap();
        double result = AdhocTracker.getFlag(name, t);
        map.putDouble(name, result);
        promise.resolve(map);
    }

    @ReactMethod
    public void getFlag(String name, String t, Promise promise) {
        WritableMap map = Arguments.createMap();
        String result = AdhocTracker.getFlag(name, t);
        map.putString(name, result);
        promise.resolve(map);
    }

    @ReactMethod
    public void track_ok(String var0, double var1, ReadableMap var2) {
        HashMap map = (HashMap) convert2hashMap(var2);
        AdhocTracker.track(var0, var1, map);
    }

    @ReactMethod
    public void track(String var0, double var1) {
        AdhocTracker.track(var0, var1);
    }

    @ReactMethod
    public void getCurrentExperiments(Callback callback) {
        callback.invoke(AdhocTracker.getCurrentExperiments().toString());
//        callback.invoke("sadfasdf");
    }

    @ReactMethod
    public void asyncGetFlag_t(int timeOut, final Callback callback) {
        AdhocTracker.asyncGetFlag(timeOut, new OnAdHocReceivedData() {
            @Override
            public void onReceivedData(ExperimentFlags experimentFlags) {
                callback.invoke(experimentFlags.getRawFlags().toString());
            }
        });
    }

    @ReactMethod
    public void asyncGetFlag(final Callback callback) {
        AdhocTracker.asyncGetFlag(new OnAdHocReceivedData() {
            @Override
            public void onReceivedData(ExperimentFlags experimentFlags) {
                callback.invoke(experimentFlags.getRawFlags().toString());
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
