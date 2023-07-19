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
            LockScreenLiveActivityView(context: context)
        } dynamicIsland: { context in
            DynamicIsland {
              DynamicIslandExpandedRegion(.leading) {
                    Text("A regra é não ter regras")
                      .lineLimit(nil)
                      .fixedSize(horizontal: false, vertical: true)
                      .multilineTextAlignment(.leading)
                }
                DynamicIslandExpandedRegion(.trailing) {
                    Text("Reed Hastings")
                      .lineLimit(nil)
                      .fixedSize(horizontal: false, vertical: true)
                      .multilineTextAlignment(.trailing)
                }
                DynamicIslandExpandedRegion(.bottom) {
                    let now = Date.now
                    let elapsedSeconds = context.state.elapsedSeconds
                    let start = Calendar.current.date(byAdding: .second, value: -elapsedSeconds, to: now)!
                    let end = Calendar.current.date(byAdding: .hour, value: Int(8), to: Date.now)!
                  
                    Text(timerInterval: start...end, countsDown: false)
                        .multilineTextAlignment(.center)
                        .font(.title)
                        .foregroundColor(.orange)
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
              Image(systemName: "book")
                  .foregroundColor(.orange)
            }
        }
    }
}

struct LockScreenLiveActivityView: View {
    let context: ActivityViewContext<ReadingSessionLiveActivityAttributes>
    
    var body: some View {
        let now = Date.now
        let elapsedSeconds = context.state.elapsedSeconds
        let start = Calendar.current.date(byAdding: .second, value: -elapsedSeconds, to: now)!
        let end = Calendar.current.date(byAdding: .hour, value: Int(8), to: Date.now)!
      
        VStack() {
            Spacer()
            Text("A regra é não ter regras")
            Spacer()
            Text("Reed Hastings")
                .font(.caption)
            Spacer()
            Text(timerInterval: start...end, countsDown: false)
                .multilineTextAlignment(.center)
                .font(.title)
                .foregroundColor(.orange)
            Spacer()
        }
    }
}

/*
struct ReadingSessionWidgetLiveActivity_Previews: PreviewProvider {
    static let attributes = ReadingSessionLiveActivityAttributes()
    static let contentState = ReadingSessionLiveActivityAttributes.ContentState(elapsedSeconds: 20)

    static var previews: some View {
        attributes
            .previewContext(contentState, viewKind: .dynamicIsland(.compact))
            .previewDisplayName("Island Compact")
        attributes
            .previewContext(contentState, viewKind: .dynamicIsland(.expanded))
            .previewDisplayName("Island Expanded")
        attributes
            .previewContext(contentState, viewKind: .dynamicIsland(.minimal))
            .previewDisplayName("Minimal")
        attributes
            .previewContext(contentState, viewKind: .content)
            .previewDisplayName("Notification")
    }
}
 */
