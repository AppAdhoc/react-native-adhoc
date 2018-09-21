package com.appadhoc.react_native;

import android.app.Application;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;
import android.support.multidex.MultiDex;

import com.adhoc.adhocsdk.AdhocTracker;
import com.adhoc.config.AdhocConfig;
import com.appadhoc.BuildConfig;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new com.appadhoc.module.AppadhocPackage()
            );
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        MultiDex.install(this);
//        SharedPreferences sharedPreferences = PreferenceManager.getDefaultSharedPreferences(getApplicationContext());
//        sharedPreferences.edit().putString("debug_http_host", "192.168.0.22:8081").commit();
        SoLoader.init(this, /* native exopackage */ false);
        AdhocConfig adhocConfig = new AdhocConfig.Builder()
                //设置App上下文(必要参数)
                .context(this)
                //设置Appkey(必要参数)
                .appKey("ADHOC_6cd6a401-05ca-4ae8-acb1-35254d2f3042")
                //添加自定义用户标签
                .build();

        AdhocTracker.init(adhocConfig);
    }
}
