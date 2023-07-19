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
        // Dynamic stateful properties about your activity go here!
        var value: Int
    }

    // Fixed non-changing properties about your activity go here!
    var name: String
}
