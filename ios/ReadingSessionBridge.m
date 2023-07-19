//
//  ReadingSessionBridge.m
//  ReadingSession
//
//  Created by Anderson Begossi on 17/07/23.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(ReadingSessionModule, NSObject)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}


RCT_EXTERN_METHOD(startLiveActivity:(nonnull NSNumber *)elapsedSeconds)
RCT_EXTERN_METHOD(endLiveActivity)

@end

