module VenuesHelper
  def venue_location(location)
    location.values.to_sentence
  end
end
