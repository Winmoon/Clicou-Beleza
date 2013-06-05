$ ->
  $('.loveds a').click ->
    item = $(this)
    $.get item.data("href"), (data) ->
      item.text(parseInt(item.text()) + 1)

