//
//  RNAdhoc.m
//  RNAdhoc
//
//  Created by admin on 2018/11/23.
//  Copyright © 2018 AppAdhoc. All rights reserved.
//

#import "RNAdhoc.h"
#import <React/RCTUtils.h>
#import <AdhocSDK/AdhocSDK.h>

@implementation RNAdhoc

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(getFlag:(NSString *)flagName default:(id)defaultValue callback:(RCTResponseSenderBlock)completionHandler) {
    id flagValue = [AdhocSDK getFlag:flagName default:defaultValue];
    completionHandler(@[[NSNull null], flagValue]);
}

RCT_EXPORT_METHOD(getFlagFast:(NSString *)flagName defaultValue:(id)defaultValue timeoutInterval:(NSTimeInterval)timeoutInterval completionHandler:(RCTResponseSenderBlock)completionHandler) {
    [AdhocSDK getFlagFast:flagName defaultValue:defaultValue timeoutInterval:timeoutInterval completionHandler:^(id flagValue, NSError *error) {
        if (error) {
            NSArray *array = @[RCTJSErrorFromNSError(error), flagValue];
            completionHandler(array);
        } else {
            completionHandler(@[[NSNull null], flagValue]);
        }
    }];
}

RCT_EXPORT_METHOD(asynchronousGetFlag:(NSString *)flagName defaultValue:(id)defaultValue timeoutInterval:(NSTimeInterval)timeoutInterval completionHandler:(RCTResponseSenderBlock)completionHandler) {
    [AdhocSDK asynchronousGetFlag:flagName defaultValue:defaultValue timeoutInterval:timeoutInterval completionHandler:^(id flagValue, NSError *error) {
        if (error) {
            NSArray *array = @[RCTJSErrorFromNSError(error), flagValue];
            completionHandler(array);
        } else {
            completionHandler(@[[NSNull null], flagValue]);
        }
    }];
}

RCT_EXPORT_METHOD(track:(NSString *)stat_name value:(nonnull NSNumber *)stat_value) {
    [AdhocSDK track:stat_name value:stat_value];
}

RCT_REMAP_METHOD(trackWithAttribute, track:(NSString *)stat_name value:(nonnull NSNumber *)stat_value attribute:(NSDictionary *)stat_attribute) {
    [AdhocSDK track:stat_name value:stat_value attribute:stat_attribute];
}

RCT_EXPORT_METHOD(getCurrentExperiments:(RCTResponseSenderBlock)callback) {
    NSArray *currentExperimentsArray = [AdhocSDK getCurrentExperiments];
    callback(currentExperimentsArray);
}

RCT_EXPORT_METHOD(getClientId:(RCTResponseSenderBlock)callback) {
    NSString *clientID = [AdhocSDK getClientID];
    callback(@[clientID]);
}

@end
