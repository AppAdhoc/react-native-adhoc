//
//  AdhocSDK.h
//  AdhocSDK
//
//  Created by AppAdhoc on 16/10/26.
//  Copyright © 2016年 AppAdhoc. All rights reserved.
//
//  当前 SDK 版本：5.0.2

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
@class WKWebView;

/**
 *  配置实例，用于 SDK 启动
 */
NS_CLASS_AVAILABLE_IOS(8_0) @interface AdhocSDKConfig : NSObject
@property (nonatomic, copy) NSString *appKey;  // 官网申请的 key，必填项
@property (nonatomic, copy) NSString *clientID; // 自定义 clientid，如无特殊需求，不需要设置
@property (nonatomic) BOOL enableDebugAssist; // 是否显示调试按钮，默认为 NO，不显示（若显示，getFlag 与 track 接口访问实时处理，设置的时间间隔无效）
@property (nonatomic) BOOL crashTrackEnabled;  // 是否统计 crash 次数，默认为 NO，不进行统计
@property (nonatomic) BOOL sessionTrackEnabled; // 是否统计 APP 访问次数，默认为 YES，进行统计
@property (nonatomic) BOOL durationTrackEnabled; // 是否统计 APP 一次访问的时长，默认为 YES，进行统计
@property (nonatomic) BOOL reportImmediatelyEnabled; // 是否立即上报数据，默认为 NO，不立即上报
@property (nonatomic) NSTimeInterval backgroundInterval; // 设置 App 后台允许的最大停留时长，单位秒(s)，在该时间内切换，SDK 认定为同一次访问，默认为 30 分钟(1800s)
@property (nonatomic, copy) NSDictionary *customProperty; // 设置定向条件
+ (id)defaultConfig;
@end

/**
 *  用于获取试验变量以及进行优化指标统计
 */
NS_CLASS_AVAILABLE_IOS(8_0) @interface AdhocSDK : NSObject

// SDK 启动接口，需在 @selector(application:didFinishLaunchingWithOptions:) 里启动
+ (void)startWithConfigure:(AdhocSDKConfig *)config options:(NSDictionary *)options;

/**
 *  获取后台设置的指定的试验变量的值，试验变量的名字注意与后台保持一致
 *  该方法从 SDK 缓存中直接读取，如需同步获取 flag 值，请使用下面的接口
 *
 *  @param flagName     adhoc 后台设置的试验变量名字
 *  @param defaultValue 指定试验变量的默认值
 *
 *  @return 根据后台设置的模块的类型，返回 Objective-C 中对应的类型可能为(NSNumber, NSString)
 */
+ (id)getFlag:(NSString *)flagName default:(id)defaultValue;

/**
 *  异步方式从缓存直接获取试验变量的值，并检查更新本地flags数据
 *
 *  @param flagName     adhoc后台设置的试验变量名字
 *  @param defaultValue 指定试验变量的默认值
 *  @param timeoutInterval 设置此次网络请求的超时时间，单位为秒(s)，默认 30s
 *  @param completionHandler 网络执行结束后的相关操作
 */
+ (void)getFlagFast:(NSString *)flagName
               defaultValue:(id)defaultValue
            timeoutInterval:(NSTimeInterval)timeoutInterval
          completionHandler:(void (^)(id flagValue, NSError *error))completionHandler;

/**
 *  异步方式从服务器直接获取试验变量的值
 *
 *  @param flagName     adhoc后台设置的试验变量名字
 *  @param defaultValue 指定试验变量的默认值
 *  @param timeoutInterval 设置此次网络请求的超时时间，单位为秒(s)，默认 30s
 *  @param completionHandler 网络执行结束后的相关操作
 */
+ (void)asynchronousGetFlag:(NSString *)flagName
               defaultValue:(id)defaultValue
            timeoutInterval:(NSTimeInterval)timeoutInterval
          completionHandler:(void (^)(id flagValue, NSError *error))completionHandler;

/**
 统计需要的优化指标，用以实现科学有效的测试
 
 @param stat_name 后台设置的优化指标，名字须保持一致
 @param stat_value 当前优化指标单次统计的权重
 */
+ (void)track:(NSString *)stat_name value:(NSNumber *)stat_value;

/**
 统计需要的优化指标，用以实现科学有效的测试

 @param stat_name 后台设置的优化指标，名字须保持一致
 @param stat_value 当前优化指标单次统计的权重
 @param stat_attribute 当前数据的定向条件
 */
+ (void)track:(NSString *)stat_name value:(NSNumber *)stat_value attribute:(NSDictionary *)stat_attribute;

/**
 *  获取当前设备所在试验的试验名列表
 *  1.数组中只有 CONTROL，代表未进入任何试验
 *  2.数组中存在一个或多个字典，代表进入一个或多个试验
 *   {
 *      id = "试验版本 ID";
 *      name = "试验名称";
 *   }
 *  @return 试验名数组
 */
+ (NSArray *)getCurrentExperiments;

/**
 *  获取 ClientID
 *
 *  @return ClientID
 */
+ (NSString *)getClientID;

/**
 UIWebView 调用 flag 接口
 
 @param request 加载链接的request
 @param webView 当前的UIWebView
 */
+ (BOOL)adhocUIWebViewExecute:(NSURLRequest *)request webView:(UIWebView *)webView;

/**
 WKWebView 调用 flag 接口
 
 @param request 加载链接的request
 @param webView 当前的WKWebView
 */
+ (BOOL)adhocWKWebViewExecute:(NSURLRequest *)request webView:(WKWebView *)webView;

@end

@interface UIView (Adhoc)
@property (nonatomic, copy) NSString *adhoc_idf; // 用户指定控件唯一标识,目前只支持 index (数字)，例: cell.adhoc_idf = @"1";
@end
