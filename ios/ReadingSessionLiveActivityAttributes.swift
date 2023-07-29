//
//  ReadingSessionLiveActivityAttributes.swift
//  ReadingSession
//
//  Created by Anderson Begossi on 17/07/23.
//

import Foundation
import ActivityKit

struct ReadingSessionLiveActivityAttributes: ActivityAttributes {
    public struct ContentState: Codable, Hashable {
        var elapsedSeconds: Int
    }
  
    var bookTitle: String
    var bookAuthor: String
}
