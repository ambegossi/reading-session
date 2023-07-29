import Foundation
import WidgetKit

@available(iOS 16.1, *)
func calculateTimerInterval(context: ActivityViewContext<ReadingSessionLiveActivityAttributes>) -> ClosedRange<Date> {
    let now = Date()
    let elapsedSeconds = context.state.elapsedSeconds
    let start = Calendar.current.date(byAdding: .second, value: -elapsedSeconds, to: now)!
    let end = Calendar.current.date(byAdding: .hour, value: 8, to: now)!
  
    return start...end
}
