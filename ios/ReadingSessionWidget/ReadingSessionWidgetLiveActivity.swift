//
//  ReadingSessionWidgetLiveActivity.swift
//  ReadingSessionWidget
//
//  Created by Anderson Begossi on 19/07/23.
//

import ActivityKit
import WidgetKit
import SwiftUI

struct ReadingSessionWidgetLiveActivity: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: ReadingSessionLiveActivityAttributes.self) { context in
            // Lock screen/banner UI goes here
            VStack {
                Text("Hello")
            }
            .activityBackgroundTint(Color.cyan)
            .activitySystemActionForegroundColor(Color.black)
            
        } dynamicIsland: { context in
            DynamicIsland {
                // Expanded UI goes here.  Compose the expanded UI through
                // various regions, like leading/trailing/center/bottom
                DynamicIslandExpandedRegion(.leading) {
                    Text("Leading")
                }
                DynamicIslandExpandedRegion(.trailing) {
                    Text("Trailing")
                }
                DynamicIslandExpandedRegion(.bottom) {
                    Text("Bottom")
                    // more content
                }
            } compactLeading: {
              let now = Date.now
              let elapsedSeconds = context.state.elapsedSeconds
              let start = Calendar.current.date(byAdding: .second, value: -elapsedSeconds, to: now)!
              let end = Calendar.current.date(byAdding: .hour, value: Int(8), to: Date.now)!
                            
              Text(timerInterval: start...end, countsDown: false)
            } compactTrailing: {
              Image(systemName: "book")
                  .foregroundColor(.orange)
            } minimal: {
                Text("Min")
            }
        }
    }
}
