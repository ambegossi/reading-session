//
//  ReadingSessionWidgetBundle.swift
//  ReadingSessionWidget
//
//  Created by Anderson Begossi on 19/07/23.
//

import WidgetKit
import SwiftUI

@main
struct ReadingSessionWidgetBundle: WidgetBundle {
    var body: some Widget {
        if #available(iOS 16.1, *) {
          ReadingSessionWidgetLiveActivity()
        }
    }
}
