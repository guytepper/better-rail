import WidgetKit
import SwiftUI


struct Provider: IntentTimelineProvider {
  typealias Entry = TrainDetail

  func placeholder(in context: Context) -> Entry {
      snapshotEntry
  }

  func getSnapshot(for configuration: RouteIntent, in context: Context, completion: @escaping (TrainDetail) -> ()) {
      completion(snapshotEntry)
  }


  func getTimeline(for configuration: RouteIntent, in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
    
      if let originId = configuration.origin?.identifier,
         let destinationId = configuration.destination?.identifier {

        EntriesGenerator().getTrains(originId: originId, destinationId: destinationId, completion: { entries in
        // Refresh widget after tomorrow at midnight
        let tomorrow = Calendar.current.date(byAdding: .day, value: 1, to: Date())!
        let midnight = Calendar.current.startOfDay(for: tomorrow)

        let timeline = Timeline(entries: entries, policy: .after(midnight))
        completion(timeline)
      })

    }
    
    
  }
}

@main
struct BetterRailWidget: Widget {
    let kind: String = "BetterRailWidget"

    var body: some WidgetConfiguration {
        IntentConfiguration(
          kind: kind,
          intent: RouteIntent.self,
          provider: Provider())
          { entry in
          WidgetEntryView(entry: entry)
        }
        .configurationDisplayName("Scheduale")
        .description("Display the upcoming train times.")
        .supportedFamilies([.systemSmall, .systemMedium, .systemLarge])
    }
}

struct BetterRailWidget_Previews: PreviewProvider {
    static var previews: some View {
      WidgetEntryView(entry: snapshotEntry)
            .previewContext(WidgetPreviewContext(family: .systemSmall))
    }
}
