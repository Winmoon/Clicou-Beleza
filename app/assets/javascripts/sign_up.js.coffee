$ ->
  $('input[name="user[user_type]"]').change ->
    if $(this).val() == 'salon'
      $('.venue_info').show()
    else
      $('.venue_info').hide()

    $('.complete_form').show()
