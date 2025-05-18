import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { CheckCircle, ImageOff, Import, Upload } from "lucide-react"
import ImageHall from "../../assets/images/hall4.jpg"

export default function ListYourHall() {
  return (
    <div>
      <section className="bg-muted/30 py-12 md:py-20">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">List Your Marriage Hall</h1>
            <p className="text-xl text-muted-foreground">
              Join our platform and reach thousands of potential customers looking for the perfect venue
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-start ml-4">
            <div>
              <h2 className="text-3xl font-bold mb-6">Benefits of Listing Your Hall</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-lg">Increased Visibility</h3>
                    <p className="text-muted-foreground">
                      Reach thousands of potential customers actively searching for marriage halls.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-lg">Streamlined Booking Management</h3>
                    <p className="text-muted-foreground">
                      Easily manage bookings, availability, and customer communications in one place.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-lg">Enhanced Online Presence</h3>
                    <p className="text-muted-foreground">
                      Showcase your hall with high-quality photos and detailed descriptions.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-lg">Increased Bookings</h3>
                    <p className="text-muted-foreground">
                      Fill your calendar with more events and maximize your venue's potential.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-lg">Customer Reviews</h3>
                    <p className="text-muted-foreground">Build your reputation through customer reviews and ratings.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 relative h-[300px] rounded-lg overflow-hidden">
                
    <img
      src={ImageHall || "/placeholder.svg"}
      alt={"Hall Image"}
      className="object-cover transition-transform hover:scale-105 w-full h-full"
    />
  
              </div>
            </div>

            <div>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Register Your Hall</h2>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Hall Name</Label>
                      <Input id="name" placeholder="Enter your hall name" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="Enter your email" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="Enter your phone number" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Hall Address</Label>
                      <Textarea id="address" placeholder="Enter the complete address of your hall" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" placeholder="Enter city" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pincode">Pincode</Label>
                        <Input id="pincode" placeholder="Enter pincode" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="capacity">Maximum Capacity</Label>
                      <Input id="capacity" type="number" placeholder="Enter maximum guest capacity" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="price">Price Range (₹)</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <Input id="price-min" placeholder="Minimum price" />
                        <Input id="price-max" placeholder="Maximum price" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="facilities">Facilities Available</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select facilities" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ac">AC</SelectItem>
                          <SelectItem value="parking">Parking</SelectItem>
                          <SelectItem value="catering">Catering</SelectItem>
                          <SelectItem value="decoration">Decoration</SelectItem>
                          <SelectItem value="dj">DJ & Sound</SelectItem>
                          <SelectItem value="wifi">WiFi</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Hall Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your hall, its features, and any special offerings"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Upload Hall Images</Label>
                      <div className="border-2 border-dashed rounded-md p-6 text-center">
                        <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">
                          Drag and drop images here, or click to browse
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Upload at least 5 high-quality images (Max 10MB each)
                        </p>
                        <Button variant="outline" size="sm" className="mt-4">
                          Browse Files
                        </Button>
                      </div>
                    </div>

                    <Button type="submit" className="w-full">
                      Submit Hall Details
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
