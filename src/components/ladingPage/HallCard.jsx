import { Card, CardContent, CardFooter } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { MapPin, Star, Users } from "lucide-react"



export function HallCard({ name, location, image, price, rating, reviewCount, capacity, tags }) {
 // console.log("HallCard", { name, location, image, price, rating, reviewCount, capacity, tags });
  
  return (
    <Card className="overflow-hidden ml-4">
      <div className="relative aspect-[4/3] ">
         {typeof image === "string" ? (
    <img
      src={image || "/placeholder.svg"}
      alt={name}
      className="object-cover transition-transform hover:scale-105 w-full h-full"
    />
  ) : (
    <div className="w-full h-full object-cover transition-transform hover:scale-105">
      {image}
    </div>
  )}
        <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 text-xs font-medium flex items-center">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
          {rating}
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg">{name}</h3>
        <div className="flex items-center text-muted-foreground mt-1">
          <MapPin className="h-3 w-3 mr-1" />
          <span className="text-sm">{location}</span>
        </div>
        <div className="flex items-center text-muted-foreground mt-1">
          <Users className="h-3 w-3 mr-1" />
          <span className="text-sm">Up to {capacity} guests</span>
        </div>
        <div className="mt-2 text-sm text-muted-foreground">
          <span>{reviewCount} reviews</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-1">
          {tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div>
          <span className="font-bold text-lg">₹{price.toLocaleString()}</span>
          <span className="text-muted-foreground text-sm"> / day</span>
        </div>
        <Button size="sm">View Details</Button>
      </CardFooter>
    </Card>
  )
}
