//
//  AdhocSDK.h
//  AdhocSDK
//
//  Created by xxx on 16/10/26.
//  Copyright © 2016年 AppAdhoc. All rights reserved.
//
//  当前SDK版本:3.1.5.1

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
@class WKWebView;
/**
 *  配置实例，用于SDK启动
 */
@interface AdhocSDKConfig : NSObject
@property (nonatomic, copy) NSString *appKey;  //官网申请的key，必填项
@property (nonatomic, copy) NSString *clientID; //自定义clientid，如无特殊需求，不需要设置
@property (nonatomic) BOOL enableDebugAssist; //是否显示调试按钮，默认为NO，不显示（若显示，getflag与track接口访问实时处理，设置的时间间隔无效）
@property (nonatomic) BOOL crashTrackEnabled;  //是否统计crash次数，默认为NO，不进行统计
@property (nonatomic) BOOL sessionTrackEnabled; //是否统计APP访问次数，默认为YES，进行统计
@property (nonatomic) BOOL durationTrackEnabled; //是否统计APP一次访问的时长，默认为YES，进行统计
@property (nonatomic) NSTimeInterval backgroundInterval; //设置app后台允许的最大停留时长，单位秒(s)，在该时间内切换，SDK认定为同一次访问，默认为30分钟(1800s)
@property (nonatomic, copy) NSDictionary *customProperty; //设置定向条件
+ (id)defaultConfig;
@end

/**
 *  用于获取实验变量以及进行优化指标统计
 */
NS_CLASS_AVAILABLE_IOS(8_0) @interface AdhocSDK : NSObject

/// SDK启动接口，需在@selector(application:didFinishLaunchingWithOptions:)里启动
+ (void)startWithConfigure:(AdhocSDKConfig *)config options:(NSDictionary *)options;

/**
 *  获取后台设置的指定的实验变量的值，实验变量的名字注意与后台保持一致
 *  该方法从SDK缓存中直接读取，如需同步获取flag值，请使用下面的接口
 *
 *  @param flag_name     adhoc后台设置的实验变量名字
 *  @param default_value 指定实验变量的默认值
 *
 *  @return 根据后台设置的模块的类型，返回的Obj-C中对应的类型可能为(NSNumber, NSString)
 */
+ (id)getFlag:(NSString *)flag_name default:(id)default_value;

/**
 *  异步方式从服务器直接获取实验变量的值
 *
 *  @param flag_name     adhoc后台设置的实验变量名字
 *  @param default_value 指定实验变量的默认值
 *  @param timeout       设置此次网络请求的超时时间，单位为秒(s)，默认1
 *  @param handler       网络执行结束后的相关操作
 */
+ (void)asynchronousGetFlag:(NSString *)flag_name
               defaultValue:(id)default_value
            timeoutInterval:(NSTimeInterval)timeout
          completionHandler:(void (^)(id flag_value, NSError *error))handler;

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
 *  统计页面PV
 */
+ (void)trackPageView;

/**
 *  获取当前设备所在实验的实验名列表
 *
 *  @return 实验名数组
 */
+ (NSArray *)getCurrentExperiments;

/**
 *  获取ClientID
 *
 *  @return ClientID
 */
+ (NSString *)getClientID;


/**
 UIWebView调用flag接口
 
 @param request 加载链接的request
 @param webView 当前的UIWebView
 */
+ (BOOL)adhocUIWebViewExecute:(NSURLRequest *)request webView:(UIWebView *)webView;

/**
 WKWebView调用flag接口
 
 @param request 加载链接的request
 @param webView 当前的WKWebView
 */
+ (BOOL)adhocWKWebViewExecute:(NSURLRequest *)request webView:(WKWebView *)webView;

@end

@interface UIView (Adhoc)
@property (nonatomic, copy) NSString * adhoc_idf; //用户指定控件唯一标识,目前只支持index(数字)，例:cell.adhoc_idf = @"1";
@end
