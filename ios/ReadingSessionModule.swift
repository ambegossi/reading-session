//
//  ReadingSessionModule.swift
//  ReadingSession
//
//  Created by Anderson Begossi on 17/07/23.
//

import ActivityKit

@objc(ReadingSessionModule)
class ReadingSessionModule: NSObject {
  
  @objc(startLiveActivity:bookTitle:bookAuthor:)
  func startLiveActivity(elapsedSeconds: NSNumber, bookTitle: String, bookAuthor: String) {
    let initialContentState = ReadingSessionLiveActivityAttributes.ContentState(elapsedSeconds: Int(truncating: elapsedSeconds))
    let activityAttributes = ReadingSessionLiveActivityAttributes(bookTitle: bookTitle, bookAuthor: bookAuthor)
    
    do {
      if #available(iOS 16.1, *) {
        _ = try Activity.request(attributes: activityAttributes, contentState: initialContentState)
      } else {
        // Fallback on earlier versions
      }
    } catch (let error) {
      print("Error starting Reading Session Live Activity \(error.localizedDescription).")
    }
  }
  
  @objc
  func endLiveActivity() {
    Task {
      if #available(iOS 16.1, *) {
        for activity in Activity<ReadingSessionLiveActivityAttributes>.activities {
          await activity.end()
        }
      } else {
        // Fallback on earlier versions
      }
    }
  }
}
