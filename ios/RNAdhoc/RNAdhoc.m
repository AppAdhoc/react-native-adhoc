//
//  RNAdhoc.m
//  RNAdhoc
//
//  Created by Yiming on 2018/2/26.
//  Copyright © 2018年 appadhoc. All rights reserved.
//

#import "RNAdhoc.h"
#import <React/RCTLog.h>
#import <React/RCTUtils.h>
#import "AdhocSDK.h"

@implementation RNAdhoc

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(getFlag:(NSString *)flag_name default:(id)default_value callback:(RCTResponseSenderBlock)callback) {
    id flagValue = [AdhocSDK getFlag:flag_name default:default_value];
    callback(@[[NSNull null], flagValue]);
}

RCT_EXPORT_METHOD(track:(NSString *)stat_name value:(nonnull NSNumber *)stat_value) {
    [AdhocSDK track:stat_name value:stat_value];
}

RCT_REMAP_METHOD(trackWithAttribute, track:(NSString *)stat_name value:(nonnull NSNumber *)stat_value attribute:(NSDictionary *)stat_attribute) {
    [AdhocSDK track:stat_name value:stat_value attribute:stat_attribute];
}

RCT_EXPORT_METHOD(trackPageView) {
    [AdhocSDK trackPageView];
}

RCT_EXPORT_METHOD(getCurrentExperiments:(RCTResponseSenderBlock)callback) {
    NSArray *currentExperimentsArray = [AdhocSDK getCurrentExperiments];
    callback(@[[NSNull null], currentExperimentsArray]);
}

RCT_EXPORT_METHOD(getCurrentExperimentsAndExperimentsID:(RCTResponseSenderBlock)callback) {
    NSArray *currentExperimentInfoArray = [AdhocSDK getCurrentExperimentsAndExperimentsID];
    callback(@[[NSNull null], currentExperimentInfoArray]);
}

RCT_EXPORT_METHOD(asynchronousGetFlag:(NSString *)flag_name defaultValue:(id)default_value timeoutInterval:(NSTimeInterval)timeout completionHandler:(RCTResponseSenderBlock)callback) {
    [AdhocSDK asynchronousGetFlag:flag_name defaultValue:default_value timeoutInterval:timeout completionHandler:^(id flag_value, NSError *error) {
        NSArray *array = @[RCTJSErrorFromNSError(error), flag_value];
        callback(array);
    }];
}

@end

