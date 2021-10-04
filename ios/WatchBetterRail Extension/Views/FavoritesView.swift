/**
  The main app screen which displays the favorite user train routes.
 */

import SwiftUI

struct FavoritesView: View {
  @ObservedObject var favorites: FavoritesViewModel
  
    var body: some View {
      VStack {
        List {
          ForEach (favorites.routes) { route in
            let routesView = RoutesView(route: RouteViewModel(origin: route.origin, destination: route.destination))
            
            NavigationLink(destination: routesView) {
              FavoriteItemView(origin: route.origin, destination: route.destination)
            }
            .listRowBackground(ZStack {
              if let stationImage = route.origin.image {
                Image(stationImage).resizable()
              } else {
                Rectangle().fill(Color("midnightBlue"))
              }
              Rectangle().foregroundColor(Color(.sRGB, red: 0, green: 0, blue: 0, opacity: 0.45))
            }.cornerRadius(5))
          }
        }
        .listStyle(CarouselListStyle())
      }.navigationTitle("מועדפים")
    }
}

struct FavoritesView_Previews: PreviewProvider {
    static var previews: some View {
      
      NavigationView {
        FavoritesView(favorites: FavoritesViewModel())
      }
    }
}