#= require util/jquery.Jcrop.min
# Simple event handler, called from onChange and onSelect
# event handlers, as per the Jcrop invocation above
showCoords = (c) ->
  $("#post_crop_x").val c.x
  $("#post_crop_y").val c.y
  $("#post_crop_w").val c.w
  $("#post_crop_h").val c.h
  console.log $("#post_crop_x").val()
clearCoords = ->
  $("#coords input").val ""

jQuery ($) ->
  $("#crop_photo").Jcrop
    onChange: showCoords
    onSelect: showCoords
    onRelease: clearCoords
  , ->
    console.log this

