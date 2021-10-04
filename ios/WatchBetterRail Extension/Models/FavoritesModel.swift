
import Foundation

struct FavoriteRoute: Identifiable {
  let id: Int
  let origin: Station
  let destination: Station
}

struct FavoritesModel {
  var routes: [FavoriteRoute] = []
  
  mutating func updateRoutes(_ routes: [String: Any]) {
    
    var favoriteRoutes: [FavoriteRoute] = []
    
    for (key, value) in routes {
      let originId = key
      if let destinationId = value as? String,
         let originStation = getStationById(originId),
         let destinationStation = getStationById(destinationId) {
          favoriteRoutes.append(
            FavoriteRoute(id: Int("\(originId)\(destinationId)")!, origin: originStation, destination: destinationStation)
          )
      } else {
          print("🚨 Couldn't extract application context")
      }
    }
    
    self.routes = favoriteRoutes

  }
}