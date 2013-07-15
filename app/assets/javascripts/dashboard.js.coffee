$ ->
  $('.loveds a').click ->
    item = $(this)
    $.get item.data("href"), (data) ->
      if data[0] == 'loved'
        item.text(parseInt(item.text()) + 1)
      else
        item.text(parseInt(item.text()) - 1)

